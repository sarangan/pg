import React from "react";
import { Link } from "react-router";
import PageBase from '../../components/layout/PageBase';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {blue500, yellow600, teal200} from 'material-ui/styles/colors';
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


import * as TemplateListActions from "../../actions/template/TemplateListActions";
import TemplateListStore from "../../stores/template/TemplateListStore";


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
      formTitle: ''
    };

    GeneralconditionTemplateActions.getGeneralConditionsTemplate();

    this.getTemplateList = this.getTemplateList.bind(this);
    TemplateListActions.fetchTemplateList();


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

  }

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

      GeneralconditionTemplateActions.getGeneralConditionsTemplate();

    }

    event.preventDefault();

  }

  handleDeleteGeneral(gen_id){

    if(gen_id){
      GeneralconditionTemplateActions.deleteGeneralConditionTemplate(gen_id);
      this.setState({
        startSending: true
      });

      GeneralconditionTemplateActions.getGeneralConditionsTemplate();

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

      GeneralconditionTemplateActions.getGeneralConditionsTemplate();

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

    if(sub_id){
      SubItemsTemplateActions.deleteSubItemsTemplate(sub_id);
      this.setState({
        startSending: true
      });

      SubItemsTemplateActions.fetchSubitemstemplate(this.state.sub_items.master_id);

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

      SubItemsTemplateActions.fetchSubitemstemplate(this.state.sub_items.master_id);

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

      MeterListTemplateActions.fetchMeterListtemplate();

    }

    event.preventDefault();
  }

  handleDeleteMeterItem(meter_id){

    if(meter_id){
      MeterListTemplateActions.deleteMeterItemTemplate(meter_id);
      this.setState({
        startSending: true
      });

      MeterListTemplateActions.fetchMeterListtemplate();

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

  //handles sidebar items click
  sidebarClick = (id, title, item_id) => {

    this.setState({
      sidebarState: id,
      formTitle: title
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
      }
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
    if(this.state.sidebarState == 'GEN'){
      right_div = <GeneralconditionTemplate list={this.state.general_conditions.gen_list} title={this.state.formTitle}
        handleGeneralSubmit={this.generalconditions_handleSubmit}
        handleGeneralChipDelete={this.handleGeneralChipDelete.bind(this)}
        addNewOpt={this.handleAddNewOpt.bind(this)}
        addNewComment={this.handleAddGeneralComment.bind(this)}
        deleteItem ={this.handleDeleteGeneral.bind(this) }
        addNewOptionItem = {this.handleAddNewOptItemGeneral.bind(this)}
        editOptionItem = {this.handleEditOptionItem.bind(this)} />
    }
    else if(this.state.sidebarState == 'SUB'){
      right_div = <SubItemsTemplate list={this.state.sub_items.list} title={this.state.formTitle}
        updateSubitems={this.handleSubItemsUpdate.bind(this)}
        deleteSubitems={this.handleDeleteSubitems.bind(this)}
        addSubItem ={this.handleAddSubItem.bind(this)}/>
    }
    else if(this.state.sidebarState == 'METER'){
      right_div = <MeterItemsTemplate list={this.state.meter_list.list} title={this.state.formTitle}
        addMeterItem={this.handleAddMeterItem.bind(this)}
        deleteMeterItem={this.handleDeleteMeterItem.bind(this)}
        updateMeterItem ={this.handleUpdateMeterItem.bind(this)}/>
    }




    let sidebaritems = [];
    for(let i=0, l = this.state.templatelist.length; i < l; i++){
      let item = this.state.templatelist[i];

      let mycolor = teal200;
      if(item.status != 1){
        mycolor = yellow600;
      }
      sidebaritems.push(
        <ListItem key={item.com_master_id}
          leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={mycolor}/>}
          rightIconButton={rightIconMenu}
          primaryText={item.item_name}
          secondaryText=""
          onClick={this.sidebarClick.bind(this, item.type, item.item_name , item.com_master_id)}
        />
      );

    }

    return(
      <PageBase title="Room List Template" navigation="Home / Template / Room list Template">

        <div className="control-wrapper-container">

          <div className="control-wrapper roomlist-container scroll-style">

            <div className="room-list">
              <List>
                <Subheader inset={true}>Room list</Subheader>

                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={grey400} />}
                    primaryText="General Condition"
                    secondaryText="" onClick={this.sidebarClick.bind(this, 'GEN', 'General condition', '')} />

                  {sidebaritems}

              </List>
            </div>

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
