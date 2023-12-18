// // store.js
// import { createSlice } from '@reduxjs/toolkit';
//
// const qrSlice = createSlice({
//     name: 'inputPopup',
//     initialState: {
//         show: false,
//         url: '',
//     },
//     reducers: {
//         setShow: (state, action) => {
//             console.log("set show");
//             state.show = action.payload;
//         },
//         setUrl: (state, action) => {
//             state.show = true;
//             state.inputValue = action.payload;
//             state.url =  action.payload.url;
//         },
//
//
//     },
// });
//
// export const { setShow, setUrl } = qrSlice.actions;
//
// export default qrSlice.reducer;
