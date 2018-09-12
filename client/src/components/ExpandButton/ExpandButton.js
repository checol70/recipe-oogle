import React from "react";


const ExpandButton = props =>(
    <button className= "expand-button"{...props}>
    {props.expand? "▲" : "▼"}
    </button>
)
export default ExpandButton;
