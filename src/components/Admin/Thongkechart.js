import React, { Component, Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment, {moment} from 'react-moment';
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var urlAPI = 'https://gear-api-project.herokuapp.com'

const Example =() => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [thongke, sThongke] = useState([])
    const [check, sCheck] = useState(false)
    let ngaybd = startDate.toLocaleDateString("fr-CA")
    let ngaykt = endDate.toLocaleDateString("fr-CA")
    
    const getThongke = (ngaybd, ngaykt) => { 
            axios.get(`${urlAPI}/thongketrongkhoang/${ngaybd}/${ngaykt}`)
            .then(res => {
              const thongke = res.data;
            //   console.log(thongke)
              sThongke(thongke)
              
              if(thongke.length === 0) {
                sCheck(false)
              }
              else{
                sCheck(true)
                sThongke(thongke);
              }
            })
            .catch(error => console.log(error));
        }
  
      useEffect(() => {
        getThongke(ngaybd, ngaykt);
    }, [ngaybd, ngaykt])

    return (
      <Fragment>
      <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
        />
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}/>
        {!check ?
        <p className="notifications">Không có doanh thu trong ngày này</p> :
            <ResponsiveContainer className="chart" height={300}>
                <LineChart 
                width={600} 
                height={300} 
                data={thongke}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                <XAxis dataKey="DATE"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="TOTAL" stroke="#8884d8" activeDot={{r: 8}}/>
                {/* <Line type="monotone" dataKey={this.state.SOLUONG} stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
                }
            </Fragment>
    );
  };
  

class Thongkechart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: []
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
              <h4>Thông kê doanh thu trong khoảng thời gian</h4>
              <br/>
              <br/>
              <Example/>

            <div className="submit-button">
            <button className="nav-link btn btn-outline-main"><Link to="/thongke">Thống kê doanh thu theo tháng</Link></button>
              <button className="nav-link btn btn-outline-main"><Link to="/thongke-sanpham">Thống kê sản phẩm</Link></button>
            </div>
          </div>
        </div>
      </div>

      );
    }
  }
export default Thongkechart;