import React, { Component } from "react";
import "./styles.scss";
import {
  getThreadById,
  saveComment,
  getAllCommentsByThreadId,
  getCommentById
} from "../../../common/discussionThreadHelper";
import { Block } from "react-atomic-comp";
import styled from "styled-components";
import CommentBox from "./CommentBox";

const StyledBlock = styled(Block)`
  height: 40px;
  border-bottom: 1px solid #ffbd2d;
  background-color: #fff;
  color: #000;
  margin: auto;
  margin-bottom: 10px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  font-weight: bold;
`;

class ThreadDiscussion extends Component {
  state = {
    threadDetails: {},
    reply: "",
    submitted: false,
    showReplyBox: false,
    replyToComment: { status: false, index: 0 },
    discussionComments: [],
    commentsToShow: [],
    userId: ""
  };

  componentDidMount = () => {
    const userId = localStorage.getItem("username");
    this.setState({ userId });
    getThreadById(this.props.match.params.id)
      .then(doc => {
        if (doc.exists) {
          this.setState({ threadDetails: doc.data() });
          getAllCommentsByThreadId(doc.data().id).onSnapshot(
            querySnapshot => {
              let commentsToShow = [];
              querySnapshot.forEach(doc => {
                let comment = doc.data();
                commentsToShow.push(comment);
              });
              this.sortCommentsArray(commentsToShow);
            },
            error => {
              console.log("error------>", error);
            }
          );
        }
      })
      .catch(error => {
        console.log("error------", error.message);
      });
  };

