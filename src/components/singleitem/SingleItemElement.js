import React, { Component, PropTypes } from "react";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import PhotoWarpper from '../photos/PhotoWarpper';


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
      },
      wrapper:{
        boxShadow:' rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
        borderRadius: 2,
        padding: 10,
        marginBottom: 30,
        marginTop: 20
      },
      heading:{
        color: 'rgb(79, 189, 160)',
        marginBottom: 0
      },
      headinghr:{
        backgroundColor: 'rgb(79, 189, 160)'
      }


    };

    let meterorItem = null;
    if(this.props.type == 'METER' ){
      meterorItem = <div>
        <h4>Meter Reading:</h4>
        <TextField  fullWidth={true} name={this.props.data.item_id +';'+ 'reading_value'} value={this.props.data.reading_value? this.props.data.reading_value : ''} onChange={this.props.handleInputChange}/>
      </div>
    }
    else if( (this.props.type == 'ITEM')  ||  (this.props.type == 'SUB') ){
      meterorItem= <div>
                      <h4>Condition:</h4>
                      <RadioButtonGroup name={ this.props.type == 'ITEM'? 'option' : this.props.data.item_id +';'+ 'option'} defaultSelected={this.props.data.option} valueSelected={String(this.props.data.option).toUpperCase()} className="clear-float" onChange={this.props.handleInputChange}>
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
      <div style={styles.wrapper}>
        <div>
            <h3 style={styles.heading}>{this.props.title}</h3>
            <Divider style={styles.headinghr}/>

            {meterorItem}

            { this.props.type == 'ITEM' &&
            <Divider style={styles.bottomDivider}/>
            }

            <h4>Description:</h4>
            <TextField  hintText="Description" floatingLabelText="Description" fullWidth={true} name={ this.props.type == 'ITEM'? 'description' : this.props.data.item_id +';'+ 'description' } value={this.props.data.description?this.props.data.description: '' } onChange={this.props.handleInputChange}/>

            { this.props.type == 'ITEM' &&
            <Divider style={styles.bottomDivider}/>
            }

            <h4>Comment:</h4>
            <TextField hintText="Enter your message" multiLine={true} rows={2} rowsMax={4}  name={this.props.type == 'ITEM'?'comment':this.props.data.item_id +';'+ 'comment'} fullWidth={true} value={this.props.data.comment?this.props.data.comment:'' } onChange={this.props.handleInputChange}/>


            { this.props.type == 'ITEM' &&
            <Divider style={styles.bottomDivider}/>
            }

        </div>

        <h4>Photos:</h4>

        <PhotoWarpper sub_id={this.props.sub_id} photos={this.props.photos} on_drop={this.props.on_drop} dragging={this.props.dragging} on_drag_start={this.props.on_drag_start}  photoDelete={this.props.photoDelete}
          photoUpload={this.props.photoUpload} type="SUB"/>

        <Divider />

      </div>
    );

  }

}
