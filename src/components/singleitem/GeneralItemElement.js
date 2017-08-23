import React, { Component, PropTypes } from "react";
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PhotoWarpper from '../photos/PhotoWarpper';
import AudioPlayer from '../audios/AudioPlayer';

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


    let voices_content = [];
    for(let i= 0, l = this.props.voices.length; i < l; i++){
      voices_content.push(

        <AudioPlayer key={this.props.voices[i].prop_sub_feedback_general_id}
          filename={this.props.voices[i].file_name} property_id={this.props.voices[i].property_id} />

      );
    }

    let gen_comment_cls = '';
    if(voices_content.length > 0){
      gen_comment_cls = 'gen-comment-content';
    }

    return(


      <div>

        <div className="comment-voice-wrapper">

          <div className={gen_comment_cls}>
            <h3>{this.props.title}</h3>
            <TextField hintText="Enter your message" multiLine={true} rows={1} rowsMax={2}  name={this.props.data.item_id +';'+ 'comment' + ';GENERAL'} fullWidth={true} value={this.props.data.comment?this.props.data.comment:'' } onChange={this.props.handleInputChange}/>

          </div>

          <div className="voices-content">
              {voices_content}
          </div>

        </div>

          <h4>Photos:</h4>

          <PhotoWarpper photos={this.props.photos} on_drag={this.props.on_drag} on_drag_start={this.props.on_drag_start}  photoDelete={this.props.photoDelete} photoUpload={this.props.photoUpload}
            type="GENERAL" sub_id={this.props.data.item_id } on_drop={null} releaseDragging={this.props.releaseDragging} disableDrag={false} showprogress={this.props.showprogress}/>

          <Divider />

      </div>
    );
  }


}
