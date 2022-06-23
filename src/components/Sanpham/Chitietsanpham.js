import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';


const Chitietsanpham = (props) => {
    const [sp, setSP] = useState({});
    const [thumb, sThumb] = useState("https://ayjoe.engrave.site/img/default.jpg")

    const ServerFetching = () => {
        axios.get(`http://localhost:3000/sanpham/${props.match.params?.id}`)
        .then(res => {
            const {data} = res;
            setSP({...data})
            sThumb(data.URLSP)
            window.scrollTo(0, 0)
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        ServerFetching();
    }, [])

        return (
            <div>
                <section>
                <div className="product-detail__sect"> 
                    <div className="container d-flex">
                    <div className="left"> <img className="img-fluid" onError={()=> sThumb("https://ayjoe.engrave.site/img/default.jpg")} src={thumb} /></div>
                    <div className="right"> 
                        <h4 className="name">{sp?.TENSP}</h4>
                        {/* <p className="brand text-note">Thương hiệu<span className="text-danger">	IKBC </span></p> */}
                        <p className="text-danger price">{sp.GIA?.toLocaleString()}đ</p>
                        <div className="wrap2btn d-flex"><Muangay {...sp}/><ThemGioHang {...sp}/></div>
                        <div className="product-content"> 
                        <h5>Thông tin sản phẩm</h5>
                        <p className="text-note"><span className="bold">Mô tả ngắn gọn: </span>	{sp.TIEUDE} </p>
                        <p className="text-note"><span className="bold">Số lượng còn: </span>	{sp.SOLUONG}</p>
                        <button ><Link className="btn btn-default" to={`/sanpham-theoloai/${sp.IDLOAI}`}>TIẾP TỤC XEM</Link></button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mini-banner__sect"> 
                    <h4>
                    TẶNG KÈM KÊ TAY DA THẾ GIỚI GEAR TRỊ GIÁ <span className="text-danger mini">199.000 VND </span>	MUA CÙNG CHUỘT VỚI NHIỀU ƯU ĐÃI HẤP DẪN!!!</h4>
                </div>
                <div className="info-product__sect">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">MÔ TẢ SẢN PHẨM</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">BÌNH LUẬN KHÁCH HÀNG</button>
                    </li>
                    </ul>
                    <div className="container"> 
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="entry-content" dangerouslySetInnerHTML={{__html: sp?.MOTA}}/>
                        <div className="entry-content" dangerouslySetInnerHTML={{__html: sp?.MOTA}}/>
                        <div className="entry-content" dangerouslySetInnerHTML={{__html: sp?.MOTA}}/>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                    </div>
                    </div>
                </div>
                </section>
                <Footer/>
            </div>
        );
}; 

const ThemGioHang = (props) => {
    let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
    var idtk = data?.[0] ? data?.[0]?.IDTK : null
    let idsp = props.IDSP;
  
    const AddSP = () => {
        if(idtk === null){
            window.location.href = `/login`;
        }else {
            var objectInput = { 
                IDTK: idtk,
                IDSP: props.IDSP,
                SOLUONG: 1
            }
            axios.post(`http://localhost:3000/giohang/`, objectInput)
            .then(res => {
                var {status} = res.data;
                if(status === 200){
                    alert("Thêm sản phẩm thành công")
                }else{
                    alert("Kho không đủ số lượng")
                }
            })
            .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        props && console.log(props)
    }, [props])

    return(<button className="btn btn-default" onClick={AddSP.bind(this)}>THÊM VÀO GIỎ</button>)
}

const Muangay = (props) => {
    let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
    var idtk = data?.[0] ? data?.[0]?.IDTK : null
    let idsp = props.IDSP;    

    const MuaSP = () => {

        if(idtk === null) {
            window.location.href = `/login`;
        }
        else {
            var objectInput = { 
                IDTK: idtk,
                IDSP: props.IDSP,
                SOLUONG: 1
            }

            axios.post(`http://localhost:3000/giohang/`, objectInput)
            .then(res => {
                var {status} = res.data;
                if(status === 200){
                    window.location.href = `/giohang`;
                }else{
                    alert("Kho không đủ số lượng")
                }
               
            })
            .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        props && console.log(props)
    }, [props])


    return(<button className="btn btn-main" onClick={MuaSP.bind(this)}>MUA NGAY</button>)
}


export default Chitietsanpham;