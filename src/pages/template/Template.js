import React from "react";
import { Link } from "react-router";
import PageBase from '../../components/layout/PageBase';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {blue500, yellow600, teal200, grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileFolder from 'material-ui/svg-icons/file/folder-open';
import ActionSort from 'material-ui/svg-icons/content/sort';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionDrag from 'material-ui/svg-icons/editor/format-line-spacing';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/content/create';
import EnableIcon from 'material-ui/svg-icons/action/visibility';
import DisableIcon from 'material-ui/svg-icons/action/visibility-off';

import * as TemplateListActions from "../../actions/template/TemplateListActions";
import TemplateListStore from "../../stores/template/TemplateListStore";

import MaterItemSingleTemplate from '../../components/singleitem/MaterItemSingleTemplate';



//General Conditions
import GeneralconditionTemplate from '../../components/generalconditions/GeneralconditionTemplate';
import * as GeneralconditionTemplateActions from "../../actions/template/GeneralconditionTemplateActions";
import GeneralConditionTemplateStore from "../../stores/template/GeneralConditionTemplateStore";


//sub items
import SubItemsTemplate from '../../components/subitems/SubItemsTemplate';
import * as SubItemsTemplateActions from "../../actions/template/SubItemsTemplateActions";
import SubItemsTemplateStore from "../../stores/template/SubItemsTemplateStore";

//meter items
import MeterItemsTemplate from '../../components/meteritems/MeterItemsTemplate';
import * as MeterListTemplateActions from "../../actions/template/MeterListTemplateActions";
import MeteritemsTemplateStore from "../../stores/template/MeteritemsTemplateStore";


//-----------------------------master items sorting start -------------------------

const DragHandle = SortableHandle(() => <span className="lisort"><ActionDrag /></span>); // This can be any component you want

const SortableItem = SortableElement(({value}) =>
  <li className="SortableItem lisort"> <ActionDrag style={ {marginRight: 10} }/>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="SortableList master-item-sortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.item_name} />
      ))}
    </ul>
  );
});

//-----------------------------master items sorting end ---------------------

