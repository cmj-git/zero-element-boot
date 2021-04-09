import React from 'react';
import { AutoLayout } from "../../components";
import layout from "./layout"; //加载yml文件

import layoutOfYML from 'js-yaml-loader!./layout.yml';

const {
  AdItem
} = require("./..");

export default function Index(props) {
  const {
    onItemClickHandle,
    data = []
  } = props;
  let layoutData = ''; // /x/PublicLayoutDemo/layout.json

  const layoutJsonPath = ''; //local layout json

  const localLayoutJson = layoutOfYML;

  if (layoutJsonPath) {
    layoutData = {
      path: layoutJsonPath
    };
  } else {
    layoutData = localLayoutJson;
  } //Cart HoverShadowCart


  const config = {
    items: data.length > 0 ? data : [],
    layout: layoutData
  };

  const onClick = value => {
    console.log('list click = ', value); // onItemClickHandle();
  }; // console.log("解释 layout.yml = ", JSON.stringify(layoutOfYML, null, 2));
  // console.log('layoutOfYML = ', layoutOfYML)


  return /*#__PURE__*/React.createElement(AutoLayout, config, /*#__PURE__*/React.createElement(AdItem, null));
}