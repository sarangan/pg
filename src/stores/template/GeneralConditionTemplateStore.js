import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class GeneralConditionTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.gen_list = [];
    this.updateStatusGenList = null;
    this.insertStatusGenList = null;
    this.deleteStatusGenList = null;
  }

  getTemplateList() {
    return this.gen_list;
  }

  getUpdateStatus() {
    return this.updateStatusGenList;
  }

  getInsertStatus() {
    return this.insertStatusGenList;
  }

  getDeleteStatus() {
    return this.deleteStatusGenList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_GENERALCONDITIONTEMPLATE": {
        this.gen_list = action.data.gen_list;
        this.updateStatusGenList = null;
        this.deleteStatusGenList = null;
        this.insertStatusGenList = null;
        this.emit("change");
        break;
      }

      case "UPDATE_GENERALCONDITIONTEMPLATE" : {
        console.log(action);
        this.updateStatusGenList = action.data.status == 1? true: false;
        this.deleteStatusGenList = null;
        this.insertStatusGenList = null;
        this.emit('change');
        break;
      }

      case "INSERT_GENERALCONDITIONTEMPLATE" : {
        console.log(action);
        this.updateStatusGenList = null;
        this.deleteStatusGenList = null;
        this.insertStatusGenList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "DELETE_GENERALCONDITIONTEMPLATE_ITEM" : {
        console.log(action);
        this.updateStatusGenList = null;
        this.insertStatusGenList = null;
        this.deleteStatusGenList= action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const generalConditionTemplateStore = new GeneralConditionTemplateStore;
dispatcher.register(generalConditionTemplateStore.handleActions.bind(generalConditionTemplateStore));

export default generalConditionTemplateStore;
