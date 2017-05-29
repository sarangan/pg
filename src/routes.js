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


export default (
  <Route>
    <Route path="/login" component={Login} />

    <Route path="/" component={Layout}>
      <IndexRoute component={Settings}></IndexRoute>
      <Route path="/propertylist" component={PropertyList} />
      <Route path="/addnewproperty" component={AddNewProperty} />
      <Route path="/addpropertytemplate" component={AddPropertyTemplate} />
      <Route path="/propertyroomlist" component={PropertyRoomList} />
      <Route path="/template" component={Template} />
      <Route path="/reportsettings" component={ReportSettings} />
    </Route>

  </Route>
);
