import React, { Component } from "react";
import {Link, browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../components/layout/PageBase';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
//import uitl from '../utils/utils.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as PropertyTemplateActions from "../actions/PropertyTemplateActions";
import PropertyTemplateStore from "../stores/PropertyTemplateStore";

export default class AddPropertyTemplate extends Component {

      constructor(props){
        super(props);
        this.props = props;
        const property_id  = this.props.location.query.property_id;

        this.state={
            property_id: property_id,
            template: [],
            nums: [],
            options: [],
            showSuccessSnack: false,
           showErrorSnack: false,
           showdialog: false,
        };

        this.getTemplate = this.getTemplate.bind(this);
        this.getStatus = this.getStatus.bind(this);
        PropertyTemplateActions.fetchTempalte(property_id);
      }

      handleInputChange(event){
        //console.log(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let numList = this.state.nums;
        for(let i=0, l= numList.length; i < l; i++){
          let item = numList[i];
          if(item['name'] == name ){
            item['total_num'] = value;
            numList[i] = item;
            this.setState({'nums' : numList});
          }
        }

      }

      handleToggleChange(event, isInputChecked){

        const target = event.target;
        const name = target.name;
         console.log(name);
         console.log(isInputChecked);

         let optList = this.state.options;
         for(let i=0, l= optList.length; i < l; i++){
           let item = optList[i];
           if(item['name'] == name ){
             item['status'] = isInputChecked;
             optList[i] = item;
             this.setState({'options' : optList});
           }
         }


      }

      componentWillMount() {
        PropertyTemplateStore.on("change", this.getTemplate);
        PropertyTemplateStore.on("change", this.getStatus);



      }

      componentWillUnmount() {
        PropertyTemplateStore.removeListener("change", this.getTemplate);
        PropertyTemplateStore.removeListener("change", this.getStatus);
      }


      handleDialogOpen = () => {
        this.setState({showdialog: true});
      };

      handleDialogClose = () => {
        this.setState({showdialog: false});
      };

      handleDialogOk =() => {
        this.setState({showdialog: false});
        browserHistory.push('/propertylist');
      }

      getStatus() {
        console.log('property get status');
        let status = PropertyTemplateStore.getSaveTemplate();
        this.setState({
          status: status
        });

        if (status &&  status == 1  ) {
           //this.context.router.replace('/propertylist' );
           this.setState({
             showErrorSnack: false,
             showSuccessSnack: true,
             startSending: false,
             showdialog: true
           });

           //browserHistory.push('/propertylist');
        }
        else{
          this.setState({
            showErrorSnack: true,
            showSuccessSnack: false,
            startSending: false,
          });
        }

      }

      getTemplate(){

        this.setState({
          template: PropertyTemplateStore.getTempalte()
        });

        let numListArr = [];
        let optListArr = [];
        for(let i=0, l= this.state.template.length; i < l; i++){
          let item = this.state.template[i];
          if(item.option ==  'NUM'){
            item['total_num'] = 0;
            numListArr.push(item);
          }
          else if(item.option == 'OPT'){
            item['status'] = true;
            optListArr.push(item);
          }
        }

        this.setState({'nums' : numListArr});
        this.setState({'options' : optListArr});

      }

      handleSubmit(){
        console.log('submit');
        console.log(this.state);

        let data = {
          'property_id': this.state.property_id,
          'nums': this.state.nums,
          'options': this.state.options,
        }
        PropertyTemplateActions.saveTemplate(data);

        this.setState({
          startSending: true,
        });

        event.preventDefault();
      }

      //error snack close
      errhandleRequestClose = () => {
        this.setState({
          showErrorSnack: false,
        });
      };

      //error snack success
      successhandleRequestClose = () => {
        this.setState({
          showSuccessSnack: false,
          startSending: false
        });
      };

    render() {

      const styles = {
        buttons: {
          marginTop: 30,
          marginLeft: 10,
          float: 'right'
        },
        saveButton: {
          marginLeft: 5
        },
        bottomDivider: {
          marginTop: '50px'
        },
        toggleblock: {
          marginTop: 50,
          maxWidth: 250,
        },
        toggle: {
          marginBottom: 16
        },
        tblProgress: {
          margin: '50px auto',
          textAlign: 'center'
        },
        dialog: {
          width: 300
        }

      };

      const modal_actions = [

        <FlatButton
          label="Ok"
          primary={true}
          onTouchTap={this.handleDialogOk}
        />,
      ];

      let numList = [];
      let optList = [];
      for(let i=0, l= this.state.template.length; i < l; i++){
        let item = this.state.template[i];
        if(item.option ==  'NUM'){
          numList.push(<div key={item.prop_master_id} className="control-wrapper">
            <TextField floatingLabelText={item.name} fullWidth={false} name={item.name} type="number" min="0" max="100" step="1" onChange={this.handleInputChange.bind(this)}/>
          </div>);
        }
        else if(item.option == 'OPT'){
          optList.push(<div key={item.prop_master_id} className="control-wrapper template-opt">
            <div style={styles.toggleblock}>
              <Toggle
                label={item.name} defaultToggled={true} style={styles.toggle} name={item.name} onToggle={this.handleToggleChange.bind(this)}
              />
            </div>
          </div>);
        }

      }


      let isShowSaving = null;
       if (this.state.startSending &&  this.state.startSending == true  ) {
         isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
       }
       else {
         isShowSaving = '';
       }

       if (this.state.status &&  this.state.status == 1  ) {
          isShowSaving = <div className="saving-cls">Successfully saved...!</div>;
          //this.context.router.replace('/propertylist' );
          //browserHistory.push('/propertylist');
       }
       else if(this.state.status &&  this.state.status == 2){
         isShowSaving = <div className="warning-cls">Could not save the data, Please verify your data before save</div>;
       }


      return(

        <PageBase title="New Inventory" navigation="">

          {isShowSaving}

          <form>
            <h4>Choose which room to add</h4>

              <div className="control-wrapper-container">
                {numList}
              </div>


              <Divider style={styles.bottomDivider}/>

              <div className="control-wrapper-container">
                {optList}
              </div>

              <div style={styles.buttons}>

                <Link to="/propertylist">
                  <RaisedButton label="Cancel"/>
                </Link>

                <RaisedButton label="Save"
                  style={styles.saveButton}
                  onClick={this.handleSubmit.bind(this)}
                  primary={true}/>

            </div>


            <Snackbar
              open={this.state.showErrorSnack}
              message= "Something went wrong..."
              autoHideDuration={3000}
              onRequestClose={this.errhandleRequestClose.bind(this)} />

            <Snackbar
              open={this.state.showSuccessSnack}
              message="Welcome to PropertyGround!"
              autoHideDuration={3000}
              onRequestClose={this.successhandleRequestClose.bind(this)} />

              <Dialog
                actions={modal_actions}
                modal={false}
                open={this.state.showdialog}
                onRequestClose={this.handleDialogClose}
                contentStyle ={styles.dialog}
              >
                Successfully updated!
              </Dialog>


          </form>

        </PageBase>

      );

    }



}

// AddPropertyTemplate.contextTypes = {
//   router: PropTypes.object.isRequired
// };
