import React from "react";


const FavoriteButton = props =>(
    <button className= "favorite-button"{...props}>
    {props.favorite? <ion-icon name="star"></ion-icon> : <ion-icon name="star-outline"></ion-icon>} 
    </button>
)
export default FavoriteButton;
