import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../common/form/MyTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';

export default observer(function LoginForm () {
    const {userStore} = useStore();
    return (
        <Formik initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(err => setErrors({error: 'Invalid Email or Password'}))}>
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' autoComplete='off' onSubmit={handleSubmit} >
                    <MyTextInput name='email' placeholder='Email Address' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}></Label>}/>
                    <Button positive content='Login' type='submit' fluid loading={isSubmitting}/>
                </Form>
            )}
        </Formik>
    )
})