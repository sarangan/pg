import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class MeteritemsTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.meterlist = [];
    this.updateStatusMeterList = null;
    this.deleteStatusMeterList = null;
    this.insertStatusMeterList = null;
  }


  getMeterlistTemplate() {
    return this.meterlist;
  }

  getUpdateStatus() {
    return this.updateStatusMeterList;
  }

  getDeleteStatus() {
    return this.deleteStatusMeterList;
  }

  getInsertStatus() {
    return this.insertStatusMeterList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_TEMPLATEMETERLIST": {
        this.meterlist = action.data.meter_list;
        this.updateStatusMeterList = null;
        this.deleteStatusMeterList = null;
        this.insertStatusMeterList = null;
        //console.log(this.subitemslist);
        this.emit("change");
        break;
      }

      case "UPDATE_METERLISTTEMPLATE" : {
        //console.log(action);
        this.deleteStatusMeterList = null;
        this.insertStatusMeterList = null;
        this.updateStatusMeterList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "DELETE_METERTEMPLATE_ITEM" : {
        //console.log(action);
        this.updateStatusMeterList = null;
        this.insertStatusMeterList = null;
        this.deleteStatusMeterList= action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "INSERT_METERITEMTEMPLATE" : {
        //console.log(action);
        this.updateStatusMeterList = null;
        this.deleteStatusMeterList = null;
        this.insertStatusMeterList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const meteritemsTemplateStore = new MeteritemsTemplateStore;
dispatcher.register(meteritemsTemplateStore.handleActions.bind(meteritemsTemplateStore));

export default meteritemsTemplateStore;
