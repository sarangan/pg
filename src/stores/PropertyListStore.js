import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyListStore extends EventEmitter {
  constructor() {
    super()
    this.propertyList = [];
    this.addProperty = null;
  }

  getList() {
    return this.propertyList;
  }

  getAddStatus() {
    console.log(this.addProperty);
    return this.addProperty;
  }


  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYLIST": {
        this.propertyList = action.data;
        this.emit("change");
        break;
      }

      case "ADD_PROPERTY":{
        this.addProperty = action.data;
        this.emit('change');
      }

    }

  }

}

const propertyListStore = new PropertyListStore;
dispatcher.register(propertyListStore.handleActions.bind(propertyListStore));

export default propertyListStore;
