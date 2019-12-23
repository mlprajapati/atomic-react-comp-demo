import React, { Component } from "react";
import { Block, CardBox, PSSTable } from "react-atomic-comp";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actionTypes from "../../../actions";
import { getAllServiceRequestFromDb } from "../../../common/serviceRequestHelper";
import { ButtonGroup, Button } from "react-bootstrap";
import "./styles.scss";

const col = [
  "product",
  "type",
  "desc",
  "createddate",
  "closeddate",
  "response",
  "currentstatus"
];
const tHead = [
  "Product ID",
  "Service Type",
  "Query Desc",
  "Created Date",
  "Close Date",
  "Service Response",
  "Status"
];
const StyledBlock = styled(Block)`
  height: 40px;
  background: #e6e6e6;
  line-height: 40px;
  padding: 0 5px;
  text-align: center;
  font-weight: bold;
`;
const CardBoxStyled = styled(CardBox)`
  .card-body {
    padding: 0px;
  }
`;

const StyledTable = styled(PSSTable)`
  th {
    color: #000 !important;
    border-bottom: #000 !important;
  }
`;
class AllServiceRequest extends Component {
  state = {
    myServices: [],
    allServiceRequest: [],
    currentFilter: "all"
  };

  componentDidMount() {
    const userId = localStorage.getItem("username");
    if (userId) {
      getAllServiceRequestFromDb(userId).onSnapshot(querySnapshot => {
        let feedbackData = [];
        querySnapshot.forEach(doc => {
          console.log("------------", doc.data());
          let tempData = doc.data();
          tempData.createddate = new Date(
            tempData.createddate.seconds * 1000
          ).toDateString();
          if (tempData.closeddate !== "") {
            tempData.closeddate = new Date(
              tempData.closeddate.seconds * 1000
            ).toDateString();
          }
          feedbackData.push(tempData);
        });
        this.setState({
          allServiceRequest: feedbackData,
          currentFilter: "all"
        });
        this.setState({ myServices: feedbackData });
      });
    }
  }

  getServiceRequest(filterType) {
    if (filterType === "all") {
      this.setState({ currentFilter: "all" });
      this.setState({ myServices: this.state.allServiceRequest });
    } else if (filterType === "pending") {
      this.setState({ currentFilter: "pending" });
      const { allServiceRequest } = this.state;
      const result = allServiceRequest.filter(
        request => request.currentstatus === "pending"
      );
      if (result.length) {
        this.setState({ myServices: result });
      }
    } else if (filterType === "closed") {
      this.setState({ currentFilter: "closed" });
      const { allServiceRequest } = this.state;
      const result = allServiceRequest.filter(
        request => request.currentstatus === "closed"
      );
      if (result.length) {
        this.setState({ myServices: result });
      }
    }
  }
  getItemDetails = details => {
    this.props.setCurrentServiceRequestDetails(details);
  };

  render() {
    const { myServices, currentFilter } = this.state;
    console.log("myServices", myServices);
    return (
      <>
        <StyledBlock>Service Requests</StyledBlock>

        {myServices.length !== 0 && (
          <CardBoxStyled style={{ margin: "10px 0px", padding: "0 5px" }}>
            <ButtonGroup
              aria-label="Service Requests"
              className="btn-group--position"
            >
              <Button
                variant="secondary"
                active={currentFilter === "all"}
                onClick={() => {
                  this.getServiceRequest("all");
                }}
              >
                All
              </Button>
              <Button
                variant="secondary"
                active={currentFilter === "pending"}
                onClick={() => {
                  this.getServiceRequest("pending");
                }}
              >
                Pending
              </Button>
              <Button
                variant="secondary"
                active={currentFilter === "closed"}
                onClick={() => {
                  this.getServiceRequest("closed");
                }}
              >
                Closed
              </Button>
            </ButtonGroup>

            <StyledTable
              tblData={myServices}
              tHead={tHead}
              dKey={col}
              search={true}
              defaultCSS={true}
              stripedRow={true}
              stripColor="#CCC"
              cellBorder="1px solid #000"
              showPerPageOption={true}
              showTotal={false}
              nextText=">"
              prevText="<"
              sortable={true}
              paginationByStep={false}
              step={2}
              defaultRowsPerPage={10}
            />
          </CardBoxStyled>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    serviceRequestList: state.serviceRequestList.serviceRequestList,
    currentServiceRequestDetails:
      state.serviceRequestList.currentServiceRequestDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCurrentServiceRequestDetails: value => {
      dispatch({
        type: actionTypes.CURRENT_SERVICE_REQUEST_DETAILS,
        serviceRequestDetails: value
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllServiceRequest);
