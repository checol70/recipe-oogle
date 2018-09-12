import React, { Component } from "react";
import "./SearchResults.css";
import ExpandButton from "../ExpandButton";
import FavoriteButton from "../FavoriteButton";


function SearchResults(props) {
    return (
        <ul>
            {props.results.map((recipe, int) => {

                return (
                    <li key={int + "res"} className="expander">
                        <ExpandButton className="expand-button" onClick={() => { props.changeExpanded(int) }} expand={recipe.expanded} />
                        <FavoriteButton className="favorite-button" onClick={() => { props.changeFavorite(int) }} favorite={recipe.favorite}/>
                        <h3>{recipe.name}</h3>
                        {recipe.expanded ?
                            <div>
                                <ul>
                                    {recipe.ingredients.map((ingred, ingrednum) => {
                                        return <li key={"ing" + ingrednum}><p>{ingred}</p></li>
                                    })}
                                </ul>
                                <br></br>
                                <ol>
                                    {recipe.steps.map((step, stepNum) => {
                                        return <li key={"step" + stepNum}><p>{step}</p></li>
                                    })}
                                </ol>
                            </div> :
                            <div>
                            </div>
                        }
                    </li>
                )
            })
            }
        </ul>
    )
}

export default SearchResults;


