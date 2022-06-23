import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Changepass extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: [],
            matkhau:""
		}
	};

  componentDidMount() {
      this.refreshCheckFilled()
      // const id = this.props?.id
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var idtk = data?.[0] ? data?.[0]?.IDTK : null
      //console.log(idtk);
      axios.get(`http://localhost:3000/taikhoan/${idtk}`)
        .then(res => {
          const news = res.data;
          this.setState({ news: news, matkhau: news[0].PASSWORD});
          console.log(news)
        })
        .catch(error => console.log(error));  
       
    }
    
    refreshCheckFilled = () => {
      this.setState({isPasswordFilled: undefined, isNewPassFilled: undefined, isComPassFilled: undefined})
    }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
        this.setState({
          [name]: value,
        });
      if(name === "password"){
        this.checkValidInput(value, "isPasswordFilled")
      }

      if(name === "newpass"){
        this.checkValidInput(value, "isNewPassFilled")
      }
      if(name === "copassword"){
        this.checkValidInput(value, "isComPassFilled")
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
            PASSWORD: this.state.newpass  
        };
        const coPass = {
            COMFIRM: this.state.copassword
        }
        if(this.state.matkhau === this.state.password)
        {
            if(this.state.newpass === coPass.COMFIRM)
            {
                let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
                var idtk = data?.[0] ? data?.[0]?.IDTK : null
                axios.put(`http://localhost:3000/taikhoan/${idtk}`, newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
          
                    if (res.data.status === 200) {
                        alert("Cập nhật mật khẩu thành công !!!")
                        window.location.href = `/canhan`
                    }
                    let news = this.state.news;
                    news = [newItem, ...news];
                    this.setState({news: news});    

                }).catch(error => console.error(error));
            }
           else {
               alert("Mật khẩu xác nhận không chính xác, vui lòng kiểm tra lại!!!")
           } 
        }
        else {
            alert("Mật khẩu hiện tại không chính xác, vui lòng kiểm tra lại!!!")
        }   
    }    

    render() {
     const isValid = () => {
      return this.state.isPasswordFilled === true && this.state.isNewPassFilled === true && this.state.isComPassFilled === true
      }
      return (
        <div className="admin">
        <div className="row">
          <div className="col-3 admin-col">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div> 
          <div className="col-6 admin-fields">
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Mật khẩu hiện tại: </label>
            <div className="col-sm-10">
                <input name="password" type="password" className={`form-control ${this.state.isPasswordFilled === undefined ? "" : this.state.isPasswordFilled === true ? 'is-valid' : 'is-invalid'}`} onChange={this.handleInputChange} placeholder=""/> 
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Mật khẩu mới: </label>
            <div className="col-sm-10">
            <input name="newpass" type="password" className={`form-control ${this.state.isNewPassFilled === undefined ? "" : this.state.isNewPassFilled === true ? 'is-valid' : 'is-invalid'}`} onChange={this.handleInputChange} placeholder=""/> 
            </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Xác nhận mật khẩu: </label>
            <div className="col-sm-10">
            <input name="copassword" type="password" className={`form-control ${this.state.isComPassFilled === undefined ? "" : this.state.isComPassFilled === true ? 'is-valid' : 'is-invalid'}`} onChange={this.handleInputChange} placeholder=""/> 
            </div>
        </div>
        <div className="submit-button">
            <button className="nav-link btn btn-outline-main" disabled={isValid() ? '' : true } onClick={this.handleInsertSubmit}>Xác nhận cập nhật</button>
          <button className="nav-link btn btn-outline-main"><Link to="/canhan">Hủy cập nhật</Link></button>
        </div>
      </div>
      <div className="col-3 admin-col">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
      );
    }
  }
export default Changepass;