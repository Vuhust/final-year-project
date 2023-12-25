import { createSlice } from '@reduxjs/toolkit'
import { ordered as cakeOrdered } from '../cake/cakeSlice'

const initialState = {
    numOfIcecreams: 10
}

const SettingFormSlice = createSlice({
    name: 'SettingForm',
    initialState,
    reducers: {
        ordered: state => {
            state.numOfIcecreams--
        },
        restocked: (state, action) => {
            state.numOfIcecreams += action.payload
        }
    },

})

export default SettingFormSlice.reducer
export const { ordered, restocked } = SettingFormSlice.actions
