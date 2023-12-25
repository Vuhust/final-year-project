import React, {useEffect, useState} from 'react';
import '@djthoms/pretty-checkbox';
import {Switch, useCheckboxState} from "pretty-checkbox-react";
import Input from "react-bootstrap-sweetalert/dist/components/Input";
import {Form, Formik} from "formik";
import {useSelector} from "react-redux";


const SettingFormView = () => {
    const [masterKey, setMasterKey] = useState('');
    const twoFAState = useCheckboxState();
    const receiveNotificationEmail  = useCheckboxState();
    const allowRecoveryMasterKey   = useCheckboxState();
    const app = useSelector(state => state.app)

    useEffect(()=>{
        allowRecoveryMasterKey.setState(app.allowRecoveryMasterKey);
        twoFAState.setState(app.twoFAState);
        receiveNotificationEmail.setState(app.receiveNotificationEmail);
    },[]);

    const handleSubmit = (vallue) => {
        console.log(allowRecoveryMasterKey.state)
        console.log(receiveNotificationEmail.state)
        console.log(allowRecoveryMasterKey.state)
    }
    const validate = (vallue) => {
        console.log("submit")
    }


    console.log(twoFAState.state)
    return (
        <div className="container mt-5  rounded border border-3  p-3 ">
            <Formik                 onSubmit={handleSubmit}
                                    initialValues={{}}
                                    validate={validate}
                                    className="row mb-3">
                <Form>

                    <div className="col-md-12">
                        <Switch {...twoFAState} shape="fill">
                            Bật 2 FA
                        </Switch>
                    </div>
                    <div className="col-md-12">
                        <Switch {...receiveNotificationEmail} shape="fill">
                            Nhận email thông báo .
                        </Switch>
                    </div>

                    <div className="col-md-12">
                        <Switch {...allowRecoveryMasterKey} shape="fill">
                            Cho phép khôi phục master key
                        </Switch>
                    </div>

                    <br/>

                    <button type="submit" className="btn btn-primary">
                        Lưu
                    </button>
                </Form>


            </Formik>

        </div>
    );
};

export default SettingFormView;
