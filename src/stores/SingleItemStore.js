import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SingleItemStore extends EventEmitter {
  constructor() {
    super();
    this.item = [];
  }

  getItem(){
    return this.item;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_ITEMSDEAILS": {
        if(action.data.property && action.data.property.constructor === Array ){
          this.item = action.data.single_item[0];
        }
        else{
          this.item = action.data.single_item;
        }
        this.emit("change");
        break;
      }

    }

  }

}

const singleItemStore = new SingleItemStore;
dispatcher.register(singleItemStore.handleActions.bind(singleItemStore));

export default singleItemStore;
