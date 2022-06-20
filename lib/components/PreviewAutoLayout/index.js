function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box } from "@chakra-ui/react";
import AutoLayout from "../AutoLayout";
import useTokenRequest from "../hooks/useTokenRequest";
export default function Index(props) {
  // 参数
  const {
    api,
    layoutApi,
    layoutName,
    ...rest
  } = props; // 判断 layoutApi 是否为空，如果为空，则用 layoutName 拼接api路径

  const localLayoutApi = layoutApi || '/openapi/lc/components/layoutJson/' + layoutName; // 从api获取显示数据

  const [data] = useTokenRequest({
    api
  });
  const records = data && data.records;
  const dataX = [];
  dataX.push({
    items: records
  }); // 从layoutApi获取layoutJson

  const respLayoutData = useTokenRequest({
    api: localLayoutApi
  });
  const layoutJson = respLayoutData && respLayoutData[0];
  console.log('layoutJson===', respLayoutData);
  /**
   * 页面配置
   */

  const config = {
    items: dataX.length > 0 ? dataX : [],
    layout: layoutJson,
    ...rest
  }; // 控制台输出信息

  const onPreviewItemClick = item => {
    //TODO
    console.log(item, ' === item');
  };

  return /*#__PURE__*/React.createElement(Box, {
    spacing: "3px"
  }, /*#__PURE__*/React.createElement(AutoLayout, _extends({}, config, {
    onItemClick: onPreviewItemClick
  })));
}