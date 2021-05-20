import React from 'react';
import { Form, Formik } from 'formik';
import { Button } from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';

export default function LoginForm () {
    return (
        <Formik initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}>
            {({handleSubmit}) => (
                <Form className='ui form' autoComplete='off' onSubmit={handleSubmit} >
                    <MyTextInput name='email' placeholder='Email Address' />
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <Button positive content='Login' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
}
