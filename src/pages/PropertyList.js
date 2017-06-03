import React from "react";
import { Link } from "react-router";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReportDownload from 'material-ui/svg-icons/file/file-download';
import Playbtn from 'material-ui/svg-icons/av/play-arrow';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';

import {pink500, grey200, grey500, amber100, amber500} from 'material-ui/styles/colors';
import PageBase from '../components/layout/PageBase';
import CircularProgress from 'material-ui/CircularProgress';

import * as PropertyListActions from "../actions/PropertyListActions";
import PropertyListStore from "../stores/PropertyListStore";

export default class PropertyList extends React.Component {

  constructor(props){
    super(props);
      console.log(props);
      this.getList = this.getList.bind(this);
      PropertyListActions.fetchPropList();

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
        showCheckboxes: false
      };
  }

  componentWillMount() {
    PropertyListStore.on("change", this.getList);
  }

  componentWillUnmount() {
    PropertyListStore.removeListener("change", this.getList);
  }

  getList() {

    let list = PropertyListStore.getList();
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
    PropertyListActions.generateReport(property_id);
  };

  render() {

    const styles = {
        floatingActionButton: {
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
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
              status: {
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

      <PageBase title="Property List" navigation="Home / Property List">

          <Link to="/addnewproperty">
            <FloatingActionButton style={styles.floatingActionButton}  iconStyle={{backgroundColor: pink500}}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

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
                <TableHeaderColumn style={styles.columns.status.header}>Status</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit.header}>Report</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.view.header}>View</TableHeaderColumn>
              </TableRow>

            </TableHeader>

            <TableBody displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows} >

              {this.state.list.map(item =>
                <TableRow key={item.property_id}>
                  <TableRowColumn style={styles.columns.address.column}>{item.address_1 +  ' ' +  item.address_2}</TableRowColumn>
                  <TableRowColumn style={styles.columns.city.column}>{item.city}</TableRowColumn>
                  <TableRowColumn style={styles.columns.postalcode.column}>{item.postalcode}</TableRowColumn>
                  <TableRowColumn style={styles.columns.created_date.column}>{item.created_date}</TableRowColumn>
                  <TableRowColumn style={styles.columns.status.column}>
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={amber100}
                                          iconStyle={styles.statusButton}>
                    { this.getStatusIcon(item.locked) }
                    </FloatingActionButton>

                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit.column}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton} onTouchTap={()=>this.generateReport(item.property_id)}>
                        <ReportDownload  />
                      </FloatingActionButton>

                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.view.column}>
                    <Link className="button" to={{ pathname: '/propertyroomlist', query: { property_id: item.property_id } }} >
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.viewButton}>
                        <ContentCreate />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {isShowLoading}

      </PageBase>

    );
  }
}
