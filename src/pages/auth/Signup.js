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
import {teal200, orange500} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as LoginAuthActions from "../../actions/auth/LoginAuthActions";
import LoginStore from "../../stores/auth/LoginStore";

export default class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showSuccessSnack: false,
      startSending: false,
      showErrorSnack: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      contact: '',
      company_name: '',
      address: '',
      telephone: '',
      errMessage: '',
      validateErr: '',
      showdialog: false,
    };

    this.getRegisterStatus = this.getRegisterStatus.bind(this);
  }

  componentWillMount(){
    LoginStore.on("change", this.getRegisterStatus);
  }

  componentWillUnmount(){
    LoginStore.removeListener("change", this.getRegisterStatus);
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

  hanldeTxtChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
  }


  getRegisterStatus(){
    let status = LoginStore.getRegisterStatus();
    console.log(status);
    if(status == true){
      this.setState({
        showSuccessSnack: true,
        showErrorSnack: false,
        startSending: false,
        isLogin: true,
        showdialog: true
      });
      console.log('registration success');
      //browserHistory.push('/login')
    }
    else{
      let lgerr = LoginStore.getRegisterError();
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

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleDialogOpen = () => {
    this.setState({showdialog: true});
  };

  handleDialogClose = () => {
    this.setState({showdialog: false});
  };

  handleDialogOk =() => {
    this.setState({showdialog: false});
    browserHistory.push('/login');
  }

  checkPwd(str) {
    if (str.length < 6) {
        return("password too short, must be minimum 6 charecters");
    } else if (str.length > 50) {
        return("password too long, try something you can remember");
    } else if (str.search(/\d/) == -1) {
        return("Password must have atlest one number");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        return("Password must have atleast one letter");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        return("Invalid password charecters used");
    }
    return("OK");
}


  handleSignup(event){
    event.preventDefault();
    event.stopPropagation();

    let passvalid = this.checkPwd(this.state.password);

    if(this.state.email && this.state.password && this.state.confirmPassword && this.state.company_name && this.state.first_name ){

      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(this.state.password !== this.state.confirmPassword){
        this.setState({
          showErrorSnack: true,
          showSuccessSnack: false,
          startSending: false,
          errMessage: 'Password doesn\'t match',
          validateErr: ''
        });
      }
      else if(!re.test( this.state.email ) ){
        this.setState({
          showErrorSnack: true,
          showSuccessSnack: false,
          startSending: false,
          errMessage: 'Invalid email address!',
          validateErr: ''
        });
      }
      else if( passvalid != 'OK' ){

        this.setState({
          showErrorSnack: true,
          showSuccessSnack: false,
          startSending: false,
          errMessage: passvalid,
          validateErr: ''
        });

      }
      else{
        this.setState({
          startSending: true,
        });
        let data = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          contact: this.state.contact,
          company_name: this.state.company_name,
          address: this.state.address,
          telephone: this.state.telephone
        };
        console.log(data);
        LoginAuthActions.register(data);

      }



    }
    else{
      this.setState({
        showErrorSnack: true,
        showSuccessSnack: false,
        startSending: false,
        errMessage: 'Please fill fields...',
        validateErr: 'This field is required'
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
        paddingLeft: 30,
        paddingRight: 10,
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
      },
      underlineStyle: {
        borderColor: orange500,
      },
      divider: {
        marginTop: 1,
        marginBottom: 5
      },
      comapnyheader:{
        marginTop: 30,
        color: '#15b993',
        fontSize: 18
      },
      dialog: {
        width: 300
      }


    };

    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }

    const modal_actions = [

      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleDialogOk}
      />,
    ];

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
                  sign up
                </div>
                <div style={styles.topheadertxt}>
                  Sign up with PropertyGround
                </div>
                <div style={styles.singuptxt}>
                  ALREADY HAVE AN ACCOUNT? <Link to="login"><span style={styles.registertxt}>SIGN IN HERE</span></Link>
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

                          <form name="signupform" onSubmit={this.handleSignup.bind(this)}>
                            <div style={styles.title}>
                              Register
                            </div>

                            <TextField
                                hintText="Enter your first name"
                                floatingLabelText="First name"
                                name="first_name"
                                value={this.state.first_name}
                                fullWidth={false}
                                onChange={this.hanldeTxtChange.bind(this)}
                                errorText={this.state.validateErr}
                                underlineFocusStyle={styles.underlineStyle}
                              />
                              <TextField
                                  hintText="Enter your last name"
                                  floatingLabelText="Last name"
                                  name="last_name"
                                  fullWidth={false}
                                  value={this.state.last_name}
                                  onChange={this.hanldeTxtChange.bind(this)}
                                />
                                <TextField
                                    hintText="Enter email address"
                                    floatingLabelText="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.hanldeTxtChange.bind(this)}
                                    errorText={this.state.validateErr}
                                    underlineFocusStyle={styles.underlineStyle}
                                  />
                              <TextField
                                hintText="Create a password"
                                floatingLabelText="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.hanldeTxtChange.bind(this)}
                                errorText={this.state.validateErr}
                                underlineFocusStyle={styles.underlineStyle}
                              />
                              <TextField
                                hintText="Confirm your password"
                                floatingLabelText="Confirm password"
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.hanldeTxtChange.bind(this)}
                                errorText={this.state.validateErr}
                                underlineFocusStyle={styles.underlineStyle}
                              />
                              <TextField
                                hintText="Contact"
                                floatingLabelText="Contact"
                                name="contact"
                                value={this.state.contact}
                                onChange={this.hanldeTxtChange.bind(this)}
                              />

                              <div style={styles.comapnyheader}>
                                Company details
                              </div>
                              <Divider style={styles.divider} />


                              <TextField
                                  hintText="Enter your Company name"
                                  floatingLabelText="Company name"
                                  name="company_name"
                                  value={this.state.company_name}
                                  onChange={this.hanldeTxtChange.bind(this)}
                                  errorText={this.state.validateErr}
                                  underlineFocusStyle={styles.underlineStyle}
                                />
                                <TextField
                                    hintText="Enter your Company address"
                                    floatingLabelText="Company address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.hanldeTxtChange.bind(this)}
                                  />
                                  <TextField
                                      hintText="Enter your Company telephone"
                                      floatingLabelText="Company telephone"
                                      name="telephone"
                                      value={this.state.telephone}
                                      onChange={this.hanldeTxtChange.bind(this)}
                                    />
                              <br/>
                              <div style={styles.loginerrtxt}>{this.state.errMessage}</div>
                              <br/>
                              <RaisedButton type="submit" label="Sign up" primary={true}/>
                              <br/><br/>
                              <div><Link to="login" style={styles.loginsubtxt}>Already have an account?</Link></div>
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
            message="Welcome to PropertyGround! Please login to access your dashboard"
            autoHideDuration={3000}
            onRequestClose={this.successhandleRequestClose.bind(this)} />

            <Dialog
              actions={modal_actions}
              modal={false}
              open={this.state.showdialog}
              onRequestClose={this.handleDialogClose}
              contentStyle ={styles.dialog}
            >
              Welcome to PropertyGround! Please login to access your dashboard
            </Dialog>

        </div>
      </MuiThemeProvider>

    );

  }

}
