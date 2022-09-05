import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var urlAPI = 'https://gear-api-project.herokuapp.com'

// const Sanpham = (props) => {
//     const [sanpham, sSanpham] = useState([])

//     const ServerFetching = () => {
//         axios.get(`http://localhost:3000/sanpham-theoloai/${props.id}`)
//             .then(res => {
//               const sanpham = res.data;
//               sSanpham([...sanpham])
//         }) .catch(error => console.log(error));
//     }

//     useEffect(() => {
//         props.id && ServerFetching()
//     }, [props.id])

//     return (
//             <Fragment>
//             {sanpham?.map(data => 
//                 <div className="item-product__box" key={data.IDSP?.toString()}>
//                     <div className="img-box"> 
//                         <Link to={`/ctsanpham/${data.IDSP}`} >
//                             <div className="fix-img"><img src={data.URLSP} /></div>
//                         </Link>
//                     </div>
//                     <div className="content">
//                         <h4 className="name">{data.TENSP}</h4>
//                         <ul className="text-note"> 
//                             <li>{data.TIEUDE}</li>
//                         </ul>
//                         <p className="text-note">Số lượng còn: {data.SOLUONG}</p>
//                         <p className="text-danger price">{data.GIA.toLocaleString()}đ</p>
//                     </div>
//                     <div className="wrap2btn d-flex"> 
//                     <Muangay idsp={data.IDSP}/>
//                     <Link to={`/ctsanpham/${data.IDSP}`} className="btn btn-default">Xem chi tiết</Link></div>
//                 </div>
//             )}
//         </Fragment>
//     );
// };

const Sanpham = (props) => {
    const [sanpham, sSanpham] = useState([])

    const ServerFetching = () => {
        axios.get(`${urlAPI}/sanpham-theoloai/${props.id}`)
            .then(res => {
              const sanpham = res.data;
              sSanpham([...sanpham])
        }) .catch(error => console.log(error));
    }

    useEffect(() => {
        props.id && ServerFetching()
    }, [props.id])    

    return (
            <Fragment>
            {sanpham?.map(data => 
                <div className="item-product__box" key={data.IDSP?.toString()}>
                    <div className="img-box"> 
                        <Link to={`/ctsanpham/${data.IDSP}`} >
                            <div className="fix-img"><img src={data.URLSP} /></div>
                        </Link>
                    </div>
                    <div className="content">
                        <h4 className="name">{data.TENSP}</h4>
                        <ul className="text-note"> 
                            <li>{data.TIEUDE}</li>
                        </ul>
                        <p className="text-note">Số lượng còn: {data.SOLUONG}</p>
                        <p className="text-danger price">{data.GIA.toLocaleString()}đ</p>
                    </div>
                    <div className="wrap2btn d-flex"> 
                    <Muangay idsp={data.IDSP}/>
                    <Link to={`/ctsanpham/${data.IDSP}`} className="btn btn-default">Xem chi tiết</Link></div>
                </div>
            )}
        </Fragment>
    );
};


const Muangay = (props) => {
    let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
    var idtk = data?.[0] ? data?.[0]?.IDTK : null
    let id = props.idsp;    
    // console.log('hello nè', JSON.parse(sessionStorage.getItem("user"))) 

    //console.log(id)
    const MuaSP = () => {

        if(idtk === null) {
            window.location.href = `/login`;
        }
        else {
            var objectInput = { 
                IDTK: idtk,
                IDSP: id,
                SOLUONG: 1
            }

            axios.post(`${urlAPI}/giohang/`, objectInput)
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



export default Sanpham;