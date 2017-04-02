import React, { Component, PropTypes } from "react";
import SingleItemElementTemplate from '../singleitem/SingleItemElementTemplate';
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MaterItemSingleTemplate from '../singleitem/MaterItemSingleTemplate';

export default class SubItemsTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      newsubitem: ''
    };
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleInputChange(event){
    const target = event.target;
    this.setState({
      newsubitem : target.value
    });
  }

  render() {

    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 50,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
      },
      deletebtn:{
        color: yellow400
      },
      floatingLabelStyle: {
        color: lightGreen500,
      },
      floatingLabelFocusStyle: {
        color: blue500,
      },
      addTextContainer: {
        paddingLeft: 20,
      },
      addButton:{
        marginRight: 20
      },


    };


    let general_item = [];
    let sub_items = [];

    for(let i=0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];

      if(item.type == 'GENERAL'){
        general_item.push(
          <div style={styles.addTextContainer} key={item.com_subitem_id}>
          <TextField disabled={true}  defaultValue={item.item_name} name="generalitem" floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
          </div>
        );
      }
      else if(item.type == 'ITEM'){
        sub_items.push(
          <SingleItemElementTemplate item_name={item.item_name} key={item.com_subitem_id} sub_id={item.com_subitem_id} update={this.props.updateSubitems} delete={this.props.deleteSubitems}/>
        );
      }

    }

    return(
      <div>

        <MaterItemSingleTemplate key={this.props.masterid} title={this.props.title} masterid={this.props.master_id} status={this.props.master_status}
          deleteMasterItem={this.props.deleteMasterItem}
          updateMasterItem ={this.props.updateMasterItem}
          updateStatusMasterItem ={this.props.updateStatusMasterItem}
          insertMasterItem = {this.props.insertMasterItem}/>

        {general_item}
        {sub_items}

        <div style={styles.addTextContainer}>
          <TextField hintText="Add sub item" floatingLabelText="Add sub item" name="newsubitem" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
          <FloatingActionButton mini={true} style={styles.addButton} backgroundColor={pink400} onClick={()=>this.props.addSubItem(this.state.newsubitem)}>
            <ContentAdd />
          </FloatingActionButton>
        </div>

      </div>
    );

  }

}
