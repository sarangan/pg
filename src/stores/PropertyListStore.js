import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PropertyListStore extends EventEmitter {

  constructor(){
    super();
    this.propertyList = [];
    this.propertyRecent = [];
    this.isReportReady = null;
    this.susbcription = {};
    this.couponStatus = 0;
  }

  getList() {
    return this.propertyList;
  }

  getRecent() {
    return this.propertyRecent;
  }

  getIsReportReady(){
    return this.isReportReady;
  }

  getSusbcription(){
    return this.susbcription;
  }

  getCouponStatus(){
    return this.couponStatus;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PROPERTYLIST": {
        this.propertyList = action.data;
        this.isReportReady = null;
        // if(action.data.hasOwnProperty("plans")){
        //   this.susbcription =  action.data.plans[0];
        // }
        this.couponStatus = 0;
        this.emit("change");
        break;
      }
      case "GET_PROPERTYRECENT": {
        this.propertyRecent = action.data;
        if(action.data.hasOwnProperty("plans")){
          this.susbcription =  action.data.plans[0];
        }
        this.isReportReady = null;
        this.couponStatus = 0;
        this.emit("change");
        break;
      }
      case "REPORT_READY": {
        this.isReportReady = true;
        this.couponStatus = 0;
        this.emit("change");
        break;
      }
      case "GET_SUBSCRIPTION" :{
        if(action.data){
          this.susbcription = action.data.plans[0];
        }
        else{
          this.susbcription = {};
        }
        this.couponStatus = 0;
        this.isReportReady = null;
        this.emit("change");
        break;
      }
      case "APPLY_COUPON":{
        this.couponStatus = action.data.status;
        this.isReportReady = null;
        this.emit("change");
        break;
      }

    }

  }

}

const propertyListStore = new PropertyListStore;
dispatcher.register(propertyListStore.handleActions.bind(propertyListStore));

export default propertyListStore;
