import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyListStore extends EventEmitter {
  constructor() {
    super();
    this.propertyList = [];
    this.propertyRecent = [];
  }

  getList() {
    return this.propertyList;
  }

  getRecent() {
    return this.propertyRecent;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYLIST": {
        this.propertyList = action.data;
        this.emit("change");
        break;
      }
      case "GET_PROPERTYRECENT": {
        this.propertyRecent = action.data;
        this.emit("change");
        break;
      }

    }

  }

}

const propertyListStore = new PropertyListStore;
dispatcher.register(propertyListStore.handleActions.bind(propertyListStore));

export default propertyListStore;
