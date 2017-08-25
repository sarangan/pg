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

      PropertyListActions.fetchRecent();

      this.state={
        list: [],
        startProcess: false
      };
  }

  componentWillMount() {
    PropertyListStore.on("change", this.getList);
    PropertyListStore.on("change", this.getIsReportReadyStatus);

  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
    PropertyListStore.removeListener("change", this.getIsReportReadyStatus);
  }

  getList() {

    let list = PropertyListStore.getRecent();
    if(list){
      this.setState({
        list: list
      });
    }
    else{
      this.setState({
        list: []
      });
    }

  }

  getIsReportReadyStatus(){
    let status = PropertyListStore.getIsReportReady();

    if(status){
      this.setState({
        startProcess: false
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
          color: '#4A5D75'
        }
    };

    console.log(this.state.list);

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

          <div style={{marginTop: 40}}>
            <h3>Recent Properties</h3>
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

                  <a href={'http://propertyground.co.uk/pay?email=' + encodeURIComponent(loginauth.USER.email) } target="_blank" >
                    <FlatButton label="Pay" />
                  </a>

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
