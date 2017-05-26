import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SignatureStore extends EventEmitter {
  constructor() {
    super();
    this.sings = {};
    this.updateSigns = null;
  }

  getSingatures() {
    return this.sings;
  }

  getUpdateStatus() {
    return this.updateSigns;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_SINGS": {

        if(action.data.signatures){
          this.sings = action.data.signatures;
        }
        else{
          this.sings = {};
        }

        this.emit("change");
        break;
      }
      case "UPDATE_SINGS":{
        this.updateSigns = action.data.status == 1? true: false;
        this.emit('change');
        break;
      }

    }

  }

}

const signatureStore = new SignatureStore;
dispatcher.register(signatureStore.handleActions.bind(signatureStore));

export default signatureStore;
