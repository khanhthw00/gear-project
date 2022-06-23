import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap'
import { BsArrowLeft } from "react-icons/bs";


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
            <div className="col-1 admin-col">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div> 
            <div className="col-10 admin-fields">
            <Link to="/lichsu-donhang"><BsArrowLeft className="react-icon-back"/></Link>
                <br/>
                <br/>
              <h4>Chi tiết đơn mua</h4>
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
          <div className="col-1 admin-col">
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
export default ChitietdonKH;