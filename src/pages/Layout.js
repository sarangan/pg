import React from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from '../components/layout/Header';
import LeftDrawer from '../components/layout/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';

import {blue500} from 'material-ui/styles/colors';
import loginauth from '../auth/loginauth';
import MyPath from '../utils/settings';

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
            margin: '60px 20px 20px 30px',
            paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
          }

    };

    const muiTheme = getMuiTheme({
      palette: {
        //primary1Color: blue500,
        primary1Color: '#00BDDB'
      }
    });

    let content = <div>{this.props.children}</div>;
    if(loginauth.ISLOGIN){
        content = <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                      <Header styles={styles.header}
                              handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)} com_path={MyPath.PATH}/>

                        <LeftDrawer navDrawerOpen={navDrawerOpen}
                                    username={loginauth.USER.first_name + ' ' + loginauth.USER.last_name } isAdmin={loginauth.USER.type == 'ADMIN' ? true: false }/>

                        <div style={styles.container}>
                          {this.props.children}
                        </div>

                    </div>
                </MuiThemeProvider>;
    }
    else{
      content = <div>{this.props.children}</div>;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default withWidth()(Layout);
