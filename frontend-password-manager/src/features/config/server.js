const  baseUrl = 'http://127.0.0.1:8080';


const config = {
  apiUrl: 'https://jsonplaceholder.typicode.com/users', // Example API endpoint
  loginUrl : baseUrl + '/account/login',
  loginValidateUrl : baseUrl + '/account/login/validate',
  registerUrl : baseUrl + '/account/register',
  registerValidateUrl : baseUrl + '/account/register/validate',
  getQr : baseUrl + '/user/secretKey',
  userInfoUrl : baseUrl + '/user/getUserInfo',
  masterKeyUrl : baseUrl + '/user/masterKey',
  checkMasterKeyUrl : baseUrl + '/user/checkMasterKey',
  subAccountUrl : baseUrl + '/user/subAccount',
  subAccountListUrl : baseUrl + '/user/subAccountList',
  page : "PAGE"
  // Other configurations...
};

export default config;
