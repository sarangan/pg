import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class GeneralConditionTemplateStore extends EventEmitter {
  constructor() {
    super()
    this.gen_list = [];
    this.updateStatusGenList = null;
  }


  getTemplateList() {
    return this.gen_list;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_GENERALCONDITIONTEMPLATE": {
        this.gen_list = action.data.gen_list;
        this.updateStatusGenList = null;
        this.emit("change");
        break;
      }

    }

  }

}

const generalConditionTemplateStore = new GeneralConditionTemplateStore;
dispatcher.register(generalConditionTemplateStore.handleActions.bind(generalConditionTemplateStore));

export default generalConditionTemplateStore;
