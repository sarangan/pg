import React from "react";
import { Link } from "react-router";
import Divider from 'material-ui/Divider';
import PageBase from '../../components/layout/PageBase';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import ReactDOMServer from 'react-dom/server';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ColorPicker from '../../components/colorpicker/ColorPicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

export default class ReportSettings extends React.Component {

  constructor(){
    super();

    this.state = {
      startSending: false,
      showErrorSnack: false,
      showSuccessSnack: false,
      open: false,
      uploading: false,
      displayColorPicker: false,
      background: '#fff',
      formValues: {
        pageHeaderLayout: '',
        frontPageSelection: '',
        photosInclude: ''
      },
      formatStyle:{
        pageHeaderColor: '#2196f3',
        pageHeaderBgColor: '#2196f3',
        tabelSectionColor: '#ffffff',
        tableSectionBg: '#2196f3'
      }
    };
  }

  componentWillMount(){

  }

  componentWillUnmount(){

  }

  onDrop(files){

      this.setState({
        uploading: true
      });
  }

  changeColor(color, type){
    var formatStyle = this.state.formatStyle;

    switch (type) {
      case 'PHFONTCOLOR':
          formatStyle['pageHeaderColor'] = color.hex;
          this.setState({
            formatStyle: formatStyle
          });
        break;

      case 'BASECOLOR':
        formatStyle['pageHeaderBgColor'] = color.hex;
        this.setState({
          formatStyle: formatStyle
        });
        break;

      case 'TBLSECBG':
        formatStyle['tableSectionBg'] = color.hex;
        this.setState({
          formatStyle: formatStyle
        });
        break;

      case 'TBLSECCOLOR':
        formatStyle['tabelSectionColor'] = color.hex;
        this.setState({
          formatStyle: formatStyle
        });
        break;

      default:

    }
  }

  //page header rdb change event
  handleChangePageHeader(event, value){
    let formValues = this.state.formValues;
    formValues["pageHeaderLayout"] = value
    this.setState({
      formValues
    });
  }

  //front page layout rdb button change
  handleFrontPageRbd(event, value){
    let formValues = this.state.formValues;
    formValues["frontPageSelection"] = value
    this.setState({
      formValues
    });
  }

  //photos include in items details
  handlePhotosInclude(event, value){
    console.log(value)
    let formValues = this.state.formValues;
    formValues["photosInclude"] = value
    this.setState({
      formValues
    });
  }

  render() {

    let pageHeaderBgColor = '#ffffff';
    if(this.state.formValues.pageHeaderLayout == 'SOLID'){
      pageHeaderBgColor = this.state.formatStyle.pageHeaderBgColor;
    }
    else if(this.state.formValues.pageHeaderLayout == 'BORDER_BOTTOM'){
      pageHeaderBgColor = '#ffffff';
    }

    let frontPageSelectionSTDColor = '#cccccc';
    let frontPageSelectionTOPLEFTColor = '#cccccc';
    if(this.state.formValues.frontPageSelection == 'STANDARD'){
      frontPageSelectionSTDColor = '#417505';
      frontPageSelectionTOPLEFTColor = '#cccccc';
    }
    else if(this.state.formValues.frontPageSelection == 'TOP_LEFT'){
      frontPageSelectionSTDColor = '#cccccc';
      frontPageSelectionTOPLEFTColor = '#417505';
    }


    let limitTxt = 'none';
    if(this.state.formValues.photosInclude == 'LIMIT'){
      limitTxt = 'block'
    }

    console.log(limitTxt);

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
        boxShadow:' rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
        borderRadius: 2,
        padding: 10,
        marginBottom: 30,
        marginTop: 20,
        position: 'relative'
      },
      heading:{
        color: 'rgb(79, 189, 160)',
        marginBottom: 0
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
        flexWrap: 'nowrap'
      },
      divFlexItem:{
        marginRight: 50,
        minWidth: 200,
        position: 'relative'
      },
      tableStyle: {
        width: '100%',
        border: '1px solid #e1e1e1',
        borderCollapse: 'collapse',
        minWidth: 300
      },
      thbg:{
        backgroundColor: `${this.state.formatStyle.tableSectionBg}`,
        textAlign: 'left',
        color: `${this.state.formatStyle.tabelSectionColor}`,
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
        minWidth: 200,
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
      logo:{
        width: 150,
        height: 'auto'
      },
      headerStyleWrapper: {
        minWidth: 300,
        display: 'table',
        borderBottom: `1px solid ${this.state.formatStyle.pageHeaderColor}`,
        backgroundColor: `${pageHeaderBgColor}`
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
        color: `${this.state.formatStyle.pageHeaderColor}`
      },
      headerStyleSubHeader: {
        color: `${this.state.formatStyle.pageHeaderColor}`
      },
      layoutimg: {
        width: 150,
        height: 'auto'
      },
      layouttxtStd: {
        color: `${frontPageSelectionSTDColor}`,
        fontWeight: 700
      },
      layouttxtTopLeft: {
        color: `${frontPageSelectionTOPLEFTColor}`,
        fontWeight: 700
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
      <PageBase title="Report settings" navigation="Home / Report settings">

        {isShowSaving}

        <form>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Logo settings</h3>
                <Divider style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>

                  <div style={styles.divFlexItem}>

                    <div style={styles.dropzone}>

                      <div>
                         <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzoneItem} className="dropzoneItem">
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
                    <img src="images/property-ground-logo.png" alt="logo" style={styles.logo}/>
                  </div>

                </div>


          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Base color settings</h3>
                <Divider style={styles.headinghr}/>

                <h4>Select your base color:</h4>
                <ColorPicker changeColor={this.changeColor.bind(this)} type="BASECOLOR" defaultColor={this.state.formatStyle.pageHeaderBgColor}/>
          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Page header</h3>
                <Divider style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>
                    <h4>Layout:</h4>
                    <RadioButtonGroup name="pageHeaderLayout" defaultSelected={this.state.formValues.pageHeaderLayout} defaultSelected={this.state.pageHeaderLayout} onChange={this.handleChangePageHeader.bind(this)}>
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
                      <ColorPicker changeColor={this.changeColor.bind(this)} type="PHFONTCOLOR" defaultColor={this.state.formatStyle.pageHeaderColor}/>
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
                <Divider style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>
                    <h4>Base color:</h4>
                    <ColorPicker changeColor={this.changeColor.bind(this)} type="TBLSECBG" defaultColor={this.state.formatStyle.tableSectionBg} />
                  </div>

                  <div style={styles.divFlexItem}>
                      <h4>Font color:</h4>
                      <ColorPicker changeColor={this.changeColor.bind(this)} type="TBLSECCOLOR" defaultColor={this.state.formatStyle.tabelSectionColor}/>
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
                <Divider style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>

                    <RadioButtonGroup name="frontPageSelection" defaultSelected={this.state.formValues.frontPageSelection} onChange={this.handleFrontPageRbd.bind(this)}>
                      <RadioButton
                        value="STANDARD"
                        label="Standard"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="TOP_LEFT"
                        label="Top left"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>

                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.layouttxtStd}>Standard</div>
                    <img src="images/standard_fp_layout.png" alt="standard" style={styles.layoutimg}/>
                  </div>

