import React from "react";
import { Link } from "react-router";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReportDownload from 'material-ui/svg-icons/file/file-download';
import Playbtn from 'material-ui/svg-icons/av/play-arrow';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import Divider from 'material-ui/Divider';

import {pink500, grey200, grey500, amber100, amber500} from 'material-ui/styles/colors';
import PageBase from '../components/layout/PageBase';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';
import ForwardIcon from 'material-ui/svg-icons/image/navigate-next';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";
import loginauth from '../auth/loginauth';


export default class Dashboard extends React.Component {

  constructor(props){
    super(props);
      console.log(props);
      this.getList = this.getList.bind(this);
      this.getIsReportReadyStatus = this.getIsReportReadyStatus.bind(this);
      this.getSusbcription = this.getSusbcription.bind(this);

      PropertyListActions.fetchRecent();

      this.state={
        list: [],
        subscription: {},
        startProcess: false
      };
  }

  componentWillMount() {
    PropertyListStore.on("change", this.getList);
    PropertyListStore.on("change", this.getIsReportReadyStatus);
    PropertyListStore.on("change", this.getSusbcription);

  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
    PropertyListStore.removeListener("change", this.getIsReportReadyStatus);
    PropertyListStore.removeListener("change", this.getSusbcription);
  }

  getList() {

    let list = PropertyListStore.getRecent();
    if(list){
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

  render() {

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
          marginTop: 20
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

    console.log(this.state.list);

      let isShowLoading = null;
       if (this.state.list.length >= 0 || this.state.list ) {
         isShowLoading = '';
       } else {
         isShowLoading = <div style={styles.tblProgress}><CircularProgress /></div>;
       }

       let today = new Date();
       let mm = today.getMonth()+1; //January is 0!
       let yyyy = today.getFullYear();

       //check if last plan is for current month
       let plan_date = new Date(this.state.subscription.createdAt);
       let get_last_sub_month = plan_date.getMonth() + 1;
       let get_last_sub_year = plan_date.getFullYear();

       let payment_status = [];
       if(get_last_sub_month == mm && get_last_sub_year == yyyy){

         if(this.state.subscription.splan_id == 1000){
            payment_status.push(<div key={1} style={styles.subTxtnoplan}>Status: {this.state.subscription.total_sliver_reports == 0 ? ' You have enough credit to generate one report' : 'You may need to purchase subscription plan to generate report'  }</div>);

            if(this.state.subscription.total_sliver_reports != 0){
              payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: '700', fontSize: 17}}>
                Your subscription plan has been expired
              </CardText>);

              payment_status.push(<CardActions key={5}>
              <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
                <RaisedButton secondary={true} label="Buy Subscription plan" />
              </a>
            </CardActions>);
            }
         }

         if(this.state.subscription.splan_id == 2000){
           payment_status.push(<div key={2} style={styles.subTxtnoplan}>Status: {this.state.subscription.total_gold_reports < this.state.subscription.reports ? 'You can generate ' + (this.state.subscription.reports - this.state.subscription.total_gold_reports) + ' more reports' : 'You may need to purchase subscription plan to generate report'  }</div>);

           if(this.state.subscription.total_gold_reports >= this.state.subscription.reports){
             payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: '700', fontSize: 17}}>
               Your subscription plan has been expired
             </CardText>);

             payment_status.push(<CardActions key={5}>
             <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
               <RaisedButton secondary={true} label="Buy Subscription plan" />
             </a>
           </CardActions>);
           }

         }

         if(this.state.subscription.splan_id == 3000){
           payment_status.push(<div key={3} style={styles.subTxtnoplan}>You can generate unlimited number of reports</div>);
         }


       }
       else{
         payment_status.push(<CardText  key={4} style={{color: '#D84315', fontWeight: '700', fontSize: 17}}>
           Your subscription plan has been expired
         </CardText>);
         payment_status.push(<CardActions key={5}>
         <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
           <RaisedButton secondary={true} label="Buy Subscription plan" />
         </a>
       </CardActions>);
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

          <div style={{marginTop: 20}}>
            <h3 style={{color: '#0097A7', fontSize: 20}}>Subscription details</h3>
          </div>

          {this.state.subscription && this.state.subscription.subs_id &&
            <Card style={{boxShadow: 'none', backgroundColor: '#E0F7FA'}}>
              <CardTitle title={this.state.subscription.title } style={{color: '#00695C', fontWeight: '700', fontSize: 17}} />
                <div style={styles.subTxtnoplan}>You recent subscription plan - {this.state.subscription.title } </div>
                <div style={styles.subTxtnoplan}>Last payment date: {this.state.subscription.alt_created_date}</div>
                <div style={styles.subTxtnoplan}>Price: {this.state.subscription.price}</div>
                {payment_status}

            </Card>
          }
          {this.state.subscription && !this.state.subscription.subs_id &&
            <Card>
              <CardText style={{color: '#D32F2F', fontWeight: '700', fontSize: 17}}>
                You don't have any subscription plan yet
              </CardText>
              <div style={styles.subTxtnoplan}>Please purchase a subcription plan before generate reports.</div>
              <div style={styles.subTxtnoplan}>You cannot download reports if you have zero credit</div>

              <CardActions>

                <a href={'http://propertyground.co.uk/pay?userid=' + encodeURIComponent(loginauth.USER.user_id) } target="_blank" >
                  <RaisedButton secondary={true} label="Buy Subscription plan" />
                </a>

              </CardActions>
            </Card>
          }


          <div style={{marginTop: 20}}>
            <h3>Recent properties</h3>
            <Divider style={{width: '20%'}}/>
          </div>
          <div style={styles.cardContainer}>


          {
            this.state.list.map( item =>
              <Card style={styles.cardWrapper} key={item.property_id}>
                <CardMedia
                  overlay={<CardTitle title={item.address_1 } subtitle={item.address_2} />} >

                  <img src={this.getAddress(item.address_1 , item.address_2, item.city, item.postalcode)} alt="" />

                </CardMedia>
                <CardTitle title={item.city + ' ' +  item.postalcode} subtitle={"Rooms: " + item.total_rooms + ", Photos: " + item.total_photos} />
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

      </PageBase>

    );
  }
}
