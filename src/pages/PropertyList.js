import React from "react";
import { Link } from "react-router";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/file/folder';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReportDownload from 'material-ui/svg-icons/file/file-download';
import Divider from 'material-ui/Divider';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';

import {pink500, grey200, grey500, amber500, amber300, lightGreen300} from 'material-ui/styles/colors';
import PageBase from '../components/layout/PageBase';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';
import ForwardIcon from 'material-ui/svg-icons/image/navigate-next';
import Dialog from 'material-ui/Dialog';

import SubscriptionElement from '../components/subscription/SubscriptionElement';

import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";
import loginauth from '../auth/loginauth';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';

export default class PropertyList extends React.Component {

  constructor(props){
    super(props);
      console.log(props);
      this.getList = this.getList.bind(this);
      this.getSusbcription = this.getSusbcription.bind(this);
      this.getIsReportReadyStatus = this.getIsReportReadyStatus.bind(this);
      PropertyListActions.fetchPropList();
      PropertyListActions.fetchSubscriptions();
      this.getCouponStatus = this.getCouponStatus.bind(this);

      this.state={
        list: PropertyListStore.getList(),
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        page : 1,
        templist: [],
        showProgress: true,
        subscription:  PropertyListStore.getSusbcription(),
        coupon_code: '',
        showdialog: false,
        coupon_err_text: '',
      };
  }

  componentWillMount() {
    PropertyListStore.on("change", this.getList);
    PropertyListStore.on("change", this.getSusbcription);
    PropertyListStore.on("change", this.getIsReportReadyStatus);
    PropertyListStore.on("change", this.getCouponStatus);
  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
    PropertyListStore.removeListener("change", this.getSusbcription);
    PropertyListStore.removeListener("change", this.getIsReportReadyStatus);
    PropertyListStore.removeListener("change", this.getCouponStatus);
  }

  fetchSubs(){
    PropertyListActions.fetchSubscriptions();
  }

  getList() {

    let list = PropertyListStore.getList();
    let pageno = list.length >= 10? 10: list.length;
    if(list){
      this.setState({
        list: list,
        templist: list.slice(0, pageno),
        showProgress: false
      });
    }
    else{
      this.setState({
        list: [],
        templist: [],
        showProgress: false
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
        subscription: list,
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
    }, ()=>{
      PropertyListActions.generateReport(property_id);
    });


  };

  navigate = (nextpage) => {

    let total_pages = Math.ceil( this.state.list.length / 10);
    let page = this.state.page + nextpage;

    if(page <= 0 ){
      page = 1;
    }

    if(page >= total_pages ){
      page = total_pages;
    }

    let cursorstate = (page-1) * 10;
    let lastindex = cursorstate + 10;
    if(lastindex >= this.state.list.length){
      lastindex = this.state.list.length + 1;
    }

    this.setState({
      templist : this.state.list.slice( cursorstate,  lastindex ),
      page : page
    });


  };

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
        columns: {
              address: {
                column:{
                  width: '30%',
                },
                header:{
                  width: '30%',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#e1e1e1',
                  color: '#546E7A'
                }
              },
              city: {
                column:{
                  width: '20%',
                },
                header:{
                  width: '20%',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#e1e1e1',
                  color: '#546E7A'
                }
              },
              postalcode: {
                column:{
                  width: '15%',
                },
                header:{
                  width: '15%',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#e1e1e1',
                  color: '#546E7A'
                }
              },
              created_date: {
                column:{
                  width: '15%',
                },
                header:{
                  width: '15%',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#e1e1e1',
                  color: '#546E7A'
                }
              },
              // status: {
              //   column:{
              //     width: '10%',
              //   },
              //   header:{
              //     width: '10%',
              //     fontSize: '14px',
              //     fontWeight: 600,
              //     backgroundColor: '#e1e1e1',
              //     color: '#546E7A'
              //   }
              // },
              edit: {
                column:{
                  width: '10%',
                },
                header:{
                  width: '10%',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#e1e1e1',
                  color: '#546E7A'
                }
              },
              view: {
                column:{
                  width: '10%',
                },
                header:{
                  width: '10%',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#e1e1e1',
                  color: '#546E7A'
                }
              }
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
        },
        dialog: {
          width: 300
        }
    };

    console.log(this.state.list);

