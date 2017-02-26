import React from "react";
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../components/layout/PageBase';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import uitl from '../utils/utils.js'

import * as PropertyTemplateActions from "../actions/PropertyTemplateActions";
import PropertyTemplateStore from "../stores/PropertyTemplateStore";

export default class AddPropertyTemplate extends React.Component {

      constructor(props){
        super(props);

        console.log(props);
        const property_id  = props.location.query.property_id;

        this.getTemplate = this.getTemplate.bind(this);

        PropertyTemplateActions.fetchTempalte(property_id);

        this.state={
            property_id: property_id,
            template: PropertyTemplateStore.getTempalte(),
        };
      }

      handleInputChange(event){
        console.log(event);
         const target = event.target;
         const value = target.type === 'checkbox' ? target.checked : target.value;
         const name = target.name;

         this.setState({
           [name]: value
         });
     }

     handleToggleChange(event, isInputChecked){

        const target = event.target;
        const name = target.name;
         console.log(name);
         console.log(isInputChecked);

         this.setState({
           [name]: isInputChecked
         });
    }

      componentWillMount() {
        PropertyTemplateStore.on("change", this.getTemplate);
      }

      componentWillUnmount() {
        PropertyTemplateStore.removeListener("change", this.getTemplate);
      }

      getTemplate() {

        this.setState({
          template: PropertyTemplateStore.getTempalte()
        });

        for(let i=0, l= this.state.template.length; i < l; i++){
          let item = this.state.template[i];
          this.setState({
            [item.name]: ''
        });
      }

      }

      handleSubmit(){
        console.log('submit');
        console.log(this.state);

        event.preventDefault();
      }

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
        }

      };

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
                label={item.name} defaultToggled={Boolean(item.status)} style={styles.toggle} name={item.name} onToggle={this.handleToggleChange.bind(this)}
              />
            </div>
          </div>);
        }

      }


      return(

        <PageBase title="New Inventory" navigation="Home / New Inventory">

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



          </form>

        </PageBase>

      );

    }


}
