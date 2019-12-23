import React, { Component } from "react";
import { ItemList, Block } from "react-atomic-comp";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actionTypes from "../../../actions";
import {
  getAllProducts,
  getExpiredProducts,
  getProductsExpiringSoon
} from "../../../common/productHelper";

const StyledBlock = styled(Block)`
  height: 40px;
  background: #e6e6e6;
  line-height: 40px;
  padding: 0 5px;
  text-align: center;
  font-weight: bold;
`;
class AllItemList extends Component {
  state = { myProducts: [] };

  componentDidMount() {
    if (
      this.props.rootProductList.children &&
      this.props.rootProductList.children.length
    ) {
      this.getProducts(this.props);
    }
  }
  componentWillReceiveProps = nextProps => {
    this.getProducts(nextProps);
  };

  getProducts(nextProps) {
    if (this.props.match.params.id === "all") {
      const allProducts = getAllProducts(nextProps.rootProductList.children);
      this.setState({ myProducts: allProducts });
    }
    if (this.props.match.params.id === "expired") {
      const expiredProducts = getExpiredProducts(
        nextProps.rootProductList.children
      );
      this.setState({ myProducts: expiredProducts });
    }
    if (this.props.match.params.id === "expiring") {
      const soonExpiringProducts = getProductsExpiringSoon(
        nextProps.rootProductList.children,
        150
      );
      this.setState({ myProducts: soonExpiringProducts });
    }
  }
  getItemDetails = details => {
    this.props.setCurrentProductDetails(details);
  };

  render() {
    const { myProducts } = this.state;
    return (
      <>
        {this.props.match.params.id === "all" && (
          <StyledBlock>All Products</StyledBlock>
        )}
        {this.props.match.params.id === "expiring" && (
          <StyledBlock>Products Warranty Expiring Soon</StyledBlock>
        )}
        {this.props.match.params.id === "expired" && (
          <StyledBlock>Products Warranty Expired</StyledBlock>
        )}
        <ItemList itemList={myProducts} itemClick={this.getItemDetails} />
      </>
    );
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
    setCurrentProductDetails: value => {
      dispatch({
        type: actionTypes.CURRENT_PRODUCT_DETAILS,
        productDetails: value
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllItemList);
