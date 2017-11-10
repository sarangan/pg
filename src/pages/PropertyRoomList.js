import React from "react";
import { Link } from "react-router";
import PageBase from '../components/layout/PageBase';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {blue500, yellow600, teal200, grey400, darkBlack, lightBlack, blueGrey300} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileFolder from 'material-ui/svg-icons/file/folder-open';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionSort from 'material-ui/svg-icons/content/sort';
import SignIcon from 'material-ui/svg-icons/editor/border-color';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionDrag from 'material-ui/svg-icons/editor/format-line-spacing';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/content/create';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';

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

//single item
import SingleItem from '../components/singleitem/SingleItem';
import * as SingleItemActions from "../actions/SingleItemActions";
import SingleItemStore from "../stores/SingleItemStore";

//meter item
import MeterItems from '../components/meteritems/MeterItems';
import * as MeterItemActions from "../actions/MeterItemActions";
import MeterItemsStore from "../stores/MeterItemsStore";

//photos
import * as PhotosActions from "../actions/PhotosActions";
import PhotosStore from "../stores/PhotosStore";

//audios
import * as AudiosActions from "../actions/AudiosActions";
import AudiosStore from "../stores/AudiosStore";

//singatures
import SignatureList from '../components/signatures/SignatureList';
import * as SingatureActions from "../actions/SingatureActions";
import SignatureStore from "../stores/SignatureStore";

//-----------------------------master item sorting -------------------------

const DragHandle = SortableHandle(() => <span className="lisort"><ActionDrag /></span>); // This can be any component you want

const SortableItem = SortableElement(({value}) =>
  <li className="SortableItem lisort"> <ActionDrag style={ {marginRight: 10} }/>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="SortableList master-item-sortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.name} />
      ))}
    </ul>
  );
});

