import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SubItemsStore extends EventEmitter {
  constructor() {
    super();
    this.sub_items = [];
  }

  getSubItems(){
    return this.sub_items;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_SUBITEMSLIST": {
        this.sub_items = action.data.sub_items;
        this.emit("change");
        break;
      }

    }

  }

}

const generalConditionStore = new GeneralConditionStore;
dispatcher.register(generalConditionStore.handleActions.bind(generalConditionStore));

export default generalConditionStore;
