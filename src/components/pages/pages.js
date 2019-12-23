import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../actions";
import {
  PageTemplate,
  Header,
  LeftNavigation,
  HomePage,
  ItemDetails,
  AllItemList,
  Footer,
  TreeView,
  AllServiceRequest,
  ServiceRequest,
  ForumComponent,
  NewThread,
  ThreadDiscussion
} from "..";

// import Footer from "./footer";

const links = [
  { icon: "fa fa-adjust", name: "OCCUPANCY" },
  { icon: "fa fa-heart", name: "HEALTY" },
  { icon: "fa fa-adjust", name: "TASTY" },
  { icon: "fa fa-star", name: "FAVORITE" },
  { icon: "fa fa-asterisk", name: "ALL" }
];

class Pages extends Component {
  state = {
    collapsedStatus: true,
    userDetails: ""
  };

  getRootProduct = () => {
    fetch("/assets/data/products.json")
      .then(response => response.json())
      .then(data => this.props.setRootProducts(data));
  };
  getServiceRequest = () => {
    fetch("/assets/data/servicerequest.json")
      .then(response => response.json())
      .then(data => this.props.setServiceRequest(data));
  };
  onLeftNavCollapse = () => {
    this.setState({ collapsedStatus: !this.state.collapsedStatus });
  };
  componentDidMount = () => {
    this.getRootProduct();
    this.getServiceRequest();
    // window.addEventListener('click', event => {
    //   var box = document.getElementById('hc-leftNavigation');
    //   var toggelBtn = document.getElementById('hc-toggelButton');

    //   if (
    //     event.target !== box &&
    //     event.target.parentNode !== box &&
    //     (box && !box.contains(event.target.parentNode)) &&
    //     event.target !== toggelBtn &&
    //     event.target.parentNode !== toggelBtn &&
    //     !this.state.collapsedStatus
    //   ) {
    //     this.setState({ collapsedStatus: true });
    //   }
    //   const userDetails = localStorage.getItem('username');
    //   if (userDetails) {
    //     this.setState({ userDetails });
    //   }
    // });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <PageTemplate
        header={
          <Header
            onLeftNavCollapse={this.onLeftNavCollapse}
            collapsedStatus={this.state.collapsedStatus}
            userDetails={this.state.userDetails}
          />
        }
        footer={<Footer links={links} />}
        leftNavigation={
          <LeftNavigation
            collapsedStatus={this.state.collapsedStatus}
            breakPoint={1024}
            containerWidth={250}
            responsive={true}
          >
            {this.props.rootProductList.children && (
              <>
                <div
                  style={{
                    color: "#FFF",
                    height: "40px",
                    lineHeight: "40px",
                    padding: "0px 10px",
                    borderBottom: "1px solid #FFF",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}
                >
                  Products
                </div>
                <TreeView treeData={this.props.rootProductList.children} />
              </>
            )}
            <Link to="/page/all-service-request/">
              <div
                style={{
                  color: "#FFF",
                  height: "40px",
                  lineHeight: "40px",
                  padding: "0px 10px",
                  borderTop: "1px solid #FFF",
                  borderBottom: "1px solid #FFF",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                Service Requests
              </div>
            </Link>
            <Link to="/page/forum/">
              <div
                style={{
                  color: "#FFF",
                  height: "40px",
                  lineHeight: "40px",
                  padding: "0px 10px",
                  borderTop: "1px solid #FFF",
                  borderBottom: "1px solid #FFF",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                Forum
              </div>
            </Link>
            <div style={{ height: "20px" }} />
          </LeftNavigation>
        }
      >
        <Route exact path={this.props.match.path} component={HomePage} />
        <Route path={`${this.props.match.path}/home`} component={HomePage} />
        <Route
          path={`${this.props.match.path}/item-details/:id`}
          component={ItemDetails}
        />
        <Route
          path={`${this.props.match.path}/all-items/:id`}
          component={AllItemList}
        />
        <Route
          path={`${this.props.match.path}/all-service-request/`}
          component={AllServiceRequest}
        />
        <Route
          path={`${this.props.match.path}/service-request/:id`}
          component={ServiceRequest}
        />
        <Route
          path={`${this.props.match.path}/forum`}
          component={ForumComponent}
        />
        <Route
          path={`${this.props.match.path}/new-thread`}
          component={NewThread}
        />
        <Route
          path={`${this.props.match.path}/thread/:id`}
          component={ThreadDiscussion}
        />
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    rootProductList: state.rootProductList.rootProductList,
    serviceRequestList: state.serviceRequestList.serviceRequestList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRootProducts: value => {
      dispatch({ type: actionTypes.ROOT_PRODUCT_LIST, products: value });
    },
    setServiceRequest: value => {
      dispatch({ type: actionTypes.SERVICE_REQUEST_LIST, services: value });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pages);
