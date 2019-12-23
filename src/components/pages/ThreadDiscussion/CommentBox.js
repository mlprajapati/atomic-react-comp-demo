import React, { Component } from 'react';
import { saveComment } from '../../../common/discussionThreadHelper';
import './styles.scss';

class CommentBox extends Component {
  state = { submitted: false, reply: '', userId: '' };

  componentDidMount = () => {
    const userId = localStorage.getItem('username');
    this.setState({ userId });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveDetails = e => {
    e.preventDefault();
    const { reply, userId } = this.state;
    this.setState({ submitted: true });
    if (reply !== '' && userId && this.props.commentDetails) {
      let commentDetails = { comment: reply };
      commentDetails.createddate = { seconds: new Date().getTime() / 1000 };
      commentDetails.userId = userId;
      commentDetails.repliedToComment = this.props.commentDetails;
      commentDetails.commentId = Math.random()
        .toString(36)
        .replace('0.', '');
      commentDetails.threadId = this.props.commentDetails.threadId;
      commentDetails.likedBy = [];
      saveComment(commentDetails)
        .then(() => {
          this.setState({ submitted: false, reply: '' });
          console.log('reply posted');
        })
        .catch(error => {
          console.log('error message', error.message);
          this.setState({ submitted: false, reply: '' });
        });
      this.props.onReply();
    }
  };

  render() {
    const { submitted, reply } = this.state;
    return (
      <form>
        {' '}
        <div>
          <label
            className="label-color reply-label"
            htmlFor="reply"
            style={{ float: 'left', marginTop: '5px' }}
          >
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
            this.props.onReply();
          }}
          style={{ float: 'left' }}
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
            style={{ paddingRight: '6px' }}
          />{' '}
          Reply
        </button>
      </form>
    );
  }
}

export default CommentBox;
