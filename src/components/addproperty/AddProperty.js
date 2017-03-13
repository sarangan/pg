import React, { Component, PropTypes } from "react";
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';


export default class AddProperty extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  render(){

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




    return(

      <form>
        <h3>{this.props.title}</h3>

        <TextField  hintText="Address 1" floatingLabelText="Address 1" fullWidth={true} name="address_1" value={this.props.address_1} onChange={this.props.handleInputChange}/>
        <TextField  hintText="Address 2" floatingLabelText="Address 2" fullWidth={true} name="address_2" value={this.props.address_2} onChange={this.props.handleInputChange}/>
        <TextField  hintText="City" floatingLabelText="City" fullWidth={false} name="city" value={this.props.city} onChange={this.props.handleInputChange} />
        <TextField  hintText="Postalcode" floatingLabelText="Postalcode" fullWidth={false} name="postalcode" value={this.props.postalcode} onChange={this.props.handleInputChange}/>

        <Divider style={styles.bottomDivider}/>
        <h4>Report Details:</h4>

        <SelectField floatingLabelText="Report type" value={this.props.report_type} onChange={this.props.handleSelectChange}  name="report_type">
          <MenuItem value={null} primaryText=""/>
          <MenuItem value={"Check-in Report"}  primaryText="Check-in Report" />
          <MenuItem value={"Check-out Report"} primaryText="Check-out Report"/>
          <MenuItem value={"Inventory Report"}  primaryText="Inventory Report"/>
          <MenuItem value={"Inventory and Check-in Report"} primaryText="Inventory and Check-in Report"/>
          <MenuItem value={"Midterm Inspection Report"}  primaryText="Midterm Inspection Report"/>
          <MenuItem value={"Interim Report"} primaryText="Interim Report"/>
          <MenuItem value={"General Overview Report"} primaryText="General Overview Report"/>
          <MenuItem value={"Condition Report"} primaryText="Condition Report"/>
        </SelectField>

        <DatePicker hintText="Report Date" floatingLabelText="Report Date" fullWidth={false} name="report_date" defaultDate={this.props.report_date} value={this.props.report_date} onChange={this.props.handleDateChange}/>

        <TextField hintText="Description" multiLine={true} rows={2} rowsMax={4}  name="description" fullWidth={true} value={this.props.description} onChange={this.props.handleInputChange}/>

        <div style={styles.buttons}>
          { this.props.show_cancel == true &&
            <Link to="/propertylist">
              <RaisedButton label="Cancel"/>
            </Link>
          }

          <RaisedButton label="Save"
            style={styles.saveButton}
            onClick={this.props.handleSubmit}
            primary={true}/>

      </div>

    </form>

    );

  }

}
