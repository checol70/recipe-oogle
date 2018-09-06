import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Container from "./components/Container";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import queryString from "query-string";

class App extends Component {
  state = {
    displayName: window.localStorage.getItem("displayName")

  };

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
    }
    this.setState({ displayName: window.localStorage.getItem("displayName") });
  }

  // render page
  render() {
    console.log(this.state.displayName);
    return (
      <div>
          <Navbar displayName={this.state.displayName} />
          <Header />
          <Container>
          </Container>
     </div>
        );
      }
     };
     
     export default App;
