import React, { Component, PropTypes } from "react";
import SingleItemElement from '../singleitem/SingleItemElement';
import RaisedButton from 'material-ui/RaisedButton';

export default class SubItemsList extends React.Component {

  constructor(props){
    super(props);
    this.props = props;

    this.state ={
      optlist: [
                  {value: 'N/A', text: 'N/A'},
                  {value: 'USED', text: 'Used'},
                  {value: 'NEW', text: 'New'},
                  {value: 'POOR', text: 'Poor'},
                  {value: 'DAMAGE', text: 'Damage'}
                ]

    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(){
    console.log(this.props.list);

  }

  render() {

    const styles = {
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5,
        marginRight: 10
      },
      header: {
        color: '#6483b3',
        fontSize: 24,
        fontWeight: 700
      }
    };

    let singleItem = [];
    for(let i =0, l = this.props.list.length; i < l; i++){
      let item = this.props.list[i];
      let data = {
        reading_value: '',
        option: item.option?item.option:'',
        description: item.description?item.description:'',
        comment: item.comment?item.comment:'',
        prop_feedback_id: item.prop_feedback_id,
        item_id: item.prop_subitem_id
      };

      singleItem.push(
        <SingleItemElement optlist={this.state.optlist} type="SUB" title={item.item_name} data={data} handleInputChange={this.props.handleInputChange} key={item.prop_subitem_id}/>
      );

    }


    return(
      <form>
        <h2 style={styles.header}>{this.props.title}</h2>

        {singleItem}

        <div style={styles.buttons}>

          <RaisedButton label="Save"
            style={styles.saveButton}
            onClick={this.props.handleSubmit}
            primary={true}/>
        </div>

      </form>

    );

  }

}
