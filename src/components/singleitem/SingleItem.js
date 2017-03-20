import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';

import SingleItemElement from './SingleItemElement';

export default class SingleItem extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state ={
      optlist: [
                  {value: 'N/A', text: 'N/A'},
                  {value: 'USED', text: 'Used'},
                  {value: 'NEW', text: 'New'},
                  {value: 'POOR', text: 'Poor'},
                  {value: 'DAMAGE', text: 'Damage'}
                ]

    };
  }

  componentWillMount(){

  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(){
    // console.log('single item will receive');
    // console.log(this.props.data);
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

    let data ={
      reading_value: this.props.data.reading_value? this.props.data.reading_value: '',
      option: this.props.data.option? this.props.data.option: '',
      description: this.props.data.description?this.props.data.description:'',
      comment: this.props.data.comment?this.props.data.comment:'',
      prop_feedback_id: this.props.data.prop_feedback_id?this.props.data.prop_feedback_id:''
    }


    return(
      <form>

        <SingleItemElement optlist={this.state.optlist} type="ITEM" title={this.props.title} data={data} handleInputChange={this.props.handleInputChange}/>

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