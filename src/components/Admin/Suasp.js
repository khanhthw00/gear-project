import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';
import CbbLoai from '../Admin/CbbLoai';

var urlAPI = 'https://gear-api-project.herokuapp.com'

class Suasp extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: [],
            idsp: 0,
            tensp: "",
            soluong: 0,
            gia: 0,
            // giakm: 0,
            mota: "", 
            tieude: "",
            url: "",
            idloai: 0

		}
	};

    componentDidMount() {
      const id = this.props?.id

     // console.log(id);
      axios.get(`${urlAPI}/sanpham/${id}`)
        .then(res => {
            //console.log(res);
          const news = res.data;
          console.log(news.IDSP);
          this.setState({ news: news, idsp: news.IDSP, tensp: news.TENSP, soluong: news.SOLUONG, gia: news.GIA, mota: news.MOTA, tieude: news.TIEUDE, url: news.URLSP, idloai: news.IDLOAI });
          //console.log(news[0]);
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

        const id = this.props?.id;
        axios.put(`${urlAPI}/sanpham/${id}`, newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
            console.log(res)
            if (res.data.status === 400) {
                alert("Sản phẩm đã tồn tại xin vui lòng thay đổi!!! ")
            }
  
            if (res.data.status === 200) {
                alert("Update sản phẩm thành công ")
                window.location.href = `/quanly-sanpham`
            }

            let news = this.state.news;
            news = [newItem, ...news];
            this.setState({news: news});    

        }).catch(error => console.error(error));
    }

    isValid = () => {
        if(this.state.soluong === "" || this.state.soluong < 0)
        {
            this.setState({soluong: 0})
        }
        if(this.state.gia === "" || this.state.gia < 0)
        {
            this.setState({gia: 0})
        }
        // if(this.state.giakm === "" || this.state.giakm < 0)
        // {
        //     this.setState({giakm: 0})
        // }
        return this.state.tensp !== "" && this.state.url !== "" && this.state.tieude !== "" && this.state.mota !== "" 
    }

    render() {
        //console.log(this.state.idsp, this.state.tensp, this.state.tieude, this.state.url, this.state.mota, this.state.soluong, this.state.gia);
      return (
        <div className="col-8 admin-fields">
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">ID sản phẩm </label>
            <div className="col-sm-10">
                <input type="text" readOnly class="form-control" value={this.state.idsp} placeholder=""/> 
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Tên sản phẩm: </label>
            <div className="col-sm-10">
              <input type="text" name="tensp" className={`form-control ${this.state.tensp === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.tensp} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Loại sản phẩm: </label>
            <CbbLoai handleInputChange={this.handleInputChange} idloai={this.state.idloai} />
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Số lượng: </label>
            <div className="col-sm-4">
                <input type="number" min="0" name="soluong" class="form-control" placeholder="" value={this.state.soluong} onChange={this.handleInputChange}/>
            </div>
            <label className="col-sm-2 col-form-label">Giá bán: </label>
            <div className="col-sm-4">
                <input type="number" min="0" class="form-control" name="gia" placeholder="" value={this.state.gia} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            {/* <label className="col-sm-2 col-form-label">Giá khuyến mãi: </label>
            <div className="col-sm-4">
                <input type="number" min="0" name="giakm" class="form-control" placeholder="" value={this.state.giakm} onChange={this.handleInputChange}/>
            </div> */}
            <label className="col-sm-2 col-form-label">Tiêu đề: </label>
            <div className="col-sm-10">
                <input type="text" name="tieude" className={`form-control ${this.state.tieude === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.tieude} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Mô tả: </label>
            <div className="col-sm-10">
                <input type="text" name="mota" className={`form-control ${this.state.mota === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.mota} onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Link ảnh SP: </label>
            <div className="col-sm-10">
                <input type="text" name="url" className={`form-control ${this.state.url === "" ? 'is-invalid' : 'is-valid'}`} placeholder="" value={this.state.url} onChange={this.handleInputChange}/>
            </div>
        </div>
        
    <div className="submit-button">
      <button className="nav-link btn btn-outline-main" disabled={this.isValid() ? '' : true }  onClick={this.handleInsertSubmit}>Update sản phẩm</button>
      <button className="nav-link btn btn-outline-main"><Link to="/quanly-sanpham">Hủy thao tác</Link></button>
    </div>
  </div>
      );
    }
  }
export default Suasp;