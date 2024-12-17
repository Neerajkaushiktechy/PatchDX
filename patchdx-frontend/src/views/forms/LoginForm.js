import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { Button, InputField } from '../../components'
import mail from '../../assets/images/mail-icon.png';
import key from '../../assets/images/key.png';
import { UserLogin } from '../../service/account/LoginService';
import AuthService from '../../service/authService/AuthService';
import { getQuestionnaireRequest } from "../../redux/module/questionnaire/action";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter valid email")
        .required("Please enter you email"),
    password: Yup.string().required("Please enter your password"),
});

export default function LoginForm() {
    let dispatch = useDispatch();
    const onSubmit = async (values) => {
        await UserLogin(values).then((res) => {
            if (res.status === 200) {
                AuthService.LoggedInUserSession(res.data.token);
                dispatch(getQuestionnaireRequest())
                window.location.href = '/clinic/register-new-patient'
            }
            if (res.status === 400) {

            }
        });
    };
    return (
        <React.Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
                validationSchema={LoginSchema}>
                {({ errors, values }) => (
                    <Form>
                        <Field type='text' name='email' className='relative mb-5' icon={mail} isLogin={true} placeholder='Enter your email' component={InputField} />
                        <Field type='password' name='password' className='relative mb-3' icon={key} isLogin={true} placeholder='Enter your password' component={InputField} />
                        <p className="text-end mb-[42px]"><a className="text-sm md:text-base font-semibold text-white">Forgot Password?</a></p>
                        <Button className='bg-white text-base md:text-xl text-primary font-semibold p-3 md:p-4 rounded-md md:rounded-[10px] w-full'
                            text='Login' isForm={true} />
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}
