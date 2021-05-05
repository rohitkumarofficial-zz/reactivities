import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../layout/LoadingComponent';
import { useStore } from '../../../stores/store';


export default observer(function ActivityDetails () {
    const { activityStore } = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])

    if (loadingInitial || !activity) { return<LoadingComponent content='Loading Details'/>; }

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' as={Link} to={`/manage/${activity.id}`}/>
                    <Button basic color='grey' content='Cancel' as={Link} to='/activities'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})