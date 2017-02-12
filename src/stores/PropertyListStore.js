import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyListStore extends EventEmitter {
  constructor() {
    super()
    this.propertyList = [];
  }

  getList() {
    return this.propertyList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYLIST": {
        this.propertyList = action.data;
        console.log(this.propertyList);
        console.log('mother fucker');
        this.emit("change");
        break;
      }

    }

  }

}

const propertyListStore = new PropertyListStore;
dispatcher.register(propertyListStore.handleActions.bind(propertyListStore));

export default propertyListStore;
