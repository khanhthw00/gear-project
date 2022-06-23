import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';
import CbbLoai from '../Admin/CbbLoai'

// import Banmain from '../images/banner_main.jpg';
// import banside1 from '../images/banner_side_1.jpg';
// import banside2 from '../images/banner_side_2.jpg';
// import bgkeyboard from '../images/bg_keyboard.png';
// import bgheadphone from '../images/bg_headphone.png';
// import bgmouse from '../images/bg_mouse.png';
// import p1 from '../images/p_1.png';
import p2 from '../../images/p_2.png';
// import p3 from '../images/p_3.png';
// import p4 from '../images/p_4.png';
import Banproduct from '../../images/banner_product.jpg';
// import Sanpham from './Sanpham';
// import Checkloai from './Checkloai';


class Canhan extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: [],
            idkh: 0,
            hoten: "",
            gioitinh: "",
            phone: 0,
            email: "",
            diachi: "",
            idtk: 0
		}
	};

  componentDidMount() {
      // const id = this.props?.id
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var idtk = data?.[0] ? data?.[0]?.IDTK : null
      console.log(idtk);
      axios.get(`http://localhost:3000/tkkh/${idtk}`)
        .then(res => {
            //console.log(res.data);
          const news = res.data;
          this.setState({ news: news, idkh: news[0].IDKH, hoten: news[0].HOTEN, gioitinh: news[0].GIOITINH, phone: news[0].SDT, email: news[0].EMAIL, diachi: news[0].DIACHI, idtk: news[0].IDTK});
        })
        .catch(error => console.log(error));

    }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
          [name]: value
      });
    };

    handleInsertSubmit = () => {

      
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var idtk = data?.[0] ? data?.[0]?.IDTK : null

        const newItem = {
            HOTEN: this.state.hoten, 
            GIOITINH: this.state.gioitinh,
            SDT: this.state.phone, 
            DIACHI: this.state.diachi, 
            EMAIL: this.state.email,
            IDTK: this.state.idtk
        };


        axios.put(`http://localhost:3000/khachhang/${idtk}`, newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
          
            if (res.data.status === 400) {
                alert("Email sai định dạng, xin vui lòng kiểm tra lại!!!")
            }

            if (res.data.status === 300) {
              alert("Số điện thoại phải có định dạng 10 số và bắt đầu bằng số 0, xin vui lòng kiểm tra lại!!!")
            }

            if (res.data.status === 200) {
                alert("Cập nhật thông tin thành công ")
                window.location.href = `/canhan`
            }
            let news = this.state.news;
            news = [newItem, ...news];
            this.setState({news: news});    

        }).catch(error => console.error(error));

    }

    isValid = () => {
      return this.state.hoten !== "" && this.state.phone !== "" && this.state.email !== "" && this.state.diachi !== ""
    }

    render() {
        //console.log(this.state.idsp, this.state.tensp, this.state.tieude, this.state.url, this.state.mota, this.state.soluong, this.state.gia);
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
            <label className="col-sm-2 col-form-label">ID khách hàng: </label>
            <div className="col-sm-10">
                <input type="text" name="idkh" readOnly class="form-control" value={this.state.idkh} placeholder=""/> 
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Họ tên của khách hàng: </label>
            <div className="col-sm-10">
              <input type="text" name="hoten" className={`form-control ${this.state.hoten === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.hoten} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Giới tính: </label>
            <div className="col-sm-4">
                    <select class="form-select form-select-sm"  aria-label=".form-select-sm example" placeholder="Sản phẩm thuộc loại:" name="gioitinh" onChange={(e) => this.handleInputChange(e)}>
                        <option value="" hidden disabled>Chọn giới tính</option>
                        <option >nữ</option>
                        <option >nam</option>
                    </select>
                </div>
            <label className="col-sm-2 col-form-label">Số điện thoại: </label>
            <div className="col-sm-4">
              <input type="text" name="phone"  className={`form-control ${this.state.phone === "" ? 'is-invalid' : 'is-valid'}`} placeholder=""  value={this.state.phone} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Email: </label>
            <div className="col-sm-10">
                <input type="email" name="email"  className={`form-control ${this.state.email === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.email} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Địa chỉ: </label>
            <div className="col-sm-10">
                <input type="text" name="diachi" className={`form-control ${this.state.diachi === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.diachi} onChange={this.handleInputChange}/>
            </div>
        </div>
            
        <div className="submit-button">
          <button className="nav-link btn btn-outline-main" disabled={this.isValid() ? '' : true } onClick={this.handleInsertSubmit}>Xác nhận cập nhật</button>
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
export default Canhan;