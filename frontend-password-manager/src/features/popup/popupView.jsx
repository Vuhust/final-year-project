// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SweetAlert from 'react-bootstrap-sweetalert';
// import {popUpType} from "../common/common";
// import QRCode from "react-qr-code";
// import {setShow} from "./popupSlice";
// // import { resetInputPopup } from './otpPopupSlice';
//
// const OtpPopUp = () => {
//   const app = useSelector(state => state.app)
//   const popup = useSelector(state => state.popup)
//
//     const [inputValue, setInputValue] = React.useState('');
//     const dispatch = useDispatch();
//
//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };
//
//     const handleConfirm = () => {
//
//         console.log(app.token);
//         // Handle the value when the user confirms
//         console.log('Input value:', inputValue);
//         dispatch(setShow(false));
//     };
//
//     const closePopup = () => {
//       dispatch(setShow(false));
//       dispatch(setIsSubmitting(false));
//     };
//
//     // console.log(otp.show , "popup show");
//
//
//   return (
//     <div className="popup">
//       <div className="popup-content">
//         <button className="close-btn" onClick={onClose}>
//           Close
//         </button>
//         <h2>Form Popup</h2>
//         <Formik
//           initialValues={{name: '', email: ''}}
//           validate={(values) => {
//             const errors = {};
//             if (!values.name) {
//               errors.name = 'Required';
//             }
//             if (!values.email) {
//               errors.email = 'Required';
//             } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//               errors.email = 'Invalid email address';
//             }
//             return errors;
//           }}
//           onSubmit={(values, {setSubmitting}) => {
//             // Handle form submission here
//             console.log(values);
//             setSubmitting(false);
//             onClose(); // Close the popup after form submission
//           }}
//         >
//           {({isSubmitting}) => (
//             <Form>
//               <div className="form-field">
//                 <label htmlFor="name">Name</label>
//                 <Field type="text" name="name"/>
//                 <ErrorMessage name="name" component="div" className="error"/>
//               </div>
//
//               <div className="form-field">
//                 <label htmlFor="email">Email</label>
//                 <Field type="email" name="email"/>
//                 <ErrorMessage name="email" component="div" className="error"/>
//               </div>
//
//               <button type="submit" disabled={isSubmitting}>
//                 Submit
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };
//
// export default OtpPopUp;
