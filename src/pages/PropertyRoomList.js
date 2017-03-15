import React from "react";
import { Link } from "react-router";
import PageBase from '../components/layout/PageBase';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {blue500, yellow600} from 'material-ui/styles/colors';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileFolder from 'material-ui/svg-icons/file/folder';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';

import * as PropertyRoomListActions from "../actions/PropertyRoomListActions";
import PropertyRoomListStore from "../stores/PropertyRoomListStore";

//property info
import AddProperty from '../components/addproperty/AddProperty';
import * as PropertyActions from "../actions/PropertyActions";
import PropertyStore from "../stores/PropertyStore";


//General Conditions
import Generalconditionlist from '../components/generalconditions/Generalconditionlist';
import * as GeneralConditionActions from "../actions/GeneralConditionActions";
import GeneralConditionStore from "../stores/GeneralConditionStore";

//sub items list
import SubItemsList from '../components/subitems/SubItemsList';
import * as SubItemsActions from "../actions/SubItemsActions";
import SubItemsStore from "../stores/SubItemsStore";


export default class PropertyRoomList extends React.Component {

  constructor(props){
    super(props);

    const property_id  = props.location.query.property_id;

    this.state = {
      roomlist: [],
      property_id: property_id,
      property_info: {
        address_1: '',
        address_2: '',
        city: '',
        postalcode: '',
        report_type: '',
        report_date: null,
        description: '',
        image_url: '',
      },
      general_conditions:{
        gen_list: []
      },
      sidebarState: 'property_info',
      startSending: true,
      showErrorSnack: false,
      showSuccessSnack: false
    };

    this.getRoomList = this.getRoomList.bind(this);
    PropertyRoomListActions.fetchRoomList(property_id);

    //property info
    this.getProperty = this.getProperty.bind(this);
    this.getPropUpdateStatus = this.getPropUpdateStatus.bind(this);

    this.propinfo_handleSelectChange = this.propinfo_handleSelectChange.bind(this);
    this.propinfo_handleInputChange = this.propinfo_handleInputChange.bind(this);
    this.propinfo_handleDateChange = this.propinfo_handleDateChange.bind(this);
    this.propinfo_handleSubmit = this.propinfo_handleSubmit.bind(this);

    PropertyActions.getProperty(this.state.property_id);

    //general condition
    this.getGeneralConditions = this.getGeneralConditions.bind(this);
    this.getGeneralConditionUpdateStatus = this.getGeneralConditionUpdateStatus.bind(this);

    this.propinfo_handleSelectChange = this.propinfo_handleSelectChange.bind(this);
    this.generalconditions_handleInputChange = this.generalconditions_handleInputChange.bind(this);
    this.generalconditions_handleSubmit = this.generalconditions_handleSubmit.bind(this);

  }

  componentWillMount(){
    PropertyRoomListStore.on("change", this.getRoomList);

    PropertyStore.on("change", this.getProperty);
    PropertyStore.on("change", this.getPropUpdateStatus);

    GeneralConditionStore.on("change", this.getGeneralConditions);
    GeneralConditionStore.on("change", this.getGeneralConditionUpdateStatus);
  }

  componentWillUnmount(){
    PropertyRoomListStore.removeListener("change", this.getRoomList);

    PropertyStore.removeListener("change", this.getProperty);
    PropertyStore.removeListener("change", this.getPropUpdateStatus);

    GeneralConditionStore.removeListener("change", this.getGeneralConditions);
    GeneralConditionStore.removeListener("change", this.getGeneralConditionUpdateStatus);
  }

  getRoomList(){

    this.setState({
      roomlist: PropertyRoomListStore.getRoomList()
    });

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


  /*
  * PROPERTY UPDATE-----------------------------------------------------START-------------------------------------------------------
  *
  */

  //get proeprty info from api
  getProperty(){

    this.setState({startSendingPropInfo: true});
    let property_details = PropertyStore.getPropertyDetails();

    let property_info = {
      address_1: property_details.address_1,
      address_2: property_details.address_2,
      city: property_details.city,
      postalcode: property_details.postalcode,
      report_type: property_details.report_type,
      report_date:  Date.parse(property_details.report_date)? new Date(property_details.report_date ): null,
      description:  (property_details.description)? property_details.description : '',
      image_url: property_details.image_url
    };

    this.setState({
     property_info: property_info,
     startSending: false
    });

  }

  //get status after updating the property records
  getPropUpdateStatus() {
    console.log('property update status');
    let status =  PropertyStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
    }

  }

  //property info events start -------------------------------------
  propinfo_handleSelectChange = (event, index, value) =>{
    let property_info = this.state.property_info;
    property_info['report_type'] = value;
    this.setState({
        property_info: property_info
    });

  }

  propinfo_handleDateChange = (event, date) => {
    let property_info = this.state.property_info;
    property_info['report_date'] = date;
    this.setState({
        property_info: property_info
    });
  }

