import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styled from "styled-components";

const A = styled(NavLink)`
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  line-height: 24px;
  height: 24px;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  white-space: nowrap;
  padding: 0 4px 0 1px;
  margin: 0;
  vertical-align: top;
`;
const IMG = styled.img`
  height: 12px;
  line-height: 24px;
  background-repeat: no-repeat;
  background-color: transparent;
  display: inline-block;
  text-decoration: none;
  margin: 0;
  padding: 5px;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
`;
const Link = props => {
  const { name, to, id, img, level, serialNo } = props;
  return (
    <>
      {img && (
        <IMG
          id={`icon_${id}`}
          src={img}
          alt={name}
          style={{ height: "20px" }}
        />
      )}
      {level && (
        <A
          id={`link_${id}`}
          to={to || "/page/item-details/" + serialNo}
          activeClassName="tree-active"
          exact
          strict
        >
          {name}
        </A>
      )}
      {!level && (
        <A id={`link_${id}`} exact strict activeClassName="tree-active" to="#">
          {name}
        </A>
      )}
    </>
  );
};
export default Link;
