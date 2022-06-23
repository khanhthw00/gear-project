import React, { Component } from "react";

export default class Button extends Component {
    render(){
        let {title, task} = this.props;
        return(
            <button className="quantity-left-minus btn btn-danger btn-number" type="button" data-type="minus" onClick = {task}>
                {title}
            </button>
        )
    }
}