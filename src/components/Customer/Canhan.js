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
            diachi: ""
		}
	};

  componentDidMount() {
      // const id = this.props?.id
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var idtk = data?.[0] ? data?.[0]?.IDTK : null
      //console.log(idtk);
      axios.get(`http://localhost:3000/tkkh/${idtk}`)
        .then(res => {
            //console.log(res.data);
          const news = res.data;
          this.setState({ news: news, idkh: news[0].IDKH, hoten: news[0].HOTEN, gioitinh: news[0].GIOITINH, phone: news[0].SDT, email: news[0].EMAIL, diachi: news[0].DIACHI});
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

    render() {
      //console.log(this.state.idkh)
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
              <input type="text" name="hoten" readOnly class="form-control" placeholder="" value={this.state.hoten} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Giới tính: </label>
            <div className="col-sm-4">
                    <select class="form-select form-select-sm" readOnly aria-label=".form-select-sm example" placeholder="Sản phẩm thuộc loại:" name="gioitinh" onChange={(e) => this.handleInputChange(e)}>
                        <option value="" hidden disabled>Chọn giới tính</option>
                        <option >{this.state.gioitinh}</option>
                    </select>
                </div>
            <label className="col-sm-2 col-form-label">Số điện thoại: </label>
            <div className="col-sm-4">
              <input type="text" name="phone" readOnly class="form-control" placeholder="" value={this.state.phone} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Email: </label>
            <div className="col-sm-10">
                <input type="email" name="email" readOnly class="form-control" placeholder="" value={this.state.email} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Địa chỉ: </label>
            <div className="col-sm-10">
                <input type="text" name="diachi" readOnly class="form-control" placeholder="" value={this.state.diachi} onChange={this.handleInputChange}/>
            </div>
        </div>
            
        <div className="submit-button">
          <button className="nav-link btn btn-outline-main"><Link to="/editcanhan">Thay đổi thông tin</Link></button>
          <button className="nav-link btn btn-outline-main"><Link to="/thaydoi-pass">Thay đổi mật khẩu</Link></button>
          <button className="nav-link btn btn-outline-main"><Link to="/lichsu-donhang">Lịch sử đơn hàng</Link></button>
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