//-----------------------------master item sorting end ---------------------

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
        logo_img: null
      },
      general_conditions:{
        gen_list: []
      },
      single_item: {
      },
      meter_items:{
        meter_list: []
      },
      sub_items: {
        master_id: '',
        list: [],
        gen_comment: {}
      },
      photos: [],
      voices: [],
      signatures: {sign_id: '', comment: '', tenant_url: '', lanlord_url: '', clerk_url: ''},
      sidebarState: 'PROP',
      startSending: true,
      showErrorSnack: false,
      showSuccessSnack: false,
      formTitle: 'Update Property info',
      master_id: '',
      enableSort : false,
      showDelMasterItemdlg: false,
      showRenameMasterItemdlg: false,
      showCopyMasterItemdlg: false,
      dlgMaster_id : '',
      master_item_re_name: '',
    };

    //master item
    this.getRoomList = this.getRoomList.bind(this);
    PropertyRoomListActions.fetchRoomList(property_id);
    this.getMasterItemUpdateStatus = this.getMasterItemUpdateStatus.bind(this);
    this.getMasterItemCopyStatus = this.getMasterItemCopyStatus.bind(this);

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

    //single item
    this.getSingleItem = this.getSingleItem.bind(this);
    this.getSingleItemUpdateStatus = this.getSingleItemUpdateStatus.bind(this);

    this.singleItem_handleInputChange = this.singleItem_handleInputChange.bind(this);
    this.singleItem_handleSubmit = this.singleItem_handleSubmit.bind(this);

    //mater items
    this.getMeterItems = this.getMeterItems.bind(this);
    this.getMeterItemsUpdateStatus = this.getMeterItemsUpdateStatus.bind(this);

    this.meterItems_handleInputChange = this.meterItems_handleInputChange.bind(this);
    this.meterItems_handleSubmit = this.meterItems_handleSubmit.bind(this);

    //sub items
    this.getSubItems = this.getSubItems.bind(this);
    this.getSubItemsUpdateStatus = this.getSubItemsUpdateStatus.bind(this);

    this.subItems_handleInputChange = this.subItems_handleInputChange.bind(this);
    this.subItems_handleSubmit = this.subItems_handleSubmit.bind(this);

    //photos
    this.getPhotos = this.getPhotos.bind(this);
    this.getPhotoDnDUpdateStatus = this.getPhotoDnDUpdateStatus.bind(this);
    this.getPhotoDeleteStatus = this.getPhotoDeleteStatus.bind(this);
    this.getPhotoUploadStatus = this.getPhotoUploadStatus.bind(this);

    //audios
    this.getVoices = this.getVoices.bind(this);

    //singatures
    this.getSingatures = this.getSingatures.bind(this);
    this.getSingaturesUpdateStatus = this.getSingaturesUpdateStatus.bind(this);
    this.hanldeSignTxtChange = this.hanldeSignTxtChange.bind(this);
  }

  componentWillMount(){
    PropertyRoomListStore.on("change", this.getRoomList);
    PropertyRoomListStore.on("change", this.getMasterItemUpdateStatus);
    PropertyRoomListStore.on("change", this.getMasterItemCopyStatus);

    PropertyStore.on("change", this.getProperty);
    PropertyStore.on("change", this.getPropUpdateStatus);

    GeneralConditionStore.on("change", this.getGeneralConditions);
    GeneralConditionStore.on("change", this.getGeneralConditionUpdateStatus);

    SingleItemStore.on("change", this.getSingleItem);
    SingleItemStore.on("change", this.getSingleItemUpdateStatus);

    MeterItemsStore.on("change", this.getMeterItems);
    MeterItemsStore.on("change", this.getMeterItemsUpdateStatus);

    SubItemsStore.on("change", this.getSubItems);
    SubItemsStore.on("change", this.getSubItemsUpdateStatus);

    PhotosStore.on("change", this.getPhotos);
    PhotosStore.on("change", this.getPhotoDnDUpdateStatus);
    PhotosStore.on("change", this.getPhotoDeleteStatus);
    PhotosStore.on("change", this.getPhotoUploadStatus);

    AudiosStore.on("change", this.getVoices);

    SignatureStore.on("change", this.getSingatures);
    SignatureStore.on("change", this.getSingaturesUpdateStatus);
  }

  componentWillUnmount(){
    PropertyRoomListStore.removeListener("change", this.getRoomList);
    PropertyRoomListStore.removeListener("change", this.getMasterItemUpdateStatus);
    PropertyRoomListStore.removeListener("change", this.getMasterItemCopyStatus);

    PropertyStore.removeListener("change", this.getProperty);
    PropertyStore.removeListener("change", this.getPropUpdateStatus);

    GeneralConditionStore.removeListener("change", this.getGeneralConditions);
    GeneralConditionStore.removeListener("change", this.getGeneralConditionUpdateStatus);

    SingleItemStore.removeListener("change", this.getSingleItem);
    SingleItemStore.removeListener("change", this.getSingleItemUpdateStatus);

    MeterItemsStore.removeListener("change", this.getMeterItems);
    MeterItemsStore.removeListener("change", this.getMeterItemsUpdateStatus);

    SubItemsStore.removeListener("change", this.getSubItems);
    SubItemsStore.removeListener("change", this.getSubItemsUpdateStatus);

    PhotosStore.removeListener("change", this.getPhotos);
    PhotosStore.removeListener("change", this.getPhotoDnDUpdateStatus);
    PhotosStore.removeListener("change", this.getPhotoDeleteStatus);
    PhotosStore.removeListener("change", this.getPhotoUploadStatus);

    AudiosStore.removeListener("change", this.getVoices);

    SignatureStore.removeListener("change", this.getSingatures);
    SignatureStore.removeListener("change", this.getSingaturesUpdateStatus);
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

  // handle sort event
  handleEnableSort(){
      this.setState({
        enableSort: !this.state.enableSort
      })
  }


  /*
  * MASTER ITEMS-----------------------------------------------------START-------------------------------------------------------
  *
  */

  getRoomList(){

    this.setState({
      roomlist: PropertyRoomListStore.getRoomList()
    });

  }

  onSortEnd = ({oldIndex, newIndex}) => {

    let room_list = this.state.roomlist;
    let sorted = false;

    // going down
    if(newIndex > oldIndex){

      let tempCurrent = room_list[oldIndex];
      for(let i = (oldIndex + 1), endPos = newIndex ; i <= endPos; i++ ){
        room_list[i - 1] =  room_list[i];
      }
      room_list[newIndex] = tempCurrent;
      sorted = true;
    }
    else if(newIndex < oldIndex){ // going up

      let tempCurrent = room_list[oldIndex];
      for(let i = (oldIndex - 1), endPos = newIndex ; i >= endPos; i-- ){
        room_list[i + 1] =  room_list[i];
      }
      room_list[newIndex] = tempCurrent;
      sorted = true;
    }

    if(sorted == true){

      this.setState({
        roomlist: room_list
      });
      PropertyRoomListActions.updateSortRoomList(this.state.property_id, this.state.roomlist);

    }

  };


  copyRoom(){

    if(this.state.dlgMaster_id){

      if(this.state.master_item_re_name){
        PropertyRoomListActions.copymasteritem(this.state.property_id, this.state.dlgMaster_id, this.state.master_item_re_name);
        this.setState({
          startSending: true
        });
      }else{
        this.setState({
          showErrorSnack: true
        });
      }
    }

  }

  getMasterItemCopyStatus(){
    let status = PropertyRoomListStore.getMasterItemCopyStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false,
        dlgMaster_id: '',
        master_item_re_name: ''
      });

      PropertyRoomListActions.fetchRoomList(this.state.property_id);

    }
  }


  deleteMasterItem(master_id){

    if(master_id){
      let data = {
        'status' : 0
      }

      PropertyRoomListActions.updatemasteritem(this.state.property_id, master_id, data);
      this.setState({
        startSending: true
      });

    }
  }

  renameMasterItem(){

    if(this.state.dlgMaster_id){
      let data = {
        'name' : this.state.master_item_re_name
      }
      if(this.state.master_item_re_name){
        PropertyRoomListActions.updatemasteritem(this.state.property_id, this.state.dlgMaster_id, data);
        this.setState({
          startSending: true
        });
      }else{
        this.setState({
          showErrorSnack: true
        });
      }
    }
  }

  getMasterItemUpdateStatus(){
    let status = PropertyRoomListStore.getMasterItemUpdateStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false,
        dlgMaster_id: '',
        master_item_re_name: ''
      });

      PropertyRoomListActions.fetchRoomList(this.state.property_id);

    }
  }

  /*
  * MASTER ITEMS-----------------------------------------------------END-------------------------------------------------------
  *
  */


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
      image_url: property_details.image_url,
      logo_img:  null,
    };

    this.setState({
     property_info: property_info,
     startSending: false
    });

  }

  //get status after updating the property records
  getPropUpdateStatus() {
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

    let property_info = this.state.property_info;
    let msg = '';

    console.log(property_info.logo_img );

    if( (property_info.address_1.trim().length == 0 ) || (property_info.postalcode.trim().length == 0) ){
      this.setState({showErrorSnack: true  });
    }
    else{
      if(property_info.logo_img !== null){
        PropertyActions.updatePropertyWithImg(this.state.property_id, this.state.property_info);
        this.setState({
          startSending: true
        });
      }
      else{
        PropertyActions.updateProperty(this.state.property_id, this.state.property_info);
        this.setState({
          startSending: true
        });
      }



    }

    event.preventDefault();
  }

  uploadPropertyLogo(file){

    console.log('updating the image file');
    let property_info = this.state.property_info;
    property_info['logo_img'] = file;
    this.setState({
        property_info: property_info
    });

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

  handleGenSort(oldIndex, newIndex){

    let generals = this.state.general_conditions;
    let generals_list = generals['gen_list'];
    let sorted = false;

    //avoid accidentelly replace general comment item
    let gen_list = [];
    let comment_list = [];
    for(let i =0, l = generals_list.length; i < l ; i++ ){

      if(generals_list[i].type == 'ITEM'){
        gen_list.push(generals_list[i]);
      }
      else{
        comment_list.push(generals_list[i]);
      }

    }

    // going down
    if(newIndex > oldIndex){

      let tempCurrent = gen_list[oldIndex];
      for(let i = (oldIndex + 1), endPos = newIndex ; i <= endPos; i++ ){
        gen_list[i - 1] =  gen_list[i];
      }
      gen_list[newIndex] = tempCurrent;
      sorted = true;
    }
    else if(newIndex < oldIndex){ // going up

      let tempCurrent = gen_list[oldIndex];
      for(let i = (oldIndex - 1), endPos = newIndex ; i >= endPos; i-- ){
        gen_list[i + 1] =  gen_list[i];
      }
      gen_list[newIndex] = tempCurrent;
      sorted = true;
    }

    if(sorted == true){
      //concadinate gen items and comment
      let templist = gen_list.concat(comment_list);

      this.setState({
        general_conditions:{
          gen_list: templist
        }
      });

      GeneralConditionActions.updateSortGeneralCondition(this.state.property_id, this.state.general_conditions.gen_list);

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

  //get sub items
  getSubItems(){

    let store_sub_items = SubItemsStore.getSubItems();
    console.log(store_sub_items);
    let sub_items = this.state.sub_items;
    sub_items['list'] = store_sub_items['list'];
    sub_items['gen_comment'] = store_sub_items['gen_comment'];

    this.setState({
      sub_items: sub_items,
      startSending: false
    });

    this.forceUpdate();
  }

  subItems_handleInputChange = (event) =>{

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let [subItem_id , field, subItemType ] = target.name.split(';');

    let sub_items = this.state.sub_items;
    if(subItemType){
      let gen_item = sub_items['gen_comment'];
      gen_item['comment'] = value;
      sub_items['gen_comment'] = gen_item;

      this.setState({
          sub_items: sub_items
      });

    }
    else{

      let sub_list = sub_items['list'];

      for(let i=0, l= sub_list.length; i < l ; i++ ){
        if( sub_list[i]['prop_subitem_id'] == subItem_id){
          //we found the id so set it
          sub_list[i][field] =  value;
        }
      }
      sub_items['list'] = sub_list;
      this.setState({
          sub_items: sub_items
      });
    }


  }

  //saving the sub items
  subItems_handleSubmit(){

    let sub_items = this.state.sub_items;
    let sub_list = sub_items['list'];

    if( sub_list.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{
      console.log('update full sub items');
      console.log(sub_list);
      SubItemsActions.updateSubItems(this.state.property_id, sub_items['master_id'], sub_list, sub_items['gen_comment'] );

      this.setState({
        startSending: true
      });

    }
    event.preventDefault();

  }

  //get the general condition update status
  getSubItemsUpdateStatus() {

    let status =  SubItemsStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
    }

  }


  /*
  * SUB ITEMS LIST-----------------------------------------END-------------------------------------------------------
  *
  */

  /*
  * SINGLE ITEM--------------------------------------------START-----------------------------------------------------
  *
  */
  //get single item from api
  getSingleItem(){
      let single_item = SingleItemStore.getItem();
      let temp_single_item = {
        reading_value: '',
        option: '',
        description: '',
        comment: '',
        prop_feedback_id: ''
      };

      if(single_item){

        if(Object.keys(single_item).length === 0 && single_item.constructor === Object){

        }
        else{
          temp_single_item = {
            reading_value: '',
            option: (single_item.hasOwnProperty('option') )?single_item.option:'',
            description: (single_item.hasOwnProperty('description') )?single_item.description:'',
            comment: (single_item.hasOwnProperty('comment') )? single_item.comment: '',
            prop_feedback_id: (single_item.hasOwnProperty('prop_feedback_id') ) ? single_item.prop_feedback_id : ''
          };
        }

      }

      //console.log(temp);

      this.setState({
         single_item: temp_single_item,
         startSending: false
      });
      //this.forceUpdate();

  }

  singleItem_handleInputChange(event){
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;


     let single_item = this.state.single_item;
     single_item[name] = value;
     this.setState({
         single_item
     });

     //this.forceUpdate();
  }


  //for saving single item
  singleItem_handleSubmit(){
    let single_item = this.state.single_item;
    this.setState({
      startSending: true,
      single_item,
    });

    single_item['item_id'] = this.state.master_id;
    single_item['parent_id'] = this.state.master_id;
    single_item['type'] = 'ITEM';

    SingleItemActions.updateSingleItem(this.state.property_id, single_item);

    event.preventDefault();

  }

  getSingleItemUpdateStatus(){

    let status =  SingleItemStore.getUpdateStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

    }

  }

  /*
  * SINGLE ITEM--------------------------------------------END-------------------------------------------------------
  *
  */

  /*
  * METER LIST--------------------------------------------START-------------------------------------------------------
  *
  */

  //get meter items
  getMeterItems(){

    let meter_items_list = MeterItemsStore.getItems();

    let meter_items = this.state.meter_items;
    meter_items['meter_list'] = meter_items_list;
    this.setState({
      meter_items: meter_items,
      startSending: false
    });

  }

  //input change
  meterItems_handleInputChange(event){

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let [meter_id , field ] = target.name.split(';');

    let meter_items = this.state.meter_items;
    let meter_list = meter_items['meter_list'];

    for(let i=0, l= meter_list.length; i < l ; i++ ){
      if( meter_list[i]['prop_meter_id'] == meter_id){
        //we found the id so set it
        meter_list[i][field] =  value;
      }
    }
    meter_items['meter_list'] = meter_list;
    this.setState({
        meter_items: meter_items
    });

  }

  //save meter item
  meterItems_handleSubmit(){

    let meter_items = this.state.meter_items;
    let meter_list = meter_items['meter_list'];

    if( meter_list.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{
      MeterItemActions.updateMeterItems(this.state.property_id, meter_list);

      this.setState({
        startSending: true
      });

    }
    event.preventDefault();

  }

  getMeterItemsUpdateStatus(){

    let status =  MeterItemsStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
    }

  }


  /*
  * METER LIST--------------------------------------------END-------------------------------------------------------
  *
  */

  /*
  *PHOTOS ------------------------------------------------START------------------------------------------------------
  *
  */

  //get photos
  getPhotos(){
    let photos = PhotosStore.getPhotos();

    //console.log(photos);
    this.setState({
      photos
    });
  }

  getPhotoDnDUpdateStatus(){
    let status = PhotosStore.getPhotoDnDStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      PhotosActions.fetchPhotos(this.state.property_id, this.state.master_id);

    }
  }


  getPhotoDeleteStatus(){
    let status = PhotosStore.getPhotoDeleteStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      PhotosActions.fetchPhotos(this.state.property_id, this.state.master_id);

    }
  }

  getPhotoUploadStatus(){
    let status = PhotosStore.getPhotoUploadStatus();
    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      PhotosActions.fetchPhotos(this.state.property_id, this.state.master_id);

    }
  }

  // drag and dropped photo
  handleDargDropPhoto(sub_id, photo_id){

    PhotosActions.updateDragDrop(photo_id, sub_id);

    this.setState({
      startSending: true
    });

  }


  handlePhotoDelete(photo_id){

    PhotosActions.deletePhoto(photo_id);

    this.setState({
      startSending: true
    });

  }

  handleUploadPhoto(files, sub_id, type){

    this.setState({
      startSending: true
    });

    for(let i =0, l = files.length; i < l ; i++){
      PhotosActions.uploadPhoto(this.state.property_id, files[i], sub_id, type, this.state.master_id);
    }



  }

  /*
  *PHOTOS ------------------------------------------------END------------------------------------------------------
  *
  */


  /*
  *AUDIOS ------------------------------------------------START------------------------------------------------------
  *
  */

  //get voices
  getVoices(){
    let voices = AudiosStore.getVoices();

    //console.log(voices);
    this.setState({
      voices
    });
  }

  /*
  *AUDIOS ------------------------------------------------END------------------------------------------------------
  *
  */

  /*
  *SINGATURE ------------------------------------------------START------------------------------------------------------
  *
  */

  //get singatures
    getSingatures(){
      let signatures = SignatureStore.getSingatures();

      console.log(signatures);

      if(signatures){
        this.setState({
          signatures
        });
      }
      this.setState({
        startSending: false
      });
    }

    singatures_handleSubmit(){
      let signatures = this.state.signatures;


        SingatureActions.updateSingatures(this.state.property_id, signatures);

        this.setState({
          startSending: true
        });


      event.preventDefault();
    }

    getSingaturesUpdateStatus(){

      let status = SignatureStore.getUpdateStatus();

      if(status){
        this.setState({
          showSuccessSnack: true,
          startSending: false
        });
      }
    }

    handleClearCanvas(type){
      let signatures = this.state.signatures;
      if(type == "TENANT"){
        signatures['tenant_url'] = '';
      }
      else if(type == "LANLORD"){
        signatures['lanlord_url'] = '';
      }
      else if(type == "CLERK"){
        signatures['clerk_url'] = '';
      }

      this.setState({
        signatures
      });
    }

    handleSaveCanvas(type, dataimg){
      let signatures = this.state.signatures;
      if(type == "TENANT"){
        signatures['tenant_url'] = dataimg;
      }
      else if(type == "LANLORD"){
        signatures['lanlord_url'] = dataimg;
      }
      else if(type == "CLERK"){
        signatures['clerk_url'] = dataimg;
      }

      this.setState({
        signatures
      });

    }

    hanldeSignTxtChange(event){
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      let signatures = this.state.signatures;
      signatures['comment'] = value;
      this.setState({
          signatures
      });
    }

  /*
  *SINGATURE ------------------------------------------------END------------------------------------------------------
  *
  */

  /* --------------------- Dialog settings START------------------------*/
  handleChangeMasterRename = (event) => {
    this.setState({
      master_item_re_name: event.target.value,
    });
  };

  handleMasterDelDlgOpen(master_id){
    this.setState({
        showDelMasterItemdlg: true,
        dlgMaster_id: master_id
    });
  };

  handleMasterDelDlgClose = () => {
    this.setState({showDelMasterItemdlg: false,
      dlgMaster_id: ''
    });
  };

  handleMasterDelDlgOk(){
    this.setState({showDelMasterItemdlg: false});
    this.deleteMasterItem(this.state.dlgMaster_id);
  }


  handleMasterRenameDlgOpen(master_id, master_name){
    this.setState({
        showRenameMasterItemdlg: true,
        dlgMaster_id: master_id,
        master_item_re_name: master_name
    });
  };

  handleMasterRenameDlgClose = () => {
    this.setState({
      showRenameMasterItemdlg: false,
      dlgMaster_id: '',
      master_item_re_name: ''
    });
  };

  handleMasterRenameDlgOk(){
    this.setState({showRenameMasterItemdlg: false});
    this.renameMasterItem();
  }


  handleMasterCopyDlgOpen(master_id, master_name){
    this.setState({
        showCopyMasterItemdlg: true,
        dlgMaster_id: master_id,
        master_item_re_name: master_name + "_1"
    });
  };

  handleMasterCopyDlgClose = () => {
    this.setState({
      showCopyMasterItemdlg: false,
      dlgMaster_id: '',
      master_item_re_name: ''
    });
  };

  handleMasterCopyDlgOk(){
    this.setState({showCopyMasterItemdlg: false});
    this.copyRoom();
  }
  /* --------------------- Dialog settings END------------------------*/

  //handles sidebar items click
  sidebarClick = (id, title, item_id) => {

    this.setState({
      sidebarState: id,
      formTitle: title,
      master_id: item_id
    });

    if (id == 'PROP') {
      this.setState({
        startSending: true
      });

      PropertyActions.getProperty(this.state.property_id);

    }
    else if(id == 'GEN'){
      this.setState({
        startSending: true
      });

      GeneralConditionActions.fetchGeneralConditions(this.state.property_id);

    }
    else if(id == 'SUB'){

      let sub_items = this.state.sub_items;
      sub_items['master_id'] = item_id;
      this.setState({
        sub_items: sub_items,
        startSending: true
      });



      SubItemsActions.fetchSubitemslist(this.state.property_id, item_id);

      //get photos
      PhotosActions.fetchPhotos(this.state.property_id, item_id);

      //get voices
      AudiosActions.fetchVoices(this.state.property_id, item_id);
    }
    else if(id == 'METER'){
      this.setState({
        startSending: true
      });
      MeterItemActions.fetchMeterItems(this.state.property_id);

      //get photos
      PhotosActions.fetchPhotos(this.state.property_id, item_id);
    }
    else if(id == 'ITEM'){
      this.setState({
        startSending: true
      });

      SingleItemActions.fetchSingleItem(this.state.property_id, item_id, 'ITEM');

      //get photos
      PhotosActions.fetchPhotosItem(this.state.property_id, item_id);

    }
    else if (id == 'SIG') {
      this.setState({
        startSending: true
      });

      SingatureActions.fetchSingatures(this.state.property_id);

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
      tblProgress: {
        margin: '20px auto',
        textAlign: 'center'
      },
      buttonsrtl:{
        textAlign: 'right',
        paddingRight: 10
      },
      buttons: {
        marginBottom: 10,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5,
        marginRight: 10
      },
      lisort:{
        marginRight: 10,
        position: 'relative',
        marginTop: 5
      },
      dialog: {
        width: 350
      },
      prop_des: {
        color: '#006064',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: '.6'
      }
    };

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

    const rename_modal_actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleMasterRenameDlgClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleMasterRenameDlgOk.bind(this)}
      />,
    ];

    const copy_modal_actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleMasterCopyDlgClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleMasterCopyDlgOk.bind(this)}
      />,
    ];


    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }


    //this is where right side div get rendered
    let right_div = null;

    if(this.state.sidebarState == 'PROP') {

      right_div = <AddProperty address_1={this.state.property_info.address_1} address_2={this.state.property_info.address_2}
        city={this.state.property_info.city} postalcode={this.state.property_info.postalcode}
        report_type={this.state.property_info.report_type} report_date={this.state.property_info.report_date} description={this.state.property_info.description} image_url={this.state.property_info.image_url}
        handleInputChange={this.propinfo_handleInputChange} handleDateChange = {this.propinfo_handleDateChange} handleSubmit={this.propinfo_handleSubmit}  handleSelectChange={this.propinfo_handleSelectChange}
        title={this.state.formTitle} show_cancel={false} uploadfile={this.uploadPropertyLogo.bind(this)} property_id={this.state.property_id}/>
    }
    else if(this.state.sidebarState == 'GEN'){
      right_div = <Generalconditionlist list={this.state.general_conditions.gen_list} title={this.state.formTitle}
        handleGeneralSubmit={this.generalconditions_handleSubmit} handleInputChange={this.generalconditions_handleInputChange} handleSelectChange={this.generalconditions_handleSelectChange}
        handleSort={this.handleGenSort.bind(this)}
      />
    }
    else if(this.state.sidebarState == 'SUB'){
      right_div = <SubItemsList generalcomment={this.state.sub_items.gen_comment} list={this.state.sub_items.list} voices={this.state.sub_items.voices} title={this.state.formTitle}
        handleInputChange={this.subItems_handleInputChange} handleSubmit={this.subItems_handleSubmit} photos={this.state.photos} dragDropPhoto={this.handleDargDropPhoto.bind(this)}
        photoDelete={this.handlePhotoDelete.bind(this)} photoUpload={this.handleUploadPhoto.bind(this)} voices={this.state.voices} showprogress={this.state.startSending} />
    }
    else if(this.state.sidebarState == 'ITEM'){
      right_div = <SingleItem title={this.state.formTitle} data={this.state.single_item} handleInputChange={this.singleItem_handleInputChange} handleSubmit={this.singleItem_handleSubmit}
         photos={this.state.photos} photoDelete={this.handlePhotoDelete.bind(this)} photoUpload={this.handleUploadPhoto.bind(this)} master_id={this.state.master_id}
         showprogress={this.state.startSending}
        />
    }
    else if(this.state.sidebarState == 'METER'){
      right_div = <MeterItems list={this.state.meter_items.meter_list} handleInputChange={this.meterItems_handleInputChange} handleSubmit={this.meterItems_handleSubmit}
        photos={this.state.photos} photoDelete={this.handlePhotoDelete.bind(this)} photoUpload={this.handleUploadPhoto.bind(this)} master_id={this.state.master_id}
        showprogress={this.state.startSending}
        />
    }
    else if(this.state.sidebarState == 'SIG'){

      right_div = <SignatureList list={this.state.signatures} title={this.state.formTitle} handleSubmit={this.singatures_handleSubmit.bind(this)} clearCanvas={this.handleClearCanvas.bind(this)}
        saveCanvas={this.handleSaveCanvas.bind(this)} commentTxtChange={this.hanldeSignTxtChange}/>
     }

    let sidebaritems = [];
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    for(let i=0, l = this.state.roomlist.length; i < l; i++){
      let item = this.state.roomlist[i];
      let copy_room_menu = '';
      if(item.com_type == 'SUB' && item.option == 'NUM'  ){
        copy_room_menu = <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />}  onTouchTap={this.handleMasterCopyDlgOpen.bind(this, item.prop_master_id, item.name ) } />;
      }
      else{
        copy_room_menu = '';
      }

      let rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
          {
            copy_room_menu
          }
          <MenuItem primaryText="Rename" leftIcon={<Edit />} onTouchTap={this.handleMasterRenameDlgOpen.bind(this, item.prop_master_id, item.name)} />
          <MenuItem primaryText="Remove" leftIcon={<Delete />} onTouchTap={this.handleMasterDelDlgOpen.bind(this, item.prop_master_id)} />
        </IconMenu>
      );

      sidebaritems.push(
        <ListItem key={item.prop_master_id}
          leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={teal200} />}
          rightIconButton={rightIconMenu}
          primaryText={item.name}
          secondaryText=""
          onTouchTap={this.sidebarClick.bind(this, item.template_type, item.name , item.prop_master_id)}
        />
      );

    }


    let roomlist_right_wrapper = 'roomlist-right-wrapper';

    let roomlist_right_div_cls = '';
    if(this.state.sidebarState != 'SUB'){
      roomlist_right_div_cls = 'roomlist-right-div';
      roomlist_right_wrapper = '';
    }

    if(this.state.sidebarState == 'PROP' || this.state.sidebarState == 'SIG' || this.state.sidebarState == 'METER' ||  this.state.sidebarState == 'ITEM' ||  this.state.sidebarState == 'GEN' ){
      roomlist_right_div_cls = 'roomlist-right-div-no-height';
      roomlist_right_wrapper = '';
    }


    let roomlist_right_div = `control-wrapper-flex-2 ${roomlist_right_div_cls} scroll-style`;

    let room_list_view = <div className="room-list">
                            <List>
                              <div style={{ padding: 5, backgroundColor: '#E0F7FA', margin: 3}}>
                                <p style={styles.prop_des}>{this.state.property_info.report_type}</p>
                                <p style={styles.prop_des}>{this.state.property_info.report_date}</p>
                              </div>
                              <Subheader inset={true}>Room list</Subheader>

                                <div style={styles.buttonsrtl}>

                                    <FlatButton
                                      onClick={this.handleEnableSort.bind(this)}
                                      label="Sort"
                                      primary={true}
                                      icon={<ActionSort />}
                                    />

                                </div>

                                <ListItem
                                  leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blueGrey300} />}
                                  primaryText="Property Info"
                                  secondaryText="" onClick={this.sidebarClick.bind(this, 'PROP', 'Update Property info', '')}/>

                                <ListItem
                                  leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blueGrey300} />}
                                  primaryText="General Condition"
                                  secondaryText="" onClick={this.sidebarClick.bind(this, 'GEN', 'General condition', '')}/>

                                {sidebaritems}

                                <ListItem
                                  leftAvatar={<Avatar icon={<SignIcon />} backgroundColor={blueGrey300} />}
                                  primaryText="Signatures"
                                  secondaryText="" onClick={this.sidebarClick.bind(this, 'SIG', 'Signatures list', '')}/>

                            </List>
                          </div> ;

    let room_list_sort =  <div className="room-list">
      <Subheader inset={true}>Sort: Room list</Subheader>
        <div style={styles.buttons}>
          <FlatButton
            onClick={this.handleEnableSort.bind(this)}
            label="Done"
            primary={true}
            style={styles.saveButton}
          />
        </div>

      <SortableList items={this.state.roomlist} onSortEnd={this.onSortEnd} useDragHandle={false}/>

    </div> ;


    return(

      <PageBase title="Room List" navigation={ 'Address:- ' +  this.state.property_info.address_1 + ' ' + this.state.property_info.city + ' ' + this.state.property_info.postalcode  }>

        <div className="control-wrapper-container">

          <div className="control-wrapper roomlist-container scroll-style">

            {this.state.enableSort== false &&
              room_list_view
            }

            {this.state.enableSort== true &&
              room_list_sort
            }

          </div>

          <div className={roomlist_right_div}>
            <div className={roomlist_right_wrapper}>
              {isShowSaving}
              {right_div}
            </div>
          </div>

        </div>

        <Dialog
          actions={del_modal_actions}
          modal={false}
          open={this.state.showDelMasterItemdlg}
          onRequestClose={this.handleMasterDelDlgClose}
          contentStyle ={styles.dialog}
        >
          Are you sure do you want to delete this item?
        </Dialog>

        <Dialog
          actions={rename_modal_actions}
          modal={false}
          open={this.state.showRenameMasterItemdlg}
          onRequestClose={this.handleMasterRenameDlgClose}
          contentStyle ={styles.dialog}
        >
          <TextField
            hintText="Room name"
            value={this.state.master_item_re_name}
            floatingLabelText="Rename item"
            onChange={this.handleChangeMasterRename}
          />
        </Dialog>

        <Dialog
          actions={copy_modal_actions}
          modal={false}
          open={this.state.showCopyMasterItemdlg}
          onRequestClose={this.handleMasterCopyDlgClose}
          contentStyle ={styles.dialog}
        >
          <TextField
            hintText="Room name"
            value={this.state.master_item_re_name}
            floatingLabelText="Room name"
            onChange={this.handleChangeMasterRename}
          />
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
