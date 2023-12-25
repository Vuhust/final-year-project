import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {changeMasterKey} from "./changeMasterKey";

const ChangeMasterKeyVieW = () => {
    const dispatch = useDispatch();

    const handleSubmit=  (values) => {
        changeMasterKey(values);
    };


    const validate = (values) => {
        const errors = {};
        return errors;
    };



    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Đổi master Key </h1>

            <Formik
                initialValues={{currentMasterKey: 'a@gmail.com', newMasterKey: '1231AcasaA21'}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form >
                    <div className="row mb-3">
                        <label htmlFor="currentMasterKey" className="col-auto col-form-label">MasterKey</label>
                        <div className="col">
                            <Field type="text" name="currentMasterKey" placeholder="Nhập masterKey hiện tại" className="form-control"/>
                        </div>
                        <ErrorMessage name="currentMasterKey" component="div" className="text-danger"/>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="newMasterKey" className="col-auto col-form-label">MasterKey mới</label>
                        <div className="col">
                            <Field type="text" name="newMasterKey" placeholder="MasterKey moi"
                                   className="form-control"/>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger"/>
                    </div>
                    <button type="submit"  className="btn btn-primary">
                        Submit
                    </button>
                    <div/>
                </Form>

            </Formik>
        </div>
    );
};

export default ChangeMasterKeyVieW;
