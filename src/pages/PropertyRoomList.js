import React from "react";
import { Link } from "react-router";
import PageBase from '../components/layout/PageBase';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {blue500, yellow600} from 'material-ui/styles/colors';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileFolder from 'material-ui/svg-icons/file/folder';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import * as PropertyRoomListActions from "../actions/PropertyRoomListActions";
import PropertyRoomListStore from "../stores/PropertyRoomListStore";

export default class PropertyRoomList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: 'a',
      roomlist: [],
      property_info: {
        address_1: '',
        address_2: '',
        city: '',
        postalcode: '',
        report_type: '',
        report_date: null,
        description: '',
        image_url: ''
      }
    };

    const property_id  = props.location.query.property_id;

    this.getRoomList = this.getRoomList.bind(this);
    PropertyRoomListActions.fetchRoomList(property_id);

  }

  componentWillMount(){
    PropertyRoomListStore.on("change", this.getRoomList);
  }

  componentWillUnmount(){
    PropertyRoomListStore.removeListener("change", this.getRoomList);
  }

  getRoomList(){

    this.setState({
      roomlist: PropertyRoomListStore.getRoomList()
    });

  }


  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };


    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    console.log(this.state.roomlist);

    return(
      <PageBase title="Room List" navigation="Home / Property / Room list">

        <div className="control-wrapper-container">

          <div className="control-wrapper roomlist-container scroll-style">

            <div className="room-list">
              <List>
                <Subheader inset={true}>Room list</Subheader>

                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blue500} />}
                    primaryText="Property Info"
                    secondaryText="" />

                  <ListItem
                    leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blue500} />}
                    primaryText="General Condition"
                    secondaryText="" />

                  {this.state.roomlist.map(item =>

                    <ListItem key={item.prop_master_id}
                      leftAvatar={<Avatar icon={<FileFolder />} />}
                      rightIconButton={rightIconMenu}
                      primaryText={item.name}
                      secondaryText="" />

                  )}

              </List>
            </div>

          </div>

          <div className="control-wrapper-flex-2">
            we are here to help you man
          </div>

        </div>


      </PageBase>
    );

  }

}
