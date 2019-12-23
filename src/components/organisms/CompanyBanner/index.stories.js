import React from "react";
import { storiesOf } from "@storybook/react";
import { CompanyBanner } from "../../../components";
import styled from "styled-components";
const responsive = [
  { breakPoint: 1024, cardsToShow: 2 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 760, cardsToShow: 2 }
];
const ExampleCard = styled.h1`
  background: #00558b;
  color: #fff;
  line-height: 100px;
  text-align: center;
  font-size: 36px;
  margin: 10px;
  padding: 2%;
  position: relative;
  box-shadow: 0 1px 2px 0 #00111b;
`;
storiesOf("CompanyBanner", module).addWithJSX("default", () => (
  <CompanyBanner />
));
