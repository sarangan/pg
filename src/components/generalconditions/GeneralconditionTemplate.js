import React, { Component, PropTypes } from "react";
import {blue100, lightGreen500, blue500, pink400, cyan800, orange700} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GeneralChipElement from './GeneralChipElement';
import GeneralTemplateComment from './GeneralTemplateComment';

export default class GeneralconditionTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state = {
      chipData: [],
      comment: ''
    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
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
    };

    let item_list = [];
    let comment_list = []
    for(let i=0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];

      if(item.type == 'ITEM'){
        if(item.options.split(';').length > 0){
          item_list.push(
            <div key={item.com_general_id}>
              <GeneralChipElement chipData={item.options.split(';')} title ={item.item_name} genid={item.com_general_id} handleGeneralChipDelete={this.props.handleGeneralChipDelete} addNewOpt={this.props.addNewOpt}/>
              <Divider />
            </div>
          );
        }
      }
      else if(item.type == 'COMMENT'){
        comment_list.push(
          <GeneralTemplateComment title={item.item_name} key={item.com_general_id} genid={item.com_general_id} deleteComment={this.props.deleteComment} />
        );
      }

    }

    return(
      <form>
        <h2>{this.props.title}</h2>

        <h3>Options</h3>
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

        <div style={styles.buttons}>

          <RaisedButton label="Save" style={styles.saveButton} onClick={this.props.handleGeneralSubmit} primary={true} />

        </div>

      </form>
    );

  }

}
