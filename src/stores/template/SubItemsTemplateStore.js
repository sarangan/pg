import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class SubItemsTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.subitemslist = [];
    this.updateStatusSubList = null;
  }


  getSubitemsTemplate() {
    return this.subitemslist;
  }

  getUpdateStatus() {
    return this.updateStatusSubList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_TEMPLATESUBITEMSLIST": {
        this.subitemslist = action.data.sub_items;
        this.updateStatusSubList = null;
        console.log(this.subitemslist);
        this.emit("change");
        break;
      }

      case "UPDATE_SUBITEMSTEMPLATE" : {
        console.log(action);
        this.updateStatusSubList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const subItemsTemplateStore = new SubItemsTemplateStore;
dispatcher.register(subItemsTemplateStore.handleActions.bind(subItemsTemplateStore));

export default subItemsTemplateStore;
