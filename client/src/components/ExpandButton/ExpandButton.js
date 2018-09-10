import React from "react";
import "./ExpandButton.css";

const ExpandButton = props => {
    return props.results.map(recipe =>
        <li>
            {recipe.name}
    </li>
    );
}
export default ExpandButton;
