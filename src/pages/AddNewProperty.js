import React, { Component, PropTypes } from "react";
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
// import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/layout/PageBase';
import uitl from '../utils/utils.js'
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import AddProperty from '../components/addproperty/AddProperty';

import * as PropertyActions from "../actions/PropertyActions"; //TODO
import PropertyStore from "../stores/PropertyStore";


export default class AddNewProperty extends React.Component {

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
       open: false
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

    this.setState({
      status: PropertyStore.getAddStatus()
    });

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

    routerWillLeave(nextLocation) {
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      //if (!this.state.isSaved)
      return 'Your work is not saved! Are you sure you want to leave?'
    }
    contextTypes: {
        router: React.PropTypes.object
    };

  handleSubmit(){
    console.log('submit');

      if( (this.state.address_1.trim().length == 0 ) || (this.state.postalcode.trim().length == 0) ){
        this.setState({status: 2, open: true  });
      }
      else{

        console.log(this.state);
        if(this.state.logo_img){
          //we got something
          PropertyActions.addPropertyWithImg(this.state);
        }
        else{
          PropertyActions.addProperty(this.state);
        }

        this.setState({
          startSending: true,
        });
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
        this.context.router.replace('/addpropertytemplate?property_id=' + this.state.status['property_id'] );
      }
      else if(this.state.status &&  this.state.status == 2){
        isShowSaving = <div className="warning-cls">Could not save the data, Please verify your data before save</div>;
      }


    return (

        <PageBase title="Add New Property" navigation="Home / Add New Property">

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

        </PageBase>

    );
  }
}

AddNewProperty.contextTypes = {
  router: PropTypes.object.isRequired
};
