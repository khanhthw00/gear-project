import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useSessionStorageString } from "react-use-window-sessionstorage";

var urlAPI = 'https://gear-api-project.herokuapp.com'

const Change = () => {
    const [authentication, sAuthentication] = useSessionStorageString("user", null);
    // console.log("test thu:" , authentication, sAuthentication)
    const [taikhoan, sTaikhoan] = useState([]);

    useEffect(() => {
       console.log('thu nhat',authentication)
    }, [authentication])

    const gettaikhoan = () => {
        axios.get(`${urlAPI}/taikhoan`).then(res => {
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