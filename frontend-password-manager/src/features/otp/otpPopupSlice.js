// // store.js
// import { createSlice } from '@reduxjs/toolkit';
//
// const OtpPopupSlice = createSlice({
//     name: 'inputPopup',
//     initialState: {
//         show: false,
//         inputValue: '',
//     },
//     reducers: {
//         setShow: (state, action) => {
//             state.show = action.payload;
//         },
//         setInputValue: (state, action) => {
//             state.inputValue = action.payload;
//         },
//         resetInputPopup: (state) => {
//             state.show = false;
//             state.inputValue = '';
//         },
//     },
// });
//
// export const { setShow, setInputValue, resetInputPopup } = OtpPopupSlice.actions;
//
// export default OtpPopupSlice.reducer;