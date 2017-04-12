import React, { Component, PropTypes } from "react";
import config from '../../config/config';
import PhotoItem from './PhotoItem';

export default class PhotoWarpper extends React.Component {

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

  allowDrop(e){
    e.preventDefault();
  }

  render() {

    let bg = '';
    if(this.props.dragging == true ){
      bg = '#A5E9E1';
    }
    else{
      bg = '#ffffff'
    }

    const styles = {
      root: {
        height: 150,
        width: '100%',
        maxWidth: 700,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflowY: 'hidden',
        backgroundColor: bg
      },
      img_container: {
        position: 'relative',
        width:   'auto',
        height: 'auto',
        display: 'inline-block',
        overflow:'hidden',
        display: 'inline-block'
      },
      dragging: {
        backgroundColor: ''
      }

    };

    return(
      <div style={styles.root} onDrop={()=>this.props.on_drop(this.props.sub_id)} onDragOver={this.allowDrop.bind(this)} >
          {this.props.photos && this.props.photos.map((photo) => (
            <div style={styles.img_container}
              key={photo.photo_id} >
              <PhotoItem image_url={config.SERVER_PATH + photo.file_name} on_drag={this.props.on_drag} on_drag_start={this.props.on_drag_start}
              photo_id={photo.photo_id}  photoDelete={this.props.photoDelete}/>
            </div>
          ))}
      </div>
    );
  }


}
