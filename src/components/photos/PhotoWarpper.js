import React, { Component, PropTypes } from "react";
import uitl from '../../utils/utils.js';
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


  render() {

    const styles = {
      root: {
        height: 150,
        width: '100%',
        maxWidth: 700,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflowY: 'hidden'
      },
      img_container: {
        position: 'relative',
        width:   'auto',
        height: 'auto',
        display: 'inline-block',
        overflow:'hidden',
        display: 'inline-block'
      }

    };

    return(
      <div style={styles.root}>
          {this.props.photos && this.props.photos.map((photo) => (
            <div style={styles.img_container}
              key={photo.photo_id} >
              <PhotoItem image_url={uitl.server_path + photo.file_name}/>
            </div>
          ))}
      </div>
    );
  }


}
