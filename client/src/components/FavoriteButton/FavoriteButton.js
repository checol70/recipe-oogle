import React from "react";


const FavoriteButton = props =>(
    <button className= "favorite-button"{...props}>
    {props.favorite? "★" : "✰"} 
    </button>
)
export default FavoriteButton;
