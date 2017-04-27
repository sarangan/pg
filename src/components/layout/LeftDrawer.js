import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import HomeIcon from 'material-ui/svg-icons/action/home';
import PropertyListIcon from 'material-ui/svg-icons/action/account-balance';
import TemplateIcon from 'material-ui/svg-icons/av/web';
import ReportIcon from 'material-ui/svg-icons/editor/insert-drive-file';


export default class LeftDrawer extends React.Component {

  constructor() {
    super();

    this.menus = [ {text: 'Home', icon: <HomeIcon/>,  link: '/'  },
                  {text: 'Property List', icon: <PropertyListIcon/>,  link: 'propertylist'  },
                  {text: 'Template settings', icon: <TemplateIcon/>,  link: 'template'  },
                  {text: 'Report settings', icon: <ReportIcon />,  link: 'reportsettings'  },
                  {text: 'Settings', icon: <HomeIcon/>,  link: '/'  }
              ];

  }

   render() {

       let { navDrawerOpen } = this.props;

       const styles = {
         logo: {
           cursor: 'pointer',
           fontSize: 22,
           color: typography.textFullWhite,
           lineHeight: `${spacing.desktopKeylineIncrement}px`,
           fontWeight: typography.fontWeightLight,
           backgroundColor: blue600,
           paddingLeft: 40,
           height: 56,
         },
         menuItem: {
           color: '#757575',
           fontSize: 15,
           fontWeight: 600
         },
         avatar: {
           div: {
             padding: '15px 0 20px 15px',
             backgroundImage:  'url(images/material_bg.png)',
             height: 45
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
             color: 'white',
             fontWeight: 300,
             textShadow: '1px 1px #444'
           }
         }
       };

       return (
         <Drawer
           docked={true}
           open={navDrawerOpen}>
             <div style={styles.logo}>
              { new Date().toDateString()}
             </div>
             <div style={styles.avatar.div}>
               <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
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
             </div>
         </Drawer>
     );

   };


}
