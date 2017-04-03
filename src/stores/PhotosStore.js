import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PhotosStore extends EventEmitter {
  constructor() {
    super();
    this.photos = [];
    this.server_path = 'http://52.39.72.94/';
  }

  getPhotos() {
    return this.photos;
  }

  getPath(){
    return this.server_path;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PHOTOS": {
        this.photos = action.photos;
        this.emit("change");
        break;
      }

    }

  }

}

const photosStore = new PhotosStore;
dispatcher.register(photosStore.handleActions.bind(photosStore));

export default photosStore;
