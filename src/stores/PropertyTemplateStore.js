import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.propertyTemplate = [];
  }


  getTempalte() {
    return this.propertyTemplate;
  }


  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYTEMPLATE": {
        this.propertyTemplate = action.data;
        this.emit("change");
        break;
      }

    }

  }

}

const propertyTemplateStore = new PropertyTemplateStore;
dispatcher.register(propertyTemplateStore.handleActions.bind(propertyTemplateStore));

export default propertyTemplateStore;
