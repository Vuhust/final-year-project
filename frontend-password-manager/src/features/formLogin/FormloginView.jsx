import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import  {doLogin} from "./formLoginSlice";
import {setPage} from "../../appSlice";
import {comopentShow} from "../common/common";
import {toast} from "react-toastify";

const MyForm = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.formRegister.status)
    const message = useSelector(state => state.formRegister.message)
    // const [isSubmitting, setIsSubmitting] = React.useState(false)
    const isSubmitting = useSelector(state => state.formLogin.isSubmitting);
    const handleSubmit= async (values) => {
        try {
            // Perform login action
            const response = await dispatch(doLogin(values));
            dispatch()
            // Handle success (if needed)
            console.log('Login successful:', response);
        } catch (error) {
            // Handle login failure
            console.error('Login error:', error);
            // Dispatch any other actions or handle errors
        }
    };


    console.log(isSubmitting)
    // toast.error(" Login error ")

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if( !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)  ){
            errors.password = 'Mật khẩu không hợp lệ, yêu cầu ít nhấ 8 ký tự trong đó có 1 ký tư hoa 1 số ';
        }

        return errors;
    };



    // const handleSubmit = (values) => {
    //
    //     dispatch(doLogin(values));
    // };

    return (
        <div className="container mt-5 rounded border border-3  p-3 ">
            <h1> Đăng nhập </h1>
            <h2> {message} </h2>

            <Formik
                initialValues={{email: 'a@gmail.com', password: '1231AcasaA21'}}
                validate={validate}
                onSubmit={handleSubmit}
            >
                    <Form >
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-auto col-form-label">Tài Khoản</label>
                            <div className="col">
                                <Field type="email" name="email" placeholder="Nhập email" className="form-control"/>
                            </div>
                            <ErrorMessage name="email" component="div" className="text-danger"/>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-auto col-form-label">Mật khẩu</label>
                            <div className="col">
                                <Field type="password" name="password" placeholder="Nhập mật khẩu"
                                       className="form-control"/>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger"/>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            Submit
                        </button>
                        <div/>
                        <a className="nav-link text-decoration-underline text-primary " onClick={() => {
                            window.alert(1)
                            dispatch(setPage(comopentShow.REGISTER))
                        }}>Bạn chưa có tài khoản , đăng ký ngay ? </a>
                    </Form>

            </Formik>
        </div>
    );
};

export default MyForm;
