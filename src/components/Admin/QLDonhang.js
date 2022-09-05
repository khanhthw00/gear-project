import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { BsFillEyeFill, BsBoxArrowInDown,BsBoxArrowInRight, BsPencilSquare, BsFillXCircleFill, BsArrowClockwise } from "react-icons/bs";

import Trangthai from './Trangthai';
// import Sanpham from './Sanpham';
// import Checkloai from './Checkloai';

var urlAPI = 'https://gear-api-project.herokuapp.com'

class DonHang extends React.Component {
  
  state = {
    chinhsua: false,
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        idtrangthai: this.props.data.IDTRANGTHAI
      })
    }
  }


  getDonHang = () => {
    this.props.getDonHang()
  }

  toggleEdit = () => {
    this.setState({
      chinhsua: !this.state.chinhsua
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = Number(target.value);
    this.setState({
      idtrangthai: value
    });
  };

  handleInsertSubmit = (id) => {
    const newItem = {
        IDTRANGTHAI: this.state.idtrangthai
  };

  if(this.state.idtrangthai === 4) {
    axios.delete(`${urlAPI}/huydonhang/${id}`, {
              method:'DELETE',
              headers: {
                'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
      }).then(res => {
        if (res.data.status === 200) {
          this.getDonHang()
          alert("Thay đổi trạng thái thành công")
        }
        if (res.data.status === 400) {
          alert("Đơn hàng đã hủy hoặc đã được giao không thể thay đổi trạng thái khác")
        }
      })
  }
  else if(this.state.idtrangthai === 2) {
    alert("Không thể cập nhật trạng thái chưa duyệt!!!")
  }
  else {
    axios.put(`${urlAPI}/ttdonhang/${id}`, newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
      if (res.data.status === 200) {
        this.getDonHang()
        alert("Thay đổi trạng thái thành công")
      }
      if(res.data.status === 400) {
        alert("Đơn hàng đã hủy hoặc đã được giao không thể thay đổi trạng thái khác")
      }
        
    }).catch(error => console.error(error)); 
  }
 
}

  render() {
    const { data, keyTTArr, trangthai } = this.props;
    const { chinhsua } = this.state;
    const { check, dontheoid } = this.state;

    let keyTTIndex = keyTTArr && keyTTArr.indexOf(data.IDTRANGTHAI) 
    
    return (<tbody>
      <tr>
        <td>{data.IDDH}</td>
        <td>{data.IDKH}</td>
        <td>{data.HOTENKH}</td>
        <td>{data.SDTKH}</td>
        <td>{data.EMAILKH}</td>
        <td>{data.DIACHIKH}</td>
        <td><Moment format="YYYY/MM/DD">{data.NGAYGIAODICH}</Moment></td>
        <td>{data.GHICHU}</td>
        <td>{(data.TONGTIEN).toLocaleString()}đ</td>
        <td>{data.THANHTOAN}</td>
        <td>{chinhsua ? <Trangthai data={trangthai} handleInputChange={this.handleInputChange} idtrangthai={this.state.idtrangthai}/> : <p>{trangthai && trangthai[keyTTIndex].TRANGTHAI}</p>}</td>
        <td><Link to={`/ctdh/${data.IDDH}`}><BsFillEyeFill className="icon-react-ad"/></Link></td>
        {chinhsua && <td><Link onClick={() => this.handleInsertSubmit(data.IDDH)}><BsBoxArrowInDown className="icon-react-ad"/></Link></td> }
        <td>{chinhsua ? <a onClick={this.toggleEdit}><BsFillXCircleFill className="icon-react-ad"/> </a>  : <a onClick={this.toggleEdit}><BsPencilSquare className="icon-react-ad" /></a> }</td>
        <td> </td>
      </tr>
    </tbody> )
  }
}

class QLDonhang extends React.Component {
  state = {
    donhang: [],
    dontheoid: [],
    check: false,
    chinhsua: false,
    idloc: 0 
  }
  componentDidMount() { 

      this.getDonHang()
    
      axios.get(`${urlAPI}/trangthai`)
        .then(res => {
          const trangthai = res.data;
          this.setState({ trangthai: trangthai});
        
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

    handleGetSubmit = () => {
      const search = {
          IDTRANGTHAI: this.state.idloc
      };

      this.setState({check: true})
      axios.get(`${urlAPI}/donhangtheott/${search.IDTRANGTHAI}`).then(res => {
        
        const dontheoid = res.data;
        this.setState({ dontheoid: dontheoid});
        
      }).catch(error => console.error(error));

  }

  handleCheck = () => {
    this.setState({check: false})
  }

    getDonHang = () => {
      axios.get(`${urlAPI}/donhang`)
      .then(res => {
        const donhang = res.data;
        this.setState({ donhang: donhang});
        console.log(donhang)
      })
      .catch(error => console.log(error));
    }
      
    render() {
      const {  trangthai, idtrangthai } = this.state;
      const keyTTArr = trangthai && trangthai.map(tt =>  tt.IDTRANGTHAI)
      return (
      // if (isAdmin)
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
             <div className="design"><input type="text" className="form-control loc" name="idloc" placeholder="" onChange={this.handleInputChange}/><button onClick={this.handleGetSubmit}>Lọc mã TT</button></div>
             <p>(1: Đã giao hàng, 2: Chưa duyệt, 3: Đã duyệt, 4: Đã hủy)</p>
              <Link  onClick={()=>window.sessionStorage.clear()} to="/"><BsBoxArrowInRight className="icon-react-logout"/></Link>
              <Link onClick={this.handleCheck}><BsArrowClockwise className="icon-react-logout"/></Link>
              <h4>Quản lí đơn hàng</h4>
              <br/>
              <br/>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">IDDH</th>
                  <th scope="col">IDKH</th>
                  <th scope="col">Họ tên Khách hàng</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Email</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Ngày mua hàng</th>
                  <th scope="col">Ghi chú</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Thanh toán</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              {this.state.check && <Fragment>{this.state.dontheoid.map((data, i)=> <DonHang key={i} trangthai={trangthai} data={data} keyTTArr={keyTTArr} getDonHang={this.handleGetSubmit} />)} </Fragment>}

              {!this.state.check && <Fragment>{this.state.donhang.map((data, i) => <DonHang key={i} trangthai={trangthai} data={data} keyTTArr={keyTTArr} getDonHang={this.getDonHang} />  )} </Fragment>}
              
            </table>
          </div>
        </div>
      </div>
      );
    }
  }
export default QLDonhang;