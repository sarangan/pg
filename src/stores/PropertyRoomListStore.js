import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyRoomListStore extends EventEmitter {
  constructor() {
    super()
    this.roomlist = [];
    this.updateMasterItemStatus = null;
    this.copyMasterItemStatus = null;
  }


  getRoomList() {
    return this.roomlist;
  }

  getMasterItemUpdateStatus(){
    return this.updateMasterItemStatus;
  }

  getMasterItemCopyStatus(){
    return this.copyMasterItemStatus;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_ROOMLIST": {
        this.roomlist = action.data.roomlist;
        this.emit("change");
        break;
      }
      case "UPDATE_MASTERITEM": {
        this.updateMasterItemStatus = action.data.status == 1? true: false;
        this.copyMasterItemStatus = null;
        this.roomlist  = [];
        this.emit("change");
        break;
      }
      case "COPY_MASTERITEM": {
        this.copyMasterItemStatus = action.data.status == 1? true: false;
        this.updateMasterItemStatus = null;
        this.roomlist = [];
        this.emit("change");
        break;
      }

    }

  }

}

const propertyRoomListStore = new PropertyRoomListStore;
dispatcher.register(propertyRoomListStore.handleActions.bind(propertyRoomListStore));

export default propertyRoomListStore;
