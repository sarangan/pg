import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class AudiosStore extends EventEmitter {
  constructor() {
    super();
    this.voices = [];
  }

  getVoices() {
    return this.voices;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_VOICES": {
        this.voices = action.data.voices;
        this.emit("change");
        break;
      }

    }

  }

}

const audiosStore = new AudiosStore;
dispatcher.register(audiosStore.handleActions.bind(audiosStore));

export default audiosStore;
