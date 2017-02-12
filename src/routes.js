import React from 'react';
import { Router, Route, IndexRoute } from "react-router";

//import App from './App';
import Layout from './pages/Layout';
import Settings from "./pages/Settings";
// import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Layout} />
     <IndexRoute component={Settings}></IndexRoute>
    {/* <Route path="/about" component={About} />
    <Route path="*" component={NotFound} /> */}
  </Router>
);

export default Routes;
