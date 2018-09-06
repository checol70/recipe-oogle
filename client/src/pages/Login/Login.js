import React, { Component } from "react";
import Axios from "axios";
import {BrowserRouter as Link} from "react-router-dom";
class Login extends Component{
    
    signIn=()=>{
        Axios.get("/auth/google").then(res=>{console.log(res)})
    }
    
    render() {
        return (
            <div>
                <p>Welcome Home</p>
                <a href ="/auth/google">
                    <button>Try this sign in button!</button>
                </a>
            </div>
        )
    }
}
export default Home;