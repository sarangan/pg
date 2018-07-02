import React, {Component} from "react";
import { Link } from "react-router";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {pink500, grey500, amber500} from 'material-ui/styles/colors';

import PageBase from '../components/layout/PageBase';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import SubscriptionElement from '../components/subscription/SubscriptionElement';

import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";
import loginauth from '../auth/loginauth';


export default class Dashboard extends Component {

  constructor(props){
    super(props);
      console.log(props);
      this.getList = this.getList.bind(this);
      this.getIsReportReadyStatus = this.getIsReportReadyStatus.bind(this);
      this.getSusbcription = this.getSusbcription.bind(this);
      this.getCouponStatus = this.getCouponStatus.bind(this);

      PropertyListActions.fetchRecent();

      this.state={
        list: [],
        subscription: {},
        startProcess: false,
        coupon_code: '',
        showdialog: false,
        coupon_err_text: '',
      };
  }

  componentWillMount() {
    PropertyListStore.on("change", this.getList);
    PropertyListStore.on("change", this.getIsReportReadyStatus);
    PropertyListStore.on("change", this.getSusbcription);
    PropertyListStore.on("change", this.getCouponStatus);

  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
    PropertyListStore.removeListener("change", this.getIsReportReadyStatus);
    PropertyListStore.removeListener("change", this.getSusbcription);
    PropertyListStore.removeListener("change", this.getCouponStatus);
  }

  getList() {

    let list = PropertyListStore.getRecent();
    if(list && list.hasOwnProperty("plans")){
      this.setState({
        list: list.properties,
        subscription: list.plans[0]
      });
    }
    else{
      this.setState({
        list: [],
        subscription: {}
      });
    }

  }

  fetchSubs(){
    PropertyListActions.fetchSubscriptions();
  }

  getIsReportReadyStatus(){
    let status = PropertyListStore.getIsReportReady();

    if(status){
      this.setState({
        startProcess: false
      }, ()=>{
        PropertyListActions.fetchSubscriptions();
      });
    }

  }

  getSusbcription() {

    let list = PropertyListStore.getSusbcription();
    if(list){
      this.setState({
        subscription: list
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


  //is to get the status icon
  getStatusIcon(status){
    let statusIcon = null;
    if (status == 0) {
      statusIcon = <LockOpen />;
    } else {
      statusIcon = <LockOutline />;
    }
    return statusIcon;
  }

  //generate report
  generateReport(property_id){
    console.log(property_id);
    this.setState({
      startProcess: true
    });
    PropertyListActions.generateReport(property_id);
  };

  getDesc(description, total_rooms, total_photos){
    let des = '';
    if(total_rooms == 0){
      des = <div style={{color: '#FF7043'}}>You need to add rooms for this property</div>;
    }
    else if(description){
      des = <div style={{color: '#4CAF50'}}>{description}</div>;
    }
    else if(total_photos == 0){
      des = <div style={{color: '#FFCA28'}}>You may need to add photos for this property</div>;
    }
    else if(total_photos > 0 && !description){
      des = <div style={{color: '#006064'}}>Check out the property report</div>;
    }
    return des;
  }

  getAddress(address_1, address_2, city, postalcode ){
      address_1 = encodeURIComponent(address_1);
      address_2 = encodeURIComponent(address_2);
      city = encodeURIComponent(city);
      postalcode = encodeURIComponent(postalcode);
      let adds = "https://maps.googleapis.com/maps/api/staticmap?center="+ address_1 + " " + postalcode +"&zoom=15&size=300x180&markers=size:mid%7C" + address_1 + " " + postalcode + "&key=AIzaSyAk86Lc4LhpzNywnlyjr0P1MecBjz8GQSk";
    return adds;
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


  render() {

    const modal_actions = [

      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleDialogOk}
      />,
    ];

    const styles = {
        floatingActionButton: {
          margin: 0,
          top: 'auto',
          right: 50,
          bottom: 50,
          left: 'auto',
          position: 'fixed',
        },
        editButton: {
          fill: grey500
        },
        viewButton: {
          fill: grey500
        },
        statusButton:{
          fill: amber500
        },
        tblProgress: {
          margin: '50px auto',
          textAlign: 'center'
        },
        navbtn: {
          width: 30,
          marginRight: 10
        },
        cardContainer: {
          display: 'flex',
          flexWrap: 'wrap'
        },
        cardWrapper:{
          width: 300,
          marginLeft: 30,
          marginTop: 20,
        },
        subTxt: {
          paddingLeft: 16,
          paddingRight: 16,
          maxWidth: 300,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 12,
          fontWeight: '600',
          color: '#333333'
        },
        dialog: {
          width: 300
        }
    };


      let isShowLoading = null;
       if (this.state.list.length >= 0 || this.state.list ) {
         isShowLoading = '';
       } else {
         isShowLoading = <div style={styles.tblProgress}><CircularProgress /></div>;
       }



    return (

      <PageBase title="Dashboard" navigation="">

          <Link to="/addnewproperty">
            <FloatingActionButton style={styles.floatingActionButton}  iconStyle={{backgroundColor: pink500}}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          {isShowLoading}

          {this.state.startProcess &&
             <LinearProgress mode="indeterminate" />
          }

          <SubscriptionElement subscription={this.state.subscription} fetchSubs={this.fetchSubs} applyCoupon={this.applyCoupon} handleInputChange={this.handleInputChange}/>

          <div style={{marginTop: 20}}>
            <h3>Recent properties</h3>
            <Divider style={{width: '20%'}}/>
            {this.state.list.length == 0 &&
              <CardText  key={4} style={{color: '#17bebb', fontWeight: '500', fontSize: 14}}>You don't have any property, please add new property by clicking the plus button bellow.</CardText>
            }
          </div>
          <div style={styles.cardContainer}>


          {
            this.state.list.map( item =>
              <Card style={styles.cardWrapper} key={item.property_id} className="box-shadow">
                <CardMedia
                  overlay={<CardTitle title={item.address_1 } subtitle={item.address_2} />} >

                  <img src={this.getAddress(item.address_1 , item.address_2, item.city, item.postalcode)} alt="" />

                </CardMedia>
                <CardTitle title={item.city + ' ' +  item.postalcode} />
                <div className="photos-count">
                <span className="photos-count-text">{"Rooms: " + item.total_rooms + ", Photos: " + item.total_photos}</span>
                </div>
                <div style={styles.subTxt}>{item.report_type}</div>
                <div style={styles.subTxt}>{item.created_date}</div>
                <CardText>
                  {this.getDesc(item.description, item.total_rooms, item.total_photos)}
                </CardText>
                <CardActions>
                  { item.total_rooms > 0 &&
                    <Link className="button" to={{ pathname: '/propertyroomlist', query: { property_id: item.property_id } }} >
                      <FlatButton label="View" />
                    </Link>
                  }
                  { item.total_rooms == 0 &&
                    <Link className="button" to={{ pathname: '/addpropertytemplate', query: { property_id: item.property_id } }} >
                      <FlatButton label="View" />
                    </Link>
                  }


                  <FlatButton label="Report" onTouchTap={()=>this.generateReport(item.property_id)}/>


                </CardActions>
              </Card>

            )
          }



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
