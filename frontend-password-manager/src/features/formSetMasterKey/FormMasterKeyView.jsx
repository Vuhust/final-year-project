import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import  {doSetupMasterKey , doCheckMasterKey} from "./formMasterKey";
import {setPage} from "../../appSlice";
import {comopentShow} from "../common/common"
import SweetAlert from "react-bootstrap-sweetalert";

const FormMasterKey = () => {
    const app = useSelector(state => state.app)

  const validate = (values) => {
        const errors = {};
        return errors;
    };
    const handleSubmit = (values) => {
      console.log("masterkey", values);
        if(app.setupMasterKey){
          doSetupMasterKey(values.masterkey);

        } else  {
          doCheckMasterKey(values.masterkey);
        }
    };
    return (
        <SweetAlert showConfirm={false}>
            <div className="container mt-5 rounded border border-3  p-3 ">
                <h1> Nhập master key </h1>

                <Formik
                    initialValues={{masterkey: 'aaaa'}}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="row mb-3">
                            <label htmlFor="masterkey" className="col-auto col-form-label">Master key</label>
                            <div className="col">
                                <Field type="text" name="masterkey" placeholder="Nhập MasterKey"
                                       className="form-control"/>
                            </div>
                            <ErrorMessage name="masterkey" component="div" className="text-danger"/>
                        </div>
                        <button type="Xác " className="btn btn-primary">
                            Submit
                        </button>
                        <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                            window.alert(1);
                            localStorage.clear();
                            dispatch(setPage(comopentShow.LOGIN))
                        }}> Thoát</a>
                        <div/>
                    </Form>
                </Formik>
            </div>


        </SweetAlert>


    );
};

export default FormMasterKey;
