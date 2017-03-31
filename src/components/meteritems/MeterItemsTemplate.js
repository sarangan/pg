import React, { Component, PropTypes } from "react";
import SingleItemElementTemplate from '../singleitem/SingleItemElementTemplate';
import {blue100, lightGreen500, blue500, pink400, yellow400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class MeterItemsTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      newmeteritem : ''
    };
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleInputChange(event){
    const target = event.target;
    this.setState({
      newmeteritem : target.value
    });
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


    };

    let meter_items = [];

    for(let i=0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];

        meter_items.push(
          <SingleItemElementTemplate item_name={item.meter_name} key={item.com_meter_id} sub_id={item.com_meter_id} delete={this.props.deleteMeterItem} update={this.props.updateMeterItem}/>
        );

    }

    return(
      <div>
        <h2>{this.props.title}</h2>

        {meter_items}

        <div style={styles.addTextContainer}>
          <TextField hintText="Add meter" floatingLabelText="Add meter" name="newmeteritem" onChange={this.handleInputChange.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
          <FloatingActionButton mini={true} style={styles.addButton} backgroundColor={pink400} onClick={()=>this.props.addMeterItem(this.state.newmeteritem)}>
            <ContentAdd />
          </FloatingActionButton>
        </div>

      </div>
    );

  }


}
