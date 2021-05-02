import { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../models/activity'

export interface Props {
    formClose: () => void;
    selectedActivity: Activity | undefined;
    createOrEdit: (activity:Activity) => void;
}

export default function ActivityForm ({ formClose, selectedActivity, createOrEdit }: Props) {
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState<Activity>(initialState);

    function handleSubmit () {
        createOrEdit(activity);
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} =event.target;
        setActivity({
            ...activity,
            [name] : value
        })
    }

    return (
        <Segment clearing>
            <Form autoComplete='off' onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={formClose} />
            </Form>
        </Segment>
    )
}
