import React, {useState, useEffect, Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

import Paypal from './Paypal';


// var urlAPI = 'http://localhost:3000'
var urlAPI = 'https://gear-api-project.herokuapp.com'

const SPgiohang = () => {
    const [giohang, sGiohang] = useState([])
    const [tongTien, sTongTien] = useState(0)
    

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

    useEffect(() => {
        giohang && sTongTien(giohang?.map(x=> x.GIA * (x.count || 1))?.reduce((a,b)=> a+b,0))
    }, [giohang])
        
    console.log(tongTien)

      return (
        <section>
            <div className="payment__sect">
                <div className="left">
                {giohang?.map((data,index) => 
                    <div className="bill-wrapper">
                        <div className="order-item">
                            <h4 className="name">{data.TENSP}</h4>
                            <p className="text-danger">{(data.GIA * (data.count || 1)) .toLocaleString()}đ</p>
                        </div>
                    </div>
                    )}
                    <div className="summary">
                        <b>Tổng tiền: </b> <span className="text-danger">{(tongTien).toLocaleString()}đ</span>
                    </div>
                </div>
                <ThanhToanArea tongTien={tongTien}/>
            </div>
        </section>
      );
    }

const ThanhToanArea = (props) => {
    const router = useHistory()
    const [onSending, sOnSending] = useState(false)
    const [name, sName] = useState("")
    const [email, sEmail] = useState("")
    const [phone, sPhone] = useState("")
    const [address, sAddress] = useState("")
    const [notes, sNotes] = useState("")
    const [khachhang, sKhachhang] = useState([])
    const [thanhToan, sThanhToan] = useState("Tiền Mặt")
    const [checkout, sCheckout] = useState(false);

    let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
    var id = data?.[0] ? data?.[0]?.IDTK : null

    const _ServerSending = () => {
                let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
                var id = data?.[0] ? data?.[0]?.IDTK : null
                if(id){
                    axios({
                        method: "POST",
                        url: `${urlAPI}/donhang`,
                        data: {
                            idtk: id,
                            name: name,
                            phone: phone,
                            email: email,
                            address: address,
                            notes: notes,
                            tongTien: props.tongTien || 0,
                            thanhToan: thanhToan
                        }
                    }).then(res => {
                        if(res.data.status === 400) {
                            alert("Số lượng sản phẩm trong kho không đủ, hoặc có ai đó đã mua hàng trước bạn, vui lòng kiểm tra lại!!!")
                        }else {
                            //const giohang = res.data;
                            //alert("Đơn của bạn đang được xử lí")
                            router.push('/lichsu-donhang')
                              
                        }
                        sOnSending(false)
                    })
                    .catch(error => {
                        sOnSending(false)
                        console.log(error)
                    });
                }
            } 

    const getThongTin = (id) => {
                axios.get(`${urlAPI}/tkkh/${id}`)
                    .then(res => {
                      const khachhang = res.data;
                      sKhachhang(khachhang);
                      sName(khachhang[0].HOTEN)
                      sEmail(khachhang[0].EMAIL)
                      sPhone(khachhang[0].SDT)
                      sAddress(khachhang[0].DIACHI)
                    })
                    .catch(error => console.log(error));
    }
    
    useEffect(() => {
        getThongTin(id);
    }, [id])

    const isValid = () => {
                return name !== "" && email !== "" && phone !== "" && address !== ""
            }
    
    useEffect(() => {
        onSending && _ServerSending()
    }, [onSending])

    const _HandleSubmit = () => sOnSending(true)

    //console.log(props.tongTien);
    return(<React.Fragment>
            <div className="right"> 
                    <h2 className="company-name">THẾ GIỚI GAMING GEAR HIEND PC </h2>
                    <p className="breadcrumb"><span className="text-note">Giỏ hàng </span>/ Thanh toán</p>
                    <div className="line"> </div>
                    <div className="payment-info__form"> 
                        <h4 className="title">Thông tin thanh toán</h4>
                        <div className="form-group"> 
                            <input onChange={({target: {value}})=> sName(value)} className={`form-control ${name === "" ? 'is-invalid' : 'is-valid'}`} value={name} type="text" placeholder="Họ và tên khách hàng" />
                        </div>
                        <div className="form-group email"> 
                            <input onChange={({target: {value}})=> sEmail(value)} className={`form-control ${email === "" ? 'is-invalid' : 'is-valid'}`} value={email} type="text" placeholder="Email khách hàng" />
                        </div>
                        <div className="form-group phone">
                            <input onChange={({target: {value}})=> sPhone(value)} className={`form-control ${phone === "" ? 'is-invalid' : 'is-valid'}`} value={phone} type="text" placeholder="Số điện thoại" />
                        </div>
                        <div className="form-group phone">
                            <input onChange={({target: {value}})=> sAddress(value)} className={`form-control ${address === "" ? 'is-invalid' : 'is-valid'}`} value={address} type="text" placeholder="Địa chỉ giao hàng" />
                        </div>
                        <div className="form-group">
                            <input onChange={({target: {value}})=> sNotes(value)} className="form-control" type="text" placeholder="Ghi chú đơn hàng" />
                        </div>
                    </div>
                    <div className="payment__form"> 
                        <h4 className="title">Phương thức thanh toán</h4>
                        <div className="options">
                            <input onChange={()=> sThanhToan("Tiền Mặt")} checked={thanhToan === "Tiền Mặt"} className="form-check-input" id="exampleCheck1" type="checkbox" />
                            <label className="form-check-label" htmlFor="exampleCheck1"> Thanh toán khi nhận hàng (COD)</label>
                        </div>
                        <div className="options">
                            {checkout ? 
                                <Paypal tongTien={props.tongTien}/> :
                                <Fragment>
                                <input onChange={()=> sThanhToan("Chuyển Khoản")} onClick={() => sCheckout(true)} checked={thanhToan === "Chuyển Khoản"} className="form-check-input" id="exampleCheck2" type="checkbox" />
                                <label className="form-check-label" htmlFor="exampleCheck2"> Chuyển khoản qua ngân hàng để thanh toán</label>
                                </Fragment>
                             }
                        </div>
                    </div>
                    <div className="payment__btn">
                   <button onClick={_HandleSubmit.bind(this)} className="btn btn-default" disabled={isValid() ? '' : true }>XÁC NHẬN THANH TOÁN</button>
                    </div>
                </div>
        </React.Fragment>)
}

export default SPgiohang;