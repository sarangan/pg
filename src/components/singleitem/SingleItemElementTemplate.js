import React, { Component, PropTypes } from "react";
import {blue100, lightGreen500, blue500, pink400, yellow400, blueGrey500, orange300, teal800} from 'material-ui/styles/colors';
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
      item_name: this.props.item_name,
      sub_id: this.props.sub_id,
      deldialog: false
    };
  }

  componentWillMount(){
    this.setState({
      item_name: this.props.item_name
    })
  }

  componentWillUnmount(){
    this.setState({
      item_name: ''
    });
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
      item_name : target.value
    });
  }

  handleSave(event){
    console.log(this.state.item_name);
    console.log(this.state.sub_id);
    this.props.update(this.state.sub_id, this.state.item_name);
    this.setState({
      disable: true,
      save: false
      });
  }

  render() {

     const styles = {
      deletebtn:{
        color: yellow400,
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
        <TextField hintText="Item name" disabled={this.state.disable} value={this.state.item_name} name="subitem" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
          {!this.state.save &&
            <IconButton tooltip="Edit" style={styles.deletebtn} onClick={this.enabletext.bind(this)}>
              <ContentCreate color={blueGrey500}/>
            </IconButton>
          }
          {this.state.save &&
            <IconButton tooltip="Save" style={styles.deletebtn} onClick={this.handleSave.bind(this)}>
              <ContentDone color={teal800}/>
            </IconButton>
          }
        <IconButton tooltip="Delete" style={styles.deletebtn} onClick={this.handleDelDialogOpen.bind(this)}>
          <ContentDelete color={orange300}/>
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
