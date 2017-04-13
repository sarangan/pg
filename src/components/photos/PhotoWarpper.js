import React, { Component, PropTypes } from "react";
import config from '../../config/config';
import PhotoItem from './PhotoItem';
import DropzoneComponent from 'react-dropzone-component';

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

  uploadFile(file){
    //this.props.photoUpload(file, this.props.sub_id, this.props.type );
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
      wrapper:{
        width: '100%',
        // height: 150,
        position: 'relative'
      },
      root: {
        height: 150,
        width: '80%',
        marginBottom: 10,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflowY: 'hidden',
        backgroundColor: bg,
        display: 'inline-block',
      },
      dropzone:{
        width: '18%',
        display: 'inline-block',
        marginLeft: 3,
        position: 'absolute',
        right: 0,
        top: 0,
        height: 150
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


    var componentConfig = {
      iconFiletypes: ['.jpg', '.png'],
      showFiletypeIcon: true,
      postUrl: 'http://52.39.72.94:3000/Property/uploadphoto'
    };
    var djsConfig = {
      addRemoveLinks: false,
      autoProcessQueue: true,
      params: {
        data: {
          id: '',
          sync: '',
          property_id: '',
          item_id: this.props.sub_id,
          parent_id : 'naan'
        }
      },
      headers: {
         'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
      }
    };
    var eventHandlers = { addedfile: (file) => this.uploadFile(file) }


    return(
      <div style={styles.wrapper}>
        <div style={styles.root} onDrop={()=>this.props.on_drop(this.props.sub_id)} onDragOver={this.allowDrop.bind(this)} >
            {this.props.photos && this.props.photos.map((photo) => (
              <div style={styles.img_container}
                key={photo.photo_id} >
                <PhotoItem image_url={config.SERVER_PATH + photo.file_name} on_drag={this.props.on_drag} on_drag_start={this.props.on_drag_start}
                photo_id={photo.photo_id}  photoDelete={this.props.photoDelete}/>
              </div>
            ))}
        </div>
        <div style={styles.dropzone}>
          <DropzoneComponent config={componentConfig} djsConfig={djsConfig} eventHandlers={eventHandlers}/>
        </div>
      </div>

    );
  }


}
