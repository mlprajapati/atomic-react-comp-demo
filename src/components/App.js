import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { LoginPage, NotFoundPage, HomePage } from "../components";

import Pages from "./pages/pages";
import theme from "./themes/default";

class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/login" component={LoginPage} />

            {/* <Pages>
            <Route
              component={({ match }) => (
                <>
                  <Route path="/home" component={HomePage} />
                  <Route path="/item-details" component={ItemDetails} />
                </>
              )}
            />
          </Pages> */}
            <Route path="/page" component={Pages} />
            <Route component={NotFoundPage} />
          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
