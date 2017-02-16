import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from './pages/Layout';
import Settings from "./pages/Settings";
import PropertyList from "./pages/PropertyList";
import AddNewProperty from "./pages/AddNewProperty";

//import Routes from './routes';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
try {
    injectTapEventPlugin();
} catch (e) {
    // do nothing
}

const app = document.getElementById('root');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Settings}></IndexRoute>
      <Route path="/propertylist" component={PropertyList} />
      <Route path="/addnewproperty" component={AddNewProperty} />
    </Route>
  </Router>,
app
);
