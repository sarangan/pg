import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionSort from 'material-ui/svg-icons/content/sort';
import ActionDrag from 'material-ui/svg-icons/editor/format-line-spacing';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import SignaturePad from './SignaturePad';
import Dialog from 'material-ui/Dialog';


export default class SingatureList extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      showdialog: false,
    }
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  componentDidMount(){}

  handleDialogOpen = () => {
    this.setState({showdialog: true});
  };

  handleDialogClose = () => {
    this.setState({showdialog: false});
  };

  handleDialogOk =() => {
    this.setState({showdialog: false});
    this.props.handleSubmit();
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
       commet_wrapper: {
         marginTop: 20
       },
       signlist: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
      },
      dialog: {
        width: 350
      }

    };


    const modal_actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={this.handleDialogOk}
      />,
    ];

    return(
      <form>
        <h3>{this.props.title}</h3>

          <div style={styles.signlist}>
            <SignaturePad name="Tenant signature" type="TENANT" signdata={this.props.list.tenant_url? this.props.list.tenant_url : ''} clearCanvas={this.props.clearCanvas} saveCanvas={this.props.saveCanvas}/>
            <SignaturePad name="Lanlord signature" type="LANLORD" signdata={this.props.list.lanlord_url? this.props.list.lanlord_url : ''} clearCanvas={this.props.clearCanvas} saveCanvas={this.props.saveCanvas}/>
            <SignaturePad name="Clerk signature" type="CLERK" signdata={this.props.list.clerk_url? this.props.list.clerk_url : ''} clearCanvas={this.props.clearCanvas} saveCanvas={this.props.saveCanvas}/>
          </div>

          <div style={styles.commet_wrapper}>
            <TextField  hintText="Additional comments" floatingLabelText="Additional comments" fullWidth={true} name="comment" value={this.props.list.comment? this.props.list.comment: ''}
              onChange={this.props.commentTxtChange}/>
          </div>

          <div style={styles.buttons}>

            <RaisedButton label="Save"
              style={styles.saveButton}
              onClick={this.handleDialogOpen}
              primary={true}/>

          </div>

          <Dialog
            actions={modal_actions}
            modal={false}
            open={this.state.showdialog}
            onRequestClose={this.handleDialogClose}
            contentStyle ={styles.dialog}
          >
            Did you save your drawing? Please update all your drawing before save.
          </Dialog>


      </form>
    );

  }

}
