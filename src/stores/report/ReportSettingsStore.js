import {EventEmitter} from "events";
import dispatcher from "../../dispatcher";


class ReportSettingsStore extends EventEmitter{

  constructor(){
    super();
  }

  handleActions(action){

    switch (action.type) {

      case "GET_REPORT_SETTINGS":{

        break;
      }
      default:

    }

  }


}


const reportSettingsStore = new ReportSettingsStore;
dispatcher.register(reportSettingsStore.handleActions.bind(reportSettingsStore));
export default reportSettingsStore;
