import React, { Component, PropTypes } from "react";
import Chip from 'material-ui/Chip';
import {blue100} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

export default class GeneralChipElement extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  render(){

    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      subheader: {
        margin: '20px 20px 0 0',
        minWidth: '200px',
        overflow: 'hidden'

      },
      chipwrapper: {
        marginTop: 30,
        marginBottom: 30,
      }
    };

    return(

      <div style={styles.chipwrapper}>
          <h4 style={styles.subheader} className="gen-condition-title">{this.props.title}:</h4>
          <div style={styles.wrapper}>
            {this.props.chipData.map( (item, index) =>

                <Chip key={index} style={styles.chip} backgroundColor={blue100} onRequestDelete={() => this.props.handleGeneralChipDelete(this.props.genid, index)}>
                  {item}
                </Chip>

            )}
          </div>
          <TextField hintText="Add option" floatingLabelText="Add Option" name="generalchip"/>
      </div>
    );

  }

}
