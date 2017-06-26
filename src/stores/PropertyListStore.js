import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyListStore extends EventEmitter {
  constructor() {
    super();
    this.propertyList = [];
    this.propertyRecent = [];
    this.isReportReady = null;
  }

  getList() {
    return this.propertyList;
  }

  getRecent() {
    return this.propertyRecent;
  }

  getIsReportReady(){
    return this.isReportReady;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYLIST": {
        this.propertyList = action.data;
        this.isReportReady = null;
        this.emit("change");
        break;
      }
      case "GET_PROPERTYRECENT": {
        this.propertyRecent = action.data;
        this.isReportReady = null;
        this.emit("change");
        break;
      }
      case "REPORT_READY": {
        this.isReportReady = true;
        this.emit("change");
        break;

      }

    }

  }

}

const propertyListStore = new PropertyListStore;
dispatcher.register(propertyListStore.handleActions.bind(propertyListStore));

export default propertyListStore;
