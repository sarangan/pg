import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyStore extends EventEmitter {
  constructor() {
    super();
    this.addProperty = null;
    this.updateProperty = null;
    this.property_info = {};
  }

  getAddStatus() {
    console.log(this.addProperty);
    return this.addProperty;
  }

  getPropertyDetails(){
    return this.property_info;
  }

  getUpdateStatus() {
    return this.updateProperty;
  }


  handleActions(action) {

    switch(action.type) {

      case "ADD_PROPERTY":{
        this.addProperty = action.data;
        this.emit('change');
        break;
      }

      case "GET_PROPERTY":{

        if(action.data.property && action.data.property.constructor === Array ){
          this.property_info = action.data.property[0];
        }
        else{
          this.property_info = action.data.property;
        }
        this.addProperty = null;
        this.updateProperty = null;
        this.emit('change');
        break;
      }

      case "UPDATE_PROPERTY":{
        this.updateProperty = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }


    }

  }

}

const propertyStore = new PropertyStore;
dispatcher.register(propertyStore.handleActions.bind(propertyStore));

export default propertyStore;
