import React, { useState } from "react";
import { saveForm  , } from "./formSlice";
import {useDispatch, useSelector} from "react-redux";


function Form()
{
    // const dispatch= useDispatch();
    const dispatch = useDispatch()
    const app = useSelector(state => state.app)

    // const { isSuccess } = useSelector( (state)=> state.user);
    const[inputValue, setInputValue]= useState({url : app.currentUrl, username:'', password:''});

    const handleInput= (e)=>{
        setInputValue({...inputValue, [e.target.name]: e.target.value});
        console.log(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target.value);
        dispatch(saveForm(inputValue));
        //console.log(inputValue);
    }

    const handleCancel=(e)=>{
        setInputValue({ username: '', password: ''});

        console.log(1);
        //console.log(inputValue);
    }

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h3 className="mt-3">Add New Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                    <input type="hidden" className="form-control" name="username"
                                           placeholder="Enter Username" value={inputValue.url}/>
                            </div>

                            <div className="row mb-3">
                                <lable className="col-sm-3 col-form-lable">Username</lable>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" name="username"
                                           placeholder="Enter Username" value={inputValue.username}
                                           onChange={handleInput}/>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <lable className="col-sm-3 col-form-lable">Password</lable>
                                <div className="col-md-8">
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Enter password" value={inputValue.password}
                                           onChange={handleInput}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <lable className="col-sm-3 col-form-lable"></lable>
                                <div className="col-md-1">
                                    <button type="submit" onClick={handleCancel}
                                            className="btn btn-info bnt-lg">Cancel
                                    </button>
                                </div>

                                <div className="col-md-1">
                                    <button type="submit" className="btn btn-info bnt-lg">Submit</button>
                                </div>


                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Form;