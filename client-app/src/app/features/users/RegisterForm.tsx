import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import * as Yup from 'yup';

export default observer(function RegisterForm () {
    const { userStore } = useStore();
    return (
        <Formik initialValues={
            {
                displayName: '',
                username: '',
                email: '',
                password: '',
                error: null
            }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(err => setErrors({ error: 'Invalid Email or Password' }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' autoComplete='off' onSubmit={handleSubmit} >
                    <Header as='h2' content='Register to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='User Name' />
                    <MyTextInput name='email' placeholder='Email Address' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error}></Label>} />
                    <Button positive content='Register' type='submit' fluid loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting}/>
                </Form>
            )}
        </Formik>
    )
})