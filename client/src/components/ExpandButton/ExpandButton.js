import React from "react";


const ExpandButton = props =>(
    <button className= "expand-button"{...props}>
    {props.expanded? "▲" : "▼"}
    </button>
)
export default ExpandButton;
