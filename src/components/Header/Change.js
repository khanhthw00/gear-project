import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Menu from './Menu'
import Imagelogo from '../../images/logo.png';
import Image from '../../images/banner_mini.jpg';
import Leftmenu from '../../components/Trangchu/Leftmenu';
import { useSessionStorageString } from "react-use-window-sessionstorage";

const Change = () => {
    const [authentication, sAuthentication] = useSessionStorageString("user", null);
    const [taikhoan, sTaikhoan] = useState([]);

    useEffect(() => {
       console.log(authentication)
    }, [authentication])

    const gettaikhoan = () => {
        axios.get("http://localhost:3000/taikhoan").then(res => {
            const taikhoan = res.data;
            sTaikhoan(taikhoan);
        })
        .catch(error => console.error(error));
    }

return(
    <ul className="navbar-nav mb-2 mb-lg-0">
        {!authentication ? 
                <Fragment>
                    <li className="nav-item"><a className="nav-link" aria-current="page"><Link to="/login">Login</Link></a></li>
                    <li className="nav-item"><a className="nav-link btn btn-outline-main" aria-current="page"><Link to="/signup">Signup</Link></a></li>
                </Fragment> :
                <Fragment>
                    <li className="nav-item"><a className="nav-link" aria-current="page"><Link to="/canhan">Cá nhân</Link></a></li>
                    <li className="nav-item"><a className="nav-link btn btn-outline-main" aria-current="page"><Link to="/" onClick={() => sAuthentication(null)}>Log out</Link></a></li>
                    <li className="nav-item" ><Link className="nav-link" aria-current="page" to={`/giohang/`}>Giỏ hàng</Link></li>
                </Fragment>}
    </ul>)
};

export default Change;