import React from "react";
import PageBase from '../components/layout/PageBase';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';


export default class Settings extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      showSuccessSnack: false,
      startSending: false,
      showErrorSnack: false,
    };

    //this.getPayments = this.getPayments.bind(this);

  }

  componentWillMount(){
      //PaymentStore.on("change", this.getPayments);
  }

  componentWillUnmount(){
      //PaymentStore.removeListener("change", this.getPayments);
  }


  render(){

    const styles = {
        tblProgress: {
          margin: '20px auto',
          textAlign: 'center'
        },
        progressbar:{
          width: 'auto',
          height: 20
        },
        wrapper:{
          boxShadow:' rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
          borderRadius: 2,
          padding: 10,
          marginBottom: 30,
          marginTop: 20,
          position: 'relative'
        },
        heading:{
          color: 'rgb(79, 189, 160)',
          marginBottom: 0
        },
        headinghr:{
          backgroundColor: 'rgb(79, 189, 160)',
          marginBottom: 20,
          marginTop: 5
        },
        buttons: {
          marginTop: 30,
          marginLeft: 10,
          float: 'right'
        },

        floatingActionButton: {
          margin: 0,
          top: 'auto',
          right: 50,
          bottom: 50,
          left: 'auto',
          position: 'absolute',
        },

        divider: {
          marginTop: 1,
          marginBottom: 5
        },

        cardContainer: {
          display: 'flex',
          flexWrap: 'wrap',
          margin: 30
        },


    };

    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }



    return(

      <PageBase title="Users List" navigation="">

        {isShowSaving}

        <div style={{marginTop: 20}}>
          <h3>General settings</h3>
          <Divider style={{width: '20%'}}/>
        </div>

        <div style={styles.cardContainer}>


          <div style={styles.tablewrapper}>
              <RaisedButton secondary={true} label="Reset to default template" />
          </div>

        </div>




      </PageBase>

    );
  }

}
