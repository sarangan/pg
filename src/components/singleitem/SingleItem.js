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
    //console.log(this.props.data);
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




    return(
      <form>

        <SingleItemElement optlist={this.state.optlist} type="ITEM" title={this.props.title} data={this.props.data} handleInputChange={this.props.handleInputChange}/>

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
