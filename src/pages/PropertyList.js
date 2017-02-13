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
      list: PropertyListActions.fetchPropList()
    });
}

  render() {
    console.log('i am here loading default');
      console.log(this.state.list);

    return (
      <div>
        <h1>PropertyList</h1>
      </div>
    );
  }
}
