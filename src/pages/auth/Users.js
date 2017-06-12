import React from "react";
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import PageBase from '../../components/layout/PageBase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ExtIcon from 'material-ui/svg-icons/action/extension';
import {teal200, orange500, pink500} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import * as LoginAuthActions from "../../actions/auth/LoginAuthActions";
import LoginStore from "../../stores/auth/LoginStore";


export default class Users extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      showSuccessSnack: false,
      startSending: false,
      showErrorSnack: false,
      users: [],
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      contact: '',
      errMessage: '',
      validateErr: '',
      showdialog: false,
      adduser: false,
      showDelMasterItemdlg: false,
      dlguser_id : '',
      del_username: '',
    };

    this.getUsers = this.getUsers.bind(this);
    LoginAuthActions.fetchUsers();
    this.getDeleteUserStatus = this.getDeleteUserStatus.bind(this);
    this.getRegisterStatus = this.getRegisterStatus.bind(this);
  }

  componentWillMount(){
      LoginStore.on("change", this.getUsers);
      LoginStore.on("change", this.getDeleteUserStatus);
      LoginStore.on("change", this.getRegisterStatus);
  }

  componentWillUnmount(){
      LoginStore.removeListener("change", this.getUsers);
      LoginStore.removeListener("change", this.getDeleteUserStatus);
      LoginStore.removeListener("change", this.getRegisterStatus);
  }

  handleDelUser(user_id){
    if(user_id){
      // delete user
      this.setState({
        startSending: true
      });
      LoginAuthActions.removeUser(user_id);
    }
  }

  getDeleteUserStatus(){

    let status = LoginStore.getDeleteUserStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
    }
  }

  handleMasterDelDlgOpen(user_id, user_name ){
    this.setState({
        showDelMasterItemdlg: true,
        dlguser_id: user_id,
        del_username: user_name
    });
  };

  handleMasterDelDlgClose = () => {
    this.setState({showDelMasterItemdlg: false,
      dlgMaster_id: '',
      del_username: ''
    });
  };

  handleMasterDelDlgOk(){
    this.setState({showDelMasterItemdlg: false});
    this.handleDelUser(this.state.dlguser_id);
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

  getUsers(){
      let users = LoginStore.getUsers();

      if(users){
        this.setState({
          users: users,
          startSending: false
        });
      }

  }

  handleToggleAddNewUser(){
    this.setState({
      adduser: !this.state.adduser
    });
  }

  hanldeTxtChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
  }


  getRegisterStatus(){
    let status = LoginStore.getAddUserStatus();
    console.log(status);
    if(status){
      this.setState({
        showSuccessSnack: true,
        showErrorSnack: false,
        startSending: false,
      });
      console.log('registration success');
      //browserHistory.push('/login')
    }
    else{
        this.setState({
          startSending: false,
          showSuccessSnack: false,
          showErrorSnack: true
        })

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

    if(this.state.email && this.state.password && this.state.confirmPassword && this.state.first_name ){

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
          contact: this.state.contact
        };
        console.log(data);
        LoginAuthActions.registerUser(data);

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
        tablewrapper:{
          position: 'relateive'
        },
        floatingActionButton: {
          margin: 0,
          top: 'auto',
          right: 50,
          bottom: 50,
          left: 'auto',
          position: 'absolute',
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

    const del_modal_actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this.handleMasterDelDlgClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={this.handleMasterDelDlgOk.bind(this)}
      />,
    ];


    return(

      <PageBase title="Users List" navigation="">

        {isShowSaving}

      {!this.state.adduser &&
      <div style={styles.tablewrapper}>
      <Table
            fixedHeader={true}
            height={'300px'}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >

              <TableRow>
                <TableHeaderColumn tooltip="First name">First name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Last name">Last name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Username">Username</TableHeaderColumn>
                <TableHeaderColumn tooltip="Contact">Contact</TableHeaderColumn>
                <TableHeaderColumn tooltip="Action">Delete</TableHeaderColumn>
              </TableRow>

            </TableHeader>

            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
            >

              { this.state.users &&
                this.state.users.map( (row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row.first_name}</TableRowColumn>
                    <TableRowColumn>{row.last_name}</TableRowColumn>
                    <TableRowColumn>{row.email}</TableRowColumn>
                    <TableRowColumn>{row.contact}</TableRowColumn>
                    <TableRowColumn>
                      <IconButton onTouchTap={this.handleMasterDelDlgOpen.bind(this, row.id, row.first_name)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                ))
              }

            </TableBody>
        </Table>
        <FloatingActionButton style={styles.floatingActionButton}  iconStyle={{backgroundColor: pink500}} onTouchTap={this.handleToggleAddNewUser.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        </div>
      }

      {this.state.adduser &&

        <form name="signupform" onSubmit={this.handleSignup.bind(this)}>
            <h3>Register</h3>

            <TextField
              hintText="Enter your first name"
              floatingLabelText="First name"
              name="first_name"
              value={this.state.first_name}
              fullWidth={true}
              onChange={this.hanldeTxtChange.bind(this)}
              errorText={this.state.validateErr}
              underlineFocusStyle={styles.underlineStyle}

            />
            <TextField
                hintText="Enter your last name"
                floatingLabelText="Last name"
                name="last_name"
                fullWidth={true}
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
                  fullWidth={true}
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
            <TextField
              hintText="Contact"
              floatingLabelText="Contact"
              name="contact"
              value={this.state.contact}
              onChange={this.hanldeTxtChange.bind(this)}
                fullWidth={true}
            />

            <Divider style={styles.divider} />
            <div style={styles.loginerrtxt}>{this.state.errMessage}</div>
            <br/>
              <div style={styles.buttons}>
                <RaisedButton type="button" style={styles.saveButton} label="Cancel" primary={false} onTouchTap={this.handleToggleAddNewUser.bind(this)}/>
                <RaisedButton type="submit" style={styles.saveButton} label="Save" primary={true}/>
              </div>
        </form>

      }

      <Dialog
        actions={del_modal_actions}
        modal={false}
        open={this.state.showDelMasterItemdlg}
        onRequestClose={this.handleMasterDelDlgClose}
        contentStyle ={styles.dialog}
      >
        Are you sure do you want to delete {this.state.del_username} ?
      </Dialog>

          <Snackbar
            open={this.state.showErrorSnack}
            message="Please fill fields..."
            autoHideDuration={3000}
            onRequestClose={this.errhandleRequestClose.bind(this)} />

          <Snackbar
            open={this.state.showSuccessSnack}
            message="Successfully updated..."
            autoHideDuration={3000}
            onRequestClose={this.successhandleRequestClose.bind(this)} />

      </PageBase>

    );
  }

}
