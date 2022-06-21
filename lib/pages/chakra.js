import * as React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { set as NamedPresenterSet } from "../components/config/NamedPresenterConfig";
import { Avatar } from "../components/presenter";
import { Title, Subtitle } from "../presenter/demo"; // TestChakraUI

import AirbnbExample from "./TestChakraUI/AirbnbExample";
export default function index(props) {
  // pre-init. presenter set 
  NamedPresenterSet({
    Avatar,
    Title,
    Subtitle
  });

  function onItemClickHandle(data) {
    console.log('data = ', data);
  }

  return /*#__PURE__*/React.createElement(ChakraProvider, null, /*#__PURE__*/React.createElement(AirbnbExample, null));
}