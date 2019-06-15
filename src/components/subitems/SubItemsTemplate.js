import React, { Component, PropTypes } from "react";
import SingleItemElementTemplate from '../singleitem/SingleItemElementTemplate';
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MaterItemSingleTemplate from '../singleitem/MaterItemSingleTemplate';
import ActionSort from 'material-ui/svg-icons/content/sort';
import ActionDrag from 'material-ui/svg-icons/editor/format-line-spacing';
import FlatButton from 'material-ui/FlatButton';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import Subheader from 'material-ui/Subheader';

const DragHandle = SortableHandle(() => <span className="lisort"><ActionDrag /></span>); // This can be any component you want

const SortableItem = SortableElement(({value}) =>
  <li className="SortableItem lisort"> <ActionDrag />{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="SortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.item_name} />
      ))}
    </ul>
  );
});

export default class SubItemsTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      newsubitem: '',
      enableSort : false
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

  handleEnableSort(){
      this.setState({
        enableSort: !this.state.enableSort
      })
  }

  onSortEnd = ({oldIndex, newIndex}) => {

    this.props.handleSort('SUB', oldIndex, newIndex);

  };


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
      buttonsrtl:{
        textAlign: 'right'
      },
      lisort:{
        marginRight: 10,
        position: 'relative',
        marginTop: 5
      },
      saveButton: {
        marginLeft: 5,
        marginRight: 10
      }

    };


    let general_item = [];
    let sub_items = [];
    let subItemCollection = [];

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
        subItemCollection.push(item);
        sub_items.push(
          <SingleItemElementTemplate item_name={item.item_name} key={item.com_subitem_id} sub_id={item.com_subitem_id} update={this.props.updateSubitems} delete={this.props.deleteSubitems}/>
        );
      }

    }

    let sub_items_content = <div>

      <MaterItemSingleTemplate key={this.props.masterid} title={this.props.title} masterid={this.props.master_id} status={this.props.master_status}
        deleteMasterItem={this.props.deleteMasterItem}
        updateMasterItem ={this.props.updateMasterItem}
        updateStatusMasterItem ={this.props.updateStatusMasterItem}
        insertMasterItem = {this.props.insertMasterItem}/>

      <h3 style={{color: '#0097A7', fontSize: 20}}>{this.props.title} - Items</h3>

      <div style={styles.buttonsrtl}>

        <FlatButton
            onClick={this.handleEnableSort.bind(this)}
            label="Sort"
            primary={true}
            icon={<ActionSort />}
        />

      </div>

      {general_item}
      {sub_items}

      <div style={styles.addTextContainer}>
        <TextField hintText="Add sub item" floatingLabelText="Add sub item" name="newsubitem" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
        <FloatingActionButton mini={true} style={styles.addButton} backgroundColor={pink400} onClick={()=>this.props.addSubItem(this.state.newsubitem)}>
          <ContentAdd />
        </FloatingActionButton>
      </div>

    </div>;

    let sub_items_sort = <div>
      <h3 style={{color: '#0097A7', fontSize: 20}}>{this.props.title}</h3>
      <Subheader inset={false}>sorting</Subheader>
      <div style={styles.buttonsrtl}>
           <FlatButton
             onClick={this.handleEnableSort.bind(this)}
             label="Done"
             primary={true}
           />

      </div>
      <SortableList items={subItemCollection} onSortEnd={this.onSortEnd} useDragHandle={false}/>

    </div>;

    return(
      <div>
      {this.state.enableSort== false &&
        sub_items_content
      }

      {this.state.enableSort== true &&
        sub_items_sort
      }

    </div>

    );

  }

}
