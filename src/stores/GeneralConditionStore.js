import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GeneralConditionStore extends EventEmitter {
  constructor() {
    super();
    this.gen_list = [];
    this.updateStatusGenList = null;
  }

  getList(){
    return this.gen_list;
  }

  getUpdateStatus() {
    return this.updateStatusGenList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_GENERALCONDITIONLIST": {
        this.gen_list = action.data.gen_list;
        this.emit("change");
        break;
      }

      case "UPDATE_GENERALCONDITIONLIST": {
        this.updateStatusGenList = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const generalConditionStore = new GeneralConditionStore;
dispatcher.register(generalConditionStore.handleActions.bind(generalConditionStore));

export default generalConditionStore;
