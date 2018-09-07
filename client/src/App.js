import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Container from "./components/Container";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import queryString from "query-string";
import Home from "./components/Home";
import Add from "./components/Add";
import Search from "./components/Search";


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
            <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/Search" component={Search}/>
              <Route exact path="/Add" component={Add}/>
            </Switch>
            </BrowserRouter>
          </Container>
     </div>
        );
      }
     };
     
     export default App;
