import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './../details/ActivityDetails';
import ActivityForm from './../form/ActivityForm';
import { useStore } from './../../../stores/store';
import { observer } from 'mobx-react-lite';



export default observer(function ActivityDashboard () {
    const { activityStore } = useStore();
    const { editMode, selectedActivity } = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {!editMode && selectedActivity && <ActivityDetails />}
                {editMode && <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})