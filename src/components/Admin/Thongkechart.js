import React, { Component, Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment, {moment} from 'react-moment';
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const Example =() => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [thongke, sThongke] = useState([])
    const [check, sCheck] = useState(false)
    let ngaybd = startDate.toLocaleDateString("fr-CA")
    let ngaykt = endDate.toLocaleDateString("fr-CA")
    
    const getThongke = (ngaybd, ngaykt) => { 
            axios.get(`http://localhost:3000/thongketrongkhoang/${ngaybd}/${ngaykt}`)
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
        <p className="notifications">Kh??ng c?? doanh thu trong ng??y n??y</p> :
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
                <li><Link to="/quanly-sanpham">Qu???n l?? s???n ph???m</Link></li>
                <li><Link to="/quanly-loaisp">Qu???n l?? lo???i s???n ph???m</Link></li>
                <li><Link to="/quanly-donhang">Qu???n l?? ????n h??ng</Link></li>
                <li><Link to="/quanly-khachhang">Qu???n l?? t??i kho???n KH</Link></li>
                <li><Link to="/thongke">Th???ng k?? d???ng bi???u ?????</Link></li>
                <li><Link to="/thongketable">Th???ng k?? d???ng b???ng</Link></li>
            </ul>
          </div>
          <div className="col-10 admin-fields">
            <Link to="/" onClick={()=>window.sessionStorage.clear()}><BsBoxArrowInRight className="icon-react-logout"/></Link>
              <h4>Th??ng k?? doanh thu trong kho???ng th???i gian</h4>
              <br/>
              <br/>
              <Example/>

            <div className="submit-button">
            <button className="nav-link btn btn-outline-main"><Link to="/thongke">Th???ng k?? doanh thu theo th??ng</Link></button>
              <button className="nav-link btn btn-outline-main"><Link to="/thongke-sanpham">Th???ng k?? s???n ph???m</Link></button>
            </div>
          </div>
        </div>
      </div>

      );
    }
  }
export default Thongkechart;