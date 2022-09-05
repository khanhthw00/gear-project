import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

// const Leftmenu = () => {
//   useSt
// }

var urlAPI = 'https://gear-api-project.herokuapp.com'

class Checkloai extends React.Component {

  state = {
    loaisp: []
  }

  componentDidMount() {
      axios.get(`${urlAPI}/loaisanpham`)
        .then(res => {
          const loaisp = res.data;
          this.setState({ loaisp });
        })
        .catch(error => console.log(error));
    }


    render() {
        return(
            <Fragment>
                {this.state.loaisp.map(loaisanpham => 
                <div className="for-cate" key={loaisanpham.IDLOAI}>
                    <input className="form-check-input" id="exampleCheck1" type="checkbox" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                            <Link className="dropdown-item" to={`/sanpham-theoloai/${loaisanpham.IDLOAI}`}>
                                {loaisanpham.TENLOAI}
                            </Link></label>
                </div>
                )}
            </Fragment>
        );
    }
};

export default Checkloai;