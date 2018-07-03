import React from "react";
import Divider from 'material-ui/Divider';
import PageBase from '../../components/layout/PageBase';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ColorPicker from '../../components/colorpicker/ColorPicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import config from '../../config/config';

import * as ReportSettingsActions from "../../actions/report/ReportSettingsActions";
import ReportSettingsStore from "../../stores/report/ReportSettingsStore";

export default class ReportSettings extends React.Component {

  constructor(){
    super();

    this.state = {
      startSending: true,
      showErrorSnack: false,
      showSuccessSnack: false,
      open: false,
      uploading: false,
      displayColorPicker: false,
      background: '#fff',
      coverpage_enable: false,
      footer_enable: false,
      formValues: {
        report_id: '',
        logo_url: 'images/property-ground-logo.png',
        base_color: '#2196f3',
        page_header_layout: '',
        page_header_color: '#2196f3',
        table_header_bg_color: '#2196f3',
        table_header_color: '#ffffff',
        front_page_layout: '',
        cover_page_text: '',
        include_cover_page: 0,
        show_photos: '',
        show_photos_limit: '',
        photo_size: '',
        show_photo_date_time: '',
        items_details_layout: '',
        photo_collection_layout: '',
        footer_logo_url: 'images/property-ground-logo.png',
        footer_text: '',
        mailing: '',
        include_condition_summary: 0,
        include_singatures: 0
      },
      report_settings_notes: null,
      frontPageSelectionS1Color : '#cccccc',
      frontPageSelectionS2Color : '#cccccc',
      frontPageSelectionS3Color : '#cccccc',
      front_page_layout_S1_img_border : 'none',
      front_page_layout_s2_img_border : 'none',
      front_page_layout_s3_img_border : 'none',
      showNoteEdit: false,
      temp_notes: '',
      temp_title: '',
      temp_note_id: ''
    };

    this.getReportSettings = this.getReportSettings.bind(this);
    ReportSettingsActions.fetchReportSettings();
    this.getReportSettingsStatus = this.getReportSettingsStatus.bind(this);
    this.getUploadLogoStatus = this.getUploadLogoStatus.bind(this);

  }

  componentWillMount(){
    ReportSettingsStore.on("change", this.getReportSettings);
    ReportSettingsStore.on("change", this.getReportSettingsStatus);
    ReportSettingsStore.on("change", this.getUploadLogoStatus);
  }

