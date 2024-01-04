package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.AccountBean;
import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.model.UserInfoModel;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import com.hust.backend_password_manager.until.ObjectAndMap;
import com.hust.backend_password_manager.web.rest.err.LoginWithOutOtp;
import com.hust.backend_password_manager.web.rest.err.MyError;
import com.hust.backend_password_manager.web.rest.vm.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final SaltRepository saltRepository;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final CacheService cacheService;
    private final Random random;
    private final PasswordEncoder passwordEncoder;
    private final TwoFactorAuth twoFactorAuth;
    private final AccountBean accountBean;
    public Map<String,Object> register(RegisterFormVM registerFormVM) {
        String token;
        Account account = accountRepository.findOneByEmail(registerFormVM.getEmail());
        if(account == null){
            registerFormVM.setSecret("");
            Integer otp = random.nextInt(10000, 99999);
            Map<String,Object> claim = ObjectAndMap.objectToMap(registerFormVM);
            token =  jwtService.generateToken(claim, JwtService.REGISTER);
            cacheService.putotp(token, otp);
            Thread thread = new Thread(() ->
                emailService.sendActiveUrl(registerFormVM.getEmail(), token, otp.toString())
            );
            thread.start();


            return Map.of();
        } else {
            throw new MyError("Tài khoản đã tôn tại");
        }
    }

    public void validateRegister(Integer otp, String token) throws MyError{
        log.info("validateRegister otp {} token {}" ,otp, token);
        Integer otpServer =  cacheService.getOTP(token);
        if(otp.equals(otpServer) ){
            Account account = new Account();
            RegisterFormVM registerFormVM = jwtService.getRegisterForm(token);
            account.setEmail(registerFormVM.getEmail());
            account.setPassword(passwordEncoder.encode(registerFormVM.getPassword()));
            account.setIsAdmin(false);
            account.setIsActive(true);
            accountRepository.save(account);
            Salt salt = new Salt();
            salt.setSalt(registerFormVM.getSalt());
            salt.setSecretKey(twoFactorAuth.generateRandomSecret());
            salt.setAccId(account.getId());
            saltRepository.save(salt);
            cacheService.evictotp(token);
        } else {
            throw new MyError("Otp không chính xac");
        }

    }
    public Object login(LoginFormVM loginFormVM) {
        if(!cacheService.canLogin(loginFormVM.getEmail())){
            throw new MyError(" Tài khoản đang tạm bi khóa chờ chút ");
        }

        Account account = accountRepository.findOneByEmail(loginFormVM.getEmail());
        if(account == null){
            throw new MyError("Không thấy tài khoản");
        }

        if(!Boolean.TRUE.equals(account.getIsActive())){
            throw new MyError("Tài khoản của bạn đã bị khóa vui lòng liên hệ với admin ");

        }
        if(!passwordEncoder.matches(loginFormVM.getPassword(), account.getPassword())){
            cacheService.loginFailed(loginFormVM.getEmail());
            throw new  MyError("Mật khẩu không đúng");
        }
        cacheService.removeCountdown(loginFormVM.getEmail());

        Map<String,Object> claim = Map.of("email", loginFormVM.getEmail());
        if(Boolean.TRUE.equals(account.getEnableTowFactoryAuth())){
            String token = jwtService.generateToken(claim, JwtService.LOGIN);
            throw new LoginWithOutOtp(token);

        }
        String token = jwtService.generateToken(claim, JwtService.TOKEN);
        return Map.of("token", token);

    }

    public Object validateOtpLogin(String token, Integer otp)  throws AccessDeniedException {
        if(jwtService.validateToken(token, JwtService.LOGIN)){
            String email =  jwtService.extractEmail(token);
            Account account = accountRepository.findOneByEmail(email);
            Salt salt = saltRepository.findByAccId(account.getId());
            if(Boolean.FALSE.equals( twoFactorAuth.validateOTP(salt.getSecretKey(),otp.toString()))){
                throw new MyError("Email OTP không chính xác");
            }

            Map<String,Object> claim = Map.of("email",account.getEmail());
            return jwtService.generateToken(claim, JwtService.TOKEN);
        } else {
            throw new AccessDeniedException("");
        }
    }

    public Object getSalt(String token){
        Account account = accountRepository.findOneByEmail(jwtService.extractEmail(token));
        return saltRepository.findSaltByAccId(account.getId()) ;
    }

    public void setSalt(String token, String saltString){
        Account account = accountRepository.findOneByEmail(jwtService.extractEmail(token));
        Salt salt = saltRepository.findByAccId(account.getId());
        salt.setSalt(saltString);
        saltRepository.save(salt);
    }





    public Object changePassword(String currentPassword,String newPassword){
        if(passwordEncoder.matches(currentPassword,accountBean.getPassword())){
            Account account = new Account();
            BeanUtils.copyProperties(accountBean, account);
            account.setPassword(passwordEncoder.encode(newPassword));
            accountRepository.save(account);
            return true;

        }else {
            throw new MyError( "Mật khẩu cũ không chính xác ");
        }

    }
    public Object getAccountInfo(){
       Salt salt = saltRepository.findByAccId(accountBean.getId());
       log.info(accountBean.toString());
       if(salt == null){
           salt = new Salt();
           salt.setAccId(accountBean.getId());
           saltRepository.save(salt);
       }
       UserInfoModel userInfoModel = new UserInfoModel();
       userInfoModel.setSetupMasterKey(  salt.getMasterPasword() == null || salt.getMasterPasword().isEmpty());
       userInfoModel.setEmail(accountBean.getEmail());
       userInfoModel.setSalt(salt.getSalt());
       userInfoModel.setIsAdmin(accountBean.getIsAdmin());
        return userInfoModel;
    }

    public void saveMasterKey(String masterKey){
        if(accountBean == null){
            throw  new MyError("tài khoản null");
        }

        Salt salt= saltRepository.findByAccId(accountBean.getId());
        if(salt.getMasterPasword() == null || salt.getMasterPasword().isEmpty()){
            salt.setMasterPasword(passwordEncoder.encode(masterKey));
            saltRepository.save(salt);
        } else {
            throw  new MyError("Master key đã được lưu rồi");
        }
    }

    public boolean checkMasterKey(String masterKey){
        if(accountBean == null){
            throw  new MyError("tài khoản null");
        }

        Salt salt= saltRepository.findByAccId(accountBean.getId());
        if(  salt.getMasterPasword() != null && !salt.getMasterPasword().isEmpty()){
            if(passwordEncoder.matches(masterKey,salt.getMasterPasword())){
                return true;
            }else {
                throw new MyError("Master key chưa chính xác");
            }
        } else {
            throw  new MyError("Chưa đặt master key");
        }
    }

    public void editSetting(AccountSettingFormVM accountSettingFormVM){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean, account);
        account.setEnableTowFactoryAuth(accountSettingFormVM.getEnable2FA());
        account.setAllowRestoreMasterKey(accountSettingFormVM.getAllowRecoveryMasterKey());
        accountRepository.save(account);

    }

    public AccountSettingFormVM getAccountSetting(){
        AccountSettingFormVM accountSettingFormVM = new AccountSettingFormVM();
        accountSettingFormVM.setEnable2FA(accountBean.getEnableTowFactoryAuth());
        accountSettingFormVM.setAllowRecoveryMasterKey(accountBean.getAllowRestoreMasterKey());
        return  accountSettingFormVM;

    }


    public List<Account> getUserList(){
        return accountRepository.findAll();
    }


    public void editUser(User user){
        Account account =  accountRepository.findById(user.getId()).orElse(null);
        if(account == null){
            throw new MyError("Không tìm thấy tài khoản");
        }

        if(!Boolean.TRUE.equals(account.getIsAdmin())){
            throw new MyError("Không chỉnh sửa tài khoản admin ");

        }
        account.setIsActive(user.getIsActive());
        accountRepository.save(account);
    }

    public void removeCountdown(String email){
        cacheService.removeCountdown(email);
    }

    public void forgotPassword(ForgotPasswordVM forgotPasswordVM){
        Account account = accountRepository.findOneByEmail(forgotPasswordVM.getEmail());
        if(account == null){
            throw new MyError("Tài khoản không tồn tại ");
        }
        Map<String,Object> claim = Map.of("email",forgotPasswordVM.getEmail());

        String  token = jwtService.generateToken(claim,JwtService.FORGOT_PASSWORD);
        cacheService.put(forgotPasswordVM);
        emailService.sendValidateForgotPasswordUrl(forgotPasswordVM.getEmail(),token );


    }

    public void forgotPasswordValidate(String token){
        if(!jwtService.validateToken(token,JwtService.FORGOT_PASSWORD) ){
            throw new MyError("token Không chính xác");

        }
        String email =  jwtService.extractEmail(token);
        Account account = accountRepository.findOneByEmail(email);
        if(account == null){
            throw new MyError("Tài khoản không tồn tại ");
        }

        ForgotPasswordVM forgotPasswordVM =  cacheService.getForgotPasswordVM(email);
        account.setPassword(passwordEncoder.encode(forgotPasswordVM.getPassword()));
        accountRepository.save(account);
        cacheService.evictForgotPasswordVM(email);
    }


}
