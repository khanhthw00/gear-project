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
import Suasp from './Suasp';
// import Sanpham from './Sanpham';
// import Checkloai from './Checkloai';

// - ý là khi thêm loại thành công back về trang quản lý loại sp? có vì e có link vào k bk link đúng k 

class Suasanpham extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: []
		}
	};

//   componentDidMount() {
//       const id = this.props?.id
//       console.log(id);
//       axios.get(`http://localhost:3000/sanpham/${id}`)
//         .then(res => {
//           const news = res.data;
//          // console.log(news);
//           this.setState({ news: news.news });
//         })
//         .catch(error => console.log(error));
//     }

    

    render() {
       // console.log(this.state.news) 
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
         <Suasp id={this.props.match.params.id}/>
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
export default Suasanpham;