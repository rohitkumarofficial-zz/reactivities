import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';


export default observer(function ActivityList () {
    const {activityStore} = useStore();
    const {activitiesByDate, selectActivity, loading, deleteActivity} = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {
                    activitiesByDate.map(activity =>
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} />
                                    <Button
                                        name={activity.id}
                                        floated='right'
                                        content='Delete'
                                        loading={loading && target === activity.id}
                                        color='red' onClick={(event) => handleActivityDelete(event, activity.id)} />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                }
            </Item.Group>
        </Segment>
    )
})