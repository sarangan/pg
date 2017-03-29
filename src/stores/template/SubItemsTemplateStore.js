import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class SubItemsTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.subitemslist = [];
  }


  getSubitemsTemplate() {
    return this.subitemslist;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_TEMPLATESUBITEMSLIST": {
        this.subitemslist = action.data.sub_items;
        console.log(this.subitemslist);
        this.emit("change");
        break;
      }

    }

  }

}

const subItemsTemplateStore = new SubItemsTemplateStore;
dispatcher.register(subItemsTemplateStore.handleActions.bind(subItemsTemplateStore));

export default subItemsTemplateStore;
