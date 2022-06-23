import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import CbbLoai from '../Admin/CbbLoai';

class Themsp extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      news: [],
      tensp: "",
      soluong: 0,
      gia: 0,
      // giakm: 0,
      mota: "", 
      tieude: "",
      url: "",
      idloai: ""
		}
	};

  componentDidMount() {
      this.refreshCheckFilled()
      axios.get(`http://localhost:3000/loaisanpham`)
        .then(res => {
          const news = res.data;
          this.setState({ news: news.news});
          console.log(news);
        })
        .catch(error => console.log(error));
        
    }

    refreshCheckFilled = () => {
      this.setState({isNameFilled: undefined, isMotaFilled: undefined, isTieudeFilled: undefined, isUrlFilled: undefined})
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if(name === "tensp"){
          this.checkValidInput(value, "isNameFilled")
        }
        if(name === "tieude"){
            this.checkValidInput(value, "isTieudeFilled")
        }
        if(name === "mota"){
            this.checkValidInput(value, "isMotaFilled")
        }
        if(name === "url"){
            this.checkValidInput(value, "isUrlFilled")
        } 
    };

    checkValidInput = (value, state) => {
      if (value !== "") {
        this.setState({ [state]: true})
      } else {
        this.setState({ [state]: false})
      }
    }

    handleInsertSubmit = () => {
        const newItem = {
            TENSP: this.state.tensp,
            SOLUONG: this.state.soluong,
            GIA: this.state.gia,
            GIAKM: 0,
            MOTA: this.state.mota,
            TIEUDE: this.state.tieude,
            URLSP: this.state.url,
            IDLOAI: this.state.idloai,
        };

        if(newItem.SOLUONG === "" || newItem.SOLUONG < 0)
        {
          newItem.SOLUONG = 0
        }
        if(newItem.GIA === "" || newItem.GIA < 0)
        {
          newItem.GIA = 0
        }
        // if(newItem.GIAKM === "" || newItem.GIAKM < 0)
        // {
        //   newItem.GIAKM = 0
        // }
        if(newItem.IDLOAI === "")
        {
          newItem.IDLOAI = 1
        }
        //console.log(newItem)
        axios.post("http://localhost:3000/sanpham", newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
          console.log(res)
            if (res.data.status === 500) {
                alert("Sản phẩm đã tồn tại xin vui lòng thay đổi!!! ")
            }
  
            if (res.data.status === 200) {
                alert("Thêm sản phẩm thành công ")
                window.location.href = `/quanly-sanpham`
            }

            let news = this.state.news;
            news = [newItem, ...news];
            this.setState({news: news});
        }).catch(error => console.error(error));

    }

    render() {
      const isValid = () => {
        return this.state.isNameFilled === true && this.state.isTieudeFilled === true && this.state.isMotaFilled === true && this.state.isUrlFilled === true
        }
      //console.log(this.state.news);
      return (
      <div className="admin">
        <div className="row">
          <div className="col-2 admin-col">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="col-8 admin-fields">
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Tên sản phẩm: </label>
                    <div className="col-sm-10">
                      <input type="text" name="tensp" className={`form-control ${this.state.isNameFilled === undefined ? "" : this.state.isNameFilled === true ? 'is-valid' : 'is-invalid'}`}  placeholder="" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Loại sản phẩm: </label>
                    <CbbLoai handleInputChange={this.handleInputChange} idloai={this.state.idloai} />
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Số lượng: </label>
                    <div className="col-sm-4">
                        <input type="number" min="0" name="soluong" class="form-control" placeholder="" onChange={this.handleInputChange}/>
                    </div>
                    <label className="col-sm-2 col-form-label">Giá bán: </label>
                    <div className="col-sm-4">
                        <input type="number" min="0" name="gia" class="form-control" placeholder="" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    {/* <label className="col-sm-2 col-form-label">Giá khuyến mãi: </label> */}
                    {/* <div className="col-sm-4">
                        <input type="number" min="0" name="giakm" class="form-control" placeholder="" onChange={this.handleInputChange}/>
                    </div> */}
                    <label className="col-sm-2 col-form-label">Tiêu đề: </label>
                    <div className="col-sm-10">
                        <input type="text" name="tieude" className={`form-control ${this.state.isTieudeFilled === undefined ? "" : this.state.isNameFilled === true ? 'is-valid' : 'is-invalid'}`}  placeholder="" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Mô tả: </label>
                    <div className="col-sm-10">
                        <input type="text" name="mota" className={`form-control ${this.state.isMotaFilled === undefined ? "" : this.state.isNameFilled === true ? 'is-valid' : 'is-invalid'}`}  placeholder="" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Link ảnh SP: </label>
                    <div className="col-sm-10">
                        <input type="text" name="url" className={`form-control ${this.state.isUrlFilled === undefined ? "" : this.state.isNameFilled === true ? 'is-valid' : 'is-invalid'}`}  placeholder="" onChange={this.handleInputChange}/>
                    </div>
                </div>
                
            <div className="submit-button">
              <button className="nav-link btn btn-outline-main"  onClick={this.handleInsertSubmit} disabled={isValid() ? '' : true }>Thêm sản phẩm</button>
              <button className="nav-link btn btn-outline-main"><Link to="/quanly-sanpham">Hủy thao tác</Link></button>
            </div>
          </div>
          <div className="col-2 admin-col">
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
  }
export default Themsp;