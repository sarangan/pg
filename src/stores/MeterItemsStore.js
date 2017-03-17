import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class MeterItemsStore extends EventEmitter {
  constructor() {
    super();
    this.meter_items = [];
    this.updateStatus = null;
  }

  getItem(){
    return this.meter_items;
  }

  getUpdateStatus() {
    return this.updateStatus;
  }

  handleActions(action) {
    switch(action.type) {

      case "GET_METERITEMS": {
        this.item = action.data.meter_items;
        this.emit("change");
        break;
      }

      case "UPDATE_METERITEMS":{
        this.updateStatus = action.data.status == 1? true: false;
        this.emit("change");
        break;
      }

    }

  }

}

const meterItemsStore = new MeterItemsStore;
dispatcher.register(meterItemsStore.handleActions.bind(meterItemsStore));

export default meterItemsStore;
