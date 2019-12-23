import React, { Component } from "react";
import { Block } from "react-atomic-comp";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { getAllDiscussionThreadsFromDb } from "../../../common/discussionThreadHelper";
import "./styles.scss";

const StyledDiv = styled.div`
  height: 40px;
  color: #fff;
  margin: auto;
  font-size: 20px;
  border-bottom: 1px solid #ffbd2d;
  line-height: 40px;
  padding: 0 5px;
  text-align: center;
  font-weight: bold;
`;

const StyledBlock = styled(Block)`
  position: relative;
  background-color: #585858;
  min-height: 100px;
  margin-bottom: 20px;
  padding: 10px 20px 20px;
  color: #f9f9f9;
  margin: 20px auto;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;

const AddButton = styled(Button)`
  position: fixed;
  height: 80px;
  width: 80px;
  right: 40px;
  bottom: 70px;
  border-radius: 50%;
  font-size: 25px;
  z-index: 9999;
  cursor: pointer;
  -webkit-box-shadow: -1px 0px 28px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 28px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 0px 28px 0px rgba(0, 0, 0, 0.75);
`;
class ForumComponent extends Component {
  state = { discussionThreads: [] };

  componentDidMount = () => {
    getAllDiscussionThreadsFromDb().onSnapshot(querySnapshot => {
      let discussionThreads = [];
      querySnapshot.forEach(doc => {
        discussionThreads.push(doc.data());
      });
      this.setState({ discussionThreads });
      console.log("discussionThreads", discussionThreads);
    });
  };
  render() {
    return (
      <div className="forum-container">
        <Link to="/page/new-thread">
          <AddButton variant="secondary" className="add-button">
            <i className="fa fa-plus" aria-hidden="true" />
          </AddButton>
        </Link>

        <StyledDiv className="col-12 col-md-8 col-lg-8 col-xl-8">
          Welcome To The Forum
        </StyledDiv>
        <StyledBlock className="col-12 col-md-8 col-lg-8 col-xl-8">
          <div>GENERAL DISCUSSION</div>
          {this.state.discussionThreads.length !== 0 &&
            this.state.discussionThreads.map((thread, index) => {
              return (
                <div className="thread-list" key={index}>
                  <div
                    style={{
                      position: "relative",
                      float: "left",
                      lineHeight: "70px"
                    }}
                  >
                    <i
                      className="fa fa-file-text-o"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    />{" "}
                  </div>
                  <div
                    className="thread-details"
                    onClick={() => {
                      this.props.history.push(`/page/thread/${thread.id}`);
                    }}
                  >
                    <div>
                      <span>[{thread.category.toUpperCase()}] </span>
                      {thread.title}
                    </div>
                    <div style={{ color: "#fff" }}>
                      Created Date:{" "}
                      {new Date(
                        thread.createddate.seconds * 1000
                      ).toDateString()}{" "}
                    </div>
                  </div>
                </div>
              );
            })}
        </StyledBlock>
      </div>
    );
  }
}

export default ForumComponent;
