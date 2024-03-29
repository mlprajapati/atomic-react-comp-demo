import React from "react";
import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";
import { palette } from "styled-theme";
import { Card } from "react-bootstrap";

const cardWidth = ({ width }) => (width ? width : "100%");
const cardHeight = ({ height }) => (height ? height : "100%");
const bgColor = ({ bgcolor }) => (bgcolor ? bgcolor : palette("grayscale", 5));
const labelColor = ({ labelColor }) =>
  labelColor ? labelColor : palette("white", 0);
const CardWapper = styled.div`
  height: ${cardHeight};
  .card {
    background-color: ${bgColor};
    width: ${cardWidth};
    padding: 10px;
    margin: auto;
    ${ifProp(
      "responsive",
      css`
        @media screen and (max-width: ${prop("breakpoint")}px) {
          width: 100%;
        }
      `
    )}
  }
  form label {
    color: ${labelColor};
  }
  .card-title {
    color: ${labelColor};
  }
`;

const CardBox = ({ children, ...props }) => (
  <CardWapper {...props}>
    <Card {...props}>
      <Card.Body>
        {props.title && <Card.Title>{props.title}</Card.Title>}
        <div>{children}</div>
      </Card.Body>
    </Card>
  </CardWapper>
);

export default CardBox;
