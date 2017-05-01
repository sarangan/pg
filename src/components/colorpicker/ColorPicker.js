import React from 'react';
import { SketchPicker } from 'react-color'

export default class ColorPicker extends React.Component{

  constructor(){
    super();
    let color = '#2196f3';
    this.state = {
      displayColorPicker: false,
      color: color
    };

  }

  componentWillMount(){

  }

  componentWillUnmount(){

  }

  componentDidMount(){
    let color = '#2196f3';

    if (typeof this.props.defaultColor != undefined){
      color = this.props.defaultColor;
    }

    this.setState({
      color
    });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    //console.log(color);
    this.setState({ color: color.hex });
    this.props.changeColor(color, this.props.type);
  };


  render(){

    const styles= {
        bgcolor: {
          width: '32px',
          height: '22px',
          borderRadius: '2px',
          background: `${ this.state.color }`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }
    };

    return(
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.bgcolor } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    );
  }

}
