import React, { Fragment } from 'react';
// import {Link} from 'react-router-dom';

import Leftmenu from './Leftmenu';
import Footer from '../Footer/Footer';
import Showsanpham from './Showsanpham';
import Banmain from '../../images/banner_main.jpg';
import banside1 from '../../images/banner_side_1.jpg';
import banside2 from '../../images/banner_side_2.jpg';
import bgkeyboard from '../../images/bg_keyboard.png';
import bgheadphone from '../../images/bg_headphone.png';
import bgmouse from '../../images/bg_mouse.png';
import p1 from '../../images/p_1.png';
import p2 from '../../images/p_2.png';
import p3 from '../../images/p_3.png';
import p4 from '../../images/p_4.png';
import { Link } from 'react-router-dom';
import Newproduct from './Newproduct';
import Bestproduct from './Bestproduct';



class Home extends React.Component {

  state = {
    sanpham: [],
    isCus: true
  }

  componentDidMount() {
      // check id quyền => setState(isAdmin: true)
      let data = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
      var id = data?.[0] ? data?.[0]?.IDQUYEN : null
      if(id === 1)
      {
        this.setState({isCus: false});
      }
      else {
        this.setState({isCus: true});
      } 
    }
  
    render() {
        return (
          <Fragment>
            {this.state.isCus ?
          <div canvas="container">
            <div>
              <section>
                <section className="body">
                  <div className="banner-main__sect"> 
                    <div className="container d-flex">
                      <div className="colu-1">
                        <ul className="main-menu">
                          <Leftmenu/>
                        </ul>
                      </div>
                      <div className="colu-2">
                        <div className="fix-img"><img src={Banmain} /></div>
                      </div>
                      <div className="colu-3">
                        <div className="sub-banner"> 
                          <div className="fix-img"><img src={banside1} /></div>
                        </div>
                        <div className="sub-banner"> 
                          <div className="fix-img"><img src={banside2} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="new-product__sect"> 
                    <div className="container d-flex"> 
                      <div className="left"> 
                        <h4>SẢN PHẨM MỚI</h4>
                      </div>
                      <div className="right d-flex"> 
                        <div className="item-product__wrap"> 
                          <Newproduct/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="new-product__sect"> 
                    <div className="container d-flex"> 
                      <div className="left"> 
                        <h4>SẢN PHẨM BÁN CHẠY</h4>
                      </div>
                      <div className="right d-flex"> 
                        <div className="item-product__wrap"> 
                          <Bestproduct/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product__sect">
                    <div className="container d-flex"> 
                      <div className="left" style={{background: `url(${bgkeyboard}) no-repeat`}}>
                        <div className="tt-header bg-keyboard">
                          <h4>BÀN PHÍM</h4>
                        </div>
                      </div>
                      <div className="right"> 
                        <div className="prod-header bg-keyboard-2"><a href="#">Xem thêm</a></div>
                        <div className="item-product__wrap"> 
                          <Showsanpham id='1'/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product__sect">
                    <div className="container d-flex"> 
                      <div className="left" style={{background: `url(${bgheadphone}) no-repeat`}}>
                        <div className="tt-header bg-headphone">
                          <h4>TAI NGHE</h4>
                        </div>
                      </div>
                      <div className="right"> 
                        <div className="prod-header bg-headphone-2"><a href="#">Xem thêm</a></div>
                        <div className="item-product__wrap"> 
                          <Showsanpham id='3'/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product__sect">
                    <div className="container d-flex"> 
                      <div className="left" style={{background: `url(${bgmouse}) no-repeat`}}>
                        <div className="tt-header bg-mouse">
                          <h4>CHUỘT</h4>
                        </div>
                      </div>
                      <div className="right"> 
                        <div className="prod-header bg-mouse-2"><a href="#">Xem thêm</a></div>
                        <div className="item-product__wrap"> 
                          <Showsanpham id='2'/>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
              <Footer/>
            </div>
          </div> :
            window.location.href = `/quanly-sanpham`
            }
        </Fragment>
        );
    }
};

export default Home;