import React, { Component, PropTypes } from "react";
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import StarIcon from 'material-ui/svg-icons/action/grade';
import {pinkA200} from 'material-ui/styles/colors';
import { Link } from "react-router";
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
      isLogin: false
    };

    //property info
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
        startSending: false,
        isLogin: true
      });

      console.log('fucking login success');


    }
  }

  handleLogin(){
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
      });
    }
  }


  render(){

    const styles = {
      wrapper: {
        width: '100%',
        backgroundColor: '#eff5f8',
      },
      secondWrapper: {
        margin: '0 auto',
        maxWidth: 1080
      },
      content: {
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
      },
      leftContent: {
        backgroundColor: '#ffffff',
        flexBasis: '50%',
        marginRight: 60
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
        marginBottom: 60
      },
      title:{
        fontSize: 48,
        color: '#0088CC',
        marginBottom: 10
      },
      rightContent: {
        display: 'flex',
        flexDirection: 'column'
      },
      login_des_img:{
        marginTop: 50,
        maxWidth: 400,
        height: 'auto',
        width: '100%'
      },
      logo: {
        width: 150,
        height: 'auto'
      },
      subtitle:{
        fontSize: 24,
        color: '#0088CC',
        MarginBottom: 20,
        marginTop: 20,
      },
      items: {
        marginTop: 20
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
        color: '#7d7c7c',
        fontSize: 16,
        textTransform: 'uppercase',
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

    let login = <MuiThemeProvider>

      <div style={styles.wrapper}>

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
                DON'T HAVE AN ACCOUNT YET? <span style={styles.registertxt}>SIGN UP HERE</span>
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

                    <div>
                        {isShowSaving}
                    </div>

                    <div style={styles.title}>
                      Sign in
                    </div>
                    <form>

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

                        <br/>
                        <br/><br/>
                        <RaisedButton label="Login" primary={true} onTouchTap={this.handleLogin.bind(this)}/>

                        <br/>
                        <br/>
                        <div style={styles.toptinytxt}>Forgot password?</div>
                        <div style={styles.toptinytxt}>Don't have an account yet?</div>

                    </form>
                  </div>

              </Paper>

              <div style={styles.rightContent}>
                <img src="images/login_img.png" style={styles.login_des_img} />
                <div style={styles.subtitle}>
                  Property marketing made simple by PropertyGround
                </div>
                <div style={styles.items}>
                  <List>
                    <ListItem primaryText="Property Photography" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="Floorplans" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="360° Virtual Tours" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="EPC" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="Elevated Photography" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="Inventory" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="Property Videos" leftIcon={<StarIcon color={pinkA200}/>} />
                    <ListItem primaryText="Property Brochures" leftIcon={<StarIcon color={pinkA200}/>} />
                  </List>
                </div>

              </div>
            </div>

        </div>

        <Snackbar
          open={this.state.showErrorSnack}
          message="Please fill fields..."
          autoHideDuration={3000}
          onRequestClose={this.errhandleRequestClose.bind(this)} />

        <Snackbar
          open={this.state.showSuccessSnack}
          message="Welcome to PropertyGround dashboard..."
          autoHideDuration={3000}
          onRequestClose={this.successhandleRequestClose.bind(this)} />


      </div>
    </MuiThemeProvider>;

    let wrapper = null;
    if(this.state.isLogin != true){
      wrapper = login;
    }
    else{
      wrapper = this.props.temprouter;
    }

    return(

      <div>
        {wrapper}
      </div>



    );

  }

}
