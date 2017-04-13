import React, { Component, PropTypes } from "react";
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PhotoWarpper from '../photos/PhotoWarpper';

export default class GeneralItemElement extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
    };

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
      bottomDivider: {
        marginTop: 40,
        marginBottom: 40
      }
    };

    return(
      <div>
          <h3>{this.props.title}</h3>
          <TextField hintText="Enter your message" multiLine={true} rows={2} rowsMax={4}  name={this.props.data.item_id +';'+ 'comment' + ';GENERAL'} fullWidth={true} value={this.props.data.comment?this.props.data.comment:'' } onChange={this.props.handleInputChange}/>

          <h4>Photos:</h4>

          <PhotoWarpper photos={this.props.photos} on_drag={this.props.on_drag} on_drag_start={this.props.on_drag_start}  photoDelete={this.props.photoDelete} photoUpload={this.props.photoUpload}
            type="GENERAL" sub_id={this.props.data.item_id } />

          <Divider />

      </div>
    );
  }


}
