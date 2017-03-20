import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SubItemsStore extends EventEmitter {
  constructor() {
    super();
    this.sub_items = [];
    this.updateStatus = null;
  }

  getSubItems(){
    return this.sub_items;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_SUBITEMSLIST": {
        this.sub_items = action.data.sub_items;
        this.updateStatus = null;
        this.emit("change");
        break;
      }

    }

  }

}

const subItemsStore = new SubItemsStore;
dispatcher.register(subItemsStore.handleActions.bind(subItemsStore));

export default subItemsStore;
