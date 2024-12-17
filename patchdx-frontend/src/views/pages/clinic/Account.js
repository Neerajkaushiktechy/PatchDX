import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { SpinnerButton, ToastMessage, Loader } from '../../../components';
import { getUserAccountDetails, updateUserDetails } from "../../../service/patient/Patient";

const accountSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter you email"),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  dateOfBirth: Yup.date().required("DOB is required"),
});

function Account() {
  const [loading, setLoading] = useState(false);
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: ""
  });

  let [userForm, setUserForm] = useState({
    name: 'asasas',
    email: '',
    phoneNumber: '',
    dateOfBirth: Date.now(),
  });

  useEffect(() => {
    setLoading(true)
    getUserAccountDetails().then((res) => {
      if (res.data.success) {
        const utcDate = new Date(res?.data?.userDetail?.date_of_birth);
        const year = utcDate.getFullYear();
        const month = String(utcDate.getMonth() + 1).padStart(2, '0');
        const day = String(utcDate.getDate()).padStart(2, '0');
        const formattedDateString = res?.data?.userDetail?.date_of_birth === null ? res?.data?.userDetail?.date_of_birth : `${year}-${month}-${day}`;
        setUserForm({
          name: res?.data?.userDetail?.name,
          email: res?.data?.userDetail?.email,
          phoneNumber: res?.data?.userDetail?.phone_number,
          dateOfBirth: formattedDateString,
        })
        setLoading(false)
      }
    });
  }, []);

  const onSubmit = async (values) => {
    // setShowAlert({ show: true, title: 'Patch order submitted successfully' });
    updateUserDetails(values).then((res) => {
      if (res.data.success) {
        setShowAlert({ show: true, title: 'User data updated successfully' });
      }
      setTimeout(() => {
        setShowAlert({ show: false, title: '' });
      }, 3000);
    })
    // navigate('/clinic/patient');
  };

  return (
    <div className="flex">
      <div className="w-full">
        <div className="px-[30px]">
          <div className="mb-[30px]">
            <h1 className="main-title">Register New Patient</h1>
          </div>
          <div className="card">
            {loading && <Loader />}
            <ToastMessage showAlert={showAlert} />
            <Formik
              enableReinitialize={true}
              initialValues={userForm}
              onSubmit={(values) => {
                onSubmit(values);
              }}
              validationSchema={accountSchema}>
              {({ errors, values }) => (
                <Form>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="mb-5">
                      <label className="form-label mb-3">Name</label>
                      <Field className='form-control w-full' type='text' name='name' isLogin={false} placeholder='Enter first name' />
                    </div>
                    <div className="mb-5">
                      <label className="form-label mb-3">Email Address</label>
                      <Field className='form-control w-full' type='text' name='email' isLogin={false} placeholder='Enter email address' />
                    </div>
                    <div className="mb-5">
                      <label className="form-label mb-3">Phone Number</label>
                      <Field className='form-control w-full' type='text' name='phoneNumber' isLogin={false} placeholder='Enter phone Number' />
                    </div>
                    <div className="mb-5">
                      <label className="form-label mb-3">Date of Birth</label>
                      <Field className='form-control w-full' type='date' name='dateOfBirth' isLogin={false} placeholder='Enter D.O.B' />
                    </div>
                  </div>
                  <div className="mt-[60px]">
                    <button className="btn-theme btn-border mr-[30px]">Close</button>
                    <SpinnerButton label="Submit" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account