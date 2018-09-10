import React, { Component } from "react";
import API from "../utils/API";
import Container from "../Container";
import Navbar from "../Navbar";
import SearchResults from "../SearchResults";
//import Alert from "../components/Alert";
import "./Search.css";
import queryString from "query-string";


class Search extends Component {
  state = {
    search: "",
    results: [],
    userID: "",
    error:""
  };

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
    }
  }

  //   // When the component mounts, get a list of all available recipes???
  //   componentDidMount() {
  //     API.getBaseBreedsList()
  //       .then(res => this.setState({ breeds: res.data.message }))
  //       .catch(err => console.log(err));
  //   }

  handleInputChange = event => {
    this.setState({ "search": event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getSearchedRecipes(this.state.search)
      .then(res => {
        this.setState({ results: res.data });
      })
      .catch(err => {
        console.log(`error: ${err}`)
        this.setState({error: err})
      });
  };
  render() {
    return (
      <div>
        <Navbar displayName={this.state.displayName} location={this.props.location} />
        <Container style={{ minHeight: "80%" }}>


          <div className="container">

            <div className="jumbotron text-center">
              <span className="google-logo"><span className="google-R">R</span>
                <span className="google-e">e</span><span className="google-o2">c</span>
                <span className="google-R">i</span><span className="google-l">p</span>
                <span className="google-o1">e</span><span className="google-R">-</span>
                <span className="google-o1">o</span><span className="google-o2">o</span>
                <span className="google-g">g</span><span className="google-l">l</span>
                <span className="google-e">e</span></span>

              <div className="input-group input-group-sm">
                <input id="form" className="form-control" type="text" onChange={this.handleInputChange}/>
                <button
                  onClick={this.handleFormSubmit}
                  type="success"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <SearchResults results={this.state.results} />
        </Container>
      </div>
    );
  }
}

export default Search;