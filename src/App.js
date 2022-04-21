import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthModal from './Shared/Components/Modal/AuthModal';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import AppSettings from './Pages/AppSettings/AppSettings';
import OrdersPage from './Pages/Orders/OrdersPage';
import StudentsPage from './Pages/Students/StudentsPage';
import GroupsPage from './Pages/Groups/GroupsPage';
import TeachersPage from './Pages/Teachers/TeachersPage';
import ClientPage from './Pages/Clients/ClientPage';
import TeacherEmployedPage from './Pages/TeacherEmployed/TeacherEmplyedPage';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import UpdatePassword from './Pages/PasswordReset/UpdatePassword';
import SingleGroupDetailsPage from './Pages/SingleGroupDetailsPage/SingleGroupDetailsPage';
import Statistics from './Pages/Statistics/Statistics';
import { AuthContext } from './Shared/Context/auth-context';
import { useAuth } from './Shared/Hooks/auth-hook';
import Backdrop from './Shared/Components/Backdrop/Backdrop';
import './App.css';

const App = () => {

  const backdrop = useSelector(state => state.modal.backdrop);
  const loading = useSelector(state => state.adminData.loading);


  const { token, login, logout, userId, userEmail, userStatus } = useAuth();


  let routes;
  if (token && userStatus === 'HeadTeacher') {
    routes = (
      <Switch>
        <Route path='/admin/settings' exact>
          <AppSettings />
        </Route>
        <Route path='/admin/orders' exact>
          <OrdersPage />
        </Route>
        <Route path='/admin/groups' exact>
          <GroupsPage />
        </Route>
        <Route path='/admin/students' exact>
          <StudentsPage />
        </Route>
        <Route path='/admin/teachers' exact>
          <TeachersPage />
        </Route>
        <Route path='/client/:userId' exact>
          <ClientPage />
        </Route>
        <Route path='/teacher/:userId' exact>
          <TeacherEmployedPage />
        </Route>
        <Route path='/teacher/:userId/:groupId' exact>
          <SingleGroupDetailsPage />
        </Route>
        <Route path='/statistics/:user/:id' exact>
          <Statistics />
        </Route>
        <Route path='/admin/archive/students' exact>
          <StudentsPage />
        </Route>
        <Route path='/admin/archive/groups' exact>
          <GroupsPage />
        </Route>
        <Route path='/admin/archive/teachers' exact>
          <TeachersPage />
        </Route>
        <Redirect to='/admin/students' exact />
      </Switch>
    )
  } else if (token && userStatus === 'Supervisor') {
    routes = (
      <Switch>
        <Route path='/client/:userId' exact>
          <ClientPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else if (token && userStatus === 'student') {
    routes = (
      <Switch>
        <Route path='/client/:userId' exact>
          <ClientPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else if (token && userStatus === 'teacher') {
    routes = (
      <Switch>
        <Route path='/teacher/:userId' exact>
          <TeacherEmployedPage />
        </Route>
        <Route path='/teacher/:userId/:groupId' exact>
          <SingleGroupDetailsPage />
        </Route>
        <Route path='/statistics/:user/:id' exact>
          <Statistics />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/password-reset' exact>
          <PasswordReset />
        </Route>
        <Route path='/password-reset/:userType/:token' exact>
          <UpdatePassword />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: !!token,
        token,
        userId,
        userEmail,
        userStatus,
        login,
        logout
      }
    }
    >
      <Router>
        <AuthModal />
        {(backdrop || loading) && <Backdrop />}
        <Route path='/' exact>
          <WelcomePage />
        </Route>
        {routes}
      </Router >
    </AuthContext.Provider>
  );
}

export default App;
