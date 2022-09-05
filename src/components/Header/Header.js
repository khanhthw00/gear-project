import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Menu from './Menu'
import Imagelogo from '../../images/logo.png';
import Image from '../../images/banner_mini.jpg';
import Leftmenu from '../../components/Trangchu/Leftmenu';
import Change from './Change';

  const Header = () => {
    const [idTK, sidTK] = useState(null)
    let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
    // console.log("dataSess", data)
    var id = data?.[0] ? data?.[0]?.IDQUYEN : null;
    // console.log("quyen", id)
    return (
      <Fragment>
          {id !== 1 ?
        <section>
          <div className="banner-mini" style={{background: `url(${Image})`}}>
            <div className="content">
                <p>
                PC VĂN PHÒNG CHỈ TỪ  <span className="text-danger">5.XXX.XXX</span>VNĐ</p>
            </div>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light nav-main">
            <div className="container"><a className="navbar-brand"><Link to='/'> <img src={Imagelogo} /></Link></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex">
                  {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                </form>
                <Change/>
              </div>
            </div>
          </nav> 
          <Menu/>
          </section> : 
            <section>
              <div className="banner-mini" style={{background: `url(${Image})`}}>
              <div className="content">
                  <p>
                  PC VĂN PHÒNG CHỈ TỪ  <span className="text-danger">5.XXX.XXX</span>VNĐ</p>
              </div>
            </div> 
            </section>
          }
        </Fragment>
    
    );
}

export default Header;