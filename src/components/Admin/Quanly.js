import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {BsPlusSquare,BsBoxArrowInRight } from "react-icons/bs";

var urlAPI = 'https://gear-api-project.herokuapp.com'

class Quanly extends React.Component {

  state = {
    sanpham: [],
    err: 100 // loading
  }

  componentDidMount() {
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var id = data?.[0] ? data?.[0]?.IDQUYEN : null

      console.log(data, id)
     
      this.setState({
        err: 0, //success
        idAdmin: id
      })

      axios.get(`${urlAPI}/sanpham`)
        .then(res => {
          const sanpham = res.data;
          this.setState({ sanpham: sanpham });
        })
        .catch(error => console.log(error));
    }

    

    handleDeleteSubmit = (id) => {
      if(window.confirm('Bạn chắc chắn muốn xóa không?'))
      {
        axios.get(`${urlAPI}/sptrongdh/${id}`)
        .then(res => {
          if (res.data.status === 200) {
            alert("Sản phẩm tồn tại trong đơn hàng không thể xóa!!")
          }
          if (res.data.status === 400) {
            axios.delete(`${urlAPI}/sanpham/${id}`, {
              method:'DELETE',
              headers: {
                'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
            })
          }
          window.location.href = `/quanly-sanpham`
        })
        .catch(error => console.log(error));
      }
    }
      

    render() {
      let content;
      const { idAdmin } = this.state;


      if (this.state.err === 100) {
        content = <p>Loading</p>
      } else if (this.state.err === 0 && idAdmin && idAdmin === 1 ){

        content = <div className="admin">
          
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
                    <th scope="col">#</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên Sản phẩm</th>
                    <th scope="col">Loại</th>
                    <th scope="col">SL</th>
                    <th scope="col">Giá bán</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Tiêu đề</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {this.state.sanpham.map(data => 
                <tbody>
                  <tr>
                    <td>{data.IDSP}</td>
                    <td><img src={data.URLSP}/></td>
                    <td>{data.TENSP}</td>
                    <td>{data.TENLOAI}</td>
                    <td>{data.SOLUONG}</td>
                    <td>{data.GIA.toLocaleString()}đ</td>
                    {/* <td>{data.GIAKM.toLocaleString()}đ</td> */}
                    <td>{data.MOTA}</td>
                    <td>{data.TIEUDE}</td>
                    <td><button><Link to={`/editsp/${data.IDSP}`}>Sửa</Link></button></td>
                    <td><button onClick={() => this.handleDeleteSubmit(data.IDSP)}>Xóa</button></td>
                    <td> </td>
                  </tr>
                </tbody>
                )}
              </table>
              
            </div>
          </div>
        </div>

      }  else {

        content=<Redirect to="/notpermission" />
      }

      return (
        
          <React.Fragment> 
              {content}
          </React.Fragment>
      );
    }
  }
export default Quanly;