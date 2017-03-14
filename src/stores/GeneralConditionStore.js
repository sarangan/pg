import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GeneralConditionStore extends EventEmitter {
  constructor() {
    super();
    this.gen_list = [];
  }

  getList(){
    return this.gen_list;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_GENERALCONDITIONLIST": {
        this.gen_list = action.data.gen_list;
        this.emit("change");
        break;
      }

    }

  }

}

const generalConditionStore = new GeneralConditionStore;
dispatcher.register(generalConditionStore.handleActions.bind(generalConditionStore));

export default generalConditionStore;
