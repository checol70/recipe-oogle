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
    error: "",
    displayName: window.localStorage.getItem("displayName")
  };

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    console.log(query)
    if (query.token) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
      this.setState({ displayName: window.localStorage.getItem("displayName") })
    }
  }


  handleInputChange = event => {
    this.setState({ "search": event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getSearchedRecipes(this.state.search)
      .then(res => {
        res.data.forEach(e => {
          e.expanded = false;
        })
        this.setState({ results: res.data });
      })
      .catch(err => {
        console.log(`error: ${err}`)
        this.setState({ error: err })
      });
  };

  //this should be passed down to the expand button!
  changeExpanded = i => {
    this.setState({
      results: this.state.results.map((element, index) => {
        if (index !== i) {
          return element;
        } else {
          element.expanded = !element.expanded;
          return element;
        }
      })
    })
  }

  render() {
    return (
      <div className="container">
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

              
              <form className="input-group input-group-sm" onSubmit={(e)=>this.modifyTask(e)}>
                <input id="form" className="form-control" type="text" onChange={this.handleInputChange}  />

                <button  className="btn btn-primary"
                  onClick={this.handleFormSubmit}
                  type="submit"
                >
                  Search
                </button>
                </form>
              </div>
            </div>
          
          <SearchResults results={this.state.results} changeExpanded={this.changeExpanded} />
        </Container>
      </div>
    );
  }
}

export default Search;