  componentWillUnmount(){
    ReportSettingsStore.removeListener("change", this.getReportSettings);
    ReportSettingsStore.removeListener("change", this.getReportSettingsStatus);
    ReportSettingsStore.removeListener("change", this.getUploadLogoStatus);
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


  getReportSettings(){

    let settings = ReportSettingsStore.getSettings();

    this.setState({
      report_settings_notes: ReportSettingsStore.getSettingsNotes()
    });

    if(typeof settings != 'undefined'){

      let formValues = {
        report_id: settings.report_id,
        logo_url: (settings.logo_url.length > 0)? config.SERVER_RPT_IMAGE_PATH + '300_' + settings.logo_url: 'images/property-ground-logo.png',
        base_color: (settings.base_color.length > 0)? settings.base_color: '#2196f3',
        page_header_layout: settings.page_header_layout,
        page_header_color: (settings.page_header_color.length > 0)? settings.page_header_color: '#2196f3',
        table_header_bg_color: (settings.table_header_bg_color.length > 0)? settings.table_header_bg_color: '#2196f3',
        table_header_color: (settings.table_header_color.length > 0)? settings.table_header_color: '#ffffff',
        front_page_layout: settings.front_page_layout,
        cover_page_text: settings.cover_page_text,
        include_cover_page: settings.include_cover_page,
        show_photos: settings.show_photos,
        show_photos_limit: settings.show_photos_limit,
        photo_size: settings.photo_size,
        show_photo_date_time: settings.show_photo_date_time,
        items_details_layout: settings.items_details_layout,
        photo_collection_layout: settings.photo_collection_layout,
        footer_logo_url: (settings.footer_logo_url.length > 0)? settings.footer_logo_url: 'images/property-ground-logo.png',
        footer_text: settings.footer_text,
        mailing: settings.mailing,
        include_condition_summary: settings.include_condition_summary,
        include_singatures: settings.include_singatures
      };


      this.setState({
        formValues,
        coverpage_enable: settings.include_cover_page == 1? true: false,
        startSending: false,
      });


      this.updateFrontPageStyles();


    }
    else{
      this.setState({
        startSending: false
      });
    }




    if(this.state.report_settings_notes.length == 0 || !this.state.report_settings_notes){

      let general_notes = {
        '1': "Check-in Report",
        '2': "Check-out Report",
        '3': "Inventory Report",
        '4': "Inventory and Check-in Report",
        '5': "Midterm Inspection Report",
        '6': "Interim Report",
        '7': "General Overview Report",
        '8': "Condition Report"
      };

      let temp_notes = [];

      for (var key in general_notes) {
        if (general_notes.hasOwnProperty(key)) {

          temp_notes.push(
              {
                report_settings_notes_id: '',
                note_title: general_notes[key],
                title: general_notes[key],
                note: '',
                included: 0
              }
          );

        }
      }

      this.setState({
        report_settings_notes: temp_notes
      });

    }

  }

  //close general note box
  handleNotePageClose(event){

    let report_settings_notes = this.state.report_settings_notes;
    report_settings_notes[this.state.temp_note_id]['title'] = this.state.temp_title;
    report_settings_notes[this.state.temp_note_id]['note'] = this.state.temp_notes;

    this.setState({
      report_settings_notes: report_settings_notes,
      temp_note_id: '',
      temp_title: '',
      temp_notes: '',
      showNoteEdit: false
    });

  }

  //general page title text change
  handleNotePageTxt(event, value){
    this.setState({
      temp_notes: value
    });
  }

  //general page note change
  handleTitlePageTxt(event, value){
    this.setState({
      temp_title: value
    });
  }

  //open general note box
  handleNotePageOpen(id, title, notes){

    this.setState({
      showNoteEdit: true,
      temp_note_id: id,
      temp_title: title,
      temp_notes: notes,
    });
  }

  //open cancle edit
  handleNotePageCancel(){

    this.setState({
      showNoteEdit: false,
      temp_note_id: '',
      temp_title: '',
      temp_notes: '',
    });
  }


  updateFrontPageStyles(){
    if(this.state.formValues.front_page_layout == 'TEMPLATE 1'){
      this.setState({frontPageSelectionS1Color: '#417505'});
      this.setState({frontPageSelectionS2Color: '#cccccc'});
      this.setState({frontPageSelectionS3Color : '#cccccc'});
      this.setState({front_page_layout_S1_img_border : '2px dashed #417505'});
      this.setState({front_page_layout_s2_img_border : 'none'});
      this.setState({front_page_layout_s3_img_border : 'none'});
    }
    else if(this.state.formValues.front_page_layout == 'TEMPLATE 2'){
      this.setState({frontPageSelectionS1Color : '#cccccc'});
      this.setState({frontPageSelectionS2Color : '#417505'});
      this.setState({frontPageSelectionS3Color : '#cccccc'});
      this.setState({front_page_layout_S1_img_border : 'none'});
      this.setState({front_page_layout_s2_img_border : '2px dashed #417505'});
      this.setState({front_page_layout_s3_img_border : 'none'});
    }
    else if(this.state.formValues.front_page_layout == 'TEMPLATE 3'){
      this.setState({frontPageSelectionS1Color : '#cccccc'});
      this.setState({frontPageSelectionS2Color : '#cccccc'});
      this.setState({frontPageSelectionS3Color : '#417505'});
      this.setState({front_page_layout_S1_img_border : 'none'});
      this.setState({front_page_layout_s2_img_border : 'none'});
      this.setState({front_page_layout_s3_img_border : '2px dashed #417505'});
    }

  }

  handleChkGeneralNotes(index){

    let report_settings_notes = this.state.report_settings_notes;
    if(report_settings_notes[index]['included'] == 1){
      report_settings_notes[index]['included'] = 0;
    }
    else{
      report_settings_notes[index]['included'] = 1;
    }

    this.setState({
      report_settings_notes: report_settings_notes
    });

  }

  saveReportSettings(){

    this.setState({
      startSending: true
    });
    let formVars = this.state.formValues;
    delete formVars["logo_url"];
    ReportSettingsActions.updateReportSettings(formVars, this.state.report_settings_notes);

  }


  //get the general condition template insert status
  getReportSettingsStatus(){
    let status =  ReportSettingsStore.getUpdateStatus();

    if(status){
      this.setState({
        showSuccessSnack: true,
        startSending: false
      });

      ReportSettingsActions.fetchReportSettings();

    }
  }

  //uploading logo
  onDrop(files){

      this.setState({
        uploading: true
      });

      ReportSettingsActions.uploadReportLogo(files[0]);
  }

  //upload logo status
  getUploadLogoStatus(){
    let status =  ReportSettingsStore.getUploadLogoStatus();

    if(status){
       this.setState({
         uploading: false
       });
       ReportSettingsActions.fetchReportSettings();
    }
  }

  changeColor(color, type){
    var formValues = this.state.formValues;

    switch (type) {
      case 'PHFONTCOLOR':
          formValues['page_header_color'] = color.hex;
          this.setState({
            formValues
          });
        break;

      case 'BASECOLOR':
        formValues['base_color'] = color.hex;
        this.setState({
          formValues
        });
        break;

      case 'TBLSECBG':
        formValues['table_header_bg_color'] = color.hex;
        this.setState({
          formValues
        });
        break;

      case 'TBLSECCOLOR':
        formValues['table_header_color'] = color.hex;
        this.setState({
          formValues
        });
        break;

      default:

    }
  }

  //page header rdb change event
  handleChangePageHeader(event, value){
    let formValues = this.state.formValues;
    formValues["page_header_layout"] = value
    this.setState({
      formValues
    });
  }

  //front page layout rdb button change
  handleFrontPageRbd(event, value){
    let formValues = this.state.formValues;
    formValues["front_page_layout"] = value
    this.setState({
      formValues
    });
    this.updateFrontPageStyles();
  }

  //photos include in items details
  handleShow_photos(event, value){
    let formValues = this.state.formValues;
    formValues["show_photos"] = value
    this.setState({
      formValues
    });
  }

  //photos size opt
  handlePhotoSize(event, value){
    let formValues = this.state.formValues;
    formValues["photo_size"] = value
    this.setState({
      formValues
    });
  }


  //include the date and time under photos
  handleChkDTinclude(event, isInputChecked){
    let formValues = this.state.formValues;
    formValues["show_photo_date_time"] = (isInputChecked== true? 1 : 0);
    this.setState({
      formValues
    });
  }

  //include mailing
  handleMailing(event, value){
    let formValues = this.state.formValues;
    formValues["mailing"] = value
    this.setState({
      formValues
    });
  }

  //include_cover_page
  handleIncludeCoverPage(event, isInputChecked){
    let formValues = this.state.formValues;
    formValues["include_cover_page"] = (isInputChecked== true? 1 : 0);
    this.setState({
      formValues,
      coverpage_enable : isInputChecked
    });
  }


  // front page layout img click event
  handleFrontPageImg(type){
    let formValues = this.state.formValues;
    formValues["front_page_layout"] = type
    this.setState({
      formValues
    });
    this.updateFrontPageStyles();
  }

  //item details layout
  handleItemDetailsLayout(event, value){
    let formValues = this.state.formValues;
    formValues["items_details_layout"] = value
    this.setState({
      formValues
    });
  }

  //item details layout img click event
  handleItemsLayoutImg(type){
    let formValues = this.state.formValues;
    formValues["items_details_layout"] = type
    this.setState({
      formValues
    });
  }

  //photos collection
  handlePhotoCollectionRbd(event, value){
    let formValues = this.state.formValues;
    formValues["photo_collection_layout"] = value
    this.setState({
      formValues
    });
  }

  //photo collection img click
  handlePhotoCollectionImg(type){
    let formValues = this.state.formValues;
    formValues["photo_collection_layout"] = type
    this.setState({
      formValues
    });
  }

  //cover page text change
  handleCoverPagetxt(event){
    let formValues = this.state.formValues;
    formValues["cover_page_text"] = event.target.value;
    this.setState({
      formValues
    });
  }

  //show photos limit
  handleShowPhotosLimit(event){
    let formValues = this.state.formValues;
    formValues["show_photos_limit"] = event.target.value;
    this.setState({
      formValues
    });
  }

  //footer text change
  handleFootertxt(event){
    let formValues = this.state.formValues;
    formValues["footer_text"] = event.target.value;
    this.setState({
      formValues
    });
  }

  //include the date and time under photos
  handleChkConSummary(event, isInputChecked){
    let formValues = this.state.formValues;
    formValues["include_condition_summary"] = (isInputChecked== true? 1 : 0);
    this.setState({
      formValues
    });
  }

  //include the date and time under photos
  handleChkIncludeSing(event, isInputChecked){
    let formValues = this.state.formValues;
    formValues["include_singatures"] = (isInputChecked== true? 1 : 0);
    this.setState({
      formValues
    });
  }

  //mailer settings
  handleMailServertxt(event){
    let formValues = this.state.formValues;

    switch (event.target.name) {

      case 'ex_mail_server':
        formValues["ex_mail_server"] = event.target.value;
        break;

      case 'ex_mail_username':
        formValues["ex_mail_username"] = event.target.value;
        break;

      case 'ex_mail_password':
        formValues["ex_mail_password"] = event.target.value;
        break;

      case 'ex_mail_port':
        formValues["ex_mail_port"] = event.target.value;
        break;
    }

    this.setState({
      formValues
    });
  }

  render() {

    let base_color = '#ffffff';
    if(this.state.formValues.page_header_layout == 'SOLID'){
      base_color = this.state.formValues.base_color;
    }
    else if(this.state.formValues.page_header_layout == 'BORDER_BOTTOM'){
      base_color = '#ffffff';
    }

    let limitTxt = 'none';
    if(this.state.formValues.show_photos == 'LIMIT'){
      limitTxt = 'block'
    }

    let itemslayoutS1Color = '#cccccc';
    let itemslayoutS2Color = '#cccccc';
    let itemslayoutS3Color = '#cccccc';
    let itemslayoutS4Color = '#cccccc';
    let itemslayoutS5Color = '#cccccc';
    let item_layout_S1_img_border = 'none';
    let item_layout_S2_img_border = 'none';
    let item_layout_S3_img_border = 'none';
    let item_layout_S4_img_border = 'none';
    let item_layout_S5_img_border = 'none';

    if(this.state.formValues.items_details_layout == 'STYLE 1'){
      itemslayoutS1Color = '#417505';
      itemslayoutS2Color = '#cccccc';
      itemslayoutS3Color = '#cccccc';
      itemslayoutS4Color = '#cccccc';
      itemslayoutS5Color = '#cccccc';

      item_layout_S1_img_border = '2px dashed #417505';
      item_layout_S2_img_border = 'none';
      item_layout_S3_img_border = 'none';
      item_layout_S4_img_border = 'none';
      item_layout_S5_img_border = 'none';
    }
    else if(this.state.formValues.items_details_layout == 'STYLE 2'){
      itemslayoutS1Color = '#cccccc';
      itemslayoutS2Color = '#417505';
      itemslayoutS3Color = '#cccccc';
      itemslayoutS4Color = '#cccccc';
      itemslayoutS5Color = '#cccccc';

      item_layout_S2_img_border = '2px dashed #417505';
      item_layout_S1_img_border = 'none';
      item_layout_S3_img_border = 'none';
      item_layout_S4_img_border = 'none';
      item_layout_S5_img_border = 'none';
    }
    else if(this.state.formValues.items_details_layout == 'STYLE 3'){
      itemslayoutS1Color = '#cccccc';
      itemslayoutS2Color = '#cccccc';
      itemslayoutS3Color = '#417505';
      itemslayoutS4Color = '#cccccc';
      itemslayoutS5Color = '#cccccc';

      item_layout_S3_img_border = '2px dashed #417505';
      item_layout_S1_img_border = 'none';
      item_layout_S2_img_border = 'none';
      item_layout_S4_img_border = 'none';
      item_layout_S5_img_border = 'none';
    }
    else if(this.state.formValues.items_details_layout == 'STYLE 4'){
      itemslayoutS1Color = '#cccccc';
      itemslayoutS2Color = '#cccccc';
      itemslayoutS4Color = '#417505';
      itemslayoutS3Color = '#cccccc';
      itemslayoutS5Color = '#cccccc';

      item_layout_S4_img_border = '2px dashed #417505';
      item_layout_S3_img_border = 'none';
      item_layout_S1_img_border = 'none';
      item_layout_S2_img_border = 'none';
      item_layout_S5_img_border = 'none';
    }
    else if(this.state.formValues.items_details_layout == 'STYLE 5'){
      itemslayoutS1Color = '#cccccc';
      itemslayoutS2Color = '#cccccc';
      itemslayoutS4Color = '#cccccc';
      itemslayoutS3Color = '#cccccc';
      itemslayoutS5Color = '#417505';

      item_layout_S5_img_border = '2px dashed #417505';
      item_layout_S3_img_border = 'none';
      item_layout_S1_img_border = 'none';
      item_layout_S2_img_border = 'none';
      item_layout_S4_img_border = 'none';
    }

    let photocollection2cColor = '#cccccc';
    let photocollection3cColor = '#cccccc';
    let photocollection4cColor = '#cccccc';
    let photocollection_2c_img_border = 'none';
    let photocollection_3c_img_border = 'none';
    let photocollection_4c_img_border = 'none';

    if(this.state.formValues.photo_collection_layout == '2-COL'){
      photocollection2cColor = '#417505';
      photocollection3cColor = '#cccccc';
      photocollection4cColor = '#cccccc';
      photocollection_2c_img_border = '2px dashed #417505';
      photocollection_3c_img_border = 'none';
      photocollection_4c_img_border = 'none';
    }
    else if(this.state.formValues.photo_collection_layout == '3-COL'){
      photocollection2cColor = '#cccccc';
      photocollection3cColor = '#417505';
      photocollection4cColor = '#cccccc';
      photocollection_2c_img_border = 'none';
      photocollection_3c_img_border = '2px dashed #417505';
      photocollection_4c_img_border = 'none';
    }
    else if(this.state.formValues.photo_collection_layout == '4-COL'){
      photocollection2cColor = '#cccccc';
      photocollection3cColor = '#cccccc';
      photocollection4cColor = '#417505';
      photocollection_2c_img_border = 'none';
      photocollection_3c_img_border = 'none';
      photocollection_4c_img_border = '2px dashed #417505';
    }

    const styles ={
      tblProgress: {
        margin: '20px auto',
        textAlign: 'center'
      },
      progressbar:{
        width: 'auto',
        height: 20
      },
      wrapper:{
        // boxShadow:' rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
        // borderRadius: 2,
        padding: 10,
        marginBottom: 30,
        marginTop: 20,
        position: 'relative',
        borderTop: '1px solid #E1E1E1',
      },
      heading:{
        marginBottom: 0,
        color: 'rgb(0, 151, 167)',
        fontSize: 20,
        marginBottom: 10
      },
      headinghr:{
        backgroundColor: 'rgb(79, 189, 160)',
        marginBottom: 20,
        marginTop: 5
      },
      buttons: {
        marginTop: 30,
        marginLeft: 10,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      },
      dropzone:{
        width: 150,
        display: 'inline-block',
        marginLeft: 3,
        height: 150,
      },
      dropzoneItem:{
        minHeight: 125,
        minWidth: 80,
        background: '#ffffff',
        padding: 5,
        cursor: 'pointer',
        textAlign: 'center'
      },
      radioButton: {
        marginBottom: 16,
      },
      radioButtonwithtxt: {
        marginBottom: 16,
        width: 'auto',
        minWidth: 110
      },
      divInlineWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      divFlexItem:{
        marginRight: 50,
        minWidth: 200,
        position: 'relative'
      },
      divInlineWrapperCover: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      divFlexItemCoverTxt:{
        marginRight: 50,
        minWidth: 200,
        width: '100%',
        position: 'relative'
      },
      tableStyle: {
        width: '100%',
        border: '1px solid #e1e1e1',
        borderCollapse: 'collapse',
        minWidth: 300
      },
      thbg:{
        backgroundColor: `${this.state.formValues.table_header_bg_color}`,
        textAlign: 'left',
        color: `${this.state.formValues.table_header_color}`,
        padding: 10
      },
      trbg:{
        padding: 10
      },
      rdosubtxt: {
        width: 50,
        position: 'absolute',
        right: 0,
        bottom: 10,
        display: `limitTxt`
      },
      hrcustom:{
        width: '100%',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '2px dotted rgba(0, 0, 0, 0.298039)',
        bottom: 8,
        boxSizing: 'content-box'
      },
      checkbox: {
        marginBottom: 16,
      },
      divInlineFooterWrapper: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
      },
      divFlexFooterItem:{
        marginRight: 50,
        position: 'relative',
        alignSelf: 'center'
      },
      footerWarpper: {
        width: '100%',
        border: '1px solid #e6e6e6'
      },
      footertxt: {
        color: '#cccccc'
      },
      photofootertxt: {
        color: '#969696',
        fontSize: 11,
        fontStyle: 'italic'
      },
      logo:{
        width: 150,
        height: 'auto'
      },
      headerStyleWrapper: {
        minWidth: 300,
        display: 'table',
        borderBottom: `1px solid ${this.state.formValues.page_header_color}`,
        backgroundColor: `${base_color}`
      },
      headerStyleLeft: {
        display: 'table-cell',
        width: '30%'
      },
      logoheader:{
        width: 100,
        height: 'auto',
        paddingTop: 10
      },
      headerStyleRight: {
        textAlign: 'right',
        display: 'table-cell',
        width: '70%'
      },
      headerStyleHeader: {
        fontWeight: 700,
        color: `${this.state.formValues.page_header_color}`
      },
      headerStyleSubHeader: {
        color: `${this.state.formValues.page_header_color}`
      },
      itemlayouttxtS1: {
        color: `${itemslayoutS1Color}`,
        fontWeight: 700
      },
      itemlayouttxtS2: {
        color: `${itemslayoutS2Color}`,
        fontWeight: 700
      },
      itemlayouttxtS3: {
        color: `${itemslayoutS3Color}`,
        fontWeight: 700
      },
      itemlayouttxtS4: {
        color: `${itemslayoutS4Color}`,
        fontWeight: 700
      },
      itemlayouttxtS5: {
        color: `${itemslayoutS5Color}`,
        fontWeight: 700
      },
      itemlayoutimgS1: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${item_layout_S1_img_border}`,
        borderRadius: 5,
      },
      itemlayoutimgS2: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${item_layout_S2_img_border}`,
        borderRadius: 5,
      },
      itemlayoutimgS3: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${item_layout_S3_img_border}`,
        borderRadius: 5,
      },
      itemlayoutimgS4: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${item_layout_S4_img_border}`,
        borderRadius: 5,
      },
      itemlayoutimgS5: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${item_layout_S5_img_border}`,
        borderRadius: 5,
      },
      photocollectiontxt2c: {
        color: `${photocollection2cColor}`,
        fontWeight: 700
      },
      photocollectiontxt3c: {
        color: `${photocollection3cColor}`,
        fontWeight: 700
      },
      photocollectiontxt4c: {
        color: `${photocollection4cColor}`,
        fontWeight: 700
      },
      photocollectionimg2c: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${photocollection_2c_img_border}`
      },
      photocollectionimg3c: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${photocollection_3c_img_border}`
      },
      photocollectionimg4c: {
        width: 150,
        height: 'auto',
        cursor: 'pointer',
        border: `${photocollection_4c_img_border}`
      },
      frontPageSelectionS1Color: {
         color: `${this.state.frontPageSelectionS1Color}`
      },
      front_page_layout_S1_img_border: {
         width: 150,
         height: 'auto',
         cursor: 'pointer',
         border: `${this.state.front_page_layout_S1_img_border}`,
         borderRadius: 5
      },
      frontPageSelectionS2Color: {
         color: `${this.state.frontPageSelectionS2Color}`
      },
      front_page_layout_S2_img_border: {
         width: 150,
         height: 'auto',
         cursor: 'pointer',
         border: `${this.state.front_page_layout_s2_img_border}`,
         borderRadius: 5
      },
      frontPageSelectionS3Color: {
         color: `${this.state.frontPageSelectionS3Color}`
      },

      front_page_layout_S3_img_border: {
         width: 150,
         height: 'auto',
         cursor: 'pointer',
         border: `${this.state.front_page_layout_s3_img_border}`,
         borderRadius: 5
      }

    };


    let isShowSaving = null;
    if (this.state.startSending &&  this.state.startSending == true  ) {
      isShowSaving = <div style={styles.tblProgress}><LinearProgress mode="indeterminate" /></div>;
    }
    else {
      isShowSaving = '';
    }



    return (
      <PageBase title="Report settings" navigation="">

        {isShowSaving}

        <form>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Logo settings</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>

                  <div style={styles.divFlexItem}>

                    <div style={styles.dropzone}>

                      <div>
                        <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzoneItem} className="dropzoneItem" multiple={false} >
                          <div>Drop a file or click here to upload.</div>
                            { this.state.uploading &&
                                <MuiThemeProvider>
                                  <CircularProgress />
                                </MuiThemeProvider>
                            }
                        </Dropzone>
                      </div>

                    </div>

                  </div>
                  <div style={styles.divFlexItem}>
                    <img src={this.state.formValues.logo_url} alt="logo" style={styles.logo}/>
                  </div>

                </div>


          </div>

          <div style={styles.wrapper}>
              <h3 style={styles.heading}>Base color settings</h3>
              <div style={styles.headinghr}/>

              <h4>Select your base color:</h4>
              <ColorPicker changeColor={this.changeColor.bind(this)} type="BASECOLOR" defaultColor={this.state.formValues.base_color}/>
          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Page header</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>
                    <h4>Layout:</h4>
                    <RadioButtonGroup name="page_header_layout" valueSelected={this.state.formValues.page_header_layout} onChange={this.handleChangePageHeader.bind(this)}>
                      <RadioButton
                        value="BORDER_BOTTOM"
                        label="Border bottom"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="SOLID"
                        label="Solid"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>
                  </div>

                  <div style={styles.divFlexItem}>
                      <h4>Font color:</h4>
                      <ColorPicker changeColor={this.changeColor.bind(this)} type="PHFONTCOLOR" defaultColor={this.state.formValues.page_header_color}/>
                  </div>

                  <div style={styles.divFlexItem}>
                      <div style={styles.headerStyleWrapper}>

                        <div style={styles.headerStyleLeft}>
                          <img src="images/property-ground-logo.png" alt="logo" style={styles.logoheader}/>
                        </div>

                        <div style={styles.headerStyleRight}>
                          <div style={styles.headerStyleHeader}>
                            Inventory Report
                          </div>
                          <div style={styles.headerStyleSubHeader}>
                            468, Chrunch lane, London
                          </div>
                        </div>

                      </div>
                  </div>

              </div>

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Table section header</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>
                    <h4>Base color:</h4>
                    <ColorPicker changeColor={this.changeColor.bind(this)} type="TBLSECBG" defaultColor={this.state.formValues.table_header_bg_color} />
                  </div>

                  <div style={styles.divFlexItem}>
                      <h4>Font color:</h4>
                      <ColorPicker changeColor={this.changeColor.bind(this)} type="TBLSECCOLOR" defaultColor={this.state.formValues.table_header_color}/>
                  </div>

                  <div style={styles.divFlexItem}>

                    <table style={styles.tableStyle}>
                      <tbody>
                        <tr>
                          <th style={styles.thbg}>Col one</th>
                          <th style={styles.thbg}>Col two</th>
                        </tr>
                        <tr>
                          <td style={styles.trbg}>Some text</td>
                          <td style={styles.trbg}>Some more text</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Front page</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>

                  <div style={{width: '100%', marginBottom: 20 }}>
                    <div style={styles.divFlexItem}>
                      <RadioButtonGroup name="front_page_layout" valueSelected={this.state.formValues.front_page_layout} onChange={this.handleFrontPageRbd.bind(this)}>
                        <RadioButton
                          value="TEMPLATE 1"
                          label="TEMPLATE 1"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="TEMPLATE 2"
                          label="TEMPLATE 2"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="TEMPLATE 3"
                          label="TEMPLATE 3"
                          style={styles.radioButton}
                        />

                      </RadioButtonGroup>
                    </div>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.frontPageSelectionS1Color}>TEMPLATE 1</div>
                    <img src="images/FR_STYLE_1.jpg" alt="FR_STYLE_1" style={styles.front_page_layout_S1_img_border} onClick={this.handleFrontPageImg.bind(this, 'TEMPLATE 1')}/>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.frontPageSelectionS2Color}>TEMPLATE 2</div>
                    <img src="images/FR_STYLE_2.jpg" alt="FR_STYLE_2" style={styles.front_page_layout_S2_img_border} onClick={this.handleFrontPageImg.bind(this, 'TEMPLATE 2')}/>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.frontPageSelectionS3Color}>TEMPLATE 3</div>
                    <img src="images/FR_STYLE_3.jpg" alt="FR_STYLE_3" style={styles.front_page_layout_S3_img_border} onClick={this.handleFrontPageImg.bind(this, 'TEMPLATE 3')}/>
                  </div>

                </div>

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Item style</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>

                  <div style={{width: '100%', marginBottom: 20 }}>
                    <div style={styles.divFlexItem}>
                      <RadioButtonGroup name="items_details_layout" valueSelected={this.state.formValues.items_details_layout} onChange={this.handleItemDetailsLayout.bind(this)}>
                        <RadioButton
                          value="STYLE 1"
                          label="STYLE 1"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="STYLE 2"
                          label="STYLE 2"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="STYLE 3"
                          label="STYLE 3"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="STYLE 4"
                          label="STYLE 4"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="STYLE 5"
                          label="STYLE 5"
                          style={styles.radioButton}
                        />
                      </RadioButtonGroup>
                    </div>
                  </div>


                    <div style={styles.divFlexItem}>
                      <div style={styles.itemlayouttxtS1}>STYLE 1</div>
                      <img src="images/report-item-style-1.jpg" alt="style 1" style={styles.itemlayoutimgS1} onClick={this.handleItemsLayoutImg.bind(this, 'STYLE 1')}/>
                    </div>

                    <div style={styles.divFlexItem}>
                      <div style={styles.itemlayouttxtS2}>STYLE 2</div>
                      <img src="images/report-item-style-2.jpg" alt="style 2" style={styles.itemlayoutimgS2}  onClick={this.handleItemsLayoutImg.bind(this, 'STYLE 2')}/>
                    </div>

                    <div style={styles.divFlexItem}>
                      <div style={styles.itemlayouttxtS3}>STYLE 3</div>
                      <img src="images/report-item-style-3.jpg" alt="style 3" style={styles.itemlayoutimgS3}  onClick={this.handleItemsLayoutImg.bind(this, 'STYLE 3')}/>
                    </div>

                    <div style={styles.divFlexItem}>
                      <div style={styles.itemlayouttxtS4}>STYLE 4</div>
                      <img src="images/report-item-style-4.jpg" alt="style 4" style={styles.itemlayoutimgS4}  onClick={this.handleItemsLayoutImg.bind(this, 'STYLE 4')}/>
                    </div>

                    <div style={styles.divFlexItem}>
                      <div style={styles.itemlayouttxtS5}>STYLE 5</div>
                      <img src="images/report-item-style-5.jpg" alt="style 5" style={styles.itemlayoutimgS5}  onClick={this.handleItemsLayoutImg.bind(this, 'STYLE 5')}/>
                    </div>


                </div>

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Photos layout at the end of report</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>

                  <div style={{width: '100%', marginBottom: 20 }}>
                    <div style={styles.divFlexItem}>
                      <RadioButtonGroup name="photo_collection_layout" valueSelected={this.state.formValues.photo_collection_layout} onChange={this.handlePhotoCollectionRbd.bind(this)}>
                        <RadioButton
                          value="2-COL"
                          label="2 Columns"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="3-COL"
                          label="3 Columns"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="4-COL"
                          label="4 Columns"
                          style={styles.radioButton}
                        />
                      </RadioButtonGroup>
                    </div>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.photocollectiontxt2c}>2 Columns</div>
                    <img src="images/photo-collection-2-col.png" alt="2-col" style={styles.photocollectionimg2c} onClick={this.handlePhotoCollectionImg.bind(this, '2-COL')}/>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.photocollectiontxt3c}>3 Columns</div>
                    <img src="images/photo-collection-3-col.png" alt="3-col" style={styles.photocollectionimg3c}  onClick={this.handlePhotoCollectionImg.bind(this, '3-COL')}/>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.photocollectiontxt4c}>4 Columns</div>
                    <img src="images/photo-collection-4-col.png" alt="4-col" style={styles.photocollectionimg4c}  onClick={this.handlePhotoCollectionImg.bind(this, '4-COL')}/>
                  </div>

                </div>

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Cover page</h3>
                <div style={styles.headinghr}/>



                <div style={styles.divInlineWrapperCover}>
                  <div style={styles.divFlexItem}>
                    <Checkbox
                      label="Include cover page"
                      style={styles.checkbox} onCheck={this.handleIncludeCoverPage.bind(this)} checked={this.state.formValues.include_cover_page==1? true: false}
                    />
                  </div>

                  <div style={styles.divFlexItemCoverTxt}>

                    <TextField name="cover_page_text"  hintText="Cover page" floatingLabelText="Cover page" value={this.state.formValues.cover_page_text}
                    fullWidth={true} multiLine={true} name="coverpage" disabled={!this.state.coverpage_enable} onChange={this.handleCoverPagetxt.bind(this)}/>
                  </div>

              </div>

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Photo</h3>
                <div style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>

                    <h4>Photos in item details:</h4>
                    <RadioButtonGroup name="show_photos" valueSelected={this.state.formValues.show_photos} onChange={this.handleShow_photos.bind(this)}>
                      <RadioButton
                        value="ALL"
                        label="All photos"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="NO"
                        label="No photos"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="LIMIT"
                        label="Up to: "
                        style={styles.radioButtonwithtxt}
                      />
                    </RadioButtonGroup>

                    { this.state.formValues.show_photos == 'LIMIT' &&
                      <TextField style={styles.rdosubtxt} name="limitphotos" fullWidth={false} hintText="Number" onChange={this.handleShowPhotosLimit.bind(this)} value={this.state.formValues.show_photos_limit}/>
                    }

                  </div>

                  {false &&
                  <div style={styles.divFlexItem}>
                    <h4>Photos size:</h4>
                    <RadioButtonGroup name="photo_size" valueSelected={this.state.formValues.photo_size} onChange={this.handlePhotoSize.bind(this)} >
                      <RadioButton
                        value="SMALL"
                        label="Small (64x64)"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="MEDIUM"
                        label="Medium (150x150)"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="LARGE"
                        label="Large (300x300)"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>

                  </div>
                }

                </div>

                <div style={styles.hrcustom}></div>
                <h4>Layout:</h4>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>
                    <Checkbox
                      label="Date and time bottom of the image"
                      style={styles.checkbox} onCheck={this.handleChkDTinclude.bind(this)} checked={this.state.formValues.show_photo_date_time==1? true: false}
                    />
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.footertxt}>Preview</div>
                    <img src="http://placehold.it/300x300" />
                    { this.state.formValues.show_photo_date_time == 1 &&
                    <div style={styles.photofootertxt}>DD/MM/YYYY HH:mm</div>
                    }
                  </div>

                </div>

          </div>

          <div style={styles.wrapper}>

              <h3 style={styles.heading}>General notes and guidance</h3>
              <div style={styles.headinghr}/>

              <div style={styles.divInlineWrapper}>

                {!this.state.showNoteEdit &&
                <Table
                      height={'300px'}
                      fixedHeader={true}
                    >
                      <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                      >
                        <TableRow>
                          <TableHeaderColumn colSpan="3" tooltip="" style={{textAlign: 'left'}}>
                            Include a custom notes section at the beginning of your report
                          </TableHeaderColumn>
                        </TableRow>

                        <TableRow>
                          <TableHeaderColumn tooltip="Page">Page</TableHeaderColumn>
                          <TableHeaderColumn tooltip="Title">Title</TableHeaderColumn>
                          <TableHeaderColumn tooltip="Open">Change</TableHeaderColumn>
                        </TableRow>

                      </TableHeader>

                      <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                      >

                        { this.state.report_settings_notes &&
                          this.state.report_settings_notes.map( (row, index) => (
                            <TableRow key={index}>
                              <TableRowColumn>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Checkbox
                                     label=""
                                     style={{marginRight: 10, display: 'inline', width: '30%'}} onCheck={this.handleChkGeneralNotes.bind(this, index)} defaultChecked={row.included == 1 ? true : false}
                                   />
                                   <div>
                                     <span>{row.note_title}</span>
                                   </div>
                                </div>



                          </TableRowColumn>
                              <TableRowColumn>{row.title}</TableRowColumn>
                              <TableRowColumn><FlatButton label="Edit" secondary={true} onTouchTap={this.handleNotePageOpen.bind(this, index, row.title,  row.note )}/></TableRowColumn>
                            </TableRow>
                          ))
                        }

                      </TableBody>
                  </Table>
                }
                {this.state.showNoteEdit &&
                  <div >
                    <div style={{width: '100%', padding: 20, position: 'relative'}}>
                      <TextField
                        hintText="Title" floatingLabelText="Title"
                        value={this.state.temp_title}
                        onChange={this.handleTitlePageTxt.bind(this)}
                      />
                      <TextField hintText="Notes" floatingLabelText="Notes" value={this.state.temp_notes}
                      fullWidth={true} multiLine={true} name="Notes" onChange={this.handleNotePageTxt.bind(this)} rows={2} rowsMax={4}/>
                    <div style={{textAlign: 'right', width: '100%' }}>
                      <RaisedButton label="Cancel" style={{marginTop: 15, marginRight: 10}} onTouchTap={this.handleNotePageCancel.bind(this)} />
                      <RaisedButton label="Ok" primary={true} style={{marginTop: 15}} onTouchTap={this.handleNotePageClose.bind(this)} />
                    </div>


                    </div>

                  </div>

                }


              </div>

          </div>

          <div style={styles.wrapper}>

            <h3 style={styles.heading}>Footer settings</h3>
            <div style={styles.headinghr}/>

            <Checkbox
               label="Include in footer"
               style={styles.checkbox} checked={this.state.footer_enable} disabled={true}
             />

             <div style={styles.footerWarpper}>
                <div style={styles.divInlineFooterWrapper}>

                  <div style={styles.divFlexFooterItem}>
                    <img src="http://placehold.it/100x50" />
                  </div>

                  <div style={styles.divFlexFooterItem}>
                    <span style={styles.footertxt}>Page 1 of 1</span>
                  </div>

                  <div style={styles.divFlexFooterItem}>
                    <TextField  hintText="copyright" floatingLabelText="copyright"
                      fullWidth={false} name="footer_text" disabled={!this.state.footer_enable}  onChange={this.handleFootertxt.bind(this)}/>
                  </div>


                </div>
            </div>

          </div>

          <div style={styles.wrapper}>

            <h3 style={styles.heading}>Mail settings</h3>
            <div style={styles.headinghr}/>

            <div style={styles.divInlineWrapper}>

                <div style={styles.divFlexItem}>

                  <RadioButtonGroup name="mailing" valueSelected={this.state.formValues.mailing} onChange={this.handleMailing.bind(this)}>
                    <RadioButton
                      value="SELF"
                      label="Send from ProperyGround"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="EXTERNAL"
                      label="Send from your own mail"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>

                </div>

                { this.state.formValues.mailing == 'EXTERNAL' &&
                  <div style={styles.divFlexItem}>
                    <TextField  hintText="SMTP server" floatingLabelText="SMTP server"
                      fullWidth={false} name="ex_mail_server" disabled={false} onChange={this.handleMailServertxt.bind(this)}/>
                    <TextField  hintText="SMTP username" floatingLabelText="SMTP username"
                        fullWidth={false} name="ex_mail_username" disabled={false} onChange={this.handleMailServertxt.bind(this)}/>
                    <TextField  hintText="SMTP password" floatingLabelText="SMTP password"
                          fullWidth={false} name="ex_mail_password" disabled={false} onChange={this.handleMailServertxt.bind(this)}/>
                    <TextField  hintText="SMTP port" floatingLabelText="SMTP port"
                          fullWidth={false} name="ex_mail_port" disabled={false} onChange={this.handleMailServertxt.bind(this)}/>
                  </div>
                }


            </div>

          </div>

          <div style={styles.wrapper}>

            <h3 style={styles.heading}>Additional settings</h3>
            <div style={styles.headinghr}/>

            <Checkbox
               label="Condition summary"
               style={styles.checkbox} onCheck={this.handleChkConSummary.bind(this)} defaultChecked={this.state.formValues.include_condition_summary == 1 ? true : false}
             />

             <Checkbox
                label="Include singature block"
                style={styles.checkbox} onCheck={this.handleChkIncludeSing.bind(this)} defaultChecked={this.state.formValues.include_singatures ==  1 ? true : false}
              />

          </div>


          <div style={styles.buttons}>

              <RaisedButton label="Save"
                style={styles.saveButton}
                primary={true} onTouchTap={this.saveReportSettings.bind(this)}/>

          </div>


        </form>


        <Snackbar
          open={this.state.showErrorSnack}
          message="Please fill fields..."
          autoHideDuration={3000}
          onRequestClose={this.errhandleRequestClose.bind(this)} />

        <Snackbar
          open={this.state.showSuccessSnack}
          message="Successfully updated..."
          autoHideDuration={3000}
          onRequestClose={this.successhandleRequestClose.bind(this)} />

      </PageBase>
    );
  }
}
