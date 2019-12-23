import * as actionTypes from "../actions";

const initialState = {
  rootProductList: [],
  currentProductDetails: {},
  serviceRequestList: [],
  currentServiceRequestDetails: {}
};
export const rootProductListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ROOT_PRODUCT_LIST:
      console.log("Product Action Type ", action.type, action.products);
      return {
        ...state,
        rootProductList: action.products
      };

    case actionTypes.CURRENT_PRODUCT_DETAILS:
      // console.log('Product Action Type ', action.type, action.productDetails);
      return {
        ...state,
        currentProductDetails: action.productDetails
      };

    default:
      return state;
  }
};
export const serviceRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SERVICE_REQUEST_LIST:
      console.log("Service Request Action Type ", action.type, action.services);
      return {
        ...state,
        serviceRequestList: action.services
      };

    case actionTypes.CURRENT_SERVICE_REQUEST_DETAILS:
      // console.log('Product Action Type ', action.type, action.productDetails);
      return {
        ...state,
        currentServiceRequestDetails: action.serviceRequestDetails
      };

    default:
      return state;
  }
};
