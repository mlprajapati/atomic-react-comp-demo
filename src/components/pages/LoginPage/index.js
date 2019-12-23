import React, { Component } from "react";
import { Login } from "../../../components";
import { Col, Row } from "react-bootstrap";

const usernames = [8888888888, 9999999999, 5555555555];
const authPassword = "testing123$";

class LoginPage extends Component {
  state = {};

  handleLogin = (username, password, responseCallback) => {
    console.log("from LoginPage", username, password);
    const checkUser = usernames.includes(+username);
    const checkPass = authPassword === password;

    if (checkUser && checkPass) {
      const response = {
        redirectUrl: "/page/home"
      };
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", true);
      responseCallback(response);
    } else {
      const response = {
        message: "Wrong Username or Password"
      };
      responseCallback(response);
    }
  };

  render() {
    return (
      <Row
        style={{
          height: "100vh",
          marginLeft: "0px",
          marginRight: "0px",
          background: "#ccc"
        }}
      >
        <Col xs={12} md={8} lg={6} style={{ margin: "auto" }}>
          <Login
            handleLogin={this.handleLogin}
            width="100%"
            bgcolor="#343a40"
            title={<center>SONY</center>}
          />
        </Col>
      </Row>
    );
  }
}

export default LoginPage;
