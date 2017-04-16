import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSort from 'material-ui/svg-icons/content/sort';
import ActionDrag from 'material-ui/svg-icons/editor/format-line-spacing';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="lisort"><ActionDrag /></span>); // This can be any component you want

const SortableItem = SortableElement(({value}) =>
  <li className="SortableItem"> <DragHandle />{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="SortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.item_name} />
      ))}
    </ul>
  );
});


export default class Generalconditionlist extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      enableSort : false
    }
  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  handleEnableSort(){
      this.setState({
        enableSort: !this.state.enableSort
      })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    console.log(oldIndex, newIndex);
  };




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
       },
       buttonsrtl:{
         textAlign: 'right'
       },
       lisort:{
         marginRight: 10,
         position: 'relative',
         marginTop: 5
       }
    };

    let generalContent =
    <div>
    <div style={styles.buttonsrtl}>

              <FloatingActionButton mini={true} onClick={this.handleEnableSort.bind(this)}>
              <ActionSort />
            </FloatingActionButton>

            </div>

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

        </div>;

        let sorting =
        <div>
          <h5> sorting </h5>

          <SortableList items={this.props.list} onSortEnd={this.onSortEnd} useDragHandle={true}/>

          <div style={styles.buttons}>

            <RaisedButton label="Ok" style={styles.saveButton} onClick={this.handleEnableSort.bind(this)} primary={true} />

          </div>

        </div>;


    return(
      <form>
        <h3>{this.props.title}</h3>


        {this.state.enableSort== false &&
          generalContent
        }


        {this.state.enableSort== true &&
          sorting
        }


      </form>
    );

  }

}
