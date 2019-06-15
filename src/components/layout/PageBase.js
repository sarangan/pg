import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../../styles';

export default class Pagebase extends React.Component {
  constructor() {
    super();
  }

  render() {


     const {title, navigation} = this.props;

     globalStyles.paper['padding'] = 10;
     globalStyles.title['marginBottom'] = 10;
     globalStyles.title['marginTop'] = 10;
     globalStyles.paper['boxShadow'] = 'none';
     globalStyles.paper['paddingTop'] = 2;
     globalStyles.navigation['fontSize'] = 15;
     globalStyles.navigation['fontWeight'] = 'bold';
     globalStyles.navigation['color'] = '#424242';
     //globalStyles.navigation['backgroundColor'] = '#FAFAFA';
     globalStyles.navigation['padding'] = 5;
     globalStyles.navigation['verticalAlign'] = 'center';
     //globalStyles.navigation['textDecoration'] = 'underline';



      return(
        <div>
          <span style={globalStyles.navigation} >{navigation}</span>

          <Paper style={globalStyles.paper} zDepth={1}>
            { /*<h3 style={globalStyles.title} className="page-title">{title}</h3>
            <Divider/>
            */}


            {this.props.children}

            <div style={globalStyles.clear}/>

          </Paper>
      </div>

      );
  }

}
