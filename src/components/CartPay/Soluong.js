import React, { Component } from "react";
import Button from "./Button";

export default class Soluong extends Component {
    render(){
        return(
            <div className="quantity input-group"><span className="input-group-btn">
              <Button title = "-" task={() => this.props.g()} data-field></Button></span>
              <input onKeyUp="this.value=this.value.replace(/[^\d]/,'')" onChange={this.props.c} className="form-control input-number" id="quantity" type="text" name="count" value={this.props.count} /><span className="input-group-btn">
              <Button title = "+" task={() => this.props.t()} data-field></Button></span>
            </div>
        )
    }
}