import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../layout/LoadingComponent';
import { Activity } from '../../../models/activity';
import { useStore } from '../../../stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from './../../../common/form/MyTextInput';
import MyTextArea from './../../../common/form/MyTextArea';
import MySelectInput from './../../../common/form/MySelect';
import { CategoryOptions } from './../../../common/options/categoryOptions';
import MyDateInput from './../../../common/form/MyDateInput';

export default observer(function ActivityForm () {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial, setLoadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        } else {
            setLoadingInitial(false);
        }
    }, [id, loadActivity, setLoadingInitial]);

    function handleFormSubmit (activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' autoComplete='off' onSubmit={handleSubmit}>
                        <MyTextInput name='title' placeholder='Title'/>
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={CategoryOptions} placeholder='Category' name='category' />
                        <MyDateInput placeholderText='Date'  name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa'/>
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button floated='right' positive type='submit' content='Submit' loading={loading} disabled={isSubmitting || !dirty || !isValid}/>
                        <Button floated='right' type='button' content='Cancel' as={Link} to={activity.id ? `/activities/${activity.id}` : '/activities'} />
                    </Form>

                )}
            </Formik>
        </Segment>
    )
})