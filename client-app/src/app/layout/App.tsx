import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from './../api/agent';
import LoadingComponent from './LoadingComponent';

function App () {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities = response.map(activity => ({
        ...activity,
        date: activity.date.split('T')[0]
      }));
      setActivities(activities);
      setLoading(false);
    })
  }, []);

  function handleSelectActivity (id: string) {
    setSelectedActivity(activities.find(activity => activity.id === id));
    setEditMode(false);
  }

  function handleCancelSelectedActivity () {
    setSelectedActivity(undefined);
  }

  function handleFormOpen (id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose () {
    setEditMode(false);
  }

  function handleCreateOrEditActivity (activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        const index = activities.findIndex(act => act.id === activity.id);
        activities[index] = activity;
        setSubmitting(false);
        setEditMode(false);
        setActivities(activities);
        setSelectedActivity(activity);
      });
      
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setSubmitting(false);
        setEditMode(false);
        activities.push(activity);
        setActivities(activities);
        setSelectedActivity(activity);
      });
    }
  }

  function handleDeleteActivity (id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(activity => activity.id !== id)]);
      setSubmitting(false);
    });
  }

  if(loading) return <LoadingComponent content='Loading App'/>

  return (
    <>
      <NavBar formOpen={handleFormOpen} />
      <Container style={{ paddingTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
