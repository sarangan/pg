import React, { Component, PropTypes } from "react";
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentDone from 'material-ui/svg-icons/action/done';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';

export default class SingleItemElementTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      disable: true,
      save: false,
      text: this.props.item_name
    };
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  enabletext(){
      this.setState({
        disable: false,
        save: true
      });
  }

  handleInputChange(event){
    const target = event.target;
    this.setState({
      text : target.value
    });
  }

  handleSave(event){
    this.props.update(this.props.sub_id, this.state.text);
    this.setState({
      disable: true,
      save: false
      });
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
        <TextField hintText="Item name" disabled={this.state.disable} defaultValue={this.props.item_name} name="subitem" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
          {!this.state.save &&
            <IconButton tooltip="Edit" style={styles.deletebtn} onClick={this.enabletext.bind(this)}>
              <ContentCreate />
            </IconButton>
          }
          {this.state.save &&
            <IconButton tooltip="Save" style={styles.deletebtn} onClick={this.handleSave.bind(this)}>
              <ContentDone />
            </IconButton>
          }
        <IconButton tooltip="Delete" style={styles.deletebtn}>
          <ContentDelete />
        </IconButton>
      </div>
    );

  }

}
