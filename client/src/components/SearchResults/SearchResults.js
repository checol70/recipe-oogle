import React from "react";
import "./SearchResults.css";

const SearchResults = props => {
    return props.results.map(recipe =>
        <li>
            {recipe.name}
    </li>
    );
}
export default SearchResults;


