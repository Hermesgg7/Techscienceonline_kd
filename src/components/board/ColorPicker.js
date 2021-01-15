import React, { useState } from "react";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export function ColorPicker(props) {
  const { onChange } = props;

  const [state, setState] = useState({
    displayColorPicker: false,
    color: !props.selectedColor ? '#D3D3D3' : props.selectedColor,
  });

  const handleClick = () => {
    setState({
      ...state,
      displayColorPicker: !state.displayColorPicker
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      displayColorPicker: false
    });
  };

  const handleChange = (color) => {
    setState({
      ...state,
      color: color.hex
    });

    onChange && onChange(color.hex);
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '100px',
        height: '14px',
        borderRadius: '2px',
        background: `${state.color}`,
      },
      swatch: {
        padding: '5px',
        background: '#FFF',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        top: '5px'
      },
      popover: {
        position: 'absolute',
        right: '0px',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  // noinspection JSUnresolvedVariable
  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color}/>
      </div>
      {state.displayColorPicker ? <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose}/>
        <SketchPicker color={state.color} onChange={handleChange}/>
      </div> : null}
    </div>
  )
}
