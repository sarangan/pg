import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SubItemsStore extends EventEmitter {
  constructor() {
    super();
    this.sub_items = {
      list: [],
      gen_comment: '',
      voices: []
    };
    this.updateStatus = null;
  }

  getSubItems(){
    return this.sub_items;
  }

  getUpdateStatus() {
    return this.updateStatus;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_SUBITEMSLIST": {
        this.sub_items['list'] = action.data.sub_items;
        if(action.data.gen_comment){
          this.sub_items['gen_comment'] = action.data.gen_comment;
        }
        else{
          this.sub_items['gen_comment'] = {};
        }

        this.updateStatus = null;
        this.emit("change");
        break;
      }

      case "UPDATE_SUBITEMS":{
        this.updateStatus = action.data.status == 1? true: false;
        console.log(action.data);
        this.emit("change");
        break;
      }

    }

  }

}

const subItemsStore = new SubItemsStore;
dispatcher.register(subItemsStore.handleActions.bind(subItemsStore));

export default subItemsStore;
