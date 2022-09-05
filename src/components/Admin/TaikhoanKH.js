import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";

var urlAPI = 'https://gear-api-project.herokuapp.com'

class TaikhoanKH extends React.Component {

  state = {
    thongtin: []
  }

  componentDidMount() {
      axios.get(`${urlAPI}/tkkh`)
        .then(res => {
          const thongtin = res.data;
          this.setState({ thongtin: thongtin });
        })
        .catch(error => console.log(error));
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
            <Link to="/addsp"><BsPlusSquare className="icon-react-logout"/></Link>
              <h4>Quản lí sản phẩm</h4>
              <br/>
              <br/>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">IDKH</th>
                  <th scope="col">Tên Khách hàng</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                </tr>
              </thead>
              {this.state.thongtin.map(data => 
              <tbody>
                <tr>
                  <th>{data.IDKH}</th>
                  <td>{data.HOTEN}</td>
                  <td>{data.USERNAME}</td>
                  <td>{data.EMAIL}</td>
                  <td>{data.SDT}</td>
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
export default TaikhoanKH;