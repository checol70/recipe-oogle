import React, { Component } from 'react';
import './App.css';
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom"
import queryString from "query-string";

class App extends Component {

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
    }
    console.log(window.localStorage.getItem('tkn'));
    console.log(window.localStorage.getItem('displayName'));
    console.log("Hi")
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
