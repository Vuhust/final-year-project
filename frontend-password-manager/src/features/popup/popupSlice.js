// store.js
import { createSlice } from '@reduxjs/toolkit';

const PopupSlice = createSlice({
    name: 'inputPopup',
    initialState: {
        show: false,
        inputValue: '',
        type : ""
    },
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload;
        },
        setPopUpType: (state, action) => {
            state.type = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        resetInputPopup: (state) => {
            state.show = false;
            state.inputValue = '';
        },

    },
});

export const { setPopUpType,setShow, setInputValue, resetInputPopup } = PopupSlice.actions;

export default PopupSlice.reducer;
