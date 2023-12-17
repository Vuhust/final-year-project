import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
// import { resetInputPopup } from './otpPopupSlice';

const OtpPopUp = () => {
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
            <button onClick={openPopup}>Open Input Popup</button>
            <SweetAlert
                show={show}
                title="Input Popup"
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
                    placeholder="Enter something..."
                />
            </SweetAlert>
        </div>
    );
};

export default OtpPopUp;