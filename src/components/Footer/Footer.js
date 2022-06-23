import React from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
import verify from '../../images/verify.png';

class Footer extends React.Component {

    render() {
        return (
            <section>
                <section className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 col-12 footer-col-1">
                                <h6>THÔNG TIN LIÊN HỆ</h6>
                                <div className="info-company"> 
                                    <p>CÔNG TY TNHH THẾ GIỚI GEAR </p>
                                    <p>MST: 0315758728</p>
                                    <p>Ngày cấp: 26/06/2019</p>
                                    <p>Nơi cấp: Sở kế hoạch đầu tư thành phố Hồ Chí Minh</p>
                                    <p>Chuyên cung cấp linh kiện điện tử, Gaming Gear, PC Hi-expand</p>
                                </div>
                                <div className="info-contact">
                                    <p>
                                        <ion-icon className="ic ic-green" name="location-outline" />Địa chỉ: 63 Nguyễn Cửu Vân, phường 17, quận Bình Thạnh, HCM</p>
                                    <p>
                                        <ion-icon className="ic ic-green" name="call-outline" />Số điện thoại: 079 359 1111</p>
                                    <p>
                                        <ion-icon className="ic ic-green" name="mail-outline" />Email: info@thegioigear.com</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <ul className="link-menu">
                            <li><a href="#">Tìm Kiếm	</a></li>
                            <li><a href="#">Giới Thiệu</a></li>
                            <li><a href="#">Chính Sách Bảo Hành - Đổi Trả</a></li>
                            <li><a href="#">Hình Thức Thanh Toán</a></li>
                            <li><a href="#">Chính Sách Trả Góp Qua MPos</a></li>
                            <li><a href="#">Chính Sách Giao Hàng</a></li>
                            <li><a href="#">Chính Sách Bảo Mật Thông Tin Khách Hàng</a></li>
                            <li><a href="#">Liên Hệ</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="verify mb-5"><img src={verify} /></div>
                            <div className="logo-social d-flex"><a className="link"><ion-icon className="ic-large" name="logo-facebook" /></a><a className="link"><ion-icon className="ic-large" name="logo-instagram" /></a><a className="link"><ion-icon className="ic-large" name="logo-twitter" /></a></div>
                        </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
};

export default Footer;