import React, { Component, PropTypes } from "react";
import {blue100, lightGreen500, blue500, pink400, cyan800, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentDelete from 'material-ui/svg-icons/content/remove-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';

export default class GeneralTemplateComment extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state ={
    }
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }



  render(){
    const styles = {
        addTextContainer: {
          width: '100%',
          textAlign: 'right',
          marginTop: 10
        },
        floatingLabelStyle: {
         color: lightGreen500,
        },
        floatingLabelFocusStyle: {
         color: blue500,
        },
        addButton:{
          marginRight: 20
        },
        floatingLabelStyle: {
          color: lightGreen500,
        },
        floatingLabelFocusStyle: {
          color: blue500,
        },
        deletebtn:{
          color: yellow400
        }
    };

    return(
      <div style={styles.addTextContainer}>
        <TextField disabled={true}  defaultValue={this.props.title} name="generalcomment" floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>

        <IconButton tooltip="Delete" style={styles.deletebtn} onClick={()=>this.props.deleteComment(this.props.genid)} >
          <ContentDelete />
        </IconButton>
      </div>
    );

  }


}
