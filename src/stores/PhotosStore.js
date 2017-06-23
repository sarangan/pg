import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PhotosStore extends EventEmitter {
  constructor() {
    super();
    this.photos = [];
    this.updateDnDStatus = null;
    this.deletePhotoStatus = null;
    this.uploadPhotoStatus = null;
  }

  getPhotos() {
    return this.photos;
  }

  getPhotoDnDStatus(){
    return this.updateDnDStatus;
  }

  getPhotoDeleteStatus(){
    return this.deletePhotoStatus;
  }

  getPhotoUploadStatus(){
    return this.uploadPhotoStatus;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PHOTOS": {
        this.photos = action.data.photos;
        this.updateDnDStatus = false;
        this.uploadPhotoStatus = null;
        this.emit("change");
        break;
      }

      case "UPDATE_PHOTODnD": {
        this.updateDnDStatus = action.data.status == 1? true: false;
        this.deletePhotoStatus = null;
        this.uploadPhotoStatus = null;
        this.emit("change");
        break;
      }

      case "DELETE_PHOTO": {
        this.deletePhotoStatus = action.data.status == 1? true: false;
        this.updateDnDStatus = null;
        this.uploadPhotoStatus = null;
        this.emit("change");
        break;
      }
      case "UPLOAD_PHOTO":{
        this.uploadPhotoStatus = action.data.status == 1? true: false;
        this.deletePhotoStatus = null;
        this.updateDnDStatus = null;
        this.emit("change");
        
        break;
      }


    }

  }

}

const photosStore = new PhotosStore;
dispatcher.register(photosStore.handleActions.bind(photosStore));

export default photosStore;
