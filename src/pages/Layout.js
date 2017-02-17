import React from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from '../components/layout/Header';
import LeftDrawer from '../components/layout/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';

import {blue500} from 'material-ui/styles/colors';

class Layout extends React.Component {

  constructor() {
      super();
      this.state = {
        navDrawerOpen: true
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.width !== nextProps.width) {
        this.setState({navDrawerOpen: nextProps.width === LARGE});
      }
    }

    handleChangeRequestNavDrawer() {
      this.setState({
        navDrawerOpen: !this.state.navDrawerOpen
      });
    }

  render() {
    
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
          header: {
            paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
          },
          container: {
            margin: '80px 20px 20px 30px',
            paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
          }

    };

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue500,
      }
    });

    return (

        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Header styles={styles.header}
                    handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

              <LeftDrawer navDrawerOpen={navDrawerOpen}
                          username="User Admin"/>

              <div style={styles.container}>
                {this.props.children}
              </div>

          </div>
      </MuiThemeProvider>

    );
  }
}

export default withWidth()(Layout);
