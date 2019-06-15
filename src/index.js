import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from "react-router";
import routes from './routes';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
try {
    injectTapEventPlugin();
} catch (e) {
    // do nothing
}

const app = document.getElementById('root');

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
app
);