      let isShowLoading = null;
       if (this.state.showProgress == false ) {
         isShowLoading = '';
       } else {
         isShowLoading = <div style={styles.tblProgress}><CircularProgress /></div>;
       }


    return (

      <PageBase title="Property List" navigation="">

          <Link to="/addnewproperty">
            <FloatingActionButton style={styles.floatingActionButton}  iconStyle={{backgroundColor: pink500}}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          {this.state.startProcess &&
             <LinearProgress mode="indeterminate" />
          }

          <SubscriptionElement subscription={this.state.subscription} fetchSubs={this.fetchSubs} applyCoupon={this.applyCoupon} handleInputChange={this.handleInputChange}/>


          <div style={{marginTop: 20}}>
            <h3>List of properties</h3>
            <Divider style={{width: '20%'}}/>
          </div>

          <Table fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable} >

            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll} >

              <TableRow>
                <TableHeaderColumn style={styles.columns.address.header}>Address</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.city.header}>City</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.postalcode.header}>Postalcode</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.created_date.header}>Created date</TableHeaderColumn>
                {/* <TableHeaderColumn style={styles.columns.status.header}>Status</TableHeaderColumn> */}
                <TableHeaderColumn style={styles.columns.edit.header}>Report</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.view.header}>View</TableHeaderColumn>
              </TableRow>

            </TableHeader>

            <TableBody displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows} >


              {this.state.templist.map(item =>
                <TableRow key={item.property_id}>
                  <TableRowColumn style={styles.columns.address.column}>

                  { item.total_rooms > 0 &&
                    <Link className="button" to={{ pathname: '/propertyroomlist', query: { property_id: item.property_id } }} >
                      {item.address_1 +  ' ' +  item.address_2}
                    </Link>
                  }
                  { item.total_rooms == 0 &&
                    <Link className="button" to={{ pathname: '/addpropertytemplate', query: { property_id: item.property_id } }} >
                      {item.address_1 +  ' ' +  item.address_2}
                    </Link>
                  }

                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.city.column}>{item.city}</TableRowColumn>
                  <TableRowColumn style={styles.columns.postalcode.column}>{item.postalcode}</TableRowColumn>
                  <TableRowColumn style={styles.columns.created_date.column}>{item.created_date}</TableRowColumn>
                  {/*<TableRowColumn style={styles.columns.status.column}>
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={amber100}
                                          iconStyle={styles.statusButton}>
                    { this.getStatusIcon(item.locked) }
                    </FloatingActionButton>

                  </TableRowColumn> */ }
                  <TableRowColumn style={styles.columns.edit.column}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={amber300}
                                            iconStyle={styles.editButton} onTouchTap={()=>this.generateReport(item.property_id)}>
                        <ReportDownload  />
                      </FloatingActionButton>

                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.view.column}>
                    { item.total_rooms > 0 &&
                      <Link className="button" to={{ pathname: '/propertyroomlist', query: { property_id: item.property_id } }} >
                        <FloatingActionButton zDepth={0}
                                              mini={true}
                                              backgroundColor={lightGreen300}
                                              iconStyle={styles.viewButton}>
                          <ContentCreate />
                        </FloatingActionButton>
                      </Link>
                    }
                    { item.total_rooms == 0 &&
                      <Link className="button" to={{ pathname: '/addpropertytemplate', query: { property_id: item.property_id } }} >
                        <FloatingActionButton zDepth={0}
                                              mini={true}
                                              backgroundColor={grey200}
                                              iconStyle={styles.viewButton}>
                          <ContentCreate />
                        </FloatingActionButton>
                      </Link>
                    }

                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {isShowLoading}
           <Toolbar style={{marginTop: 10, marginBottom: 20}}>
             <ToolbarGroup>
               <ToolbarTitle text={"Results found: " + (this.state.list? this.state.list.length.toString() : '0') } />
               <ToolbarSeparator style={{marginRight: 10}}/>
               <ToolbarTitle text={"Page: " + (this.state.page) }  />
               </ToolbarGroup>
               <ToolbarGroup lastChild={true}>

                <RaisedButton icon={<BackIcon />} onTouchTap={()=>this.navigate(-1) }/>
                <RaisedButton icon={<ForwardIcon />} style={styles.navbtn} onTouchTap={()=>this.navigate(1) }/>
             </ToolbarGroup>
           </Toolbar>

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
