import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../layout/LoadingComponent';
import { useStore } from '../../../stores/store';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailSideBar from './ActivityDetailSideBar';


export default observer(function ActivityDetails () {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])

    if (loadingInitial || !activity) { return <LoadingComponent content='Loading Details' />; }

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityDetailHeader />
                <ActivityDetailInfo />
                <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityDetailSideBar />
            </Grid.Column>
        </Grid>
    )
})