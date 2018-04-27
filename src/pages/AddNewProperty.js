import React, { Component } from "react";
import { browserHistory} from 'react-router';
//import RaisedButton from 'material-ui/RaisedButton';
//import MenuItem from 'material-ui/MenuItem';
//import TextField from 'material-ui/TextField';
//import SelectField from 'material-ui/SelectField';
//import DatePicker from 'material-ui/DatePicker';
// import {grey400} from 'material-ui/styles/colors';
//import Divider from 'material-ui/Divider';
import PageBase from '../components/layout/PageBase';
//import uitl from '../utils/utils.js'
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AddProperty from '../components/addproperty/AddProperty';

import * as PropertyActions from "../actions/PropertyActions"; //TODO
import PropertyStore from "../stores/PropertyStore";


export default class AddNewProperty extends Component {

  constructor(){
    super();
    this.state = {
       address_1: '',
       address_2: '',
       city: '',
       postalcode: '',
       report_type: '',
       report_date: null,
       description: '',
       image_url: '',
       logo_img: null,
       open: false,
       showSuccessSnack: false,
      showErrorSnack: false,
      showdialog: false,
     };

     this.getStatus = this.getStatus.bind(this);

     this.handleSelectChange = this.handleSelectChange.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    PropertyStore.on("change", this.getStatus);
  }

  componentWillUnmount() {
    PropertyStore.removeListener("change", this.getStatus);
  }

  getStatus() {
    console.log('property get status');

    let status = PropertyStore.getAddStatus();

    this.setState({
      status: status,
    });

    if (status &&  status['status'] == 1  ) {
      this.setState({
        showErrorSnack: false,
        showSuccessSnack: true,
        startSending: false,
        showdialog: true
      });


      //browserHistory.push('/addpropertytemplate?property_id=' + status['property_id'] );
    }
    else{
      this.setState({
        showErrorSnack: true,
        showSuccessSnack: false,
        startSending: false,
      });
    }

  }

  uploadfile(file){
    console.log('updating the image file');
    this.setState({
      logo_img: file
    });

  }


  handleSelectChange = (event, index, value) => this.setState({report_type: value});

  handleDateChange = (event, date) => {
    this.setState({
      report_date: date,
    });
  }

    // routerWillLeave(nextLocation) {
    //   // return false to prevent a transition w/o prompting the user,
    //   // or return a string to allow the user to decide:
    //   //if (!this.state.isSaved)
    //   return 'Your work is not saved! Are you sure you want to leave?'
    // }
    // contextTypes: {
    //     router: React.PropTypes.object
    // };

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

  handleSubmit(){
    console.log('submit');

      if( (this.state.address_1.trim().length == 0 ) || (this.state.postalcode.trim().length == 0) ){
        this.setState({status: 2, open: true  });
      }
      else{
        this.setState({
          startSending: true,
        });
        console.log(this.state);
        if(this.state.logo_img){
          //we got something
          PropertyActions.addPropertyWithImg(this.state);
        }
        else{
          PropertyActions.addProperty(this.state);
        }


      }

    event.preventDefault();
  }

  handleInputChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
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
    browserHistory.push('/addpropertytemplate?property_id=' + this.state.status['property_id'] );
  }

  render() {

    const styles = {

       buttons: {
         marginTop: 30,
         float: 'right'
       },
       saveButton: {
         marginLeft: 5,
         marginRight: 10
       },
       bottomDivider: {
          marginTop: '50px'
       },
       tblProgress: {
         margin: '50px auto',
         textAlign: 'center'
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

      if (this.state.status &&  this.state.status['status'] == 1  ) {
        isShowSaving = '';
        //browserHistory.push('/addpropertytemplate?property_id=' + this.state.status['property_id'] );
        //this.context.router.replace('/addpropertytemplate?property_id=' + this.state.status['property_id'] );
      }
      else if(this.state.status &&  this.state.status == 2){
        isShowSaving = <div className="warning-cls">Could not save the data, Please verify your data before save</div>;
      }

      const modal_actions = [

        <FlatButton
          label="Ok"
          primary={true}
          onTouchTap={this.handleDialogOk}
        />,
      ];


    return (

        <PageBase title="Add New Property" navigation="">

          {isShowSaving}

          <AddProperty address_1={this.state.address_1} address_2={this.state.address_2} handleInputChange={this.handleInputChange} city={this.state.city} postalcode={this.state.postalcode}
            report_type={this.state.report_type} handleSelectChange={this.handleSelectChange} report_date={this.state.report_date} description={this.state.description} image_url={this.state.image_url}
            handleDateChange = {this.handleDateChange} handleSubmit={this.handleSubmit}  show_cancel={true} uploadfile={this.uploadfile.bind(this)} property_id=""/>

        <Snackbar
          open={this.state.open}
          message="Please fill fields..."
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />

        <Snackbar
          open={this.state.showErrorSnack}
          message= "Something went wrong..."
          autoHideDuration={3000}
          onRequestClose={this.errhandleRequestClose.bind(this)} />

        <Snackbar
          open={this.state.showSuccessSnack}
          message="Successfully updated!"
          autoHideDuration={3000}
          onRequestClose={this.successhandleRequestClose.bind(this)} />

          <Dialog
            actions={modal_actions}
            modal={false}
            open={this.state.showdialog}
            onRequestClose={this.handleDialogClose}
            contentStyle ={styles.dialog}
          >
            Successfully updated
          </Dialog>

        </PageBase>

    );
  }
}

// AddNewProperty.contextTypes = {
//   router: PropTypes.object.isRequired
// };
