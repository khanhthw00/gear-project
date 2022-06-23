import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";


// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';

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



class QLLoaisp extends React.Component {

  state = {
    loaisanpham: [],
    sptheoloai: []
  }

  componentDidMount() {
      axios.get(`http://localhost:3000/loaisanpham`)
        .then(res => {
          const loaisanpham = res.data;
          this.setState({ loaisanpham: loaisanpham });
        })
        .catch(error => console.log(error));
    }

    handleDeleteSubmit(id)
    {
      if(window.confirm('Bạn chắc chắn muốn xóa không?'))
      {
        axios.delete(`http://localhost:3000/loaisanpham/${id}`, {
          method:'DELETE',
          headers: {
            'Accept': 'application/json',
					'Content-Type': 'application/json'
          }
        }).then(res => { 
            if(res.data.status === 500)
            {
              alert("Tồn tại sản phẩm thuộc loại này, không thể xóa!!!")
            }
            if(res.data.status === 200)
            {
              alert("Xóa loại sản phẩm thành công")
              window.location.href = `/quanly-loaisp`
            }
        })
      }
    }


    render() {
      return (
      <div className="admin">
        <div className="row">
          <div className="col-2 admin-col">
          <ul>
          <li><Link to="/quanly-sanpham">Quản lý sản phẩm</Link></li>
                <li><Link to="/quanly-loaisp">Quản lý loại sản phẩm</Link></li>
                <li><Link to="/quanly-donhang">Quản lý đơn hàng</Link></li>
                <li><Link to="/quanly-khachhang">Quản lý tài khoản KH</Link></li>
                <li><Link to="/thongke">Thống kê dạng biểu đồ</Link></li>
                <li><Link to="/thongketable">Thống kê dạng bảng</Link></li>
            </ul>
          </div>
          <div className="col-10 admin-fields">
              <Link to="/" onClick={()=>window.sessionStorage.clear()}><BsBoxArrowInRight className="icon-react-logout"/></Link>
              <Link to="/addlsp"><BsPlusSquare className="icon-react-logout"/></Link>
              <h4>Quản lí loại sản phẩm</h4>
              <br/>
              <br/>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên loại</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              {this.state.loaisanpham.map(data => 
              <tbody>
                <tr>
                  <th>{data.IDLOAI}</th>
                  <td>{data.TENLOAI}</td>
                  <td><button><Link to={`/editlsp/${data.IDLOAI}`}>Sửa</Link></button></td>
                  <td><button onClick={() => this.handleDeleteSubmit(data.IDLOAI)}>Xóa</button></td>
                </tr>
              </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      );
    }
  }
export default QLLoaisp;