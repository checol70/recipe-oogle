import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Container from "./components/Container";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import images from "./images.json";
import Footer from "./components/Footer";


class App extends Component {
 state = {
   displayName: "",

 };



 // render page
 render() {
   console.log(this.state.displayName);
   return (
     <div>
       <NavBar displayName ={this.state.displayName}/>
       <Header />
       <Container>
         {this.state.images.map(image => (
           <ImageCard
             key={image.id}
             id={image.id}
             image={image.image}
             imageSelected={this.imageSelected}
           />
         ))}
       </Container>
       <Footer />
     </div>
   );
 }
};

export default App;
