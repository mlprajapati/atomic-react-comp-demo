import React, { Component } from "react";
import { Block, SelectSearch } from "react-atomic-comp";
import styled from "styled-components";
import "./styles.scss";
import {
  saveNewThread,
  getAllDiscussionCategories
} from "../../../common/discussionThreadHelper";

const StyledBlock = styled(Block)`
  height: 40px;
  border-bottom: 1px solid #ffbd2d;
  background-color: #454545;
  color: #fff;

  margin: auto;
  line-height: 40px;
  padding: 0 5px;
  text-align: center;
  font-weight: bold;
`;

class ServiceRequest extends Component {
  state = {
    category: "",
    id: "",
    title: "",
    desc: "",
    createddate: "",
    closeddate: "",
    response: "",
    currentstatus: "",
    submitted: false,
    errorMessage: "",
    categoryCollection: []
  };

  componentDidMount = () => {
    getAllDiscussionCategories().onSnapshot(querySnapshot => {
      let categories = [];
      querySnapshot.forEach(doc => {
        categories.push(doc.data());
      });
      this.setState({ categoryCollection: categories[0].categories });
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDropdownSelection = (option, property) => {
    this.setState({ [property]: option });
  };

  saveDetails = e => {
    e.preventDefault();
    const { category, desc, title } = this.state;
    const userId = localStorage.getItem("username");
    this.setState({ submitted: true });
    if (category !== "" && desc !== "" && title !== "" && userId) {
      const threadDetails = { category, desc, title };
      threadDetails.createddate = { seconds: new Date().getTime() / 1000 };
      threadDetails.closeddate = "";
      threadDetails.response = [];
      threadDetails.userId = userId;
      threadDetails.id = Math.random()
        .toString(36)
        .replace("0.", "");
      console.log("threadDetails", threadDetails);
      saveNewThread(threadDetails).then(() => {
        this.props.history.push(`/page/forum/`);
      });
    }
  };

  render() {
    const { category, title, desc, submitted, categoryCollection } = this.state;
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: "#454545", height: "100vh" }}
      >
        <div className="row">
          <div className="col-12">
            <StyledBlock className="col-12 col-md-8 col-lg-8 col-xl-8">
              Start a discussion
            </StyledBlock>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 center-form">
          <div className="panel panel-default">
            <div
              className="card col-lg-11 col-xl-11 panel-body profile-container--style"
              style={{ margin: "auto" }}
            >
              <form>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="product">
                      Category
                    </label>
                    <div
                      className="form-group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        height: "40px"
                      }}
                    >
                      {categoryCollection && categoryCollection.length !== 0 && (
                        <SelectSearch
                          name="category"
                          properties={{
                            options: categoryCollection,
                            selectedValue: category,
                            optionDisplayNameKey: "name",
                            optionValueKey: "name"
                          }}
                          onOptionSelect={e =>
                            this.handleDropdownSelection(e, "category")
                          }
                        />
                      )}
                      {submitted && !title && (
                        <div className="help-block">
                          Discussion Title is required
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <label className="label-color" htmlFor="type">
                        Discussion Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !title && (
                        <div className="help-block">
                          Discussion Title is required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="label-color" htmlFor="desc">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="desc"
                    value={desc}
                    onChange={this.handleChange}
                    id="desc"
                  />
                  {submitted && !desc && (
                    <div className="help-block">Description is required</div>
                  )}
                </div>
                <div className="row padding-top-15">
                  <div
                    className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                    style={{ margin: "5px auto" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        this.props.history.push(`/page/forum`);
                      }}
                      className="btn btn-default btn-block btn-color"
                    >
                      CANCEL
                    </button>
                  </div>
                  <div
                    className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                    style={{ margin: "5px auto" }}
                  >
                    <button
                      type="button"
                      onClick={e => this.saveDetails(e)}
                      className="btn btn-default btn-block btn-color"
                    >
                      CREATE THREAD
                    </button>
                  </div>
                </div>
                <div className="form-group padding-top-15" />
                <div className="col-12">&nbsp;</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceRequest;