  propinfo_handleInputChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     let property_info = this.state.property_info;
     property_info[name] = value;
     this.setState({
         property_info: property_info
     });
  }

  propinfo_handleSubmit(){
    console.log('submit');
    let property_info = this.state.property_info;
    let msg = '';

    if( (property_info.address_1.trim().length == 0 ) || (property_info.postalcode.trim().length == 0) ){
      this.setState({showErrorSnack: true  });
    }
    else{

      PropertyActions.updateProperty(this.state.property_id, this.state.property_info);

      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }


  /*
  * PROPERTY UPDATE---------------------------------------------------END---------------------------------------------------------
  *
  */


  /*
  * GENERAL CONDITION LIST--------------------------------------------START-------------------------------------------------------
  *
  */

  //get proeprty info from api
  getGeneralConditions(){

      let gen_list = GeneralConditionStore.getList();
      console.log(gen_list);
      let generals = this.state.general_conditions;
      generals['gen_list'] = gen_list;
      this.setState({
        general_conditions: generals,
        startSending: false
      });

  }

  generalconditions_handleSelectChange = (event, index, value) =>{

    let [_value, _gen_id] = value.split(';');

    let generals = this.state.general_conditions;
    let gen_list = generals['gen_list'];
    for(let i=0, l= gen_list.length; i < l ; i++ ){
      if( gen_list[i]['prop_general_id'] == _gen_id){
        gen_list[i]['user_input'] =  _value;
      }
    }
    generals['gen_list'] = gen_list;
    this.setState({
        general_conditions: generals
    });

  }

  //for saving general conditions
  generalconditions_handleSubmit(){

    let generals = this.state.general_conditions;
    let gen_list = generals['gen_list'];

    if( gen_list.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{

      GeneralConditionActions.updateGeneralCondition(this.state.property_id, gen_list);

      this.setState({
        startSending: true
      });

    }

    event.preventDefault();

  }

  //input change
  generalconditions_handleInputChange(event){

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let generals = this.state.general_conditions;
    let gen_list = generals['gen_list'];
    for(let i=0, l= gen_list.length; i < l ; i++ ){
      if( gen_list[i]['prop_general_id'] == name){
        //we found the id so set it
        gen_list[i]['comment'] =  value;
      }
    }
    generals['gen_list'] = gen_list;
    this.setState({
        general_conditions: generals
    });

  }

  //get the general condition update status
  getGeneralConditionUpdateStatus() {

    let status =  GeneralConditionStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
    }

  }

  /*
  * GENERAL CONDITION LIST--------------------------------------------END----------------------------------------------------------------
  *
  */


  /*
  * SUB ITEMS LIST--------------------------------------------START-------------------------------------------------------
  *
  */



  /*
  * SUB ITEMS LIST--------------------------------------------END-------------------------------------------------------
  *
  */


  //handles sidebar items click
  sidebarClick = (id) => {
    console.log(id);
    this.setState({
      sidebarState: id
    });

    if (id == 'property_info') {
      PropertyActions.getProperty(this.state.property_id);
      this.setState({
        startSending: true
      });
    }
    else if(id == 'general_condition'){
      GeneralConditionActions.fetchGeneralConditions(this.state.property_id);
      this.setState({
        startSending: true
      });
    }

  }

  render() {

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }

    //this is where right side div get rendered
    let right_div = null;

    if(this.state.sidebarState == 'property_info') {

      right_div = <AddProperty address_1={this.state.property_info.address_1} address_2={this.state.property_info.address_2}
        city={this.state.property_info.city} postalcode={this.state.property_info.postalcode}
        report_type={this.state.property_info.report_type} report_date={this.state.property_info.report_date} description={this.state.property_info.description}
        handleInputChange={this.propinfo_handleInputChange} handleDateChange = {this.propinfo_handleDateChange} handleSubmit={this.propinfo_handleSubmit}  handleSelectChange={this.propinfo_handleSelectChange}
        title="Update Property info" show_cancel={false} />
    }
    else if(this.state.sidebarState == 'general_condition'){
      right_div = <Generalconditionlist list={this.state.general_conditions.gen_list} title="General conditions"
        handleGeneralSubmit={this.generalconditions_handleSubmit} handleInputChange={this.generalconditions_handleInputChange} handleSelectChange={this.generalconditions_handleSelectChange}/>
    }


    return(
      <PageBase title="Room List" navigation="Home / Property / Room list">

        <div className="control-wrapper-container">

          <div className="control-wrapper roomlist-container scroll-style">

            <div className="room-list">
              <List>
                <Subheader inset={true}>Room list</Subheader>

                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blue500} />}
                    primaryText="Property Info"
                    secondaryText="" onClick={this.sidebarClick.bind(this, 'property_info')}/>

                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blue500} />}
                    primaryText="General Condition"
                    secondaryText="" onClick={this.sidebarClick.bind(this, 'general_condition')}/>

                  {this.state.roomlist.map(item =>

                    <ListItem key={item.prop_master_id}
                      leftAvatar={<Avatar icon={<FileFolder />} />}
                      rightIconButton={rightIconMenu}
                      primaryText={item.name}
                      secondaryText="" />

                  )}

              </List>
            </div>

          </div>

          <div className="control-wrapper-flex-2 roomlist-right-div scroll-style">
            <div className="roomlist-right-wrapper">
              {isShowSaving}
              {right_div}
            </div>

          </div>

        </div>

        <Snackbar
          open={this.state.showErrorSnack}
          message="Please fill fields..."
          autoHideDuration={3000}
          onRequestClose={this.errhandleRequestClose} />

        <Snackbar
          open={this.state.showSuccessSnack}
          message="Successfully updated..."
          autoHideDuration={3000}
          onRequestClose={this.successhandleRequestClose} />

      </PageBase>
    );

  }

}
