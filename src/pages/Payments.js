import React from "react";
//import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
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
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import loginauth from '../auth/loginauth';
import * as PaymentActions from "../actions/PaymentActions";
import PaymentStore from "../stores/PaymentStore";

import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";


export default class Payments extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      showSuccessSnack: false,
      startSending: true,
      showErrorSnack: false,
      payments: [],
      subscription:  PropertyListStore.getSusbcription(),
      coupon_code: '',
      showdialog: false,
      coupon_err_text: '',
    };

    this.getPayments = this.getPayments.bind(this);
    this.getSusbcription = this.getSusbcription.bind(this);
    this.getCouponStatus = this.getCouponStatus.bind(this);
    PropertyListActions.fetchSubscriptions();
    PaymentActions.fetchHistory();
  }

  componentWillMount(){
      PaymentStore.on("change", this.getPayments);
      PropertyListStore.on("change", this.getSusbcription);
      PropertyListStore.on("change", this.getCouponStatus);
  }

  componentWillUnmount(){
      PaymentStore.removeListener("change", this.getPayments);
      PropertyListStore.removeListener("change", this.getSusbcription);
      PropertyListStore.removeListener("change", this.getCouponStatus);
  }

  fetchSubs(){
    PropertyListActions.fetchSubscriptions();
  }

  getSusbcription() {

    let list = PropertyListStore.getSusbcription();
    if(list){
      this.setState({
        subscription: list,
      });
    }

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

  getCouponStatus(){
    let status = PropertyListStore.getCouponStatus();
    if(status == 1){

      this.setState({
        coupon_err_text: "Coupon updated!"
      }, ()=>{
        this.handleDialogOpen();
        this.fetchSubs();
      });

    }
    else if(status == 2){

      this.setState({
        coupon_err_text: "Invalid coupon!"
      }, ()=>{
        this.handleDialogOpen();
      })

    }
  }

  //coupon input change
  handleInputChange = (event) =>{
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;
       this.setState({
           coupon_code: value
       });

  }

  //apply coupon code
  applyCoupon = () =>{
    if(this.state.coupon_code.length > 0){
      console.log('ok');
      PropertyListActions.applyCoupon(this.state.coupon_code);
    }
    else{
      this.setState({
        coupon_err_text: "Invalid coupon!"
      }, ()=>{
        this.handleDialogOpen();
      });

    }

  }


  handleDialogOpen = () => {
    this.setState({showdialog: true});
  };

  handleDialogClose = () => {
    this.setState({showdialog: false});
  };

  handleDialogOk =() => {
    this.setState({showdialog: false});
  }



  render(){
    const modal_actions = [

      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleDialogOk}
      />,
    ];


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
        subTxt: {
          paddingLeft: 16,
          paddingRight: 16,
          maxWidth: 300,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 12,
          color: '#4A5D75'
        },
        subTxtnoplan: {
          paddingLeft: 16,
          paddingRight: 16,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 12,
          color: '#333333',
          paddingTop: 3,
          paddingBottom: 3,
          fontWeight: '600'
        }


    };

    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }

    let today = new Date();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    let payment_status = [];

 if(this.state.subscription && this.state.subscription.hasOwnProperty('createdAt')){

    //check if last plan is for current month
    let plan_date = new Date(this.state.subscription.createdAt);
    let get_last_sub_month = plan_date.getMonth() + 1;
    let get_last_sub_year = plan_date.getFullYear();


    if(get_last_sub_month == mm && get_last_sub_year == yyyy){

      if(this.state.subscription.splan_id == 1000){
         payment_status.push(<div key={1} style={styles.subTxtnoplan}>Status: {this.state.subscription.total_sliver_reports == 0 ? ' You have enough credit to generate one report' : 'You may need to purchase subscription plan to generate report'  }</div>);

         if(this.state.subscription.total_sliver_reports != 0){
           payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: 'normal', fontSize: 14}}>
             Your subscription plan has been expired
           </CardText>);

           payment_status.push(<CardActions key={5}>
           <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
             <RaisedButton secondary={true} label="Buy Subscription plan" />
           </a>
           <RaisedButton secondary={false} label="Refresh" onClick={()=>this.fetchSubs()}/>
         </CardActions>);

         payment_status.push(
           <div style={{paddingTop: 5, paddingBottom: 5}} key={6}>
              <TextField  hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.handleInputChange}/>
              <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.applyCoupon()}/>
           </div>
         );

         }
      }

      if(this.state.subscription.splan_id == 2000){
        payment_status.push(<div key={2} style={styles.subTxtnoplan}>Status: {this.state.subscription.total_gold_reports < this.state.subscription.reports ? 'You can generate ' + (this.state.subscription.reports - this.state.subscription.total_gold_reports) + ' more reports' : 'You may need to purchase subscription plan to generate report'  }</div>);

        if(this.state.subscription.total_gold_reports >= this.state.subscription.reports){
          payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: 'normal', fontSize: 14}}>
            Your subscription plan has been expired
          </CardText>);

          payment_status.push(<CardActions key={5}>
          <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
            <RaisedButton secondary={true} label="Buy Subscription plan" />
          </a>
          <RaisedButton secondary={false} label="Refresh" onClick={()=>this.fetchSubs()}/>
        </CardActions>);

        payment_status.push(
          <div style={{paddingTop: 5, paddingBottom: 5}} key={6}>
             <TextField  hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.handleInputChange}/>
             <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.applyCoupon()}/>
          </div>
        );

        }

      }

      if(this.state.subscription.splan_id == 3000){
        payment_status.push(<div key={3} style={styles.subTxtnoplan}>You can generate unlimited number of reports</div>);
      }




    }
    else{
      payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: 'normal', fontSize: 14}}>
        Your subscription plan has been expired
      </CardText>);
      payment_status.push(<CardActions key={5}>
      <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
        <RaisedButton secondary={true} label="Buy Subscription plan" />
      </a>
        <RaisedButton secondary={false} label="Refresh" onClick={()=>this.fetchSubs()}/>
    </CardActions>);

    payment_status.push(
      <div style={{paddingTop: 5, paddingBottom: 5}} key={6}>
         <TextField  hintText="Coupon code" floatingLabelText="Coupon code" fullWidth={false} name="coupon_code" onChange={this.handleInputChange}/>
         <RaisedButton secondary={false} label="Apply coupon" onClick={()=>this.applyCoupon()}/>
      </div>
    );
    
    }

  }



    return(

      <PageBase title="Users List" navigation="">

        {isShowSaving}

        <div style={{marginTop: 20}}>
          <h3 style={{color: '#0097A7',  fontSize: 20}}>Subscription details</h3>
        </div>

        {this.state.subscription && this.state.subscription.subs_id &&
          <Card  style={{boxShadow: 'none', backgroundColor: '#E0F7FA'}}>
            <CardTitle title={this.state.subscription.title } style={{color: '#00695C', fontWeight: '600', fontSize: 14}} />
              <div style={styles.subTxtnoplan}>You recent subscription plan - {this.state.subscription.title } </div>
              <div style={styles.subTxtnoplan}>Last payment date: {this.state.subscription.alt_created_date}</div>
              <div style={styles.subTxtnoplan}>Price: {this.state.subscription.price}</div>
              {payment_status}

          </Card>
        }
        {this.state.subscription && !this.state.subscription.subs_id &&
          <Card>
            <CardText style={{color: '#D32F2F', fontWeight: 'normal', fontSize: 14}}>
              You don't have any subscription plan yet
            </CardText>
            <div style={styles.subTxtnoplan}>Please purchase a subcription plan before generate reports.</div>
            <div style={styles.subTxtnoplan}>You cannot download reports if you have zero credit</div>

            <CardActions>

              <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
                <RaisedButton secondary={true} label="Buy Subscription plan" />
              </a>
              <RaisedButton secondary={false} label="Refresh" onClick={()=>this.fetchSubs()}/>

            </CardActions>
          </Card>
        }

        {!this.state.subscription &&
          <Card>
            <CardText style={{color: '#D32F2F', fontWeight: 'normal', fontSize: 14}}>
              You don't have any subscription plan yet
            </CardText>
            <div style={styles.subTxtnoplan}>Please purchase a subcription plan before generate reports.</div>
            <div style={styles.subTxtnoplan}>You cannot download reports if you have zero credit</div>

            <CardActions>

              <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
                <RaisedButton secondary={true} label="Buy Subscription plan" />
              </a>
              <RaisedButton secondary={false} label="Refresh" onClick={()=>this.fetchSubs()}/>

            </CardActions>
          </Card>
        }


      <div style={styles.tablewrapper}>
      <Table
            fixedHeader={true}
            height={'500px'}
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

        <Dialog
          actions={modal_actions}
          modal={false}
          open={this.state.showdialog}
          onRequestClose={this.handleDialogClose}
          contentStyle ={styles.dialog}
        >
          {this.state.coupon_err_text}
        </Dialog>


      </PageBase>

    );
  }

}
