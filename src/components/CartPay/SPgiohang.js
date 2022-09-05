import React, { Fragment, useState, useEffect } from 'react';
import {Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Soluong from './Soluong';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';

var urlAPI = 'https://gear-api-project.herokuapp.com'

const SPgiohang = () => {
    const [giohang, sGiohang] = useState([])

    useEffect(() => {
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var id = data?.[0] ? data?.[0]?.IDTK : null
        if(id){
            axios.get(`${urlAPI}/giohang/${id}`)
            .then(res => {
              const giohang = res.data;
              sGiohang(giohang);
            })
            .catch(error => console.log(error));
        }
    }, [])

    const ChangeInputSL = (i, input) => {
      var value = input.target.value;
      if(giohang[i].SOLUONG >= value && value > 0 && !isNaN(value)){
        giohang[i].count = Number(value);
        sGiohang([...giohang])
      }
      else{
        alert(`Số lượng trong kho không đủ đáp ứng!!!
Trong kho chỉ còn: ${giohang[i].SOLUONG} sản phẩm`)
      }
    }

    const incrementCount = (i) => {      
      if(giohang[i].SOLUONG >= (giohang[i].count + 1)){
        giohang[i].count = (giohang[i]?.count || 1) + 1;
        sGiohang([...giohang])
      }
      else {
        alert(`Số lượng trong kho không đủ đáp ứng!!!
Trong kho chỉ còn: ${giohang[i].SOLUONG} sản phẩm`)
      }
    }

    const decrementCount = (i) => {
      if((giohang[i]?.count || 1) > 0){
        giohang[i].count = (giohang[i]?.count || 1) - 1;
        sGiohang([...giohang]) //cập nhật lại các sp trong giỏ hàng
      }
    }

    useEffect(() => {
      console.log(giohang)
    }, [giohang])

    return (
      <Fragment>
        {giohang.length !== 0 ? 
          <Fragment>
            <div className="container"> 
            <h2 className="title">CART </h2>
            <div className="cart__table">
            {giohang?.map((data,index) =>  
              <div className="cart__wrap d-flex">
                <div className="cart__img"> 
                  <div className="img-product">
                    <div className="fix-img"> <img src={data.URLSP} /></div>
                  </div>
                </div>
                <div className="cart__name"> 
                  <p>{data.TENSP}</p>
                </div>
                <div className="cart__quantity"> 
                  <Soluong g={decrementCount.bind(this,index)} t={incrementCount.bind(this,index)} count={data.count || 1} c={ChangeInputSL.bind(this,index)}/>
                </div>
                <div className="cart__price"> 
                  <p>{data.GIA.toLocaleString()}đ</p>
                </div>
                <div className="cart__total"> 
                  <p>{(data.GIA * (data.count || 1)) .toLocaleString()}đ</p>
                </div>
                <div className="cart__remove">
                  <XoaSanPhamTrongGio {...data}/> </div>
              </div> )}
          </div>
            <div className="cart__summary d-flex">
              <div className="summary">
                <p>Tổng tiền: </p>
              </div>
              <p className="text-danger">{giohang?.map(x=> x.GIA * (x.count || 1))?.reduce((a,b)=> a+b,0)?.toLocaleString()}đ</p>
            </div>
            <div className="cart__button d-flex">
                <Link to="/" className="btn btn-default">QUAY LẠI MUA HÀNG </Link>
                <ButtonThanhToan giohang={giohang}/>
              </div>
            </div>
        </Fragment>
        :
        <Fragment> 
          <div className="row">
          <div className="notifi">
            <p>Giỏ hàng đang trống, quay lại mua hàng cùng Thế Giới Gear</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
          </div>
          </Fragment>
        }
      </Fragment>
    )
};

const ButtonThanhToan = React.memo((props) => {
  const router = useHistory()
  const [onSending, sOnSending] = useState(false)

  const _ServerSending = () => {
    let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var id = data?.[0] ? data?.[0]?.IDTK : null
      axios({
        method: "POST",
        url: `${urlAPI}/giohang/update/`,
        data: {
          id: id,
          giohang: props.giohang || []
        }
      }).then(res => {
        router.push('/donhang') 
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    onSending && _ServerSending()
  }, [onSending])

  const _HandleOnClick = () => sOnSending(true)

  return(
    <React.Fragment>
      <button disabled={onSending} onClick={_HandleOnClick.bind(this)} className="btn btn-main text-uppercase">
        {onSending ? "Đang Xử Lí ..." : "THANH TOÁN"}
      </button>
    </React.Fragment>)
})

const XoaSanPhamTrongGio = (props) => {

  const DeleteSP = () => {
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var idtk = data?.[0] ? data?.[0]?.IDTK : null
      var idsp = props.IDSP;

      axios.delete(`${urlAPI}/ctgh/${idtk}/${idsp}`)
      .then(res => {
          alert("Xóa sản phẩm trong giỏ thành công!")
      })
      .catch(error => console.log(error));
      window.location.reload();
  }

  useEffect(() => {
      props && console.log(props)
  }, [props])

  return(<button onClick={DeleteSP.bind(this)}><ion-icon className="ic remove" name="close-outline" /></button>)
}


export default SPgiohang;