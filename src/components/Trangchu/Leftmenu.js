import React, { useState } from 'react';
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

class Leftmenu extends React.Component {

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
        return this.state.loaisp.map(loaisanpham => 
                  <li key={loaisanpham.IDLOAI}>
                    <Link className="dropdown-item" to={`/sanpham-theoloai/${loaisanpham.IDLOAI}`}>
                      {loaisanpham.TENLOAI}
                    </Link>
                  </li>
              
        );
    }
};

export default Leftmenu;