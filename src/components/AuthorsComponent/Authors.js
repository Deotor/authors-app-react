import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAuthors, searchAuthors } from "../../actions/authorsActions";
import First from "../../assets/medals/1st.svg";
import Second from "../../assets/medals/2nd.svg";
import Third from "../../assets/medals/3rd.svg";
import "./Authors.css";
import Colors from "./Colors";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: "",
      page: 1,
      sortBy: "pageviews-descending"
    };
  }

  componentDidMount() {
    this.props.fetchAuthors(this.state.page, this.state.sortBy);
  }

  componentWillReceiveProps(nextProps) {}

  searchOnChange = e => {
    if (e.target.value === "") {
      this.setState({ [e.target.name]: e.target.value });
      this.props.fetchAuthors(this.state.page, this.state.sortBy);
    } else {
      this.setState({ [e.target.name]: e.target.value }, () => {
        this.setState({ page: 1 });
        if (this.state.searched)
          this.props.searchAuthors(this.state.searched, this.state.sortBy);
      });
    }
  };

  sortByOnChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.searched === "")
        this.props.fetchAuthors(this.state.page, this.state.sortBy);
      else this.props.searchAuthors(this.state.searched, this.state.sortBy);
    });
  };

  pageOnClick = e => {
    if (e.target.className.search("next") + 1) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.props.fetchAuthors(this.state.page, this.state.sortBy);
      });
    } else {
      this.setState({ page: this.state.page - 1 }, () => {
        this.props.fetchAuthors(this.state.page, this.state.sortBy);
      });
    }
  };

  render() {
    const medals = [First, Second, Third];
    const authors = this.props.authors.map((author, index) => (
      <div className="author" key={index}>
        <div className="author-number">
          {this.state.page === 1 ? index + 1 : index + this.state.page * 10 + 1}
        </div>
        <div className="author-icon" style={{ background: Colors[index] }}>
          {author.name.charAt(0)}
        </div>
        <div className="author-title">
          {author.name}
          <div className="author-publications">
            {author.count_pub + " публ."}
          </div>
        </div>
        <div className="author-medal">
          {this.props.topAuthors.map((topAuthor, index) => {
            if (topAuthor.pageviews === author.pageviews)
              return (
                <img
                  alt={index + 1 + " place"}
                  src={medals[index]}
                  key={index}
                />
              );
            else return false;
          })}
        </div>
        <div className="author-pageviews">{author.pageviews}</div>
      </div>
    ));
    const search = (
      <div className="authors-search">
        <div className="authors-search-box">
          <span className="icon">
            <i className="fa fa-search" />
          </span>
          <input
            value={this.state.searched}
            name="searched"
            onChange={this.searchOnChange}
            type="search"
            id="search"
            placeholder="Поиск авторов по имени"
          />
        </div>
      </div>
    );
    const sortOptionsArr = [
      { id: 1, value: "name-ascending", name: "по имени(а-я)" },
      { id: 2, value: "name-descending", name: "по имени(я-а)" },
      { id: 3, value: "pageviews-ascending", name: "по показам(возростание)" },
      { id: 4, value: "pageviews-descending", name: "по показам(убывание)" }
    ];
    const sortOptions = sortOptionsArr.map(option => (
      <option key={option.id} value={option.value}>
        {option.name}
      </option>
    ));
    const sortBy = (
      <div className="form-group authors-sort">
        <select
          className="form-control"
          value={this.state.sortBy}
          onChange={this.sortByOnChange}
          name="sortBy"
        >
          {sortOptions}
        </select>
      </div>
    );
    const pagination = (
      <div className="authors-pagination">
        {this.state.page > 1 ? (
          <i onClick={this.pageOnClick} className="fas fa-chevron-left prev" />
        ) : (
          ""
        )}
        <span>
          {this.state.page === 1
            ? this.props.countOfAuthors > 0
              ? 1
              : ""
            : this.state.page * 10}
        </span>
        <span>{this.props.countOfAuthors > 0 ? " - " : ""}</span>
        <span>
          {this.state.page >= 1 && this.state.page < this.props.countOfPages
            ? (this.state.page + 1) * 10
            : ""}
        </span>
        <span>
          {this.state.page === this.props.countOfPages
            ? this.props.countOfAuthors
            : ""}
        </span>
        {this.state.page < this.props.countOfPages ? (
          <i onClick={this.pageOnClick} className="fas fa-chevron-right next" />
        ) : (
          ""
        )}
      </div>
    );
    return (
      <div className="authors-app">
        <div className="authors">
          {search}
          {sortBy}
          {authors}
        </div>
        {pagination}
      </div>
    );
  }
}

Authors.propTypes = {
  fetchAuthors: PropTypes.func.isRequired,
  searchAuthors: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  countOfPages: PropTypes.number.isRequired,
  countOfAuthors: PropTypes.number.isRequired,
  topAuthors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  authors: state.authors.items,
  countOfPages: state.authors.countOfPages,
  topAuthors: state.authors.topAuthors,
  countOfAuthors: state.authors.countOfAuthors
});

export default connect(
  mapStateToProps,
  { fetchAuthors, searchAuthors }
)(Authors);