  sortCommentsArray = commentsToShow => {
    let comments = commentsToShow.sort(
      (a, b) =>
        new Date(a.createddate.seconds) - new Date(b.createddate.seconds)
    );
    console.log("comments------------->>", comments);
    this.setState({
      commentsToShow: comments
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLike = index => {
    let tempAllComments = JSON.parse(JSON.stringify(this.state.commentsToShow));
    let comment = tempAllComments[index];
    if (this.state.userId) {
      if (comment.likedBy.indexOf(this.state.userId) === -1) {
        comment.likedBy.push(this.state.userId);
        console.log("modified comment", comment);
        saveComment(comment);
      } else {
        comment.likedBy.pop(this.state.userId);
        console.log("modified comment", comment);
        saveComment(comment);
      }
    }
  };

  saveDetails = e => {
    e.preventDefault();
    const { reply, userId } = this.state;
    this.setState({ submitted: true, showReplyBox: false });
    if (reply !== "" && userId) {
      const { threadDetails } = this.state;
      let commentDetails = { comment: reply };
      commentDetails.createddate = { seconds: new Date().getTime() / 1000 };
      commentDetails.userId = userId;
      commentDetails.repliedToComment = {};
      commentDetails.commentId = Math.random()
        .toString(36)
        .replace("0.", "");
      commentDetails.threadId = threadDetails.id;
      commentDetails.likedBy = [];
      console.log("save new comment", commentDetails);
      saveComment(commentDetails)
        .then(() => {
          this.setState({ submitted: false, reply: "" });
        })
        .catch(error => {
          console.log("error message", error.message);
          this.setState({ submitted: false, reply: "" });
        });
    }
  };

  render() {
    const {
      threadDetails,
      reply,
      submitted,
      showReplyBox,
      commentsToShow,
      replyToComment,
      userId
    } = this.state;
    return (
      <div className="discussion-container col-12">
        <StyledBlock className="col-12">
          <span
            style={{
              fontSize: "30px",
              float: "left",
              marginLeft: "10px",
              cursor: "pointer"
            }}
            onClick={() => {
              this.props.history.push("/page/forum");
            }}
          >
            <i className="fa fa-chevron-circle-left" aria-hidden="true" />
          </span>{" "}
          Discussion Thread
        </StyledBlock>
        {threadDetails.title && (
          <div
            className="col-12 col-md-10 col-lg-10 col-xl-10"
            style={{ margin: "auto" }}
          >
            <div className="discussion-title">
              <div className="thread-title--style">
                <span>[{threadDetails.category.toUpperCase()}] </span>
                {threadDetails.title}
              </div>
              <div style={{ padding: "8px" }}>
                By {threadDetails.userId}, on{" "}
                {new Date(
                  threadDetails.createddate.seconds * 1000
                ).toDateString()}
                <span>
                  ,{" "}
                  {new Date(
                    threadDetails.createddate.seconds * 1000
                  ).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="discussion-desc">
              <div className="thread-desc--style">{threadDetails.desc}</div>
            </div>{" "}
            {!showReplyBox && (
              <button
                className="reply-button"
                onClick={() => {
                  this.setState({ showReplyBox: true });
                }}
              >
                <i
                  className="fa fa-reply"
                  aria-hidden="true"
                  style={{ paddingRight: "6px" }}
                />{" "}
                Post Reply
              </button>
            )}
            {showReplyBox && (
              <form>
                {" "}
                <div>
                  <label className="label-color reply-label" htmlFor="reply">
                    Message
                  </label>
                  <textarea
                    className="form-control comment-replybox"
                    rows="2"
                    name="reply"
                    value={reply}
                    onChange={this.handleChange}
                    id="reply"
                    autoFocus
                  />
                  {submitted && !reply && (
                    <div className="help-block">Cannot post an empty reply</div>
                  )}
                </div>
                <button
                  className="reply-button submit-reply"
                  onClick={() => {
                    this.setState({ showReplyBox: false });
                  }}
                  style={{ float: "left" }}
                >
                  Cancel
                </button>
                <button
                  className="reply-button submit-reply"
                  onClick={e => this.saveDetails(e)}
                >
                  <i
                    className="fa fa-share-square-o"
                    aria-hidden="true"
                    style={{ paddingRight: "6px" }}
                  />{" "}
                  Submit
                </button>
              </form>
            )}
            {commentsToShow &&
              commentsToShow.length !== 0 &&
              commentsToShow.map((res, index) => {
                return (
                  <div
                    className="discussion-title response-container"
                    key={index}
                  >
                    <div
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #d8d8d8"
                      }}
                    >
                      <span
                        style={{
                          paddingRight: "10px",
                          borderRight: "1px solid #ccc"
                        }}
                      >
                        {res.userId}
                      </span>
                      {res.createddate && res.createddate.seconds && (
                        <>
                          <span
                            style={{
                              paddingLeft: "10px",
                              fontSize: "12px"
                            }}
                          >
                            {new Date(
                              res.createddate.seconds * 1000
                            ).toDateString()}
                          </span>
                          <span
                            style={{
                              fontSize: "12px"
                            }}
                          >
                            ,{" "}
                            {new Date(
                              res.createddate.seconds * 1000
                            ).toLocaleTimeString()}
                          </span>
                        </>
                      )}
                      <span className="like-button">
                        {res.likedBy && res.likedBy.indexOf(userId) === -1 && (
                          <>
                            <i
                              className="fa fa-heart-o"
                              aria-hidden="true"
                              onClick={() => {
                                this.handleLike(index);
                              }}
                            />
                            <span
                              style={{ fontSize: "14px", paddingLeft: "4px" }}
                            >
                              {res.likedBy.length}
                            </span>
                          </>
                        )}
                        {res.likedBy && res.likedBy.indexOf(userId) >= 0 && (
                          <>
                            {" "}
                            <i
                              className="fa fa-heart"
                              aria-hidden="true"
                              style={{ color: "red" }}
                              onClick={() => {
                                this.handleLike(index);
                              }}
                            />
                            <span
                              style={{ fontSize: "14px", paddingLeft: "4px" }}
                            >
                              {res.likedBy.length}
                            </span>
                          </>
                        )}
                      </span>
                    </div>{" "}
                    <div
                      className="thread-title--style"
                      style={{ fontWeight: "normal" }}
                    >
                      {res.repliedToComment && res.repliedToComment.userId && (
                        <div className="replied-to-box">
                          <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                            Quote:
                          </p>
                          <span style={{ fontSize: "12px" }}>
                            Originally posted by{" "}
                            <strong>{res.repliedToComment.userId}</strong>
                          </span>
                          <p style={{ marginTop: "10px" }}>
                            {res.repliedToComment.comment}
                          </p>
                        </div>
                      )}
                      {res.comment}
                    </div>
                    <div className="comment-reply-btn">
                      {!replyToComment.status === true && (
                        <button
                          className="reply-button "
                          style={{ margin: "0" }}
                          onClick={() => {
                            this.setState({
                              replyToComment: { status: true, index }
                            });
                          }}
                        >
                          {" "}
                          <i
                            className="fa fa-reply"
                            aria-hidden="true"
                            style={{ paddingRight: "6px" }}
                          />{" "}
                          Reply
                        </button>
                      )}
                      {replyToComment.status === true &&
                        replyToComment.index === index && (
                          <CommentBox
                            commentDetails={res}
                            onReply={() => {
                              this.setState({ replyToComment: false, index });
                            }}
                          />
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}

export default ThreadDiscussion;
