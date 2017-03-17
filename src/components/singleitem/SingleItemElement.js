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
    this.state = {
      opt: 'N/A'
    };

  }

  componentWillMount(){

  //  console.log( this.props.opt);
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(){
    let myopt = this.props.data.option;
    myopt = String(myopt).toUpperCase();
    this.setState({
        opt: myopt
    });
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

    let meterorItem = null;
    if(this.props.type == 'METER' ){
      meterorItem = <div>
        <h4>Meter Reading:</h4>
        <TextField  hintText="Meter Reading" floatingLabelText="Meter Reading" fullWidth={true} name="reading_value" value={this.props.reading_value} onChange={this.props.handleInputChange}/>
      </div>
    }
    else if( this.props.type == 'ITEM' ){
      meterorItem= <div>
                      <h4>Condition:</h4>
                      <RadioButtonGroup name="condition" defaultSelected={this.props.data.option} valueSelected={this.state.opt} className="clear-float" onChange={this.props.handleInputChange} name="option">
                        {this.props.optlist.map( (item, index) =>
                          <RadioButton key={index}
                            value={item.value}
                            label={item.text}
                            style={styles.radioButton} className="float-left"
                          />
                        )}
                      </RadioButtonGroup>
                    </div>;
    }


    return(
      <div>
        <h3>{this.props.title}</h3>

        {meterorItem}

        <Divider style={styles.bottomDivider}/>

        <h4>Description:</h4>
        <TextField  hintText="Description" floatingLabelText="Description" fullWidth={true} name="description" value={this.props.data.description} onChange={this.props.handleInputChange}/>

        <Divider style={styles.bottomDivider}/>

        <h4>Comment:</h4>
        <TextField hintText="Enter your message" multiLine={true} rows={2} rowsMax={4}  name="comment" fullWidth={true} value={this.props.data.comment} onChange={this.props.handleInputChange}/>


        <Divider style={styles.bottomDivider}/>

        <h4>Photos:</h4>


      </div>
    );

  }

}
