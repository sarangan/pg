import React, { Component } from "react";
import {blue100, lightGreen500, blue500, pink400, cyan800, orange700, cyan400} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import ActionSort from 'material-ui/svg-icons/content/sort';
import ActionDrag from 'material-ui/svg-icons/editor/format-line-spacing';
import FlatButton from 'material-ui/FlatButton';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import Subheader from 'material-ui/Subheader';

import GeneralChipElement from './GeneralChipElement';
import GeneralTemplateComment from './GeneralTemplateComment';


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

export default class GeneralconditionTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state = {
      chipData: [],
      comment: '',
      dialog: false,
      addOpt: '',
      deldialog: false,
      del_com_gen_id: '',
      editdialog: false,
      edit_opt: '',
      edit_com_gen_id: '',
      enableSort : false
    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleDialogOpen = () => {
    this.setState({dialog: true});
  };

  handleDialogClose = () => {
    this.setState({dialog: false});

    if(this.state.addOpt.trim().length > 0){
      this.props.addNewOptionItem(this.state.addOpt);
    }
    else{
      console.log('Empty dialog');
    }

  };


  handleDelDialogOpen = (del_com_gen_id) => {
    this.setState(
      {
        deldialog: true,
        del_com_gen_id
      }
    );

  };

  handleDelDialogClose = () => {
    this.setState({deldialog: false});
  };

  handleDelDialogOk =() => {
    this.setState({deldialog: false});
    if(this.state.del_com_gen_id){
      this.props.deleteItem(this.state.del_com_gen_id);
    }

  }

  handleNewOptInputChange(event){
    const target = event.target;
    this.setState({
      addOpt : target.value
    });

  }

  handleInputChange(event){
    const target = event.target;
    this.setState({
      comment : target.value
    });
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      //this.props.addNewOpt(this.state.newOpt, this.props.genid);
    }
  }

  handleEditOptInputChange(event){
    const target = event.target;
    this.setState({
      edit_opt : target.value
    });
  }


    handleEditDialogOpen = (edit_com_gen_id, edit_opt) => {
      console.log(edit_com_gen_id);
      console.log(edit_opt);

      this.setState({editdialog: true,
        edit_com_gen_id,
        edit_opt
      });
    };

    handleEditDialogClose = () => {
      this.setState({editdialog: false});

      if(this.state.edit_opt.trim().length > 0){
        this.props.editOptionItem(this.state.edit_com_gen_id, this.state.edit_opt);
      }
      else{
        console.log('just leasve ');
      }

    };

    handleEnableSort(){
        this.setState({
          enableSort: !this.state.enableSort
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {

      this.props.handleSort('GEN', oldIndex, newIndex);

    };

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
       subheader: {
         margin: '20px 20px 0 0',
         minWidth: '170px'
       },
       commentbox: {
         marginBottom: '30px'
       },
       floatingLabelStyle: {
         color: lightGreen500,
       },
       floatingLabelFocusStyle: {
         color: blue500,
       },
       addTextContainer: {
         width: '100%',
         textAlign: 'right',
         marginTop: 20,
         marginBottom: 20
       },
       addButton:{
         marginRight: 20
       },
       optAdd:{
        marginLeft: 20
       },
       dialog: {
         width: 350
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
       },
       genblock: {
         boxShadow: 'rgba(0, 0, 0, 0.118) 0px 1px 6px, rgba(0, 0, 0, 0.118) 0px 1px 4px',
         borderRadius: 2,
         padding: 10,
         marginBottom: 30,
         marginTop: 20,
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
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
        />,
    ];

    const edit_actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={false}
        onTouchTap={this.handleEditDialogClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleEditDialogClose}
        />,
    ];

    const del_actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDelDialogClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleDelDialogOk}
      />,
    ];

    let item_list = [];
    let comment_list = [];
    let generalItemCollection = [];

    for(let i=0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];

      if(item.type == 'ITEM'){

        generalItemCollection.push(item);

          item_list.push(
            <div key={item.com_general_id} className="gen-list" style={styles.genblock}>
              <IconMenu className="vertbtn"
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Edit" onClick={()=>this.handleEditDialogOpen(item.com_general_id, item.item_name)} />
                  <MenuItem primaryText="Delete" onClick={()=>this.handleDelDialogOpen(item.com_general_id)}/>
                </IconMenu>

                <GeneralChipElement chipData={item.options.split(';')} title ={item.item_name} genid={item.com_general_id} handleGeneralChipDelete={this.props.handleGeneralChipDelete} addNewOpt={this.props.addNewOpt}/>

            </div>
          );

      }
      else if(item.type == 'COMMENT'){
        comment_list.push(
          <GeneralTemplateComment title={item.item_name} key={item.com_general_id} genid={item.com_general_id} deleteComment={this.props.deleteItem} />
        );
      }

    }


    let gen_items_list_view =
        <div>
        <h3>Options
            <span className="addButtonWrapper">
              <RaisedButton
                 label="Add new option"
                 labelPosition="after"
                 primary={true}
                 icon={<ContentAdd />}
                 style={styles.optAdd}
                 onTouchTap={this.handleDialogOpen}
               />
               <FlatButton
                   onClick={this.handleEnableSort.bind(this)}
                   label="Sort"
                   primary={true}
                   icon={<ActionSort />}
               />

            </span>

            </h3>

            <Dialog
              title="Add new option"
              actions={actions}
              modal={false}
              open={this.state.dialog}
              onRequestClose={this.handleDialogClose}
              contentStyle ={styles.dialog}
            >
              Option name:
              <TextField hintText="Add new option" floatingLabelText="Add new option" name="genaddnewopt" onChange={this.handleNewOptInputChange.bind(this)}/>

            </Dialog>

            {item_list}
            <Divider />
            <h3>Comments</h3>
            {comment_list}

            <div style={styles.addTextContainer}>
              <TextField hintText="Add new comment" floatingLabelText="Add new comment" name="generalcomment" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
              <FloatingActionButton mini={true} style={styles.addButton} backgroundColor={pink400} onClick={()=>this.props.addNewComment(this.state.comment)}>
                <ContentAdd />
              </FloatingActionButton>
            </div>

            <Dialog
              actions={del_actions}
              modal={false}
              open={this.state.deldialog}
              onRequestClose={this.handleDelDialogClose}
              contentStyle ={styles.dialog}
            >
              Are you sure you want to delete?
            </Dialog>

            <Dialog
              title="Edit option"
              actions={edit_actions}
              modal={false}
              open={this.state.editdialog}
              onRequestClose={this.handleEditDialogClose}
              contentStyle ={styles.dialog}
            >
              Option name:
              <TextField hintText="Edit option" floatingLabelText="Edit option" name="geneditopt" onChange={this.handleEditOptInputChange.bind(this)} value={this.state.edit_opt}/>

            </Dialog>
          </div>;

      let general_items_sort_view = <div>
        <Subheader inset={false}>sorting</Subheader>
        <div style={styles.buttonsrtl}>
             <FlatButton
               onClick={this.handleEnableSort.bind(this)}
               label="Back"
               primary={true}
             />

        </div>
        <SortableList items={generalItemCollection} onSortEnd={this.onSortEnd} useDragHandle={false}/>

      </div>

    return(
      <form>

        <h2>{this.props.title}</h2>

          {this.state.enableSort== false &&
            gen_items_list_view
          }

          {this.state.enableSort== true &&
            general_items_sort_view
          }

      </form>
    );

  }

}
