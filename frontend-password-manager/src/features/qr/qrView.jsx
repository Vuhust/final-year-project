import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import SweetAlert from "react-bootstrap-sweetalert";
import {useDispatch, useSelector} from "react-redux";

const qr = () => {
    const app = useSelector(state => state.app);
    const [show, setShow] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleConfirm = () => {
        // Handle the value when the user confirms
        console.log('Input value:', inputValue);
        setShow(false);
    };

    const openPopup = () => {
        setShow(true);
    };

    const closePopup = () => {
        setShow(false);
    };

    return (

        <div>
            <SweetAlert
                show={true}
                title="Input Popup"
                showCancel
                confirmBtnText="Submit"
                cancelBtnText="Cancel"
                onConfirm={handleConfirm}
                onCancel={closePopup}
            >
                {/*<QRCode value={`otpauth://totp/HELLO?secret=${app.secret}&issuer=HELLO`}/>*/}
                <QRCode value={`otpauth://totp/${app.email}?secret=${app.secret}&issuer=${app.appName}`}/>

            </SweetAlert>
        </div>

    );
};

export default qr;
