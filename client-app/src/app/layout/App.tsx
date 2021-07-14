import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from './../features/home/HomePage';
import ActivityForm from '../features/activities/form/ActivityForm';
import ActivityDetails from '../features/activities/details/ActivityDetails';
import TestErrors from './../features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from './../features/errors/NotFound';
import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import ServerError from '../features/errors/ServerError';
import LoginForm from '../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modal/ModalContainer';
import ProfilePage from '../features/profiles/ProfilePage';

function App () {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoad());
    } else {
      commonStore.setAppLoad();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading application' />;

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <ModalContainer/>
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={(() => (
          <>
            <NavBar />
            <Container style={{ paddingTop: '7em' }}>
              <Switch>
              <Route path='/activities' component={ActivityDashboard} exact />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/create-activity', '/manage/:id']} component={ActivityForm} />
              <Route path='/profiles/:username' component={ProfilePage} exact />
              <Route path='/errors' component={TestErrors} exact />
              <Route path='/server-error' component={ServerError} exact />
              <Route path='/login' component={LoginForm} exact />
              <Route component={NotFound}/>
              </Switch>
            </Container>
          </>
        ))}
      />
    </>
  );
}

export default observer(App);
