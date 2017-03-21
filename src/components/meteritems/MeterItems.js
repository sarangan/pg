import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';

import SingleItemElement from '../singleitem/SingleItemElement';

export default class MeterItems extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state ={};
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  render() {
    const styles = {
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5,
        marginRight: 10
      }
    };

    let singleItem = [];
    for(let i =0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];
      let data = {
        reading_value: (item.reading_value?item.reading_value:''),
        option: item.option?item.option:'',
        description: item.description?item.description:'',
        comment: item.comment?item.comment:'',
        prop_feedback_id: item.prop_feedback_id,
        item_id: item.prop_meter_id
      };
      singleItem.push(
        <SingleItemElement optlist="" type="METER" title={item.meter_name} data={data} handleInputChange={this.props.handleInputChange} key={item.prop_meter_id}/>
      );
    }

    return(
      <form>

        {singleItem}


        <div style={styles.buttons}>

          <RaisedButton label="Save"
            style={styles.saveButton}
            onClick={this.props.handleSubmit}
            primary={true}/>
        </div>

      </form>
    );

  }

}
