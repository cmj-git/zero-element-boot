import React, { useImperativeHandle, forwardRef } from 'react';
/**
 */

export default /*#__PURE__*/forwardRef(function Index(props, ref) {
  const {
    children,
    indicate
  } = props;
  const styles = {
    backgroundColor: '#f1f1f1',
    borderColor: 'transparent',
    boxShadow: '0 0px 6px rgba(255, 255, 255, 1)'
  };
  useImperativeHandle(ref, () => ({
    getHoverStyles: () => {
      return styles;
    }
  }));
  return React.Children.map(children, child => {
    return /*#__PURE__*/React.createElement("div", null, child);
  });
});