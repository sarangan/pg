import React, { Component, PropTypes } from "react";
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import Dropzone from 'react-dropzone';
import ReactDOMServer from 'react-dom/server';
import config from '../../config/config';


export default class AddProperty extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    let url = 'http://placehold.it/150x150?text=PropertyGround';
    if(this.props.property_id && this.props.image_url){
      url = config.SERVER_IMAGE_PATH + this.props.property_id + '/' + '300_' + (this.props.image_url.substr(0, this.props.image_url.lastIndexOf('.')) || this.props.image_url) + '.jpg';
    }

    this.state = {
      prop_logo: url,
      logo_img: null
    };
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.image_url != this.props.image_url && nextProps.image_url.length > 0 && this.props.property_id){
      let url = 'http://placehold.it/150x150?text=PropertyGround';
      if(this.props.property_id){
        url = config.SERVER_IMAGE_PATH + this.props.property_id + '/' + '300_' + (nextProps.image_url.substr(0, nextProps.image_url.lastIndexOf('.')) || nextProps.image_url) + '.jpg';
      }
      this.setState({
        prop_logo: url
      });
    }

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  //uploading logo
  onDrop(files){
    //console.log(files[0]);
    this.setState({
      prop_logo: files[0].preview,
    });

    this.props.uploadfile(files[0]);
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
       },
       dropzone_wrapper: {
         display: 'flex',
         justifyContent: 'left'
       },
       dropzone:{
         width: 150,
         display: 'inline-block',
         marginLeft: 3,
         height: 150,
         marginTop: 10
       },
       dropzoneItem:{
         minHeight: 125,
         minWidth: 80,
         background: '#ffffff',
         padding: 5,
         cursor: 'pointer',
         textAlign: 'center'
       },
       proplogo:{
         width: 150,
         height: 'auto',
         marginLeft: 50
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

        <div style={styles.dropzone_wrapper}>
          <div style={styles.dropzone}>
            <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzoneItem} className="dropzoneItem" multiple={false} >
              <div>Drop a file or click here to upload.</div>
            </Dropzone>
          </div>
          <div style={styles.dropzone}>
            <img src={this.state.prop_logo}  alt="property image" style={styles.proplogo}/>
          </div>
        </div>

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
