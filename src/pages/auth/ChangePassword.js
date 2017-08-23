import React, { Component } from "react";
//import {Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../../components/layout/PageBase';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import {orange500} from 'material-ui/styles/colors';

import * as LoginAuthActions from "../../actions/auth/LoginAuthActions";
import LoginStore from "../../stores/auth/LoginStore";

export default class ChangePassword extends Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state={
      startSending: false,
      showSuccessSnack: false,
      showErrorSnack: false,
      validateErr: '',
      oldpassword: '',
      password: '',
      confirmPassword: ''

    };

    this.getChangePasswordStatus = this.getChangePasswordStatus.bind(this);

  }

  componentWillMount() {
    LoginStore.on("change", this.getChangePasswordStatus);
  }

  componentWillUnmount() {
    LoginStore.removeListener("change", this.getChangePasswordStatus);
  }

  hanldeTxtChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
  }

  getChangePasswordStatus(){
    let status = LoginStore.getChangePasswordStatus();
    console.log(status);
    if(status == true){
      this.setState({
        showSuccessSnack: true,
        showErrorSnack: false,
        startSending: false,
      });
      console.log('change password success');

    }
    else if( status == false){
        this.setState({
          startSending: false,
          showSuccessSnack: false,
          showErrorSnack: true
        })

    }
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

  handleChangePassword(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("change password submit");

    let passvalid = this.checkPwd(this.state.password);

    if(this.state.oldpassword && this.state.password && this.state.confirmPassword ){

      if(this.state.password !== this.state.confirmPassword){
        this.setState({
          showErrorSnack: true,
          showSuccessSnack: false,
          startSending: false,
          errMessage: 'Password doesn\'t match',
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
          oldpassword: this.state.oldpassword,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        };
        console.log(data);
        LoginAuthActions.changepassword(data);


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

  render() {

    const styles = {
      tblProgress: {
        margin: '20px auto',
        textAlign: 'center'
      },
      progressbar:{
        width: 'auto',
        height: 20
      },
      wrapper:{
        boxShadow:' rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
        borderRadius: 2,
        padding: 10,
        marginBottom: 30,
        marginTop: 20,
        position: 'relative'
      },
      heading:{
        color: 'rgb(79, 189, 160)',
        marginBottom: 0
      },
      headinghr:{
        backgroundColor: 'rgb(79, 189, 160)',
        marginBottom: 20,
        marginTop: 5
      },
      buttons: {
        marginTop: 30,
        marginLeft: 10,
        float: 'right'
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
      saveButton: {
        marginLeft: 5,
        marginRight: 10
      },

    };

    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }

    return(

      <PageBase title="Change password" navigation="">

        {isShowSaving}

        <form name="changepasswordform" onSubmit={this.handleChangePassword.bind(this)}>
            <h3>Change password</h3>

            <TextField
              hintText="Enter your current password"
              floatingLabelText="Current password"
              type="password"
              name="oldpassword"
              value={this.state.oldpassword}
              fullWidth={true}
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
              fullWidth={true}
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
              fullWidth={true}
            />


        <Snackbar
          open={this.state.showErrorSnack}
          message= "Please check your passwords!"
          autoHideDuration={3000}
          onRequestClose={this.errhandleRequestClose.bind(this)} />

        <Snackbar
          open={this.state.showSuccessSnack}
          message="Password changed!"
          autoHideDuration={3000}
          onRequestClose={this.successhandleRequestClose.bind(this)} />


          <Divider style={styles.divider} />
          <div style={styles.loginerrtxt}>{this.state.errMessage}</div>
          <br/>
            <div style={styles.buttons}>
              <RaisedButton type="submit" style={styles.saveButton} label="Save" primary={true}/>
            </div>
        </form>

      </PageBase>

    );

  }



}
