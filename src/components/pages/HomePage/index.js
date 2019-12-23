import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CompanyBanner } from "../../../components";
import * as actionTypes from "../../../actions";
import { TrayCarousel, ItemBox } from "react-atomic-comp";
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getExpiredProducts,
  getProductsExpiringSoon
} from "../../../common/productHelper";
import Axios from "axios";

const HeadingWrapper = styled.div`
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  background: #fff;
  margin: 10px 0px;
  padding: 0px 10px;
  font-weight: bold;
`;
const ProductSection = styled.section`
  padding: 5px;
`;

class HomePage extends Component {
  state = {
    myProducts: [],
    expiredProducts: [],
    productsExpiringSoon: [],
    productList: []
  };

  UNSAFE_componentWillReceiveProps = async () => {
    const { rootProductList } = this.props;
    const productList = await this.getLastChild(rootProductList, []);
    await this.setState({ productList });
  };

  getLastChild = async (product, productList) => {
    if (product.children && product.children.length > 0) {
      product.children.forEach(element => {
        if (element.children && element.children.length > 0) {
          this.getLastChild(element, productList);
        } else {
          productList.push(element);
        }
      });
    }
    return productList;
  };
  getItemDetails = details => {
    this.props.setCurrentProductDetails(details);
  };

  componentDidMount() {
    if (
      this.props.rootProductList.children &&
      this.props.rootProductList.children.length
    ) {
      this.getProducts(this.props);
    }
  }
  componentWillReceiveProps = nextProps => {
    if (
      nextProps.rootProductList.children &&
      nextProps.rootProductList.children.length
    ) {
      this.getProducts(nextProps);
    }
  };
  getProducts(nextProps) {
    const allProducts = getAllProducts(nextProps.rootProductList.children);
    this.setState({ myProducts: allProducts });
    // const productByCategory = getProductsByCategory(
    //   nextProps.rootProductList.children,
    //   'Televisions & Home Cinema'
    // );
    // console.log('productByCategory', productByCategory);
    // const productById = getProductById(
    //   nextProps.rootProductList.children,
    //   '007'
    // );
    // console.log('productById', productById);
    const expiredProducts = getExpiredProducts(
      nextProps.rootProductList.children
    );
    this.setState({ expiredProducts });
    const soonExpiringProducts = getProductsExpiringSoon(
      nextProps.rootProductList.children,
      150
    );
    this.setState({ productsExpiringSoon: soonExpiringProducts });
  }

  render() {
    const { myProducts, expiredProducts, productsExpiringSoon } = this.state;
    return (
      <>
        <CompanyBanner />
        <ProductSection>
          <HeadingWrapper>
            My Products
            <Link
              to="/page/all-items/all"
              style={{ float: "right", fontSize: "12px" }}
            >
              (view all)
            </Link>{" "}
          </HeadingWrapper>

          {myProducts && myProducts.length > 0 && (
            <TrayCarousel
              dots={false}
              paging={false}
              scrollOnDevice
              showSides
              autoCycle={myProducts.length > 4 ? true : false}
              breakpoints={[
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    autoCycle: myProducts.length > 3 ? true : false
                  }
                },
                {
                  breakpoint: 500,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    autoCycle: myProducts.length > 1 ? true : false
                  }
                }
              ]}
              sideSize={0.1}
              sidesOpacity={0.5}
              slidesToScroll={1}
              slidesToShow={4}
              onNextClick={() => {
                console.log("onNextClick");
              }}
              onPreviousClick={() => {
                console.log("onPreviousClick");
              }}
            >
              {myProducts.map((product, ind) => {
                return (
                  <div
                    onClick={() =>
                      this.props.history.push(
                        "/page/item-details/" + product.serialNo
                      )
                    }
                    key={ind}
                  >
                    <ItemBox
                      key={ind}
                      details={product}
                      palette="secondary"
                      reverse
                      itemClick={() => {
                        this.getItemDetails(product);
                      }}
                    />
                  </div>
                );
              })}
            </TrayCarousel>
          )}
          {productsExpiringSoon && productsExpiringSoon.length > 0 && (
            <>
              <HeadingWrapper>
                Products Warranty Expiring Soon{" "}
                <Link
                  to="/page/all-items/expiring"
                  style={{ float: "right", fontSize: "12px" }}
                >
                  (view all)
                </Link>{" "}
              </HeadingWrapper>
              <TrayCarousel
                dots={false}
                paging={false}
                scrollOnDevice
                showSides
                autoCycle={productsExpiringSoon.length > 4 ? true : false}
                breakpoints={[
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToScroll: 1,
                      slidesToShow: 1,
                      autoCycle: productsExpiringSoon.length > 1 ? true : false
                    }
                  },
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToScroll: 1,
                      slidesToShow: 3,
                      autoCycle: productsExpiringSoon.length > 3 ? true : false
                    }
                  }
                ]}
                sideSize={0.1}
                sidesOpacity={0.5}
                slidesToScroll={1}
                slidesToShow={4}
                onNextClick={() => {
                  console.log("onNextClick");
                }}
                onPreviousClick={() => {
                  console.log("onPreviousClick");
                }}
              >
                {productsExpiringSoon.map((product, ind) => {
                  return (
                    <div
                      onClick={() =>
                        this.props.history.push(
                          "/page/item-details/" + product.serialNo
                        )
                      }
                      key={ind}
                    >
                      <ItemBox
                        key={ind}
                        details={product}
                        palette="secondary"
                        reverse
                        itemClick={() => {
                          this.getItemDetails(product);
                        }}
                      />
                    </div>
                  );
                })}
              </TrayCarousel>
            </>
          )}
          {expiredProducts && expiredProducts.length > 0 && (
            <>
              <HeadingWrapper>
                Products Warranty Expired{" "}
                <Link
                  to="/page/all-items/expired"
                  style={{ float: "right", fontSize: "12px" }}
                >
                  (view all)
                </Link>{" "}
              </HeadingWrapper>
              <TrayCarousel
                dots={false}
                paging={false}
                scrollOnDevice
                showSides
                autoCycle={expiredProducts.length > 4 ? true : false}
                breakpoints={[
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToScroll: 1,
                      slidesToShow: 1,
                      autoCycle: expiredProducts.length > 2 ? true : false
                    }
                  },
                  {
                    breakpoint: 1000,
                    settings: {
                      slidesToScroll: 1,
                      slidesToShow: 3,
                      autoCycle: expiredProducts.length > 3 ? true : false
                    }
                  }
                ]}
                sideSize={0.1}
                sidesOpacity={0.5}
                slidesToScroll={1}
                slidesToShow={4}
                onNextClick={() => {
                  console.log("onNextClick");
                }}
                onPreviousClick={() => {
                  console.log("onPreviousClick");
                }}
              >
                {expiredProducts.map((product, ind) => {
                  return (
                    <div
                      onClick={() =>
                        this.props.history.push(
                          "/page/item-details/" + product.serialNo
                        )
                      }
                      key={ind}
                    >
                      <ItemBox
                        key={ind}
                        details={product}
                        palette="secondary"
                        reverse
                        itemClick={() => {
                          this.getItemDetails(product);
                        }}
                      />
                    </div>
                  );
                })}
              </TrayCarousel>
            </>
          )}
        </ProductSection>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
