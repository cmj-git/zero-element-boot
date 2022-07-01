function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Container from "../../container/Container";
import Flexbox from "../Flexbox";
/**
 * @param {间隔} spacing
 */

export default function (props) {
  const {
    children,
    spacing = 8,
    ...data
  } = props;
  return /*#__PURE__*/React.createElement(Flexbox, _extends({
    align: "start",
    direction: "row",
    flexFlow: "no-wrap",
    spacing: spacing
  }, data), children);
}