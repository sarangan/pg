import React from 'react';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';

import * as LoginAuthActions from "../../actions/auth/LoginAuthActions";
import LoginStore from "../../stores/auth/LoginStore";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.getLogoutStatus = this.getLogoutStatus.bind(this);
  }

  componentWillMount(){
    LoginStore.on("change", this.getLogoutStatus);
  }

  componentWillUnmount(){
    LoginStore.on("change", this.getLogoutStatus);
  }

  signout(){
    LoginAuthActions.logout();
  }

  changepassword(){

  }

  getLogoutStatus(){
    let logout = LoginStore.getLogoutStatus();
    if(logout){
        browserHistory.push('/login')
    }
  }


  render() {

    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 30
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    let nav = 'Home';
    switch (this.props.com_path) {
      case 'propertylist':
        nav = "Home / Property list";
        break;
      case 'addnewproperty':
        nav = "Home / Add new property";
        break;
      case 'template':
        nav = "Home / Property template";
        break;
      case 'addpropertytemplate':
        nav = "Home / Add property template";
        break;
      case 'propertyroomlist':
        nav = "Home / Property / Room list";
        break;
      case 'template':
        nav = "Home / Template / Room list template";
        break;
      case 'reportsettings':
        nav = "Home / Report settings";
        break;
      case 'dashboard':
        nav = "Home ";
        break;
      case 'changepassword':
        nav = "Home / user / change password";
        break;
      default:
        nav =  "Home";
        break;

    }


    return (
      <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={
                nav
              }
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  {false &&
                    <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><ViewModule color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
                            <MenuItem key={1} primaryText="Application 1"/>
                            <MenuItem key={2} primaryText="Application 2"/>
                            <MenuItem key={3} primaryText="Application 3"/>
                    </IconMenu>
                  }
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <Link to="/changepassword">
                    <MenuItem primaryText="Change password" />
                    </Link>
                    <MenuItem primaryText="Sign out" onTouchTap={this.signout.bind(this)} />
                  </IconMenu>
                </div>
              }
            />
          </div>
    );

  }

}
