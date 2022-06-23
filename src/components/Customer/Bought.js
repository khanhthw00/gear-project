import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap'
import Moment from 'react-moment';
import { BsArrowLeft } from "react-icons/bs";
import { BsFillEyeFill} from "react-icons/bs";

const Bought = (props) => {
      const [donhang, sDonhang] = useState([]);
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var idtk = data?.[0] ? data?.[0]?.IDTK : null
  
      const Donhang = () => {
        //console.log(idtk);
        axios.get(`http://localhost:3000/donhang/${idtk}`)
          .then(res => {
            const donhang = res.data;
            sDonhang(donhang)
            console.log(donhang);
          })
          .catch(error => console.log(error));
  
      }

      const handleDeleteSubmit = (iddh) => {
        if(window.confirm('Bạn chắc chắn muốn hủy đơn không?'))
        {
          axios.get(`http://localhost:3000/tttrangthai/${iddh}`)
          .then(res => {
            if(res.data.status === 200) {
              axios.delete(`http://localhost:3000/huydonhang/${iddh}`, {
                method:'DELETE',
                headers: {
                  'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
              })
              window.location.href = `/lichsu-donhang`
              
            }
            else{
              alert("Đơn hàng đã được duyệt hoặc đang vận chuyển không thể hủy đơn!!!")
            }
          })
          .catch(error => console.log(error));

          // sCheckout(false);

        }
        
      }
  
      useEffect(() => {
        Donhang();
        //DonvaCTdon();
      }, [idtk])
  
  
   return (
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
            <div className="col-10 canhan-fields">
            <Link to="/canhan"><BsArrowLeft className="react-icon-back"/></Link>
            <br/>
            <br/>
              <h4>Lịch sử mua hàng</h4>
              <br/>
              <br/>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên người nhận</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Ngày mua hàng</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Tổng tiền</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {donhang.map((data,index) =>
                    <tr>
                      <td>{index+1}</td>
                      <td>{data.HOTENKH}</td>
                      <td>{data.SDTKH}</td>
                      <td>{data.DIACHIKH}</td>
                      <td><Moment format="YYYY/MM/DD">{data.NGAYGIAODICH}</Moment></td>
                      <td>{data.THANHTOAN}</td>
                      <td>{data.TRANGTHAI}</td>
                      <td>{(data.TONGTIEN).toLocaleString()}đ</td>
                      <td><Link to={`/ctdondamua/${data.IDDH}`}><BsFillEyeFill className="icon-react-ad"/></Link></td>
                      {data.IDTRANGTHAI === 2 ? <td> <button onClick={()=>handleDeleteSubmit(data.IDDH)}>Hủy đơn hàng</button></td> : <td></td>}
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
export default Bought;