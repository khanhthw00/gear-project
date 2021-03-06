import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Background from '../../images/bg_login.png'

class SignupFormn extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            news: []
		}
	};

    componentDidMount() {
        this.refreshCheckFilled()
        axios.get("http://localhost:3000/taikhoan").then(res => {
            const news = res.data;
            this.setState({news: news.news});
        })
        .catch(error => console.error(error));
    };

    refreshCheckFilled = () => {
        this.setState({isNameFilled: undefined, isPhoneFilled: undefined, isUserFilled: undefined, isPassFilled: undefined, isAddrFilled: undefined, isEmailFilled: undefined, isCoPassFilled: undefined})
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if(name === "name"){
            this.checkValidInput(value, "isNameFilled")
        }
        if(name === "phone"){
            this.checkValidInput(value, "isPhoneFilled")
        }
        if(name === "diachi"){
            this.checkValidInput(value, "isAddrFilled")
        }
        if(name === "email"){
            this.checkValidInput(value, "isEmailFilled")
        }
        if(name === "username"){
            this.checkValidInput(value, "isUserFilled")
        }
        if(name === "password"){
            this.checkValidInput(value, "isPassFilled")
        }
        if(name === "copassword"){
            this.checkValidInput(value, "isCoPassFilled")
        }
    };

    checkValidInput = (value, state) => {
        if (value !== "") {
          this.setState({ [state]: true})
        } else {
          this.setState({ [state]: false})
        }
      }

    handleInsertSubmit = () => {
        const newItem = {
            USERNAME: this.state.username,
            PASSWORD: this.state.password,
            HOTEN: this.state.name,
            SDT: this.state.phone,
            DIACHI: this.state.diachi,
            EMAIL: this.state.email,
            IDQUYEN: 2  
        };
        //console.log(newItem.PASSWORD);
        const coPass = {
            COMFIRM: this.state.copassword
        }

        if(newItem.PASSWORD === coPass.COMFIRM)
        {
            axios.post("http://localhost:3000/taikhoan", newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
                console.log(res)
                if (res.data.status === 500) {
                    alert("Username ???? t???n t???i xin vui l??ng thay ?????i!!! ")
                }
                if (res.data.status === 300) {
                    alert("S??? ??i???n tho???i c?? 10 s??? v?? b???t ?????u b???ng s??? 0!!!")
                }
                if (res.data.status === 400) {
                    alert("Nh???p sai ?????nh d???ng email, vui l??ng ki???m tra l???i!!!")
                }
                if (res.data.status === 501) {
                    alert("Email v?? s??? ??i???n tho???i n??y ???? t???ng ???????c d??ng ????? ????ng k??, vui l??ng ki???m tra l???i!!!")
                }
                if (res.data.status === 200) {
                    alert("T???o t??i kho???n th??nh c??ng ")
                    
                    let news = this.state.news;
                    news = [newItem, ...news];
                    this.setState({news: news});
                    window.location.href = `/login`
                }
            }).catch(error => {})
        }
        else {
            alert("M???t kh???u x??c nh???n kh??ng ch??nh x??c")
        }        
    }
    
    render() {
        const isValid = () => {
            return this.state.isNameFilled === true && this.state.isPhoneFilled === true && this.state.isUserFilled === true && this.state.isPassFilled === true && this.state.isAddrFilled === true && this.state.isEmailFilled === true && this.state.isCoPassFilled === true
            }
        return (
            <section>
                <section className="login__sect signup" style={{background: `url(${Background}) no-repeat`, backgroundSize: '100%'}}> 
                    <div className="container">
                        <div className="login__wrapper"> 
                        <div className="login__box"> 
                            <h4 className="title">????ng k??</h4>
                            <p className="text-note">B???t bu???c nh???p ?????y ????? th??ng tin b??n d?????i </p>
                            <div className="input-form"> 
                                <label>H??? v?? t??n</label>
                                <input className={`form-control ${this.state.isNameFilled === undefined ? "" : this.state.isNameFilled === true ? 'is-valid' : 'is-invalid'}`} name="name" type="text"  onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-form">
                                <label>S??? ??i???n tho???i</label> 
                                <input className={`form-control ${this.state.isPhoneFilled === undefined ? "" : this.state.isPhoneFilled === true ? 'is-valid' : 'is-invalid'}`} name="phone" type="text"  onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-form"> 
                                <label>Email</label>
                                <input className={`form-control ${this.state.isEmailFilled === undefined ? "" : this.state.isEmailFilled === true ? 'is-valid' : 'is-invalid'}`} name="email" type="email" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-form"> 
                                <label>?????a ch???</label>
                                <input className={`form-control ${this.state.isAddrFilled === undefined ? "" : this.state.isAddrFilled === true ? 'is-valid' : 'is-invalid'}`} name="diachi" type="text" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-form"> 
                                <label>T??n ????ng nh???p</label>
                                <input className={`form-control ${this.state.isUserFilled === undefined ? "" : this.state.isUserFilled === true ? 'is-valid' : 'is-invalid'}`} name="username" type="text" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-form"> 
                                <label>M???t kh???u</label>
                                <input className={`form-control ${this.state.isPassFilled === undefined ? "" : this.state.isPassFilled === true ? 'is-valid' : 'is-invalid'}`} name="password" type="password" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-form"> 
                                <label>X??c nh???n m???t kh???u</label>
                                <input className={`form-control ${this.state.isCoPassFilled === undefined ? "" : this.state.isCoPassFilled === true ? 'is-valid' : 'is-invalid'}`} name="copassword" type="password" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="wrap-btn d-flex"><button className="btn btn-main" disabled={isValid() ? '' : true } onClick={this.handleInsertSubmit}>????ng k??</button></div>
                            <p className="signup">B???n ???? c?? t??i kho???n?
                                <Link to="/login">????ng nh???p</Link>
                            </p>
                        </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
};

export default SignupFormn;