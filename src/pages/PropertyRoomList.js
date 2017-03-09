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
    };

    console.log('props');
    console.log(props);

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
      roomList: PropertyRoomListStore.getRoomList()
    });

    console.log(this.state.roomList);

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

    return(
      <PageBase title="Room List" navigation="Home / Property / Room list">


        <Tabs value={this.state.value} onChange={this.handleChange}>
           <Tab label="Tab A" value="a" >
             <div>
               <h2 style={styles.headline}>Controllable Tab A</h2>
               <p>
                 Tabs are also controllable if you want to programmatically pass them their values.
                 This allows for more functionality in Tabs such as not
                 having any Tab selected or assigning them different values.
               </p>
             </div>
           </Tab>
           <Tab label="Tab B" value="b">
             <div>
               <h2 style={styles.headline}>Controllable Tab B</h2>
               <p>
                 This is another example of a controllable tab. Remember, if you
                 use controllable Tabs, you need to give all of your tabs values or else
                 you wont be able to select them.
               </p>
             </div>
           </Tab>
        </Tabs>


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
