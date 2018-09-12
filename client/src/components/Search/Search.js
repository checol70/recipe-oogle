import React, { Component } from "react";
import API from "../utils/API";
import Container from "../Container";
import Navbar from "../Navbar";
import SearchResults from "../SearchResults";
//import Alert from "../components/Alert";
import "./Search.css";


class Search extends Component {
  state = {
    search: "",
    results: [],
    currentFavorites: [],
    userID: "",
    error: "",
    displayName: window.localStorage.getItem("displayName")
  };

  componentWillMount() {
    var query = this.parse(this.props.location.search);
    console.log(query)
    if (query) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
      this.setState({ displayName: window.localStorage.getItem("displayName") })
    }
  }

  parse(str) {

    if (str != null && str.length > 0 && str.charAt(str.length - 1) === '#') {
      str = str.substring(0, str.length - 1);
    }
    str=str.replace("%20", " ")
    const strArr = str.trim().split("?");
  
    if (strArr.length >= 2) {
      str = strArr[1];
    } else {
      return null;
    }
    const obj = {};
    str.split("&").forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      obj[parts[0]] = parts[1];
    })
    return obj;
  }

  handleInputChange = event => {
    this.setState({ "search": event.target.value });
  };

  
  getSearch(){
    API.getSearchedRecipes(this.state.search)
      .then(res => {
        res.data.forEach(e => {
          e.expanded = false;
        })
        this.setState({ results: res.data });
      })
      .catch(err => {
        console.log(`error: ${err}`)
        this.setState({ error: err });
      });
    this.loadFavorites();
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.getSearch()
  }
  // Create an array of the current users favorite recipes
  loadFavorites = () => {
    API.getFavorites()
      .then(res => {
        this.setState({ currentFavorites: res.data });
      })
      .catch(err => {
        console.log(`error: ${err}`)
        this.setState({ error: err });
      });
  };


  //this should be passed down to the expand button!
  // num is integer value
  changeExpanded = num => {
    this.setState({
      results: this.state.results.map((element, index) => {
        if (index !== num) {
          return element;
        } else {
          element.expanded = !element.expanded;
          return element;
        }
      })
    })
  }
  //this should be passed down to the favorite button!
  //i is the index number of the recipes and the ._id is the recipe id
  changeFavorite = i => {
    if (this.state.currentFavorites.indexOf(this.state.results[i]._id) === -1) {
      API.addToFavorites(this.state.results[i]._id).then(s => {
        API.getFavorites().then(res => {
          this.setState({ currentFavorites: res.data })
        })
      })
    } else {
      API.removeFavorites(this.state.results[i]._id).then(r => {
        API.getFavorites().then(res => {
          this.setState({ currentFavorites: res.data })
        })
        this.getSearch();
      })
    }
  }

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

            </div>
            <form className="input-group input-group-sm" onSubmit={(e) => this.modifyTask(e)}>
              <input id="form" className="form-control" type="text" onChange={this.handleInputChange} />

              <button className="btn btn-primary"
                onClick={this.handleFormSubmit}
                type="submit"
              >
                Search
                </button>
            </form>
          </div>


          <SearchResults results={this.state.results}
            currentFavorites={this.state.currentFavorites}
            changeExpanded={this.changeExpanded}
            changeFavorite={this.changeFavorite} />
        </Container>
      </div >
    );
  }
}

export default Search;