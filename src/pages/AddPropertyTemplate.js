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
    }

    render() {

      const styles = {
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

      };

      console.log('template data');
      console.log(this.state.template);

      return(

        <PageBase title="New Inventory" navigation="Home / New Inventory">

          <form>
            <h4>Choose which room to add</h4>


              <TextField floatingLabelText="Bedroom" fullWidth={false} name="bedroom" type="number" min="0" max="100" step="1" /><br/>

              <Divider style={styles.bottomDivider}/>

            <div style={styles.toggleblock}>
              <Toggle
                label="Toggled by default"
                defaultToggled={true}
                style={styles.toggle}
              />
            </div>

          </form>

        </PageBase>

      );

    }


}
