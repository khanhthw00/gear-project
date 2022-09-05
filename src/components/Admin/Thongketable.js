import React, { Component, Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const viewModes = {
	SPBC: 0,
	SLCL: 1,
  DTTN: 2
}

var urlAPI = 'https://gear-api-project.herokuapp.com'

const Example =() => {
  const [startDate, setStartDate] = useState(new Date());
  const [date, sDate] = useState([])
  const [check, sCheck] = useState(false)
  let ngay = startDate.toLocaleDateString("fr-CA")
  
  const getNgay = (ngay) => { 
          axios.get(`${urlAPI}/thongketheongay/${ngay}`)
          .then(res => {
            const date = res.data;
            console.log(date)
            if(date[0].count === 0 && date[0].total=== null) {
              sCheck(false)
            }
            else{
              sCheck(true)
              sDate(date);
            }
          })
          .catch(error => console.log(error));
      }

    useEffect(() => {
      getNgay(ngay);
  }, [ngay])
  return (
    <Fragment>
      
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      maxDate={new Date()}
    />
      {!check ?
      <p className="notifications">Không có doanh thu trong ngày này</p> :
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Số đơn trong ngày</th>
          <th scope="col">Doanh thu theo ngày</th>
          </tr>
        </thead>
        {date.map(data => 
        <tbody>
          <tr>
              <td>{data.count}</td>
              <td>{(data.total).toLocaleString()}đ</td>
            </tr>
        </tbody>
          )}
        </table>
        }
      </Fragment>
  );
};

class Thongkesp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          sanpham: [],
          sanphamkho: [],
          date: [],
          activeTab: viewModes.SPBC
        }
    }

    componentDidMount() {
        axios.get(`${urlAPI}/thongkespbanchay`)
        .then(res => {
          const sanpham = res.data;
          this.setState({ sanpham: sanpham});
          console.log(sanpham)
        })
        .catch(error => console.log(error));

        axios.get(`${urlAPI}/thongkekho`)
        .then(res => {
          const sanphamkho = res.data;
          this.setState({ sanphamkho: sanphamkho});
          console.log(sanphamkho)
        })
        .catch(error => console.log(error));
    }

    setViewMode = (mode) => {
      this.setState({
        activeTab: mode
      })
    }

    render() {
      const {data, activeTab} = this.state;
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
              <h4>Thống kê sản phẩm</h4>
              <br/>
              <br/>
          <div>
          <div className="submit-button">
                    <a className={`nav-link btn btn-outline-main ${activeTab === viewModes.SPBC ? 'active' : ''}`} onClick={() => this.setViewMode(viewModes.SPBC)}>Sản phẩm bán chạy</a>
                    <a className={`nav-link btn btn-outline-main ${activeTab === viewModes.SLCL ? 'active' : ''}`} onClick={() => this.setViewMode(viewModes.SLCL)}>Số lượng còn trong kho</a>
                    <a className={`nav-link btn btn-outline-main ${activeTab === viewModes.DTTN ? 'active' : ''}`} onClick={() => this.setViewMode(viewModes.DTTN)}>Doanh thu theo ngày</a>
                </div>
            <div className="tab-content">
       
              { activeTab === viewModes.SPBC && <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">IDSP</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng đã bán</th>
                    </tr>
                  </thead>
                  {this.state.sanpham.map(data => 
                  <tbody>
                    <tr>
                      <th>{data.IDSP}</th>
                      <td>{data.TENSP}</td>
                      <td>{data.total}</td>
                    </tr>
                  </tbody>
                  )}
                </table> }
            
             {activeTab === viewModes.SLCL && <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">IDSP</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng còn lại</th>
                    </tr>
                  </thead>
                  {this.state.sanphamkho.map(data => 
                  <tbody>
                    <tr>
                      <th>{data.IDSP}</th>
                      <td>{data.TENSP}</td>
                      <td>{data.SOLUONG}</td>
                    </tr>
                  </tbody>
                  )}
                </table> }

                { activeTab === viewModes.DTTN && <Fragment>
                  <Example/>
                  </Fragment> }
              </div>
          </div>
          </div>
        </div>
      </div>
      );
    }
  }
export default Thongkesp;