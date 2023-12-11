import {useDispatch, useSelector} from "react-redux";

import React, {useState} from 'react';
import {setMasterKey} from   '../../appSlice';
const MasterKey = () => {
    const dispatch = useDispatch()


    // const { isSuccess } = useSelector( (state)=> state.user);
    const[inputValue, setInputValue]= useState({masterKey: ''});

    const handleInput= (e)=>{
        setInputValue({ masterKey: e.target.value});
        console.log(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setInputValue({ masterKey: ''});

        console.log(e.target.value);
        dispatch( setMasterKey(inputValue));
        //console.log(inputValue);
    }

    const app = useSelector(state => state.app)
    const placeholderText = app.masterKey ? 'Welcome, User!' : 'Please log in to continue';
    return (
        <form className="input-wrapper">
            {/*<lable*/}
            {/*     className="col-sm-3 col-form-lable">{app.masterKey ? "bạn đã nhập masterkey rồi, nhập lại để thay đổi " : " Mời bạn nhập masterkey"}</lable>*/}
            <input type="text" className="beautiful-input"
                   placeholder={app.masterKey ? "bạn đã nhập masterkey rồi, nhập lại để thay đổi " : " Mời bạn nhập masterkey"} value={inputValue.masterKey} onChange={handleInput}/>

            <button type="submit" onClick={handleSubmit}
                    className="btn btn-info bnt-lg">Nhập
            </button>
        </form>
    );
};

export default MasterKey;