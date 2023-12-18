// import React, { useState } from 'react';
// import QRCode from 'react-qr-code';
// import SweetAlert from "react-bootstrap-sweetalert";
// import {useDispatch, useSelector} from "react-redux";
// import {setShow} from './qrSlice'
//
// const qr = () => {
//     const qr = useSelector(state => state.qr);
//     const app = useSelector(state => state.app);
//
//   const dispatch = useDispatch();
//
//     const handleConfirm = () => {
//         dispatch(setShow(false));
//     };
//
//     const closePopup = () => {
//         dispatch(setShow(false));
//     };
//     console.log(qr.show , "qr show");
//     return (
//
//         <div>
//             <SweetAlert
//                 show={qr.show}
//                 title="Scan bằng google authenticator"
//                 showCancel={false}
//                 confirmBtnText="Đã rõ"
//                 onConfirm={handleConfirm}
//                 onCancel={closePopup}
//             >
//                 <QRCode value={`otpauth://totp/${app.email}?secret=${app.secret}&issuer=${app.appName}`}/>
//
//             </SweetAlert>
//         </div>
//
//     );
// };
//
// export default qr;
