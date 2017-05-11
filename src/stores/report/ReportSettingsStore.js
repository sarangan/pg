import {EventEmitter} from "events";
import dispatcher from "../../dispatcher";

class ReportSettingsStore extends EventEmitter{

  constructor(){
    super();
    this.report_settings = {};
    this.report_settings_notes = null;
    this.updateStatusSettings = null;
    this.uploadLogoStatus = null;
  }

  getSettings() {
    return this.report_settings;
  }

  getSettingsNotes(){
    return this.report_settings_notes;
  }

  getUpdateStatus(){
    return this.updateStatusSettings;
  }

  getUploadLogoStatus(){
    return this.uploadLogoStatus;
  }

  handleActions(action){

    switch (action.type) {

      case "GET_REPORT_SETTINGS": {
        console.log(action.data.data);
        this.report_settings =  action.data.data.report_settings;
        this.report_settings_notes = action.data.data.report_settings_notes;
        this.updateStatusSettings = null;
        this.uploadLogoStatus = null;
        this.emit("change");
        break;
      }

      case "UPDATE_REPORT_SETTINGS": {
        this.updateStatusSettings = action.data.status == 1? true: false;
        this.uploadLogoStatus = null;
        this.emit("change");
        break;
      }

      case "UPLOAD_REPORT_LOGO": {
        this.uploadLogoStatus = action.data.status == 1? true: false;
        this.updateStatusSettings = null;
        this.emit("change");
        break;
      }

    }

  }


}


const reportSettingsStore = new ReportSettingsStore;
dispatcher.register(reportSettingsStore.handleActions.bind(reportSettingsStore));
export default reportSettingsStore;
