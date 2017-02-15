import React from "react";
import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";

export default class PropertyList extends React.Component {

  constructor(){
    super();
     this.getList = this.getList.bind(this);

      PropertyListActions.fetchPropList();
      this.state={
        list: PropertyListStore.getList()
      };

  }

   componentWillMount() {
     PropertyListStore.on("change", this.getList);
  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
  }

  getList() {

    this.setState({
      list: PropertyListStore.getList()
    });
}

  render() {

      const tblrows = this.state.list.map((row) => {
        return (
          <tr  key={row.property_id}>
              <td className="mdl-data-table__cell--non-numeric">{row.address_1 +  ' ' +  row.address_2}</td>
              <td className="mdl-data-table__cell--non-numeric">{row.city}</td>
              <td className="mdl-data-table__cell--non-numeric">{row.postalcode}</td>
              <td className="mdl-data-table__cell--non-numeric">{row.created_date}</td>
              <td className="mdl-data-table__cell--non-numeric">{row.locked}</td>
            </tr>
        );
    });

    return (
      <div>

        <div className="mdl-grid demo-content">
          <h4>Property List</h4>
        </div>

        <div className="mdl-grid demo-content">
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">Address</th>
                <th className="mdl-data-table__cell--non-numeric">City</th>
                <th className="mdl-data-table__cell--non-numeric">Postalcode</th>
                <th className="mdl-data-table__cell--non-numeric">Created date</th>
                <th className="mdl-data-table__cell--non-numeric">Status</th>
              </tr>
            </thead>
            <tbody>
              {tblrows}
            </tbody>
          </table>
      </div>

        <span className="fab-btn-container-bottom">
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i className="material-icons">add</i>
          </button>
        </span>

      </div>
    );
  }
}
