import React, { Component, PropTypes } from "react";
import config from '../../config/config';
import Subheader from 'material-ui/Subheader';

export default class AudioPlayer extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state ={
    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }


  render() {

    const styles = {
    };

    return(

      <div>
        <audio controls>
          <source src={ config.SERVER_PATH + this.props.filename} type="audio/mpeg" />
            <Subheader inset={false}>Your browser does not support the audio player.</Subheader>
        </audio>
      </div>

    );

}

}
