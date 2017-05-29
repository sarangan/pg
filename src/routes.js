import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './pages/Layout';
import Settings from "./pages/Settings";
import PropertyList from "./pages/PropertyList";
import AddNewProperty from "./pages/AddNewProperty";
import AddPropertyTemplate from "./pages/AddPropertyTemplate";
import PropertyRoomList from "./pages/PropertyRoomList";
import Template from "./pages/template/Template";
import ReportSettings from "./pages/report/ReportSettings";
import Login from "./pages/auth/LoginForm";
import loginauth from './auth/loginauth';


const authenticate = (nextState, replace) => {
  const login = loginauth.ISLOGIN;
  console.log('is login');
  console.log(login);
  if (!login ) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute component={Settings} onEnter={ authenticate }></IndexRoute>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Settings} onEnter={ authenticate }/>
      <Route path="/propertylist" component={PropertyList} onEnter={ authenticate }/>
      <Route path="/addnewproperty" component={AddNewProperty} onEnter={ authenticate }/>
      <Route path="/addpropertytemplate" component={AddPropertyTemplate} onEnter={ authenticate }/>
      <Route path="/propertyroomlist" component={PropertyRoomList} onEnter={ authenticate }/>
      <Route path="/template" component={Template} onEnter={ authenticate }/>
      <Route path="/reportsettings" component={ReportSettings} onEnter={ authenticate }/>
    </Route>

  </Route>
);
