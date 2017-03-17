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

    return(
      <form>

        <SingleItemElement type="METER" title={this.props.title} data={this.props.data} handleInputChange={this.props.handleInputChange}/>

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
