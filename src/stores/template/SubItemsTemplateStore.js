import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class SubItemsTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.subitemslist = [];
    this.updateStatusSubList = null;
    this.deleteStatusSubList = null;
    this.insertStatusSubList = null;
  }


  getSubitemsTemplate() {
    return this.subitemslist;
  }

  getUpdateStatus() {
    return this.updateStatusSubList;
  }

  getDeleteStatus() {
    return this.deleteStatusSubList;
  }

  getInsertStatus() {
    return this.insertStatusSubList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_TEMPLATESUBITEMSLIST": {
        this.subitemslist = action.data.sub_items;
        this.updateStatusSubList = null;
        this.deleteStatusSubList = null;
        this.insertStatusSubList = null;
        //console.log(this.subitemslist);
        this.emit("change");
        break;
      }

      case "UPDATE_SUBITEMSTEMPLATE" : {
        //console.log(action);
        this.deleteStatusSubList = null;
        this.insertStatusSubList = null;
        this.updateStatusSubList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "DELETE_SUBITEMTEMPLATE_ITEM" : {
        //console.log(action);
        this.updateStatusSubList = null;
        this.insertStatusSubList = null;
        this.deleteStatusSubList= action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

      case "INSERT_SUBITEMTEMPLATE" : {
        //console.log(action);
        this.updateStatusSubList = null;
        this.deleteStatusSubList = null;
        this.insertStatusSubList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const subItemsTemplateStore = new SubItemsTemplateStore;
dispatcher.register(subItemsTemplateStore.handleActions.bind(subItemsTemplateStore));

export default subItemsTemplateStore;
