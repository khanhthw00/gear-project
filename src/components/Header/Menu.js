import React from 'react';
// import {Link} from 'react-router-dom';
// import { getCategory } from '../../model/category';
import axios from 'axios';
import Leftmenu from '../../components/Trangchu/Leftmenu';

class Menu extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark sub-nav">
              <div className="container">
                <ul className="navbar-nav mb-2">
                  <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Danh mục sản phẩm</a>
                    <ul className="dropdown-menu main-menu" aria-labelledby="navbarDropdown">  
                      <Leftmenu/>
                    </ul>
                  </li>
                  <li className="nav-item"><a className="nav-link btn btn-outline-main">Tổng hợp khuyển mãi</a></li>
                  <li className="nav-item"><a className="nav-link btn btn-outline-main" >Hướng dẫn thanh toán</a></li>
                  <li className="nav-item"><a className="nav-link btn btn-outline-main">Chính hãng bảo hành</a></li>
                  <li className="nav-item"><a className="nav-link btn btn-outline-main">Blog Review</a></li>
                  <li className="nav-item"><a className="nav-link btn btn-outline-main">Vận chuyển</a></li>
                </ul>
              </div>
            </nav>
        );
    }
};

export default Menu;