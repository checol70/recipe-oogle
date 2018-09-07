import React, { Component } from "react";
import API from "../utils/API";
import Container from "../Container";
//import SearchResults from "../components/SearchResults";
//import Alert from "../components/Alert";
import "./Search.css";
import queryString from "query-string";

class Search extends Component {
  state = {
    search: "",
    results: [],
    userID: ""
  };

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
      this.props.login();
    }
  }

  //   // When the component mounts, get a list of all available recipes???
  //   componentDidMount() {
  //     API.getBaseBreedsList()
  //       .then(res => this.setState({ breeds: res.data.message }))
  //       .catch(err => console.log(err));
  //   }

  handleInputChange = event => {
    this.setState({ "name": event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getRecipe(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>


          <div className="container">

            <div className="jumbotron text-center">
              <span class="google-logo"><span class="google-R">R</span><span class="google-e">e</span><span class="google-o2">c</span><span class="google-R">i</span><span class="google-l">p</span><span class="google-o1">e</span><span class="google-R">-</span><span class="google-o1">o</span><span class="google-o2">o</span><span class="google-g">g</span><span class="google-l">l</span><span class="google-e">e</span></span>

              <div className="input-group input-group-sm">
                <input id="form" className="form-control" type="text" /><button>Search</button>
              </div>
            </div>
          </div>
          {/*<SearchResults results={this.state.results} />*/}
        </Container>
      </div>
    );
  }
}

export default Search;