import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import GeneralChipElement from './GeneralChipElement';

export default class GeneralconditionTemplate extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

     this.state = {chipData: [] };
  }

  componentWillMount(){
  }

  componentWillUnmount(){
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
       }
    };

    let item_list = [];
    let comment_list = []
    for(let i=0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];

      if(item.type == 'ITEM'){
        if(item.options.split(';').length > 0){
          item_list.push(
            <div key={item.com_general_id}>
              <GeneralChipElement chipData={item.options.split(';')} title ={item.item_name} genid={item.com_general_id} handleGeneralChipDelete={this.props.handleGeneralChipDelete} />
              <Divider />
            </div>
          );
        }
      }
      else{
        comment_list.push();
      }

    }

    return(
      <form>
        <h3>{this.props.title}</h3>

        {item_list}
        <div style={styles.buttons}>

          <RaisedButton label="Save" style={styles.saveButton} onClick={this.props.handleGeneralSubmit} primary={true} />

        </div>

      </form>
    );

  }

}
