import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SingleItemStore extends EventEmitter {
  constructor() {
    super();
    this.item = [];
    this.updateStatus = null;
  }

  getItem(){
    return this.item;
  }

  getUpdateStatus() {
    return this.updateStatus;
  }

  handleActions(action) {
    switch(action.type) {

      case "GET_ITEMSDEAILS": {
        if(action.data.single_item && action.data.single_item.constructor === Array ){
          this.item = action.data.single_item[0];
        }
        else{
          this.item = action.data.single_item;
        }
        this.emit("change");
        break;
      }

      case "UPDATE_SINGLEITEM":{
        this.updateStatus = action.data.status == 1? true: false;
        this.emit("change");
        break;
      }

    }

  }

}

const singleItemStore = new SingleItemStore;
dispatcher.register(singleItemStore.handleActions.bind(singleItemStore));

export default singleItemStore;
