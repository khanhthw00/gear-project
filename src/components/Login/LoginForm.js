import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


import Background from '../../images/bg_login.png'
import { useSessionStorageString   } from "react-use-window-sessionstorage";
const LoginForm = (props) => {

    const [authentication, sAuthentication] = useSessionStorageString("user", null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)


    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post("http://localhost:3000/dangnhap", {
            USERNAME: username,
            PASSWORD: password
        }).then(async response => {
            setLoading(false);        
            sessionStorage.setItem("user", JSON.stringify(response.data));
            sAuthentication(JSON.stringify(response.data))
            props.history.push('/');
            //console.log(response);
        }).catch(error => {
            setLoading(false);
            if(error.response.status === 404 || error.response.status === 500)
            alert("Sai username hoặc password ")
        
            //window.location.reload();
        }); 
        
       // data = JSON.parse(data);
       // console.log(data[0]);
    }

    const isValid = () => {
        return username !== "" && password !== ""
    }

    return (
        <section>
            <section className="login__sect" style={{background: `url(${Background}) no-repeat`, backgroundSize: '100%'}}> 
                <div className="container">
                    <div className="login__wrapper"> 
                        <div className="login__box"> 
                            <h4 className="title">Đăng nhập</h4>
                            <p className="text-note">Đăng nhập để mua hàng, đóng góp ý kiến và nhận sự tư vấn của chúng tôi </p>
                            <div className="input-form"> 
                                <input className={`form-control ${username === "" ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)
                                }/>
                            </div>
                            <div className="input-form"> 
                                <input className={`form-control ${password === "" ? 'is-invalid' : 'is-valid'}`} type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)
                                }/>
                            </div>
                            <div className="wrap-btn d-flex"> <button onClick={handleLogin} disabled={isValid() ? '' : true } className="btn btn-main">Đăng nhập</button></div>
                            <p className="signup">Bạn chưa có tài khoản?
                                <Link to="/signup">Đăng ký</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default LoginForm;