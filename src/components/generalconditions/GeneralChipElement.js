import React, { Component, PropTypes } from "react";
import Chip from 'material-ui/Chip';
import {blue100, lightGreen500, blue500, pink400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class GeneralChipElement extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state ={
      newOpt: ''
    }
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleInputChange(event){
    const target = event.target;
    this.setState({
      newOpt : target.value
    });
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.addNewOpt(this.state.newOpt, this.props.genid);
    }
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
      },
      addTextContainer: {
        width: '100%',
        textAlign: 'right'
      },
      floatingLabelStyle: {
       color: lightGreen500,
      },
     floatingLabelFocusStyle: {
       color: blue500,
     },
     addButton:{
        marginRight: 20
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
          <div style={styles.addTextContainer}>
            <TextField hintText="Add new option" floatingLabelText="Add new option" name="generalchip" onChange={this.handleInputChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} floatingLabelStyle={styles.floatingLabelStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/>
            <FloatingActionButton mini={true} style={styles.addButton} onClick={()=>this.props.addNewOpt(this.state.newOpt, this.props.genid)} backgroundColor={pink400}>
              <ContentAdd />
            </FloatingActionButton>
          </div>

      </div>
    );

  }

}
