import React, { Component } from "react";
import API from "../../components/utils/API";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import SearchResults from "../../components/SearchResults";

class MyFavorites extends Component {
    state = {
        results: [],
        currentFavorites: []
    }

    componentDidMount = () => {
        API.getPopulatedFavorites().then(res => {
            res.data.forEach(e => {
                e.expanded = false;
            })
            this.setState({ results: res.data, currentFavorites: res.data.map(e=> e._id) });
        })
    }

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

    changeFavorite = i => {
        API.removeFavorites(this.state.results[i]._id).then(r => {
            API.getPopulatedFavorites().then(res => {
                let ids = [];
                res.data.forEach(e => {
                    e.expanded = false;
                    ids.push(e._id);
                })
                this.setState({ results: res.data, currentFavorites: ids })
            })
        })
    }

    render() {
        return (
            <div className="container">
                <Navbar displayName={this.state.displayName} location={this.props.location} />
                <Container style={{ minHeight: "80%" }}>


                    <div className="container">

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

export default MyFavorites;