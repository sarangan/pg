import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyRoomListStore extends EventEmitter {
  constructor() {
    super()
    this.roomlist = [];
  }


  getRoomList() {
    return this.roomlist;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_ROOMLIST": {
        this.roomlist = action.data.roomlist;
        this.emit("change");
        break;
      }

    }

  }

}

const propertyRoomListStore = new PropertyRoomListStore;
dispatcher.register(propertyRoomListStore.handleActions.bind(propertyRoomListStore));

export default propertyRoomListStore;
