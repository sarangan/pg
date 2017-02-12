import React from "react";
import { Link } from "react-router";

//import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (

        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">

            <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Home</span>
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                  <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                    <i className="material-icons">search</i>
                  </label>
                  <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" id="search" />
                    <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
                  </div>
                </div>
                <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                  <i className="material-icons">more_vert</i>
                </button>
                <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
                  <li className="mdl-menu__item">About</li>
                  <li className="mdl-menu__item">Contact</li>
                  <li className="mdl-menu__item">Legal information</li>
                </ul>
              </div>
            </header>

            <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">

              <header className="demo-drawer-header">
                <img src="images/user.jpg" className="demo-avatar"/>
                <div className="demo-avatar-dropdown">
                  <span>hello@pg.com</span>
                  <div className="mdl-layout-spacer"></div>
                  <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                    <i className="material-icons" role="presentation">arrow_drop_down</i>
                    <span className="visuallyhidden">Accounts</span>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                    <li className="mdl-menu__item">hello@example.com</li>
                    <li className="mdl-menu__item">info@example.com</li>
                    <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
                  </ul>
                </div>
              </header>

              <div className="nav-container">
                <Nav location={location} />
              </div>

          </div>

          <main className="mdl-layout__content mdl-color--grey-100">
            <div className="mdl-grid demo-content">
              {this.props.children}
            </div>
          </main>

        </div>


    );
  }
}
