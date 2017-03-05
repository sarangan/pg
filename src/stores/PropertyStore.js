import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyStore extends EventEmitter {
  constructor() {
    super();
    this.addProperty = null;
  }

  getAddStatus() {
    console.log(this.addProperty);
    return this.addProperty;
  }


  handleActions(action) {

    switch(action.type) {

      case "ADD_PROPERTY":{
        this.addProperty = action.data;
        this.emit('change');
      }

    }

  }

}

const propertyStore = new PropertyStore;
dispatcher.register(propertyStore.handleActions.bind(propertyStore));

export default propertyStore;
