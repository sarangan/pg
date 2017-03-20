import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.propertyTemplate = [];
    this.saveTemplate = null;
  }


  getTempalte() {
    return this.propertyTemplate;
  }

  getSaveTemplate() {
    console.log(this.saveTemplate);
    return this.saveTemplate;
  }


  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYTEMPLATE": {
        this.propertyTemplate = action.data.template;
        this.addProperty = null;
        this.updateProperty = null;
        this.emit("change");
        break;
      }
      case "SAVE_PROPERTYTEMPLATE":{
        this.saveTemplate = action.data;
        this.emit('change');
        break;
      }

    }

  }

}

const propertyTemplateStore = new PropertyTemplateStore;
dispatcher.register(propertyTemplateStore.handleActions.bind(propertyTemplateStore));

export default propertyTemplateStore;
