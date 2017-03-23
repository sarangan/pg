import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";

class TemplateListStore extends EventEmitter {
  constructor() {
    super()
    this.templateList = [];
  }


  getTemplateList() {
    return this.templateList;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_TEMPLATELIST": {
        this.templateList = action.data.template;
        this.emit("change");
        break;
      }

    }

  }

}

const templateListStore = new TemplateListStore;
dispatcher.register(templateListStore.handleActions.bind(templateListStore));

export default templateListStore;
