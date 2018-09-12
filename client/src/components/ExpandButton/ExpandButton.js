import React from "react";
import "./ExpandButton.css";


const ExpandButton = props =>(
    <button className= "expand-button"{...props}>
    {props.expand? <ion-icon id="pizza" name="pizza"></ion-icon> : <ion-icon name="pizza"></ion-icon>}
    </button>
)
export default ExpandButton;
