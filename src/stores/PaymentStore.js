import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class PaymentStore extends EventEmitter {
  constructor() {
    super();
    this.payments = [];
  }

  getPayments() {
    return this.payments;
  }

  handleActions(action) {

    switch(action.type) {

      case "GET_PAYMENTS": {

        if(action.data.hasOwnProperty("payments")){
          this.payments = action.data.payments;
        }
        else{
          this.payments = [];
        }

        this.emit("change");
        break;
      }


    }

  }

}

const paymentStore = new PaymentStore;
dispatcher.register(paymentStore.handleActions.bind(paymentStore));

export default paymentStore;
