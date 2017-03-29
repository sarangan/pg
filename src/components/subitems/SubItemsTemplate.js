import React, { Component, PropTypes } from "react";
import SingleItemElementTemplate from '../singleitem/SingleItemElementTemplate';
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class SubItemsTemplate extends React.Component {

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
    };

    let general_item = [];
    let sub_items = [];

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
        sub_items.push(
          <SingleItemElementTemplate item_name={item.item_name} key={item.com_subitem_id}/>
        );
      }

    }

    return(
      <div>
          <FloatingActionButton style={styles.floatingActionButton}  iconStyle={{backgroundColor: pink400}}>
            <ContentAdd />
          </FloatingActionButton>

        <h2>{this.props.title}</h2>
        {general_item}
        {sub_items}
      </div>
    );

  }

}
