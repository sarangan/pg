import React from 'react';
import { Link, browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import PropertyListIcon from 'material-ui/svg-icons/social/location-city';
import PropertyAddIcon from 'material-ui/svg-icons/action/account-balance';
import TemplateIcon from 'material-ui/svg-icons/av/web';
import ReportIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import UsersIcon from 'material-ui/svg-icons/social/people';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import ChangePassword from 'material-ui/svg-icons/action/verified-user';
import Signout from 'material-ui/svg-icons/action/lock-open';

import * as LoginAuthActions from "../../actions/auth/LoginAuthActions";
import LoginStore from "../../stores/auth/LoginStore";

export default class LeftDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.menus = [ {text: 'Home', icon: <HomeIcon style={{color: '#ffffff'}}/>,  link: '/'  },
                  {text: 'Property List', icon: <PropertyListIcon/>,  link: 'propertylist'  },
                  {text: 'Add new property', icon: <PropertyAddIcon/>,  link: 'addnewproperty'  },
                  //{text: 'Settings', icon: <SettingsIcon/>,  link: '/'  }
              ];

    if(this.props.isAdmin=== true){
      this.menus.push({text: 'Template settings', icon: <TemplateIcon/>,  link: 'template'  });
      this.menus.push({text: 'Report settings', icon: <ReportIcon />,  link: 'reportsettings' });
      this.menus.push({text: 'Users', icon: <UsersIcon/>,  link: 'users' });
      this.menus.push({text: 'Payment history', icon: <MoneyIcon/>,  link: 'payments' });
      //this.menus.push({text: 'Settings', icon: <SettingsIcon/>,  link: 'settings' });
    }

    this.menus.push({text: 'Change password', icon: <ChangePassword/>,  link: 'changepassword'  });
    //this.menus.push({text: 'Signout', icon: <Signout/>,  link: 'signout'  });

    this.getLogoutStatus = this.getLogoutStatus.bind(this);
  }

  signout(){
    LoginAuthActions.logout();
  }

  componentWillMount(){
    LoginStore.on("change", this.getLogoutStatus);
  }

  componentWillUnmount(){
    LoginStore.on("change", this.getLogoutStatus);
  }

  getLogoutStatus(){
    let logout = LoginStore.getLogoutStatus();
    if(logout){
        browserHistory.push('/login')
    }
  }

   render() {

       let { navDrawerOpen } = this.props;

       const styles = {
         logo: {
           cursor: 'pointer',
           fontSize: 18,
           color: typography.textFullWhite,
           lineHeight: `${spacing.desktopKeylineIncrement}px`,
           //fontWeight: typography.fontWeightLight,
           backgroundColor: '#011430',
           paddingLeft: 40,
           height: 56,
           fontWeight: 600,
           letterSpacing: 1.1
         },
         menuItem: {
           color: '#ffffff',
           fontSize: 15,
           fontWeight: 600,
           borderBottom: '1px solid #e1e1e130'
         },
         avatar: {
           div: {
             padding: '15px 0 20px 15px',
             //backgroundImage:  'url(images/material_bg.png)',
             height: 45,
             backgroundColor: '#011430',
             borderBottom: '1px solid #e1e1e130'
           },
           icon: {
             float: 'left',
             display: 'block',
             marginRight: 15,
             boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
           },
           span: {
             paddingTop: 12,
             display: 'block',
             color: '#ffffff',
             fontWeight: 500,
             textShadow: '1px 1px #444',
             maxWidth: 150,
             overflow: 'hidden',
             textOverflow: 'ellipsis',
             whiteSpace: 'nowrap',

           }
         }
       };

       return (
         <Drawer
            className='drawer-bg'
           docked={true}
           open={navDrawerOpen}>
           <div style={{backgroundColor: '#011430', height: '100%'}}>
                 <div style={styles.logo}>
                   PropertyGround
                 </div>
                 <div style={styles.avatar.div}>
                   <Avatar src="images/user.png"
                           size={50}
                           style={styles.avatar.icon}/>
                   <span style={styles.avatar.span}>{this.props.username}</span>
                 </div>
                 <div>
                   {this.menus.map((menu, index) =>
                     <MenuItem
                       key={index}
                       style={styles.menuItem}
                       primaryText={menu.text}
                       leftIcon={menu.icon}
                       containerElement={<Link to={menu.link}/>}
                     />
                   )}
                   <MenuItem
                     key={100}
                     style={styles.menuItem}
                     primaryText='Sign out'
                     leftIcon= {<Signout/>}
                     onTouchTap={this.signout.bind(this)}
                   />
                 </div>
             </div>
         </Drawer>
     );

   };


}
