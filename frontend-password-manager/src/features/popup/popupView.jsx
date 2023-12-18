import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import {popUpType} from "../common/common";
import QRCode from "react-qr-code";
import {setShow} from "./popupSlice";
// import { resetInputPopup } from './otpPopupSlice';

const OtpPopUp = () => {
  const app = useSelector(state => state.app)
  const popup = useSelector(state => state.popup)

    const [inputValue, setInputValue] = React.useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleConfirm = () => {

        console.log(app.token);
        // Handle the value when the user confirms
        console.log('Input value:', inputValue);
        dispatch(setShow(false));
    };

    const closePopup = () => {
      dispatch(setShow(false));
      dispatch(setIsSubmitting(false));
    };

    // console.log(otp.show , "popup show");


  return (
        <div>
          { popup.type === popUpType.otp &&
            <SweetAlert
              show={popup.show}
              title="Nhập mã otp được gửi qua email của bạn"
              showCancel
              confirmBtnText="Submit"
              cancelBtnText="Cancel"
              onConfirm={handleConfirm}
              onCancel={closePopup}
            >
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Nhập mã otp ..."
              />
            </SweetAlert>
          }

          {popup.type === popUpType.qr &&

            <SweetAlert
              show={popup.show}
              title="Scan bằng google authenticator"
              showCancel={false}
              confirmBtnText="Đã rõ"
              onConfirm={handleConfirm}
              onCancel={closePopup}
            >
              <QRCode value={`otpauth://totp/${app.email}?secret=${app.secret}&issuer=${app.appName}`}/>

            </SweetAlert>
          }


        </div>
    );
};

export default OtpPopUp;
