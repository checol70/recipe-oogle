import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from "./components/Container";

//import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Add from "./pages/Add/";
import MyFavorites from "./pages/MyFavorites";

class App extends Component {
  state = {
    displayName: window.localStorage.getItem("displayName")

  };

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
                <Route exact path="/myfavorites" component = {MyFavorites}/>
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
