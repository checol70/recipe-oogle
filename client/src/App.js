import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Add from "./pages/Add";
//import All from "./pages/All";
//import Contact from "./pages/Contact";

class App extends Component {
  state = {
    displayName: window.localStorage.getItem("displayName")

  };

  userLogin = ()=>{
    this.setState({ displayName: window.localStorage.getItem("displayName") });
  }

  //need an a tag to localhost:3001/auth/google
  // render page
  render() {
    return (
      <div>
        {console.log(this.props)}
          <Header />
          <Container>
            <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Search} login={this.userLogin}/>
              <Route exact path="/add" component={Add}/>
              {/*<Route component={noMatch}/>*/}
            </Switch>
            </BrowserRouter>
          </Container>
     </div>
        );
      }
     };
     
     export default App;
