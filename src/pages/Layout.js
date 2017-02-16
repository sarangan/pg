import React from "react";
import { Link } from "react-router";
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Notification, defaultTheme } from 'material-ui';
//import Footer from "../components/layout/Footer";
//import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        display: 'flex',
        flex: '1',
        backgroundColor: '#edecec',
    },
    content: {
        flex: 1,
    },
    menu: {
        flex: '0 0 15em',
        order: -1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
};

const title = "Property Ground"
    return (

      <MuiThemeProvider>
            <div style={styles.main}>
                <AppBar title={title} />
                <div className="body" style={styles.body}>
                    <div style={styles.content}>{this.props.children}</div>
                    <Paper style={styles.menu}>


                    </Paper>
                </div>
            </div>
        </MuiThemeProvider>



    );
  }
}
