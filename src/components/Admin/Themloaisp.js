import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';

// import Banmain from '../images/banner_main.jpg';
// import banside1 from '../images/banner_side_1.jpg';
// import banside2 from '../images/banner_side_2.jpg';
// import bgkeyboard from '../images/bg_keyboard.png';
// import bgheadphone from '../images/bg_headphone.png';
// import bgmouse from '../images/bg_mouse.png';
// import p1 from '../images/p_1.png';
import p2 from '../../images/p_2.png';
// import p3 from '../images/p_3.png';
// import p4 from '../images/p_4.png';
import Banproduct from '../../images/banner_product.jpg';
// import Sanpham from './Sanpham';
// import Checkloai from './Checkloai';

// - ý là khi thêm loại thành công back về trang quản lý loại sp? có vì e có link vào k bk link đúng k 

class Themloaisp extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: []
		}
	};

  componentDidMount() {
      this.refreshCheckFilled()
      axios.get(`http://localhost:3000/loaisanpham`)
        .then(res => {
          const news = res.data;
          this.setState({ news: news.news });
        })
        .catch(error => console.log(error));
  }

  refreshCheckFilled = () => {
    this.setState({isNameFilled: undefined})
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
    if(name === "tenloai"){
      this.checkValidInput(value, "isNameFilled")
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
            TENLOAI: this.state.tenloai 
        };
        axios.post("http://localhost:3000/loaisanpham", newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {
            if (res.data.status === 500) {
                alert("Loại sản phẩm đã tồn tại xin vui lòng thay đổi!!! ")
            }
            if (res.data.status === 200) {
                alert("Thêm loại sản phẩm thành công ")
                window.location.href = `/quanly-loaisp`
            }
            let news = this.state.news;
            news = [newItem, ...news];
            this.setState({news: news});
        }).catch(error => console.error(error));
        // window.location.href = `/quanly-loaisp`
    }

    render() {
        //console.log(this.state.news) 
        const isValid = () => {
          return this.state.isNameFilled === true 
          }
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
                    <label className="col-sm-2 col-form-label">Tên loại sản phẩm: </label>
                    <div className="col-sm-10">
                        <input type="text" className={`form-control ${this.state.isNameFilled === undefined ? "" : this.state.isNameFilled === true ? 'is-valid' : 'is-invalid'}`} name="tenloai" placeholder="" onChange={this.handleInputChange}/>
                    </div>
                </div>                
            <div className="submit-button">
            <button className="nav-link btn btn-outline-main" onClick={this.handleInsertSubmit} disabled={isValid() ? '' : true }>Thêm loại sản phẩm</button>
              <button className="nav-link btn btn-outline-main"><Link to="/quanly-loaisp">Hủy thao tác</Link></button>
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
export default Themloaisp;