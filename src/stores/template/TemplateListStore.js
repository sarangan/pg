import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class TemplateListStore extends EventEmitter {
  constructor() {
    super()
    this.templateList = [];
    this.updateStatusMasterItem = null;
    this.deleteStatusMasterItem = null;
    this.insertStatusMasterItem = null;
  }


  getTemplateList() {
    return this.templateList;
  }

  getUpdateStatus() {
    return this.updateStatusMasterItem;
  }

  getDeleteStatus() {
    return this.deleteStatusMasterItem;
  }

  getInsertStatus() {
    return this.insertStatusMasterItem;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_TEMPLATELIST": {
        this.templateList = action.data.template;
        this.updateStatusMasterItem = null;
        this.deleteStatusMasterItem = null;
        this.insertStatusMasterItem = null;
        this.emit("change");
        break;
      }

      case "UPDATE_MASTERITEMTEMPLATE" : {
        //console.log(action);
        this.deleteStatusMasterItem = null;
        this.insertStatusMasterItem = null;
        this.updateStatusMasterItem = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "DELETE_MASTERITEMTEMPLATE" : {
        //console.log(action);
        this.updateStatusMasterItem = null;
        this.insertStatusMasterItem = null;
        this.deleteStatusMasterItem= action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "INSERT_MASTERITEMTEMPLATE" : {
        //console.log(action);
        this.updateStatusMasterItem = null;
        this.deleteStatusMasterItem = null;
        this.insertStatusMasterItem = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const templateListStore = new TemplateListStore;
dispatcher.register(templateListStore.handleActions.bind(templateListStore));

export default templateListStore;
