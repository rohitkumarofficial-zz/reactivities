import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App () {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      console.log(response)
      setActivities(response.data);
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
    if (activity.id) {
      const index = activities.findIndex(activity => activity.id === activity.id);
      activities[index] = activity;
    } else {
      activity.id = uuid();
      activities.unshift(activity);
    }
    setActivities(activities);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(activity => activity.id !== id)]);
    setEditMode(false);
    handleCancelSelectedActivity();
  }

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
        />
      </Container>
    </>
  );
}

export default App;
