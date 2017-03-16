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
                  {value: 'Used', text: 'Used'},
                  {value: 'New', text: 'New'},
                  {value: 'Poor', text: 'Poor'},
                  {value: 'Damage', text: 'Damage'}
                ]

    };
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

        <SingleItemElement optlist={this.state.optlist} type={this.props.type} title={this.props.title}/>

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
