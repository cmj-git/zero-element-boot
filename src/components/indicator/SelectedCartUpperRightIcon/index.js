import React, { useImperativeHandle, forwardRef, useState } from 'react';

import selectedIcon from '@/../assets/selected2-icon.svg';

require('./index.less');

/**
 * line 分割线
 * 参数
 * Seperator: Seperator, 组件名
   props:{
      lineType:'solid' 分割线类型
   }
 */

export default forwardRef(function SelectedCartUpperRightIcon(props, ref) {

  const { children, line = {}, state = 'unselected'} = props;

  const [onHover, setOnHover] = useState(false);

  return React.Children.map(children, child => {

    const toggleHover = () => {
      const result = !onHover;
      setOnHover(result)
    }

    const fill = 'transparent';
    const margin = '';
    const padding = '0'
    let linewidth = '';
    let activeLeftLine = line.activeLeftLine ? line.activeLeftLine : '3px';
    const hoverColor = '#EAEAEA';
    const activeColor = hoverColor;
    const lineColor = '#4285F4';
    let bgColor = `${fill}`;

    // if (onHover) {
    //   bgColor = `${hoverColor}80`;
    // } else {
    //   bgColor = `${fill}ff`;
    // }

    const styles = {
      position: 'relative',
      margin: `${margin}`,
      padding: `${padding}`,
      backgroundColor: `${bgColor}`,
      borderRadius: '8px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#E7E8EB'
    }

<<<<<<< HEAD
    console.log('state = ', state)
    console.log('props = ', props)
=======
>>>>>>> 45ee3a70cfbf8336d0066f961d362d3cfc2ca602

    if(state == 'selected'){
      bgColor = activeColor;
      // linewidth = activeLeftLine;
      styles.borderColor = '#aab1dc';
      styles.boxShadow = '0 0px 6px rgba(170, 177, 220, 1)';
    }

    return (
      <>
        <div className={`i-SelectedCartUpperRightIcon`}
          style={styles}
          onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()}
        >
          {state == 'selected' ? (
            <div className="upperRightIcon">
              <img src={selectedIcon} />
            </div>
          ): null}

          {child}
        </div>
      </>

    )
  })
})