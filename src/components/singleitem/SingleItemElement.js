import React, { Component, PropTypes } from "react";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';


export default class SingleItemElement extends React.Component {

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
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
        width: 'auto',
        marginRight: 30
      },
      bottomDivider: {
         marginTop: 40,
         marginBottom: 40
      },
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
      <div>
        <h3>{this.props.title}</h3>

        {this.props.type == 'ITEM' &&
          <div>
            <h4>Condition:</h4>
            <RadioButtonGroup name="shipSpeed" defaultSelected="light" className="clear-float">
              {this.props.optlist.map( (item, index) =>
                <RadioButton key={index}
                  value={item.value}
                  label={item.text}
                  style={styles.radioButton} className="float-left"
                />
              )}
            </RadioButtonGroup>
          </div>
        }

        {this.props.type == 'METER' &&
          <div>
            <h4>Meter Reading:</h4>
            <TextField  hintText="Meter Reading" floatingLabelText="Meter Reading" fullWidth={true} name="reading_value" value={this.props.reading_value} onChange={this.props.singleItemhandleInputChange}/>
          </div>
        }

        <Divider style={styles.bottomDivider}/>

        <h4>Description:</h4>
        <TextField  hintText="Description" floatingLabelText="Description" fullWidth={true} name="description" value={this.props.description} onChange={this.props.singleItemhandleInputChange}/>

        <Divider style={styles.bottomDivider}/>

        <h4>Comment:</h4>
        <TextField hintText="Enter your message" multiLine={true} rows={2} rowsMax={4}  name="description" fullWidth={true} value={this.props.comment} onChange={this.props.singleItemhandleInputChange}/>


        <Divider style={styles.bottomDivider}/>

        <h4>Photos:</h4>


      </div>
    );

  }

}
