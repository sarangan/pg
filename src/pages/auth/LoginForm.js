import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ExtIcon from 'material-ui/svg-icons/action/extension';
import {teal200} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';

import * as LoginAuthActions from "../../actions/auth/LoginAuthActions";
import LoginStore from "../../stores/auth/LoginStore";

export default class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showSuccessSnack: false,
      startSending: false,
      showErrorSnack: false,
      username: '',
      password:'',
      errMessage: ''
    };

    this.getLoginStatus = this.getLoginStatus.bind(this);
  }

  componentWillMount(){
    LoginStore.on("change", this.getLoginStatus);
  }

  componentWillUnmount(){
    LoginStore.removeListener("change", this.getLoginStatus);
  }

  //error snack close
  errhandleRequestClose = () => {
    this.setState({
      showErrorSnack: false,
    });
  };

  //error snack success
  successhandleRequestClose = () => {
    this.setState({
      showSuccessSnack: false,
      startSending: false
    });
  };

  hanldeUserTxtChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        username: value
    });
  }

  hanldePassTxtChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        password: value
    });
  }


  getLoginStatus(){
    let status = LoginStore.getLoginStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        showErrorSnack: false,
        startSending: false,
        isLogin: true
      });
      console.log('login success');
      browserHistory.push('/dashboard')
    }
    else{
      let lgerr = LoginStore.getLoginError();
      if(lgerr){
        this.setState({
          startSending: false,
          isLogin: false,
          showSuccessSnack: false,
          showErrorSnack: true,
          errMessage: lgerr
        })
      }
    }
  }

  handleLogin(event){
    event.preventDefault();
    event.stopPropagation();

    if(this.state.username && this.state.password){

      this.setState({
        startSending: true,
      });

      LoginAuthActions.authenticate(this.state.username, this.state.password);

    }
    else{
      this.setState({
        showErrorSnack: true,
        showSuccessSnack: false,
        startSending: false,
        errMessage: 'Please fill fields...'
      });
    }


  }


  render(){

    const styles = {
      wrapper: {
        width: '100%',
        backgroundColor: '#eff5f8',
      },
      topbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 80,
        backgroundColor: '#ffffff',
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20
      },
      toplogo: {
        width: 111,
        height: 'auto'
      },
      menulink: {
        fontSize: 14,
        marginLeft: 15,
        marginRight: 15,
        color: '#A7A9AC',
        textTransform: 'uppercase',
        textDecoration: 'none'
      },
      secondWrapper: {
        margin: '0 auto',
        maxWidth: 1080
      },
      content: {
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        flexWrap: 'wrap'
      },
      leftContent: {
        backgroundColor: '#ffffff',
        flexBasis: '50%',
        marginRight: 60,
        minWidth: 300
      },
      loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingBottom: 70,
        paddingLeft: 60,
        paddingRight: 60,
      },
      loginlogo: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 40
      },
      title:{
        fontSize: 48,
        color: '#0088CC',
        marginBottom: 10
      },
      rightContent: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 300
      },
      login_des_img:{
        marginTop: 50,
        maxWidth: 400,
        height: 'auto',
        width: '100%'
      },
      logo: {
        width: 111,
        height: 'auto'
      },
      subtitle:{
        fontSize: 18,
        color: '#0088CC',
        MarginBottom: 20,
        marginTop: 20,
      },
      items: {
        marginTop: 20
      },
      ListItem:{
        marginBottom: 3,
        cursor: 'pointer'
      },
      ListItemTxt: {
        marginLeft: 12,
        color: '#6f6f6f',
        fontSize: 12,
        verticalAlign: 'super'
      },
      topHeader:{
        backgroundImage: 'url(images/pg_background_login.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0,0,0,0)',
        backgroundSize: 'cover',
        width: '100%',
        minHeight: 300,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      topheadercontents: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      toptinytxt: {
        color: '#b9b7b7',
        fontSize: 16,
        textTransform: 'uppercase',
      },
      loginsubtxt: {
        color: '#6f6f6f',
        fontSize: 12,
        cursor: 'pointer',
        marginBottom: 10
      },
      topheadertxt: {
        fontSize: 48,
        color: '#ffffff',
        fontWeight: 700
      },
      singuptxt: {
        color: '#ffffff',
        fontSize: 14,
        textTransform: 'uppercase',
      },
      registertxt: {
        paddingLeft: 10,
        color: '#0a65b9',
        cursor: 'pointer'
      },
      loginerrtxt: {
        color: '#FF5722',
        fontSize: 12,
        fontWeight: 700,
        marginTop: 5,
        marginBottom: 5
      },
      progressWrapper: {
        width: '100%'
      },
      tblProgress: {
        margin: '20px auto',
        textAlign: 'center'
      }


    };

    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }

    return(

      <MuiThemeProvider>

        <div style={styles.wrapper}>

          <div style={styles.topbar}>
            <a href="http://propertyground.com" target="_blank">
              <img src="images/property-ground-logo.png" style={styles.toplogo} />
            </a>
            <div>
              <a href="http://propertyground.com/" target="_blank" style={styles.menulink}>HOME</a>
              <a href="http://www.propertyground.com/services/" target="_blank" style={styles.menulink}>PRICING</a>
              <a href="http://www.propertyground.com/member/" target="_blank" style={styles.menulink}>MEMBER</a>
            </div>
          </div>

          <div style={styles.topHeader}>
            <div style={styles.secondWrapper}>

              <div style={styles.topheadercontents}>
                <div style={styles.toptinytxt}>
                  sign in
                </div>
                <div style={styles.topheadertxt}>
                  Login to your account
                </div>
                <div style={styles.singuptxt}>
                  DON'T HAVE AN ACCOUNT YET? <Link to="signup"><span style={styles.registertxt}>SIGN UP HERE</span></Link>
                </div>

              </div>

              </div>
          </div>


          <div style={styles.secondWrapper}>

              <div style={styles.content}>

                <Paper zDepth={1} style={styles.leftContent}>

                    <div style={styles.loginForm}>

                      <div  style={styles.loginlogo}>
                        <img src="images/property-ground-logo.png" style={styles.logo} />
                      </div>

                      <div style={styles.progressWrapper}>
                          {isShowSaving}
                      </div>

                          <form name="loginForm" onSubmit={this.handleLogin.bind(this)}>
                            <div style={styles.title}>
                              Sign in
                            </div>

                            <TextField
                                hintText="Enter your Username or Email"
                                floatingLabelText="Username / Email"
                                name="username"
                                value={this.state.username}
                                onChange={this.hanldeUserTxtChange.bind(this)}
                              />
                              <TextField
                                hintText="Enter your password"
                                floatingLabelText="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.hanldePassTxtChange.bind(this)}
                              />
                              <br/><br/>
                              <div style={styles.loginerrtxt}>{this.state.errMessage}</div>
                              <br/>
                              <RaisedButton type="submit" label="Login" primary={true}/>
                              <br/><br/>
                              <div style={styles.loginsubtxt}>Forgot password?</div>
                              <div><Link to="signup" style={styles.loginsubtxt}>Don't have an account yet?</Link></div>

                          </form>

                    </div>

                </Paper>

                <div style={styles.rightContent}>
                  <div className="app-img-wrapper">
                    <img src="images/login_img.png" style={styles.login_des_img}/>
                      <div className="ovrly"></div>
                      <div className="buttons">
                          <a href="#" className="fa link-android"><img src="images/android_icon.png" className="fa-icon"/></a>
                          <a href="#" className="fa link-apple"><img src="images/apple_icon.png"  className="fa-icon"/></a>
                      </div>
                  </div>
                  <div style={styles.subtitle}>
                    Property marketing made simple by PropertyGround
                  </div>
                  <div style={styles.items}>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>Property Photography</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>Floorplans</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>360° Virtual Tours</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>EPC</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>Elevated Photography</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>Inventory</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>Property Videos</span></div>
                    <div style={styles.ListItem}><ExtIcon color={teal200} className="icon-animate"/> <span style={styles.ListItemTxt}>Property Brochures</span></div>
                  </div>

                </div>
              </div>

          </div>

          <Snackbar
            open={this.state.showErrorSnack}
            message= {this.state.errMessage}
            autoHideDuration={3000}
            onRequestClose={this.errhandleRequestClose.bind(this)} />

          <Snackbar
            open={this.state.showSuccessSnack}
            message="Welcome to PropertyGround!"
            autoHideDuration={3000}
            onRequestClose={this.successhandleRequestClose.bind(this)} />


        </div>
      </MuiThemeProvider>

    );

  }

}
