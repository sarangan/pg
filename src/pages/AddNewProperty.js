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

import * as PropertyListActions from "../actions/PropertyActions"; //TODO
import PropertyListStore from "../stores/PropertyStore";


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
       open: false
     };

     this.getStatus = this.getStatus.bind(this);

  }

  componentWillMount() {
    PropertyListStore.on("change", this.getStatus);
  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getStatus);
  }

  getStatus() {
    console.log('property get status');

    this.setState({
      status: PropertyListStore.getAddStatus()
    });

  }


  handleSelectChange = (event, index, value) => this.setState({report_type: value});

  handleDateChange = (event, date) => {
    this.setState({
      report_date: date,
    });
  };

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

    let msg = '';

      if( (this.state.address_1.trim().length == 0 ) || (this.state.postalcode.trim().length == 0) ){
        this.setState({status: 2, open: true  });
      }
      else{

        console.log(this.state);
        PropertyListActions.addProperty(this.state);

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

          <form>

            <TextField  hintText="Address 1" floatingLabelText="Address 1" fullWidth={true} name="address_1" value={this.state.address_1} onChange={this.handleInputChange.bind(this)}/>
            <TextField  hintText="Address 2" floatingLabelText="Address 2" fullWidth={true} name="address_2" value={this.state.address_2} onChange={this.handleInputChange.bind(this)}/>
            <TextField  hintText="City" floatingLabelText="City" fullWidth={false} name="city" value={this.state.city} onChange={this.handleInputChange.bind(this)} />
            <TextField  hintText="Postalcode" floatingLabelText="Postalcode" fullWidth={false} name="postalcode" value={this.state.postalcode} onChange={this.handleInputChange.bind(this)}/>

            <Divider style={styles.bottomDivider}/>
            <h4>Report Details:</h4>

            <SelectField floatingLabelText="Report type" value={this.state.report_type} onChange={this.handleSelectChange.bind(this)}  name="report_type">
              <MenuItem value={null} primaryText="" />
              <MenuItem value={"Check-in Report"}  primaryText="Check-in Report" />
				      <MenuItem value={"Check-out Report"} primaryText="Check-out Report"/>
				      <MenuItem value={"Inventory Report"}  primaryText="Inventory Report"/>
              <MenuItem value={"Inventory and Check-in Report"} primaryText="Inventory and Check-in Report"/>
				      <MenuItem value={"Midterm Inspection Report"}  primaryText="Midterm Inspection Report"/>
				      <MenuItem value={"Interim Report"} primaryText="Interim Report"/>
				      <MenuItem value={"General Overview Report"} primaryText="General Overview Report"/>
				      <MenuItem value={"Condition Report"} primaryText="Condition Report" />
            </SelectField>

            <DatePicker hintText="Report Date" floatingLabelText="Report Date" fullWidth={false} name="report_date" value={this.state.report_date} onChange={this.handleDateChange.bind(this)}/>

            <TextField hintText="Description" multiLine={true} rows={2} rowsMax={4}  name="description" fullWidth={true} value={this.state.description} onChange={this.handleInputChange.bind(this)}/>

            <div style={styles.buttons}>

              <Link to="/propertylist">
                <RaisedButton label="Cancel"/>
              </Link>

              <RaisedButton label="Save"
                style={styles.saveButton}
                onClick={this.handleSubmit.bind(this)}
                primary={true}/>

          </div>

        </form>

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
