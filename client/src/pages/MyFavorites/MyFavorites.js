import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

class MyFavorites extends Component{
    state = {
        results:[]
    }

    componentDidMount = () =>{
        axios.get("/api/user").then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div className="container">
                <Navbar />
                {this.state.results.map(e=> <p>e.name</p>)}
            </div>
        )
    }
}

//const obj = this.state
//obj.ingredients = obj.ingredients.splice(",")

export default MyFavorites;