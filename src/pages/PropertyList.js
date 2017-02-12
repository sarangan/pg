import React from "react";
import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";

export default class PropertyList extends React.Component {

  constructor(){
    super();
     this.getList = this.getList.bind(this);
    //  this.state = {
    //    list: PropertyListStore.getList(),
    //  };
    console.log('bitch');

    PropertyListActions.fetchPropList();

    this.state={
      list: PropertyListStore.getList()
    };
    console.log(this.state.list);
    console.log('asshole');
  }

  // componentDidMount(){
  //   this.setState({
  //     list: PropertyListActions.fetchPropList()
  //   });
  //
  //   const { list } = this.state;
  //   console.log(list );
  //
  // }

   componentWillMount() {
     console.log('fuck');
     PropertyListStore.on("change", this.getList);
  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
  }

  getList() {
    console.log('sds');
    console.log( PropertyListActions.fetchPropList() );
    this.setState({
      list: PropertyListActions.fetchPropList()
    });
}

  render() {
    console.log('i am here loading default');


    return (
      <div>
        <h1>PropertyList</h1>
      </div>
    );
  }
}
