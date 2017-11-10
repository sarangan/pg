import React from "react";
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import PageBase from '../components/layout/PageBase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ExtIcon from 'material-ui/svg-icons/action/extension';
import {teal200, orange500, pink500} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

import * as PaymentActions from "../actions/PaymentActions";
import PaymentStore from "../stores/PaymentStore";


export default class Payments extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      showSuccessSnack: false,
      startSending: true,
      showErrorSnack: false,
      payments: [],
    };

    this.getPayments = this.getPayments.bind(this);
    PaymentActions.fetchHistory();
  }

  componentWillMount(){
      PaymentStore.on("change", this.getPayments);
  }

  componentWillUnmount(){
      PaymentStore.removeListener("change", this.getPayments);
  }




  getPayments(){
      let payments = PaymentStore.getPayments();

      if(payments){
        this.setState({
          payments: payments,
          startSending: false
        });
      }

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
        tablewrapper:{
          position: 'relateive'
        },
        floatingActionButton: {
          margin: 0,
          top: 'auto',
          right: 50,
          bottom: 50,
          left: 'auto',
          position: 'absolute',
        },
        underlineStyle: {
          borderColor: orange500,
        },
        divider: {
          marginTop: 1,
          marginBottom: 5
        },
        comapnyheader:{
          marginTop: 30,
          color: '#15b993',
          fontSize: 18
        },
        dialog: {
          width: 300
        },
        saveButton: {
          marginLeft: 5,
          marginRight: 10
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


      <div style={styles.tablewrapper}>
      <Table
            fixedHeader={true}
            height={'300px'}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >

              <TableRow>
                <TableHeaderColumn tooltip="Package name">Package name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Amount">Amount</TableHeaderColumn>
                <TableHeaderColumn tooltip="Currency">Currency</TableHeaderColumn>
                <TableHeaderColumn tooltip="Txn id">Txt id</TableHeaderColumn>
                <TableHeaderColumn tooltip="Payer email">Payer email</TableHeaderColumn>
                <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
              </TableRow>

            </TableHeader>

            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
            >

              { this.state.payments &&
                this.state.payments.map( (row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row.package_name}</TableRowColumn>
                    <TableRowColumn>{row.amount}</TableRowColumn>
                    <TableRowColumn>{row.currency}</TableRowColumn>
                    <TableRowColumn>{row.txn_id}</TableRowColumn>
                    <TableRowColumn>{row.payer_email}</TableRowColumn>
                    <TableRowColumn>{new Date(row.createdAt).toLocaleString() }</TableRowColumn>
                  </TableRow>
                ))
              }

            </TableBody>
        </Table>

        <p style={{color:'#9E9E9E', fontSize: 12}}>* Sometimes there might be dupicated values but no worries we just try to capture everything and only grab the lasted payment history from paypal</p>

        </div>




      </PageBase>

    );
  }

}
