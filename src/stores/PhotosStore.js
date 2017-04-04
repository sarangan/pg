import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PhotosStore extends EventEmitter {
  constructor() {
    super();
    this.photos = [];
  }

  getPhotos() {
    return this.photos;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PHOTOS": {
        this.photos = action.data.photos;
        this.emit("change");
        break;
      }

    }

  }

}

const photosStore = new PhotosStore;
dispatcher.register(photosStore.handleActions.bind(photosStore));

export default photosStore;
