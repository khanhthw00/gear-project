import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap'
import { BsReplyFill } from "react-icons/bs";


const ChitietdonKH = (props) => {
      const [ctdonhang, sCTDonhang] = useState([]);
      const id = props.match.params.id
  
      const Donhang = () => {
        //console.log(idtk);
        console.log(id);
        axios.get(`http://localhost:3000/ctdh/${id}`)
          .then(res => {
            const ctdonhang = res.data;
            sCTDonhang(ctdonhang)
            console.log(ctdonhang);
          })
          .catch(error => console.log(error));
  
      }
  
      useEffect(() => {
        Donhang();
        //DonvaCTdon();
      }, [props])
  
  
   return (
      //console.log(this.state.idkh)
        //console.log(this.state.idsp, this.state.tensp, this.state.tieude, this.state.url, this.state.mota, this.state.soluong, this.state.gia);
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
            <Link to="/quanly-donhang"><BsReplyFill className="icon-react-logout"/></Link>
              <h4>Quản lí đơn hàng</h4>
              <br/>
              <br/>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                  {ctdonhang.map((data,index) =>
                    <tr>
                      <td>{index+1}</td>
                      <td>{data.TENSP}</td>
                      <td>{data.slmua}</td>
                      <td>{(data.DONGIA).toLocaleString()}đ</td>
                      <td>{(data.DONGIA * (data.slmua)).toLocaleString()}đ</td>
                    </tr>
                    )}
                  </tbody>
                </Table>
            </div>
        </div>
      </div>
      );
    }
export default ChitietdonKH;