import React, { Component, PropTypes } from "react";
import config from '../../config/config';
import PhotoItem from './PhotoItem';
import Dropzone from 'react-dropzone';
import ReactDOMServer from 'react-dom/server';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class PhotoWarpper extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      uploading: false
    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
    //console.log(nextProps);
    if(  this.props.hasOwnProperty('photos')  && nextProps.hasOwnProperty('photos')  ){

      if(this.props.photos &&  nextProps.photos){

        if( (this.props.photos.length != nextProps.photos.length) && (nextProps.photos.length > 0)  ){
          
          this.setState({
            uploading: false
          });
        }
        // else if( nextProps.photos.length > 0){
        //   console.log('set 2');
        //   console.log(nextProps.photos);
        //   this.setState({
        //     uploading: false
        //   });
        // }

      }

    }
  }

  allowDrop(e){
    e.preventDefault();
  }

  onDrop(files){

      this.setState({
        uploading: true
      });
      this.props.photoUpload(files, this.props.item_id, this.props.type );

  }


  onDragnDrop(){

    if(this.props.on_drop != null){
      console.log('on releaseing');
      this.props.on_drop(this.props.item_id);
    }
    else{
        console.log('release drag');
        this.props.releaseDragging();
    }

  }

  render() {

    let border = 'none';
    if(this.props.dragging == true ){
      border = '3px dashed #06944d';
    }
    else{
      border = 'none';
    }

    const styles = {
      wrapper:{
        width: '100%',
        // height: 150,
        position: 'relative'
      },
      root: {
        minHeight: 150,
        width: '80%',
        marginBottom: 10,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflowY: 'hidden',
        // backgroundColor: bg,
        border : border,
        display: 'inline-block',
      },
      dropzone:{
        width: '18%',
        display: 'inline-block',
        marginLeft: 3,
        position: 'absolute',
        right: 0,
        top: 0,
        height: 150,
      },
      dropzoneItem:{
        minHeight: 125,
        minWidth: 80,
        background: '#ffffff',
        padding: 5,
        cursor: 'pointer',
        textAlign: 'center'
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
      },
      none:{
        display: 'none'
      }

    };


      return(
      <div style={styles.wrapper}>
        <div style={styles.root} onDrop={this.onDragnDrop.bind(this)} onDragOver={this.allowDrop.bind(this)} >
            {this.props.photos && this.props.photos.map((photo) => (
              <div style={styles.img_container}
                key={photo.photo_id} >
                <PhotoItem image_url={config.SERVER_PATH + photo.file_name} on_drag={this.props.on_drag} on_drag_start={this.props.on_drag_start}
                photo_id={photo.photo_id}  photoDelete={this.props.photoDelete} disableDrag={this.props.disableDrag}/>
              </div>
            ))}
        </div>
        <div style={styles.dropzone}>

          <div>
             <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzoneItem} className="dropzoneItem">
              <div>Drop files here to upload.</div>
                { this.state.uploading &&
                    <MuiThemeProvider>
                    <CircularProgress />
                    </MuiThemeProvider>
                }
            </Dropzone>
          </div>

        </div>
      </div>

    );
  }


}