                  <div style={styles.divFlexItem}>
                    <div style={styles.layouttxtTopLeft}>Top left</div>
                    <img src="images/topleft_fp_layout.png" alt="topleft" style={styles.layoutimg}/>
                  </div>


                </div>



          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Cover page</h3>
                <Divider style={styles.headinghr}/>

                <h4>Cover page:</h4>
                <TextField  hintText="Cover page" floatingLabelText="Cover page"
                  fullWidth={true} name="coverpage" disabled={true} />

          </div>

          <div style={styles.wrapper}>

                <h3 style={styles.heading}>Photo</h3>
                <Divider style={styles.headinghr}/>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>

                    <h4>Photos in item details:</h4>
                    <RadioButtonGroup name="photosInclude" defaultSelected={this.state.formValues.photosInclude} onChange={this.handlePhotosInclude.bind(this)}>
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
                    <TextField style={styles.rdosubtxt} name="limitphotos" fullWidth={false} disabled={this.state.formValues.photosInclude != 'LIMIT'}/>

                  </div>


                  <div style={styles.divFlexItem}>
                    <h4>Photos size:</h4>
                    <RadioButtonGroup name="page-header-layout" defaultSelected="STANDARD">
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
                        label="Large (280x280)"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>

                  </div>

                </div>

                <div style={styles.hrcustom}></div>
                <h4>Layout:</h4>

                <div style={styles.divInlineWrapper}>
                  <div style={styles.divFlexItem}>
                    <Checkbox
                      label="Date and time bottom of the image"
                      style={styles.checkbox}
                    />
                  </div>

                  <div style={styles.divFlexItem}>
                    <img src="http://placehold.it/280x280" />
                    <div style={styles.footertxt}>DD/MM/YYYY HH:mm</div>
                  </div>

                </div>

          </div>

          <div style={styles.wrapper}>

            <h3 style={styles.heading}>Footer settings</h3>
            <Divider style={styles.headinghr}/>

            <Checkbox
               label="Include in footer"
               style={styles.checkbox}
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
                      fullWidth={false} name="copyright" disabled={false} />
                  </div>


                </div>
            </div>

          </div>

          <div style={styles.wrapper}>

            <h3 style={styles.heading}>Mail settings</h3>
            <Divider style={styles.headinghr}/>

            <div style={styles.divInlineWrapper}>

                <div style={styles.divFlexItem}>

                  <RadioButtonGroup name="page-header-layout" defaultSelected="STANDARD">
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

                <div style={styles.divFlexItem}>

                  <TextField  hintText="SMTP server" floatingLabelText="SMTP server"
                    fullWidth={false} name="ex_mail_server" disabled={false} />
                  <TextField  hintText="SMTP username" floatingLabelText="SMTP username"
                      fullWidth={false} name="ex_mail_username" disabled={false} />
                  <TextField  hintText="SMTP password" floatingLabelText="SMTP password"
                        fullWidth={false} name="ex_mail_password" disabled={false} />
                  <TextField  hintText="SMTP port" floatingLabelText="SMTP port"
                        fullWidth={false} name="ex_mail_port" disabled={false} />

                </div>


            </div>

          </div>

          <div style={styles.wrapper}>

            <h3 style={styles.heading}>Additional settings</h3>
            <Divider style={styles.headinghr}/>

            <Checkbox
               label="Condition summeray"
               style={styles.checkbox}
             />

             <Checkbox
                label="Include singature block"
                style={styles.checkbox}
              />

          </div>


          <div style={styles.buttons}>

              <RaisedButton label="Save"
                style={styles.saveButton}
                primary={true}/>

          </div>


        </form>


      <Snackbar
        open={this.state.open}
        message="Please fill fields..."
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />

      </PageBase>
    );
  }
}
