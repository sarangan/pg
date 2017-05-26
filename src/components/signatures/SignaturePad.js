import React, { Component, PropTypes } from "react";
import Signature_pad from 'signature_pad';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/editor/format-clear';
import DrawDone from 'material-ui/svg-icons/action/done';
import DrawEdit from 'material-ui/svg-icons/content/create';


export default class SignaturePad extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      signaturePad: null,
      enableDraw: false
    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleOnEnd(){
    this.saveCanvas();
  }

  componentDidMount(){
    let signaturePad = new Signature_pad( this.signaturepad , {
       backgroundColor: '#EEEEEE',
       penColor: 'rgb(0, 0, 0)',
       onEnd: this.handleOnEnd.bind(this)
     });
     this.setState({
       signaturePad
     });

     if(this.props.signdata && signaturePad){
       signaturePad.fromDataURL(this.props.signdata);
     }

  }

  clearCanvas(){
    this.state.signaturePad.clear();
    this.props.clearCanvas(this.props.type);
    this.setState({enableDraw: true});
  }

  saveCanvas(){
    let dataimg =  this.state.signaturePad.toDataURL("image/jpeg");
    this.props.saveCanvas(this.props.type, dataimg);
    this.setState({
      enableDraw: false
    });
  }

  editCanvas(){
    this.setState({
      enableDraw: true
    });
  }


  render(){

    const styles = {
      contentbox: {
        display: 'inline-block',
        marginBottom: 20,
        marginLeft: 20,
      },
      wrapper: {
       userSelect: 'none',
       position: 'relative',
       backgroundColor: '#EEEEEE'
     },
     signaturepad: {
       width: 300,
       height: 150,
      cursor: 'crosshair'
     },
     sing_txt_wrapper:{
       textAlign: 'right',
     },
     sing_name:{
       color: '#90A4AE',
       fontSize: 12,
       fontStyle: 'italic'
     },
     img_content: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 300,
      height: 150,
      cursor: 'not-allowed'
    },
    action_btn: {
      position: 'absolute',
      right: 20,
      top: 0
    },
    drawIcon: {
      width: 15,
      padding: 5,
      marginLeft: 10
    }

    };

    let signImg = null;
    if(this.props.signdata){
      signImg = <img src={this.props.signdata} style={styles.img_content} />
    }
    else{
      signImg = <img src="http://placehold.it/350x150?text=Edit+to+draw" style={styles.img_content} />
    }

    return(
      <div style={styles.contentbox}>
        <div style={styles.wrapper}>
          { !this.state.enableDraw && signImg }

          <canvas id="signature-pad" style={styles.signaturepad} ref={(signaturepad) => { this.signaturepad = signaturepad }} ></canvas>

          <div style={styles.action_btn}>

              <IconButton tooltip="Clear" onTouchTap={this.clearCanvas.bind(this)} style={styles.drawIcon}>
                <ClearIcon />
              </IconButton>

              {
                this.state.enableDraw == false &&
                <IconButton tooltip="Edit drawing" onTouchTap={this.editCanvas.bind(this)} style={styles.drawIcon}>
                  <DrawEdit />
                </IconButton>
              }
              {
                this.state.enableDraw == true &&
                <IconButton tooltip="Update drawing" onTouchTap={this.saveCanvas.bind(this)} style={styles.drawIcon}>
                  <DrawDone />
                </IconButton>
              }

          </div>

        </div>
        <div style={styles.sing_txt_wrapper}>
          <span style={styles.sing_name}>{this.props.name}</span>
        </div>



      </div>

    );
  }

}
