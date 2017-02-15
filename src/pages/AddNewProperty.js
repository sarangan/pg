import React from "react";
// import * as PropertyListActions from "../actions/PropertyListActions";
// import PropertyListStore from "../stores/PropertyListStore";

export default class AddNewProperty extends React.Component {

  constructor(){
    super();
  }

  render() {

    return (
      <div>

        <div className="mdl-grid demo-content">
          <h4>Add New Property</h4>
        </div>

          <form>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="Address_1"/>
              <label className="mdl-textfield__label" htmlFor="Address_1">Address 1</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="Address_2"/>
              <label className="mdl-textfield__label" htmlFor="Address_2">Address 2</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="city"/>
              <label className="mdl-textfield__label" htmlFor="city">City</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="postalcode"/>
              <label className="mdl-textfield__label" htmlFor="postalcode">Postalcode</label>
            </div>



            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">

              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="created_date">
                <i className="material-icons">date_range</i>
              </label>

              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="date" id="created_date"/>
                <label className="mdl-textfield__label" htmlFor="created_date"></label>
              </div>

            </div>


          </form>


      </div>
    );
  }
}
