import React, { Component, PropTypes } from "react";
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentDelete from 'material-ui/svg-icons/content/remove-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';

export default class SingleItemElementTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {};
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  render() {

    const styles = {
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
    };


    return(
      <div style={styles.addTextContainer}>
        <TextField hintText="Item name" defaultValue={this.props.item_name} name="subitem" floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
        <IconButton tooltip="Delete" style={styles.deletebtn}>
          <ContentDelete />
        </IconButton>
      </div>
    );

  }

}
