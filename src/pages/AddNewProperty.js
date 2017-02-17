import React from "react";
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/layout/PageBase';

// import * as PropertyListActions from "../actions/PropertyListActions";
// import PropertyListStore from "../stores/PropertyListStore";

export default class AddNewProperty extends React.Component {

  constructor(){
    super();
    this.state = {
       report_type: null,
     };
  }


  handleSelectChange = (event, index, value) => this.setState({report_type: value});


  render() {

    const styles = {

       buttons: {
         marginTop: 30,
         float: 'right'
       },
       saveButton: {
         marginLeft: 5
       },
       bottomDivider: {
          marginTop: '50px'
       }

     };


    return (

        <PageBase title="Add New Property" navigation="Home / Add New Property">

          <form>

            <TextField  hintText="Address 1" floatingLabelText="Address 1" fullWidth={true} id="Address_1" />
            <TextField  hintText="Address 2" floatingLabelText="Address 2" fullWidth={true} id="Address_2" />
            <TextField  hintText="City" floatingLabelText="City" fullWidth={false} id="city" />
            <TextField  hintText="Postalcode" floatingLabelText="Postalcode" fullWidth={false} id="postalcode" />

            <DatePicker hintText="Created Date" floatingLabelText="Created Date" fullWidth={false} id="created_date"/>

            <Divider style={styles.bottomDivider}/>
            <h4>Report Details:</h4>

            <SelectField floatingLabelText="Report type" value={this.state.report_type} onChange={this.handleSelectChange}  id="report_type">
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

            <DatePicker hintText="Report Date" floatingLabelText="Report Date" fullWidth={false} id="report_date"/>

            <TextField hintText="Description" multiLine={true} rows={2} rowsMax={4}  id="description" fullWidth={true}/>

            <div style={styles.buttons}>

              <Link to="/propertylist">
                <RaisedButton label="Cancel"/>
              </Link>

              <RaisedButton label="Save"
                style={styles.saveButton}
                type="submit"
                primary={true}/>

          </div>

        </form>

        </PageBase>

    );
  }
}
