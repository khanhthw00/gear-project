import React, { Component, useEffect, useState } from 'react'
import { Route, Router, Switch} from "react-router-dom";
import axios from 'axios';

// import LoginForm from '../Login/LoginForm';
import SignupForm from '../Signup/SignupForm';
// import Login from '../Login/Login';
import Home from '../Trangchu/Home';
import Sanpham from '../Sanpham/Sanpham';
import LoginForm from '../Login/LoginForm';
import Chitietsanpham from '../Sanpham/Chitietsanpham';
import Sanphampage from '../Sanpham/Sanphampage';
import Giohang from '../CartPay/Giohang'
import Quanly from '../Admin/Quanly';
import QLLoaisp from '../Admin/QLLoaisp';
import Themsp from '../Admin/Themsp';
import Themloaisp from '../Admin/Themloaisp';
import Sualoaisp from '../Admin/Sualoaisp';
import Suasanpham from '../Admin/Suasanpham';
import Donhang from '../Donhang/Donhang';
import Canhan from '../Customer/Canhan';
import SuaCanhan from '../Customer/SuaCanhan';
import QLDonhang from '../Admin/QLDonhang';
import Ctdh from '../Admin/Ctdh';
import Bought from '../Customer/Bought';
import ChitietdonKH from '../Customer/ChitietdonKH';
import Thongke from '../Admin/Thongke';
import Changepass from '../Customer/Changepass'
import  Thongketable from '../Admin/Thongketable';
import TaikhoanKH from '../Admin/TaikhoanKH';
import ErrorPage from '../Error/404';
import Error403 from '../Error/403';
import Thongkesp from '../Admin/Thongkesp';
import Thongkechart from '../Admin/Thongkechart';

const RouterURL = () => {
  
    return(
            <div>
                <Switch>
                    <Route path="/quanly-sanpham" component={Quanly}/>
                    <Route path="/quanly-loaisp" component={QLLoaisp}/>
                    <Route path="/quanly-donhang" component={QLDonhang}/>
                    <Route path="/ctdh/:id" component={Ctdh}/>
                    <Route path="/quanly-khachhang" component={TaikhoanKH}/>
                    <Route path="/addsp" component={Themsp}/>
                    <Route path="/addlsp" component={Themloaisp}/>
                    <Route path="/thongke" component={Thongke}/>
                    <Route path="/thongke-sanpham" component={Thongkesp}/>
                    <Route path="/thongketable" component={Thongketable}/>
                    <Route path="/thongkekhoangtg" component={Thongkechart}/>
                    <Route path="/editlsp/:id" render={props => <Sualoaisp {...props}/> }/>
                    <Route path="/editsp/:id" render={props => <Suasanpham {...props}/> }/>

                    

                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/canhan" component={Canhan}/>
                    <Route path="/ctdondamua/:id" component={ChitietdonKH}/>
                    <Route path="/editcanhan" component={SuaCanhan}/>
                    <Route path="/lichsu-donhang" component={Bought}/>
                    <Route path="/thaydoi-pass" component={Changepass}/>
                    <Route path="/donhang" component={Donhang}/>
                    <Route path="/signup" component={SignupForm}/>
                    <Route path="/sanpham" component={Sanpham}/>
                    <Route path="/giohang/" render={props => <Giohang {...props}/>} />
                    <Route path="/ctsanpham/:id" component={Chitietsanpham}/>
                    <Route path='/sanpham-theoloai/:id' render={props => <Sanphampage {...props} />} /> 
                    <Route path="/notpermission" component={Error403}/>
                    <Route component={ErrorPage} />
                    
                </Switch>
            </div>
        );
    }

export default RouterURL;