export default class Template extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      templatelist: [],
      general_conditions:{
        gen_list: []
      },
      sub_items: {
        list: [],
        master_id: ''
      },
      meter_list:{
        list : []
      },
      sidebarState: 'GEN',
      startSending: true,
      showErrorSnack: false,
      showSuccessSnack: false,
      formTitle: '',
      master_id : '',
      master_status : true,
      dialog: false,
      addNewItem: '',
      itemType: 'ITEM',
      enableSort: false,
      showDelMasterItemdlg: false,
      showRenameMasterItemdlg: false,
      showCopyMasterItemdlg: false,
      dlgMaster_id : '',
      master_item_re_name: '',
    };

    GeneralconditionTemplateActions.getGeneralConditionsTemplate();

    this.getTemplateList = this.getTemplateList.bind(this);
    TemplateListActions.fetchTemplateList();
    this.getMasteritemTemplateDeleteStatus = this.getMasteritemTemplateDeleteStatus.bind(this);
    this.getMasterItemTemplateUpdateStatus = this.getMasterItemTemplateUpdateStatus.bind(this);
    this.getMasterItemTemplateInsertStatus = this.getMasterItemTemplateInsertStatus.bind(this);

    //general condition
    this.getGeneralConditionsTempalte = this.getGeneralConditionsTempalte.bind(this);
    this.getGenConTemplateUpdateStatus = this.getGenConTemplateUpdateStatus.bind(this);
    this.getGenConTemplateInsertStatus = this.getGenConTemplateInsertStatus.bind(this);
    this.getGenConTemplateDeleteStatus = this.getGenConTemplateDeleteStatus.bind(this);

    this.generalconditions_handleSubmit = this.generalconditions_handleSubmit.bind(this);

    //sub items
    this.getSubItemsTempalte = this.getSubItemsTempalte.bind(this);
    this.getSubItemsTemplateUpdateStatus = this.getSubItemsTemplateUpdateStatus.bind(this);
    this.getSubItemsTemplateDeleteStatus = this.getSubItemsTemplateDeleteStatus.bind(this);
    this.getSubItemsTemplateInsertStatus = this.getSubItemsTemplateInsertStatus.bind(this);

    //meter list
    this.getMeterListTempalte = this.getMeterListTempalte.bind(this);
    this.getMeterItemTemplateInsertStatus = this.getMeterItemTemplateInsertStatus.bind(this);
    this.getMeterItemTemplateDeleteStatus = this.getMeterItemTemplateDeleteStatus.bind(this);
    this.getMeterListTemplateUpdateStatus = this.getMeterListTemplateUpdateStatus.bind(this);
  }


  componentWillMount() {
    TemplateListStore.on("change", this.getTemplateList);
    TemplateListStore.on("change", this.getMasteritemTemplateDeleteStatus);
    TemplateListStore.on("change", this.getMasterItemTemplateUpdateStatus);
    TemplateListStore.on("change", this.getMasterItemTemplateInsertStatus);

    //general condition
    GeneralConditionTemplateStore.on("change", this.getGeneralConditionsTempalte);
    GeneralConditionTemplateStore.on("change", this.getGenConTemplateUpdateStatus);
    GeneralConditionTemplateStore.on("change", this.getGenConTemplateInsertStatus);
    GeneralConditionTemplateStore.on("change", this.getGenConTemplateDeleteStatus);
    //sub items
    SubItemsTemplateStore.on("change", this.getSubItemsTempalte);
    SubItemsTemplateStore.on("change", this.getSubItemsTemplateUpdateStatus);
    SubItemsTemplateStore.on("change", this.getSubItemsTemplateDeleteStatus);
    SubItemsTemplateStore.on("change", this.getSubItemsTemplateInsertStatus);
    //meter list
    MeteritemsTemplateStore.on("change", this.getMeterListTempalte);
    MeteritemsTemplateStore.on("change", this.getMeterItemTemplateInsertStatus);
    MeteritemsTemplateStore.on("change", this.getMeterItemTemplateDeleteStatus);
    MeteritemsTemplateStore.on("change", this.getMeterListTemplateUpdateStatus);

  }

  componentWillUnmount() {
    TemplateListStore.removeListener("change", this.getTemplateList);
    TemplateListStore.removeListener("change", this.getMasteritemTemplateDeleteStatus);
    TemplateListStore.removeListener("change", this.getMasterItemTemplateUpdateStatus);
    TemplateListStore.removeListener("change", this.getMasterItemTemplateInsertStatus);

    //general condition
    GeneralConditionTemplateStore.removeListener("change", this.getGeneralConditionsTempalte);
    GeneralConditionTemplateStore.removeListener("change", this.getGenConTemplateUpdateStatus);
    GeneralConditionTemplateStore.removeListener("change", this.getGenConTemplateInsertStatus);
    GeneralConditionTemplateStore.removeListener("change", this.getGenConTemplateDeleteStatus);
    //sub items
    SubItemsTemplateStore.removeListener("change", this.getSubItemsTempalte);
    SubItemsTemplateStore.removeListener("change", this.getSubItemsTemplateUpdateStatus);
    SubItemsTemplateStore.removeListener("change", this.getSubItemsTemplateDeleteStatus);
    SubItemsTemplateStore.removeListener("change", this.getSubItemsTemplateInsertStatus);
    //meter list
    MeteritemsTemplateStore.removeListener("change", this.getMeterListTempalte);
    MeteritemsTemplateStore.removeListener("change", this.getMeterItemTemplateInsertStatus);
    MeteritemsTemplateStore.removeListener("change", this.getMeterItemTemplateDeleteStatus);
    MeteritemsTemplateStore.removeListener("change", this.getMeterListTemplateUpdateStatus);
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


  getTemplateList(){

    this.setState({
      templatelist: TemplateListStore.getTemplateList(),
      startSending: false
    });
    //console.log(this.state.templatelist);
  }

  handleDeleteMasterItem(master_id){

    if(master_id){
      TemplateListActions.deleteMasterItemTemplate(master_id);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();

  }

  //get the general condition delete status
  getMasteritemTemplateDeleteStatus(){
    let status =  TemplateListStore.getDeleteStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
      TemplateListActions.fetchTemplateList();
    }



  }

  //submit data
  masterlist_handleSubmit(){

    let master_items = this.state.templatelist;

    if( master_items.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{

      TemplateListActions.updateMasteritemTemplate(master_items);
      this.setState({
        startSending: true
      });
    }
    event.preventDefault();
  }

  //get the general condition template update status
  getMasterItemTemplateUpdateStatus(){
    let status =  TemplateListStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      TemplateListActions.fetchTemplateList();
    }


  }

  handleUpdateMasterItem(master_id, text, type='name'){

    if(typeof type == 'undefined' ){
      type = 'name'
    }

    if(master_id ){

      let master_items = this.state.templatelist;

      let chk = false;

      for(let i =0, l = master_items.length; i < l ; i++ ){
        let item = master_items[i];
        if( item.com_master_id == master_id ){
          if(type == 'name'){
            item.item_name = text;
          }
          else if(type == 'status'){

            item.status = (text)? 1 : 2;
          }
          chk = true;
          break;
        }
      }

      this.setState({
        templatelist : master_items
      });

      if(chk){
        this.masterlist_handleSubmit()
      }

    }

  }

  //get the general condition template insert status
  getMasterItemTemplateInsertStatus(){
    let status =  TemplateListStore.getInsertStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      TemplateListActions.fetchTemplateList();

    }
  }

  handleAddMasterItem(master_item, type){

    if(master_item.trim().length > 0){
      let insert_data = {
        item_name : master_item.trim(),
        priority :  1,
        type : type
      };
      this.setState({
        startSending: true
      });
      TemplateListActions.insertMasterItemTemplate(insert_data);
    }

    event.preventDefault();
  }


  // handle sort event
  handleEnableSort(){
      this.setState({
        enableSort: !this.state.enableSort
      })
  }


  onSortEnd = ({oldIndex, newIndex}) => {

    let room_list = this.state.templatelist;
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
        templatelist: room_list
      });

      TemplateListActions.sortMasteritemTemplate(this.state.templatelist);

    }

  };


  /*
  * GENERAL CONDITION LIST--------------------------------------------START-------------------------------------------------------
  *
  */

  //general condition list template
  getGeneralConditionsTempalte(){

      let gen_list = GeneralConditionTemplateStore.getTemplateList();
      let generals = this.state.general_conditions;
      generals['gen_list'] = gen_list;
      this.setState({
        general_conditions: generals,
        startSending: false
      });

      this.forceUpdate();
      console.log(this.state.general_conditions);
  }

  //get the general condition template update status
  getGenConTemplateUpdateStatus(){
    let status =  GeneralConditionTemplateStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      GeneralconditionTemplateActions.getGeneralConditionsTemplate();

    }
  }

  //get the general condition template insert status
  getGenConTemplateInsertStatus(){
    let status =  GeneralConditionTemplateStore.getInsertStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
      GeneralconditionTemplateActions.getGeneralConditionsTemplate();
    }
  }

  //get the general condition delete status
  getGenConTemplateDeleteStatus(){
    let status =  GeneralConditionTemplateStore.getDeleteStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });
      GeneralconditionTemplateActions.getGeneralConditionsTemplate();
    }

  }

  //Delete chips data
  handleGeneralChipDelete(com_general_id, index){

     let generals = this.state.general_conditions;
     let gen_list = generals['gen_list'];

     let chk = false;

     for(let i =0, l = gen_list.length; i < l ; i++ ){
       let item = gen_list[i];
       if( item.com_general_id == com_general_id ){
         let opts = item.options;
         let opts_arr = opts.split(';');
         opts_arr.splice(index, 1);
         item.options = opts_arr.join(';');
         chk = true;
         break;
       }

     }

     this.setState({
       general_conditions : generals
     });

     if(chk){
       this.generalconditions_handleSubmit()
     }


  }

  //add new chipData
  handleAddNewOpt(newOpt, com_general_id){

    if(newOpt.trim().length > 0){

      let generals = this.state.general_conditions;
      let gen_list = generals['gen_list'];
      let chk = false;

      for(let i =0, l = gen_list.length; i < l ; i++ ){
        let item = gen_list[i];
        if( item.com_general_id == com_general_id ){
          let opts = item.options;
          let opts_arr = opts.split(';');
          opts_arr.push(newOpt.replace(';' , '') );
          opts = opts_arr.join(';');
          item.options = opts;
          chk = true;
          break;
        }
      }

      this.setState({
        general_conditions : generals
      });

      if(chk){
        this.generalconditions_handleSubmit()
      }

    }

  }

  //add new general comment
  handleAddGeneralComment(comment){

    if(comment.trim().length > 0){
      let insert_data = {
        item_name : comment.trim(),
        options : '',
        priority :  1,
        type : 'COMMENT'
      };
      GeneralconditionTemplateActions.insertGeneralConditionTemplate(insert_data);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();

  }

  handleDeleteGeneral(gen_id){

    if(gen_id){
      GeneralconditionTemplateActions.deleteGeneralConditionTemplate(gen_id);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }

  //submit data
  generalconditions_handleSubmit(){

    let generals = this.state.general_conditions;
    let gen_list = generals['gen_list'];

    if( gen_list.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{
      GeneralconditionTemplateActions.updateGeneralConditionTemplate(gen_list);
      this.setState({
        startSending: true
      });
    }
    event.preventDefault();
  }


  //add new option for general CONDITION
  handleAddNewOptItemGeneral(optItem){

    if(optItem.trim().length > 0){
      let insert_data = {
        item_name : optItem.trim(),
        options : '',
        priority :  1,
        type : 'ITEM'
      };
      GeneralconditionTemplateActions.insertGeneralConditionTemplate(insert_data);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }

  handleEditOptionItem(edit_com_gen_id, edit_opt){

    if(edit_opt.trim().length > 0){

      let generals = this.state.general_conditions;
      let gen_list = generals['gen_list'];
      let chk = false;

      for(let i =0, l = gen_list.length; i < l ; i++ ){
        let item = gen_list[i];
        if( item.com_general_id == edit_com_gen_id ){
          item.item_name = edit_opt;
          chk = true;
          break;
        }
      }

      this.setState({
        general_conditions : generals
      });

      if(chk){
        this.generalconditions_handleSubmit()
      }

    }

  }

  /*
  * GENERAL CONDITION LIST--------------------------------------------END-------------------------------------------------------
  *
  */


  /*
  * SUBITEMS LIST--------------------------------------------START-------------------------------------------------------
  *
  */

  //sub items list template
  getSubItemsTempalte(){

      let subitems_list = SubItemsTemplateStore.getSubitemsTemplate();

      let subitems = this.state.sub_items;
      subitems['list'] = subitems_list;
      this.setState({
        sub_items: subitems,
        startSending: false
      });

  }

  // sub items update status
  getSubItemsTemplateUpdateStatus(){
    let status =  SubItemsTemplateStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      SubItemsTemplateActions.fetchSubitemstemplate(this.state.sub_items.master_id);

    }

  }

  //sub items delete status
  getSubItemsTemplateDeleteStatus(){
    let status =  SubItemsTemplateStore.getDeleteStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      SubItemsTemplateActions.fetchSubitemstemplate(this.state.sub_items.master_id);
    }

  }

  //get the general condition template insert status
  getSubItemsTemplateInsertStatus(){
    let status =  SubItemsTemplateStore.getInsertStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      SubItemsTemplateActions.fetchSubitemstemplate(this.state.sub_items.master_id);
    }
  }


  //submit data
  subitems_handleSubmit(){

    let subitems = this.state.sub_items;
    let subitems_list = subitems['list'];

    if( subitems_list.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{
      SubItemsTemplateActions.updateSubItemsTemplate(subitems_list);
      this.setState({
        startSending: true
      });
    }
    event.preventDefault();
  }

  //update sub items
  handleSubItemsUpdate(sub_id, text){

    if(sub_id && text ){

      let subitems = this.state.sub_items;
      let subitems_list = subitems['list'];
      let chk = false;

      for(let i =0, l = subitems_list.length; i < l ; i++ ){
        let item = subitems_list[i];
        if( item.com_subitem_id == sub_id ){
          item.item_name = text;
          chk = true;
          break;
        }
      }

      this.setState({
        sub_items : subitems
      });

      if(chk){
        this.subitems_handleSubmit()
      }

    }

  }

  handleDeleteSubitems(sub_id){
    console.log(sub_id);
    if(sub_id){
      SubItemsTemplateActions.deleteSubItemsTemplate(sub_id);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }

  //add new sub item
  handleAddSubItem(sub_item){

    if(sub_item.trim().length > 0){
      let insert_data = {
        item_name : sub_item.trim(),
        priority :  1,
        type : 'ITEM',
        com_master_id: this.state.sub_items.master_id
      };
      SubItemsTemplateActions.insertSubItemTemplate(insert_data);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }

  /*
  * SUBITEMS LIST--------------------------------------------END-------------------------------------------------------
  *
  */


  /*
  * METER LIST--------------------------------------------START-------------------------------------------------------
  *
  */

  //get meter list
  getMeterListTempalte(){
    let meter_list = MeteritemsTemplateStore.getMeterlistTemplate();
    console.log(meter_list);
    let meterlist = this.state.meter_list;
    meterlist['list'] = meter_list;
    this.setState({
      meter_list: meterlist,
      startSending: false
    });

  }

  //get add new meter item
  getMeterItemTemplateInsertStatus(){
    let status =  MeteritemsTemplateStore.getInsertStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      MeterListTemplateActions.fetchMeterListtemplate();
    }
  }

  //meter item delete status
  getMeterItemTemplateDeleteStatus(){
    let status =  MeteritemsTemplateStore.getDeleteStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      MeterListTemplateActions.fetchMeterListtemplate();

    }

  }


  // meter item update status
  getMeterListTemplateUpdateStatus(){
    let status =  MeteritemsTemplateStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      MeterListTemplateActions.fetchMeterListtemplate();
    }

  }

  //add new meter item
  handleAddMeterItem(meter_item){

    if(meter_item.trim().length > 0){
      let insert_data = {
        meter_name : meter_item.trim()
      };
      MeterListTemplateActions.insertMeterItemTemplate(insert_data);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }

  handleDeleteMeterItem(meter_id){

    if(meter_id){
      MeterListTemplateActions.deleteMeterItemTemplate(meter_id);
      this.setState({
        startSending: true
      });

    }

    event.preventDefault();
  }

  //submit data
  meterlist_handleSubmit(){

    let meteritems = this.state.meter_list;
    let meter_list = meteritems['list'];

    if( meter_list.length == 0 ){
      this.setState({showErrorSnack: true  });
    }
    else{
      MeterListTemplateActions.updateMeterListTemplate(meter_list);
      this.setState({
        startSending: true
      });
    }
    event.preventDefault();
  }

  //update meter item
  handleUpdateMeterItem(meter_id, text){

    if(meter_id && text ){

      let meteritems = this.state.meter_list;
      let meter_list = meteritems['list'];
      let chk = false;

      for(let i =0, l = meter_list.length; i < l ; i++ ){
        let item = meter_list[i];
        if( item.com_meter_id == meter_id ){
          item.meter_name = text;
          chk = true;
          break;
        }
      }

      this.setState({
        meter_list : meteritems
      });

      if(chk){
        this.meterlist_handleSubmit()
      }

    }

  }

  /*
  * METER LIST--------------------------------------------END-------------------------------------------------------
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
    this.handleDeleteMasterItem(this.state.dlgMaster_id);
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
    this.handleUpdateMasterItem(this.state.dlgMaster_id, this.state.master_item_re_name, 'name');
  }
    /* --------------------- Dialog settings START------------------------*/

  handleDialogOpen = () => {
    this.setState({dialog: true});
  };

  handleDialogClose = () => {
    this.setState({dialog: false});

    if(this.state.addNewItem.trim().length > 0){
      //call save
      let insert_data = {
        item_name: this.state.addNewItem.trim(),
        type: this.state.itemType
      };

      TemplateListActions.insertMasterItemTemplate(insert_data);
      this.setState({
        startSending: true
      });


    }
    else{
      console.log('Empty dialog');
    }

  };

  handleAddMasterItemInputChange(event){
    const target = event.target;
    this.setState({
      addNewItem : target.value
    });
  }

  //input change
  addNewMaster_handleInputChange(event){

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      itemType : value
    });


  }


  //template sorting
  handleTemplateSort(type, oldIndex, newIndex){

    let sorted = false;
    let template_list = null;

    // just fot the sake of comments
    let item_list = [];
    let comment_list = [];

    console.log(this.state.sub_items);


    if( type == 'GEN'){
      let generals = this.state.general_conditions;
      let generals_list = generals['gen_list'];

      //avoid accidentelly replace general comment item
      item_list = [];
      comment_list = [];
      for(let i =0, l = generals_list.length; i < l ; i++ ){

        if(generals_list[i].type == 'ITEM'){
          item_list.push(generals_list[i]);
        }
        else{
          comment_list.push(generals_list[i]);
        }

      }

      template_list = item_list;

    }
    else if(type == 'SUB'){
      let subitems = this.state.sub_items;
      let subitems_list = subitems['list'];

      item_list = [];
      comment_list = [];
      for(let i =0, l = subitems_list.length; i < l ; i++ ){

        if(subitems_list[i].type == 'ITEM'){
          item_list.push(subitems_list[i]);
        }
        else{
          comment_list.push(subitems_list[i]);
        }

      }

      template_list = item_list;
    }


    // going down
    if(newIndex > oldIndex){

      let tempCurrent = template_list[oldIndex];
      for(let i = (oldIndex + 1), endPos = newIndex ; i <= endPos; i++ ){
        template_list[i - 1] =  template_list[i];
      }
      template_list[newIndex] = tempCurrent;
      sorted = true;
    }
    else if(newIndex < oldIndex){ // going up

      let tempCurrent = template_list[oldIndex];
      for(let i = (oldIndex - 1), endPos = newIndex ; i >= endPos; i-- ){
        template_list[i + 1] =  template_list[i];
      }
      template_list[newIndex] = tempCurrent;
      sorted = true;
    }


    if(sorted == true){

      item_list = template_list;

      //concadinate gen items and comment
      let templist = item_list.concat(comment_list);


      if( type == 'GEN'){

        this.setState({
          general_conditions:{
            gen_list: templist
          }
        });

        GeneralconditionTemplateActions.updateSortGeneralConditionTemplate( this.state.general_conditions.gen_list);

      }
      else if( type == 'SUB'){

        this.setState({
          sub_items:{
            list: templist
          }
        });

        SubItemsTemplateActions.updateSortSubItemsTemplate( this.state.sub_items.list);

      }


    }

  }

  //handles sidebar items click
  sidebarClick = (id, title, item_id, status) => {

    this.setState({
      sidebarState: id,
      formTitle: title,
      master_status: (status == 1)?  true : false,
      master_id: item_id
    });

    if(id == 'GEN'){
      this.setState({
        startSending: true
      });

      GeneralconditionTemplateActions.getGeneralConditionsTemplate();

    }
    else if(id == 'SUB'){
      let subitems = this.state.sub_items;
      subitems['master_id'] = item_id;
      this.setState({
        startSending: true,
        sub_items: subitems
      });

      SubItemsTemplateActions.fetchSubitemstemplate(item_id);
    }
    else if(id == 'METER'){

      MeterListTemplateActions.fetchMeterListtemplate();

      this.setState({
        startSending: true
      });

    }
    else if(id == 'ITEM'){
      //nothiong to do\
      this.setState({
        master_id: item_id,
      });

    }


  };


  render(){

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
      progressbar:{
        width: 'auto',
        height: 20
      },
      optAdd:{
        marginTop: 10,
        marginBottom: 10,
        width: '61%'
      },
      dialog: {
        width: 350
      },
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
        marginTop:16
      },
      select: {
        marginTop: 10
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
      }
    };

    const actions = [

        <FlatButton
          label="Cancel"
          primary={false}
          keyboardFocused={false}
          onTouchTap={this.handleDialogClose}
        />,
        <FlatButton
          label="Ok"
          primary={false}
          keyboardFocused={true}
          onTouchTap={this.handleDialogClose}
          />
    ];

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

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
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
    if(this.state.sidebarState == 'GEN'){
      right_div = <GeneralconditionTemplate list={this.state.general_conditions.gen_list} title={this.state.formTitle}
        handleGeneralSubmit={this.generalconditions_handleSubmit}
        handleGeneralChipDelete={this.handleGeneralChipDelete.bind(this)}
        addNewOpt={this.handleAddNewOpt.bind(this)}
        addNewComment={this.handleAddGeneralComment.bind(this)}
        deleteItem ={this.handleDeleteGeneral.bind(this) }
        addNewOptionItem = {this.handleAddNewOptItemGeneral.bind(this)}
        editOptionItem = {this.handleEditOptionItem.bind(this)}
        handleSort={this.handleTemplateSort.bind(this)}
      />
    }
    else if(this.state.sidebarState == 'SUB'){
      right_div = <SubItemsTemplate list={this.state.sub_items.list} title={this.state.formTitle}
        updateSubitems={this.handleSubItemsUpdate.bind(this)}
        deleteSubitems={this.handleDeleteSubitems.bind(this)}
        addSubItem ={this.handleAddSubItem.bind(this)}
        master_id={this.state.master_id} master_status={this.state.master_status}
        deleteMasterItem={this.handleDeleteMasterItem.bind(this)}
        updateMasterItem ={this.handleUpdateMasterItem.bind(this)}
        updateStatusMasterItem ={this.handleUpdateMasterItem.bind(this)}
        insertMasterItem = {this.handleAddMasterItem.bind(this)}
        handleSort={this.handleTemplateSort.bind(this)}
        />
    }
    else if(this.state.sidebarState == 'METER'){
      right_div = <MeterItemsTemplate list={this.state.meter_list.list} title={this.state.formTitle}
        addMeterItem={this.handleAddMeterItem.bind(this)}
        deleteMeterItem={this.handleDeleteMeterItem.bind(this)}
        updateMeterItem ={this.handleUpdateMeterItem.bind(this)}
        master_id={this.state.master_id} master_status={this.state.master_status}
          deleteMasterItem={this.handleDeleteMasterItem.bind(this)}
          updateMasterItem ={this.handleUpdateMasterItem.bind(this)}
          updateStatusMasterItem ={this.handleUpdateMasterItem.bind(this)}
          insertMasterItem = {this.handleAddMasterItem.bind(this)}
        />
    }
    else if(this.state.sidebarState == 'ITEM'){
      right_div = <MaterItemSingleTemplate key={this.state.master_id} title={this.state.formTitle} masterid={this.state.master_id} status={this.state.master_status}
        deleteMasterItem={this.handleDeleteMasterItem.bind(this)}
        updateMasterItem ={this.handleUpdateMasterItem.bind(this)}
        updateStatusMasterItem ={this.handleUpdateMasterItem.bind(this)}
        insertMasterItem = {this.handleAddMasterItem.bind(this)}/>
    }



    let sidebaritems = [];
    for(let i=0, l = this.state.templatelist.length; i < l; i++){
      let item = this.state.templatelist[i];

      let mycolor = teal200;
      let statusTxt = 'Disable';
      let statusIcon = <DisableIcon />;
      let statusVar = (item.status == 1)?true:false;
      if(item.status != 1){
        mycolor = yellow600;
        statusTxt = 'Enable';
        statusIcon = <EnableIcon />;
      }


      let rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem primaryText="Rename" leftIcon={<Edit />} onTouchTap={this.handleMasterRenameDlgOpen.bind(this, item.com_master_id, item.item_name)} />
          <MenuItem primaryText="Delete" leftIcon={<Delete />} onTouchTap={this.handleMasterDelDlgOpen.bind(this, item.com_master_id)} />
          <MenuItem primaryText={statusTxt} leftIcon={statusIcon} onTouchTap={this.handleUpdateMasterItem.bind(this, item.com_master_id, !statusVar , 'status' )} />
        </IconMenu>
      );

      sidebaritems.push(
        <ListItem key={item.com_master_id}
          leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={mycolor}/>}
          rightIconButton={rightIconMenu}
          primaryText={item.item_name}
          secondaryText=""
          onTouchTap={this.sidebarClick.bind(this, item.type, item.item_name , item.com_master_id, item.status)}
        />
      );

    }


    let room_list_template =
                <div className="room-list">
                  <List>
                    <Subheader inset={true}>Room list</Subheader>

                      <div style={styles.buttonsrtl}>

                          <RaisedButton
                             label="Add new item"
                             labelPosition="after"
                             primary={true}
                             icon={<ContentAdd />}
                             style={styles.optAdd}
                             onTouchTap={this.handleDialogOpen.bind(this)}
                           />

                           <FlatButton
                             onClick={this.handleEnableSort.bind(this)}
                             label="Sort"
                             primary={true}
                             icon={<ActionSort />}
                           />

                      </div>

                     <Dialog
                       title="Add new item"
                       actions={actions}
                       modal={false}
                       open={this.state.dialog}
                       onRequestClose={this.handleDialogClose.bind(this)}
                       contentStyle ={styles.dialog} >
                       <TextField hintText="Add new item" floatingLabelText="Add new item" name="addnewitem" onChange={this.handleAddMasterItemInputChange.bind(this)}/>

                       <div style={styles.select}>Select type:</div>
                       <RadioButtonGroup name="notRight" style={styles.rdbblock} onChange={this.addNewMaster_handleInputChange.bind(this)} defaultSelected="ITEM">

                         <RadioButton
                           value="ITEM"
                           label="Single item"
                           style={styles.radioButton}
                         />
                         <RadioButton
                            value="SUB"
                            label="Sub items"
                            style={styles.radioButton}
                          />

                       </RadioButtonGroup>

                     </Dialog>

                      <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={grey400} />}
                        primaryText="General Condition"
                        secondaryText="" onClick={this.sidebarClick.bind(this, 'GEN', 'General condition', '')} />

                      {sidebaritems}

                  </List>
                </div>;

    let room_list_sort = <div className="room-list">

        <Subheader inset={true}>Sort: Room list</Subheader>

          <div style={styles.buttonsrtl}>
               <FlatButton
                 onClick={this.handleEnableSort.bind(this)}
                 label="Done"
                 primary={true}
               />

          </div>

          <SortableList items={this.state.templatelist} onSortEnd={this.onSortEnd} useDragHandle={false}/>

    </div>;

    return(
      <PageBase title="Room List Template" navigation="">

        <div className="control-wrapper-container">

          <div className="control-wrapper roomlist-container scroll-style">

            {this.state.enableSort== false &&
              room_list_template
            }

            {this.state.enableSort== true &&
              room_list_sort
            }

          </div>

          <div className="control-wrapper-flex-2">
            <div>
              {isShowSaving}
            </div>

            <div className="roomlist-right-wrapper scroll-style">

                <div className='roomlist-right-div scroll-style'>
                  {right_div}
                </div>

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
