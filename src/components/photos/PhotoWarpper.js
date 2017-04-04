import React, { Component, PropTypes } from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';

import uitl from '../../utils/utils.js';

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
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: ' flex-start',
        marginBottom: 10,
        marginTop: 10,
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      },
      titleStyle: {
        color: 'rgb(0, 188, 212)',
      },
      img: {
        width: 200,
        height: 'auto',
        marginRight: 20
      }
    };

    return(
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2} cellHeight={150}>
          {this.props.photos.map((photo) => (
            <GridTile
              key={photo.photo_id}
              title="...."
              actionIcon={<IconButton><RemoveIcon color="rgb(255, 9, 9)" /></IconButton>}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img src={uitl.server_path + photo.file_name} style={styles.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }


}
