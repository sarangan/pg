import React from "react";
import { IndexLink, Link } from "react-router";
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import HomeIcon from 'material-ui/svg-icons/action/home';
import PropertyListIcon from 'material-ui/svg-icons/action/account-balance';

export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/favorites/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
        <Link to="/" className="menu-item"><MenuItem primaryText="Home" leftIcon={<HomeIcon />} /></Link>
        <Divider />
        <Link to="propertylist" className="menu-item"><MenuItem primaryText="Property List" leftIcon={<PropertyListIcon />} /></Link>
        <Divider />
        <Link to="/" className="menu-item"><MenuItem primaryText="Home" leftIcon={<Download />} /></Link>
      </div>
    );
}
}
