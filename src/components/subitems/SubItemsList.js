import React, { Component } from "react";
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
      },
      dragging: false,
      drag_photo_id : ''

    };

  }

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(){
    //console.log(this.props.list);
  }

  //drop
  handleDrop(sub_id){

    this.setState({
      dragging: false
    });

    let chk = false;

    for(let i =0, l = this.props.photos.length; i < l ; i++){
      let photo = this.props.photos[i];
      if(photo.type == 'SUB' &&  (this.state.drag_photo_id == photo.photo_id ) ){
         chk = true;
         break;
      }
    }

    if(chk == false &&  this.state.drag_photo_id ){
      this.props.dragDropPhoto(sub_id, this.state.drag_photo_id);
    }

  }


  handleDrag(event){
    //console.log('dragging');
    event.preventDefault();

  }

  handleDragStart(photo_id){
    //console.log('drag start', photo_id);
    this.setState({
      dragging: true,
      drag_photo_id: photo_id
    });
  }

  handleReleaseDragging(){

    this.setState({
      dragging: false,
      drag_photo_id: ''
    });

  }

  render() {

    const styles = {
      buttons: {
        marginBottom: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5,
        marginRight: 10
      },
      header: {
        color: '#00ACC1',
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
      //console.log(item);
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
          <SingleItemElement optlist={this.state.optlist} type="SUB" title={item.item_name} data={data} handleInputChange={this.props.handleInputChange}
            key={item.prop_subitem_id + '_' + i}
            photos={sub_photos[item.prop_subitem_id]} on_drop={this.handleDrop.bind(this)} on_drag={this.handleDrag.bind(this)} dragging={this.state.dragging}
            on_drag_start={this.handleDragStart.bind(this)} item_id={item.prop_subitem_id} photoDelete={this.props.photoDelete} photoUpload={this.props.photoUpload}
            releaseDragging={this.handleReleaseDragging.bind(this)} showprogress={this.props.showprogress}/>
        );
      }
      else{

        let gen_data = {
          comment : this.props.generalcomment.comment,
          item_id : item.prop_subitem_id
        };

        generalItem = <GeneralItemElement data={gen_data} title={item.item_name} handleInputChange={this.props.handleInputChange} key={item.prop_subitem_id} photos={gen_photos}
        on_drag={this.handleDrag.bind(this)} on_drop={this.handleDrop.bind(this)} on_drag_start={this.handleDragStart.bind(this)}  photoDelete={this.props.photoDelete} photoUpload={this.props.photoUpload}
        voices={this.props.voices}
        releaseDragging={this.handleReleaseDragging.bind(this)} showprogress={this.props.showprogress} />
      }


    }


    return(
      <form>

        <div>
            <h2 style={styles.header}>{this.props.title}</h2>

            <div>
              {generalItem}
            </div>

            <div className="control-wrapper-flex-1 roomlist-right-wrapper-snd scroll-style">

                <div className='roomlist-right-div scroll-style'>

                  {singleItem}

                </div>

            </div>

            <div style={styles.buttons}>
              <RaisedButton label="Save"
                style={styles.saveButton}
                onClick={this.props.handleSubmit}
                primary={true}/>
            </div>



        </div>

      </form>

    );

  }

}
