import React from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';

import Banproduct from '../../images/banner_product.jpg';
import Sanpham from './Sanpham';
import Checkloai from './Checkloai';


// class Sanphampage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           data: [],
//           check: false,
//           strSearch: ""
//         }
//     }
    
//     componentDidMount() {
//         axios.get(`http://localhost:3000/sanpham`)
//           .then(res => {
//             const data = res.data;
//             this.setState({ data: data});
//             console.log(data)
//           })
//           .catch(error => console.log(error));
//       }

//       handleInputChange = (event) => {
//           this.setState({check: true})
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//       };
  
//       handleInsertSubmit = () => {
//         let itemsOrigin = this.state.data;
//         let items = [];
//         const search = this.state.strSearch;
//         this.setState({ check: true});
//         if(search.length > 0) {
//             itemsOrigin.forEach((item) =>  {
//                 if(item.TENSP.toLowerCase().indexOf(search) !== -1){
//                     items.push(item)
//                     // console.log(item)
//                     // console.log("hihi")
//                 }
//             });
//         } else {
//             items = itemsOrigin;
//         }
//       }

//     render() {

//         return (
//             <div>
//                 <section>
//                     <div className="banner-product__sect" style={{background: `url(${Banproduct}) no-repeat`, backgroundSize: '100%', minHeight: '500px'}}> 
//                         <div className="container">
//                             <div className="banner-product__ct"> 
//                             <div className="main-content"> 
//                                 <h4 className="title">GAMING GEAR HIGHEND TGG </h4>
//                                 <p>Corsair đi đầu xu hướng về công nghệ của thế giới, hứa hẹn sẽ đem đến trải nghiệm tuyệt vời cho bạn</p>
//                                 {/* <a className="btn btn-main">MUA NGAY</a> */}
//                             </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="list-products__sect"> 
//                         <div className="container"> 
//                             <div className="row">
//                                 <div className="col-md-2 mr-3">
//                                     <div className="main-filter">
//                                     </div>
//                                 </div>
                                
//                                 <div className="col-md-8">
//                                 <div className="row searchsp">
//                                     <form className="d-flex">
//                                         <input className="form-control me-2" type="search" name="noidung" placeholder="Search" aria-label="Search" onChange={this.handleInputChange}/>
//                                         <button onClick={this.handleSubmit}>Tìm kiếm</button>
//                                     </form>
//                                 </div>
//                                     {/* <div className="sub-filter d-flex">
//                                         <div className="for-filter">
//                                             <select className="form-select" aria-label="Default select example">
//                                             <option selected>9 sản phẩm</option>
//                                             <option value={1}>One</option>
//                                             <option value={2}>Two</option>
//                                             <option value={3}>Three</option>
//                                             </select>
//                                         </div>
//                                         <div className="for-filter">
//                                             <select className="form-select" aria-label="Default select example">
//                                             <option selected>Phổ biến</option>
//                                             <option value={1}>One</option>
//                                             <option value={2}>Two</option>
//                                             <option value={3}>Three</option>
//                                             </select>
//                                         </div>
//                                     </div> */}
//                                     <div className="item-product__wrap d-flex"> 
//                                     {!this.state.check ?
//                                         <Sanpham id={this.props.match.params.id}/> :
//                                         <Sanpham id={this.state.IDSP}/>
//                                     }
//                                     </div>
//                                 </div>
//                                 <div className="col-md-2 mr-3">
//                                     <div className="main-filter">
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//               <Footer/>
//             </div>
          
//         );
//     }
// };


class Sanphampage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       data: [],
    //       check: false,
    //       strSearch: ""
    //     }
    // }

    // componentDidMount() {
    //     axios.get(`http://localhost:3000/thongkesp`)
    //       .then(res => {
    //         const data = res.data;
    //         this.setState({ data: data});
    //         console.log(data)
    //       })
    //       .catch(error => console.log(error));
    //   }

    render() {
        return (
            <div>
                <section>
                    <div className="banner-product__sect" style={{background: `url(${Banproduct}) no-repeat`, backgroundSize: '100%', minHeight: '500px'}}> 
                        <div className="container">
                            <div className="banner-product__ct"> 
                            <div className="main-content"> 
                                <h4 className="title">GAMING GEAR HIGHEND TGG </h4>
                                <p>Corsair đi đầu xu hướng về công nghệ của thế giới, hứa hẹn sẽ đem đến trải nghiệm tuyệt vời cho bạn</p>
                                {/* <a className="btn btn-main">MUA NGAY</a> */}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-products__sect"> 
                        <div className="container"> 
                            <div className="row">
                                <div className="col-md-2 mr-3">
                                    <div className="main-filter">
                                    </div>
                                </div>
                                
                                <div className="col-md-8">
                                {/* <div className="row searchsp">
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    </form>
                                </div> */}
                                    {/* <div className="sub-filter d-flex">
                                        <div className="for-filter">
                                            <select className="form-select" aria-label="Default select example">
                                            <option selected>9 sản phẩm</option>
                                            <option value={1}>One</option>
                                            <option value={2}>Two</option>
                                            <option value={3}>Three</option>
                                            </select>
                                        </div>
                                        <div className="for-filter">
                                            <select className="form-select" aria-label="Default select example">
                                            <option selected>Phổ biến</option>
                                            <option value={1}>One</option>
                                            <option value={2}>Two</option>
                                            <option value={3}>Three</option>
                                            </select>
                                        </div>
                                    </div> */}
                                    <div className="item-product__wrap d-flex"> 
                                        <Sanpham id={this.props.match.params.id}/>
                                    </div>
                                </div>
                                <div className="col-md-2 mr-3">
                                    <div className="main-filter">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
              <Footer/>
            </div>
          
        );
    }
};

export default Sanphampage;