import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from "react-router";
import routes from './routes';
import './index.css';
import loginauth from './auth/loginauth';
import Login from "./pages/auth/LoginForm";

import injectTapEventPlugin from 'react-tap-event-plugin';
try {
    injectTapEventPlugin();
} catch (e) {
    // do nothing
}

const app = document.getElementById('root');
const login = loginauth.ISLOGIN;

let content = null;
if(login == false){
  let myrouter = <Router routes={routes} history={hashHistory} />;
  content = <Login temprouter={myrouter}/>
}
else{
  content = <Router routes={routes} history={hashHistory} />;
}

ReactDOM.render(
  content,
app
);
