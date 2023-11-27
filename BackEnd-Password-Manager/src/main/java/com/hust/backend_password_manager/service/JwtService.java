package com.hust.backend_password_manager.service;


import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.*;
import java.util.function.Function;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtService {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.expirationRegister}")
    private long jwtExpirationRegister;

    final private AccountRepository accountRepository;


    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public RegisterFormVM getRegisterForm(String token){
        Claims claims = extractAllClaims(token);
        return new RegisterFormVM( (String) claims.get("email") ,(String) claims.get("password"));

    }


    public Collection<? extends GrantedAuthority> getAuthorities(String token){
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        Account account = accountRepository.findByEmail(extractEmail(token));
        if(account == null) authorities.add(new SimpleGrantedAuthority("ROLE_GUEST"));
        if(account.getIsAdmin() && account.getIsActive()) authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(!account.getIsActive()) authorities.add(new SimpleGrantedAuthority("ROLE_GUEST"));
        return authorities;
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(Account account) {
        return generateToken(new HashMap<>(), account);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            Account account
    ) {
        return buildToken(extraClaims, account, jwtExpiration);
    }

    public String generateToken(
            Map<String, Object> extraClaims
    ) {
        return buildToken(extraClaims, new Account(), jwtExpirationRegister);
    }



    private String buildToken(
            Map<String, Object> extraClaims,
            Account account,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(account.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw new AccessDeniedException("Invalid JWT token");

        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw new AccessDeniedException("Expired JWT token");

        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw new AccessDeniedException("Unsupported JWT token");

        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw new AccessDeniedException("JWT claims string is empty.");
        }

    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}