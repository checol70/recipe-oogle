import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from "./components/Container";
import Header from "./components/Header";
//import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Add from "./pages/Add/";
//import All from "./pages/All";
//import Contact from "./pages/Contact";
import queryString from "query-string";

class App extends Component {
  state = {
    displayName: window.localStorage.getItem("displayName")

  };

  componentWillMount() {
    var query = queryString.parse(this.props.location);
    if (query.token) {
      window.localStorage.setItem("tkn", query.token);
      window.localStorage.setItem("displayName", query.displayName);
      this.props.history.push("/");
      this.setState({displayName: window.localStorage.getItem("displayName")})
      console.log(this.state.displayName);
    }
  }

  //need an a tag to localhost:3001/auth/google
  // render page
  render() {
    return (
      <div>
        <Container>
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/" component={Search} login={this.userLogin} />
                <Route exact path="/add" component={Add} />
                {/*<Route component={noMatch}/>*/}
              </Switch>
            </div>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
};

export default App;
