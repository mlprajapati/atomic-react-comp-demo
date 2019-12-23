import React, { Component } from "react";
// import styled from "styled-components";
import styled from "styled-components";
import { Product } from "../../../components";
import { connect } from "react-redux";
import * as actionTypes from "../../../actions";
import { getProductById } from "../../../common/productHelper";
import { palette, size } from "styled-theme";
const ItemWrapper = styled.div`
  width: calc(100% - 10px);
  height: auto;
  background: ${palette("white", 0)};
  overflow: hidden;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 ${palette("grayscale", 9)},
    0 6px 20px 0 ${palette("grayscale", 9)};
`;
const productTabs = {
  tabs: {
    tabs: [
      {
        title: "SPECIFICATIONS",
        content: {
          heading: "Specification",
          subheading: "",
          content: {}
        }
      },
      {
        title: "INSURANCE",
        content: {
          heading: "Insurance Details",
          subheading: "",
          content: {}
        }
      },
      {
        title: "FEATURES",
        content: {
          heading: "Features",
          subheading: "",
          content: []
        }
      }
    ],
    defaultActiveKey: "SPECIFICATIONS"
  }
};

class ItemDetails extends Component {
  state = { productTabs: productTabs, productDetails: {} };
  render() {
    return (
      <ItemWrapper>
        <Product
          productTabs={this.state.productTabs}
          productDetails={this.state.productDetails}
        />
      </ItemWrapper>
    );
  }

  componentDidMount() {
    this.props.rootProductList.children &&
      this.renderItemDetailTabs(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.renderItemDetailTabs(nextProps);
  }
  renderItemDetailTabs(props) {
    const serialNo = props.match.params.id;
    const currentProductDetails = getProductById(
      props.rootProductList.children,
      serialNo
    )[0];
    productTabs.tabs.tabs.forEach(item => {
      item.content.content = currentProductDetails[item.title.toLowerCase()];
    });
    this.setState({
      productTabs: productTabs,
      productDetails: currentProductDetails
    });
  }
}

const mapStateToProps = state => {
  return {
    rootProductList: state.rootProductList.rootProductList,
    currentProductDetails: state.rootProductList.currentProductDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setRootProducts: value => {
      dispatch({ type: actionTypes.ROOT_PRODUCT_LIST, products: value });
    },
    setCurrentProductDetails: value => {
      dispatch({
        type: actionTypes.CURRENT_PRODUCT_DETAILS,
        productDetails: value
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails);
