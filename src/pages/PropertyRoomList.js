import React from "react";
import { Link } from "react-router";
import PageBase from '../components/layout/PageBase';
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


export default class PropertyRoomList extends React.Component {

  constructor(props){
    super(props);
    this.state={};
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {

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

    return(
      <PageBase title="Room List" navigation="Home / Property / Room list">

        <List>
          <Subheader inset={true}>Folders</Subheader>
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Photos"
            secondaryText="Jan 9, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Recipes"
            secondaryText="Jan 17, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Work"
            secondaryText="Jan 28, 2014"
          />
        </List>
        <Divider inset={true} />
        <List>
          <Subheader inset={true}>Files</Subheader>
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIconButton={rightIconMenu}
            primaryText="Vacation itinerary"
            secondaryText="Jan 20, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
            rightIcon={<ActionInfo />}
            primaryText="Kitchen remodel"
            secondaryText="Jan 10, 2014"
          />
        </List>

      </PageBase>
    );

  }

}
