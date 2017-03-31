import React, { Component, PropTypes } from "react";
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentDone from 'material-ui/svg-icons/action/done';
import ContentCreate from 'material-ui/svg-icons/content/create';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class SingleItemElementTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      disable: true,
      save: false,
      text: this.props.item_name,
      sub_id: this.props.sub_id,
      deldialog: false
    };
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleDelDialogOpen = () => {
    this.setState(
      {
        deldialog: true
      }
    );

  };

  handleDelDialogClose = () => {
    this.setState({deldialog: false});
  };

  handleDelDialogOk =() => {
    this.setState({deldialog: false});
    if(this.state.sub_id){
      this.props.delete(this.state.sub_id)
    }

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
    this.props.update(this.state.sub_id, this.state.text);
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
      dialog: {
        width: 350
      }
    };

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
    
    return(
      <div style={styles.addTextContainer}>
        <TextField hintText="Item name" disabled={this.state.disable} defaultValue={this.state.text} name="subitem" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
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
        <IconButton tooltip="Delete" style={styles.deletebtn} onClick={this.handleDelDialogOpen.bind(this)}>
          <ContentDelete />
        </IconButton>

        <Dialog
          actions={del_actions}
          modal={false}
          open={this.state.deldialog}
          onRequestClose={this.handleDelDialogClose}
          contentStyle ={styles.dialog}
        >
          Are you sure you want to delete?
        </Dialog>

      </div>


    );

  }

}
