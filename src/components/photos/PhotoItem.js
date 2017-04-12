import React, { Component, PropTypes } from "react";
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import ZoomIcon from 'material-ui/svg-icons/image/loupe';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class PhotoItem extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      show: false,
      deldialog: false,
      del_photo_id: '',
    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleDelDialogOpen = (photo_id) => {
    this.setState(
      {
        deldialog: true,
        del_photo_id: photo_id
      }
    );

  };

  handleDelDialogClose = () => {
    this.setState({deldialog: false});
  };

  handleDelDialogOk =() => {
    this.setState({deldialog: false});
    if(this.state.del_photo_id){
      this.props.photoDelete(this.state.del_photo_id);
    }

  }


  toggleImg(){
    this.setState({
      show : !this.state.show
    });
  }


  render() {

    let dp = 'none';
    if(this.state.show == true){
      dp = 'block';
    }

    const styles = {
      img: {
        width: 150,
        height: 'auto',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
      },
      removeBtn: {
        position: 'absolute',
        top: 0,
        right:12
      },
      zoomBtn: {
        position: 'absolute',
        top: '35%',
        right: 12
      },
      modal: {
        display: dp
      },
      zoomImg: {
        width: '80%',
        height: 'auto',
      },
      dialog: {
        width: 350
      },
    };

    const del_actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDelDialogClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleDelDialogOk}
      />,
    ];

    const { connectDragSource, isDragging } = this.props;

    return(
        <div style={{
        cursor: 'move'
      }}  draggable="true" onDrag={this.props.on_drag} onDragStart={()=>this.props.on_drag_start(this.props.photo_id)}>
              <div className="photo-items" >
                <IconButton style={styles.removeBtn} onClick={()=>this.handleDelDialogOpen(this.props.photo_id)}><RemoveIcon color="rgb(255, 9, 9)" /></IconButton>
                <img src={this.props.image_url} style={styles.img} />
                <IconButton style={styles.zoomBtn} onClick={this.toggleImg.bind(this)}><ZoomIcon color="rgb(42, 220, 80)" /></IconButton>
              </div>

              <div ref="myModal" style={styles.modal} className="modal">
                <span className="close" onClick={this.toggleImg.bind(this)}>&times;</span>
                <div>
                     <img src={this.props.image_url} style={styles.zoomImg} />
                </div>
              </div>

              <Dialog
                actions={del_actions}
                modal={false}
                open={this.state.deldialog}
                onRequestClose={this.handleDelDialogClose}
                contentStyle ={styles.dialog}
              >
                Are you sure you want to delete?
              </Dialog>

          </div>
    );
  }


}
