import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './pages/Layout';
import Settings from "./pages/Settings";
import PropertyList from "./pages/PropertyList";
import AddNewProperty from "./pages/AddNewProperty";

export default (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute component={Settings}></IndexRoute>
      <Route path="/propertylist" component={PropertyList} />
      <Route path="/addnewproperty" component={AddNewProperty} />
    </Route>
  </Route>
);
