import React, { Component, PropTypes } from "react";
import SingleItemElementTemplate from '../singleitem/SingleItemElementTemplate';
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

export default class MaterItemSingleTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      toggle_status : this.props.status
    };
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }


  setToggle(){
    this.setState({
      toggle_status :  !(this.state.toggle_status)
    })

    this.props.updateStatusMasterItem(this.props.masterid, this.state.toggle_status, 'status' );
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
      toggle: {
        marginTop: 16,
        marginBottom: 16,
      },
      block: {
        maxWidth: 250,
        paddingLeft: 20
      }

    };


    return(
      <div>
        <h2>{this.props.title}</h2>

        <div className="master-template-edit">
          <SingleItemElementTemplate item_name={this.props.title} sub_id={this.props.masterid} delete={this.props.deleteMasterItem} update={this.props.updateMasterItem}/>

          <div style={styles.block}>
            <Toggle
              label="Enable"
              defaultToggled={this.state.toggle_status}
              style={styles.toggle}
              onToggle={this.setToggle.bind(this)}
            />
          </div>

          <Divider />
        </div>

      </div>
    );

  }


}
