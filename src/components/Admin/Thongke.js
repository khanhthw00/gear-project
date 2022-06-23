import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
// import Paper from '@material-ui/core/Paper';
// import {Chart, BarSeries, Title, ArgumentAxis, ValueAxis, Tooltip} from 
// '@devexpress/dx-react-chart-material-ui';
// import { EventTracker } from '@devexpress/dx-react-chart';
// import { List } from '@material-ui/core';

import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class Thongke extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: []
        }
    }

    componentDidMount() {
      axios.get(`http://localhost:3000/thongke`)
        .then(res => {
          const data = res.data;
          this.setState({ data: data });
          console.log(data)
        })
        .catch(error => console.log(error));
    }
 

    render() {
        const { data} = this.state;
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
              <h4>Thông kê doanh thu theo tháng trong năm</h4>
              <br/>
              <br/>
              

            <ResponsiveContainer className="chart" height={300}>
                <LineChart 
                width={600} 
                height={300} 
                data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                <XAxis dataKey="month"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{r: 8}}/>
                {/* <Line type="monotone" dataKey={this.state.SOLUONG} stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>

            <div className="submit-button">
              <button className="nav-link btn btn-outline-main"><Link to="/thongke-sanpham">Thống kê sản phẩm</Link></button>
              <button className="nav-link btn btn-outline-main"><Link to="/thongkekhoangtg">Thống kê có thời gian</Link></button>
            </div>
          </div>
        </div>
      </div>

      );
    }
  }
export default Thongke;