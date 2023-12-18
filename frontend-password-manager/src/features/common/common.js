import data from "bootstrap/js/src/dom/data";

export const status = {
    SHOW : 'SHOW',
    HIDE : 'HIDE',
    SUCCESS : 'SUCCESS',
    ERROR : 'ERROR'

}

export const popUpType = {
  qr : 'QR',
  otp : 'OTP',
}

export const comopentShow = {
    LOGIN : 'LOGIN',
    REGISTER: 'REGISTER',
    ALL_SUB_ACCOUNT : 'ALL_SUB_ACCOUNT',
    SUB_ACCOUNT : 'SUB_ACCOUNT',
    HOME : "HOME",
    OTP_FORM : "OTP_FORM",
    EDIT_ACCOUNT : "EDIT_ACCOUNT"
}


export function getSalt(length){
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


