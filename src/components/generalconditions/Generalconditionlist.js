import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

export default class Generalconditionlist extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  render(){

    const styles = {

       buttons: {
         marginTop: 30,
         float: 'right'
       },
       saveButton: {
         marginLeft: 5,
         marginRight: 10
       },
       bottomDivider: {
          marginTop: '50px'
       },
       tblProgress: {
         margin: '50px auto',
         textAlign: 'center'
       },
       subheader: {
         margin: '20px 20px 0 0',
         minWidth: '170px'
       },
       commentbox: {
         marginBottom: '30px'
       }
    };

    return(
      <form>
        <h3>{this.props.title}</h3>

        {this.props.list.map(item =>
            <div key={item.prop_general_id} style={styles.commentbox}>
              <h4 style={styles.subheader} className="gen-condition-title">{item.item_name}:</h4>

              {
                (item.type == 'ITEM') &&
                  <SelectField floatingLabelText="" value={item.user_input + ';'+  item.prop_general_id} onChange={this.props.handleSelectChange}  name={item.prop_general_id}>
                    <MenuItem value={null} primaryText=""/>

                    {item.options.split(';').map( (opt, index) =>
                      <MenuItem value={opt + ';'+  item.prop_general_id}  primaryText={opt} key={index} />
                    )}

                  </SelectField>

              }


              <TextField hintText="Provide comment..." multiLine={true} rows={2} rowsMax={3} name={item.prop_general_id} fullWidth={true} value={item.comment} onChange={this.props.handleInputChange}/>

            </div>
            )
        }

        <div style={styles.buttons}>

          <RaisedButton label="Save" style={styles.saveButton} onClick={this.props.handleGeneralSubmit} primary={true} />

        </div>

      </form>
    );

  }

}
