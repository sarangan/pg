import React, { Component, PropTypes } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import SingleItemElement from '../singleitem/SingleItemElement';
import GeneralItemElement from '../singleitem/GeneralItemElement';

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
                ],
      list: {

      }

    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(){
    //console.log(this.props.list);
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


    let photos = this.props.photos;
    let sub_photos = {};
    let gen_photos = [];
    for(let i =0, l = photos.length; i < l ; i++){
      if(photos[i].type == 'SUB'){
        //sub_photos.push(photos[i]);
        let pho = sub_photos[photos[i].item_id] || [];
        pho.push(photos[i]);
        sub_photos[photos[i].item_id] = pho;
      }
      else if( photos[i].type == 'GENERAL'){
        gen_photos.push(photos[i]);
      }

    }

    let singleItem = [];
    let gotGeneralCondition = false;
    let generalItem = null;
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

      gotGeneralCondition = ( (item.type == 'GENERAL')? true : false);
      if(!gotGeneralCondition){
        singleItem.push(
          <SingleItemElement optlist={this.state.optlist} type="SUB" title={item.item_name} data={data} handleInputChange={this.props.handleInputChange} key={item.prop_subitem_id} photos={sub_photos[item.prop_subitem_id]} />
        );
      }
      else{
        let gen_data = {
          comment : this.props.generalcomment.comment,
          item_id : item.prop_subitem_id
        };

        generalItem = <GeneralItemElement data={gen_data} title={item.item_name} handleInputChange={this.props.handleInputChange} key={item.prop_subitem_id} photos={gen_photos} />
      }


    }


    return(
      <form>

        <div>

            <div>
              <h2 style={styles.header}>{this.props.title}</h2>
              {generalItem}
            </div>

            <div className="control-wrapper-flex-2 roomlist-right-wrapper scroll-style">

                <div className='roomlist-right-div scroll-style'>


                  {singleItem}

                  <div style={styles.buttons}>

                    <RaisedButton label="Save"
                      style={styles.saveButton}
                      onClick={this.props.handleSubmit}
                      primary={true}/>
                  </div>

                </div>

            </div>



        </div>

      </form>

    );

  }

}
