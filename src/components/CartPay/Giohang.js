import React from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

// import Leftmenu from './Leftmenu';
// import Footer from '../Footer/Footer';
// import Showsanpham from './Showsanpham';
import SPgiohang from './SPgiohang';

import Banmain from '../../images/banner_main.jpg';
import banside1 from '../../images/banner_side_1.jpg';
import banside2 from '../../images/banner_side_2.jpg';
import bgkeyboard from '../../images/bg_keyboard.png';
import bgheadphone from '../../images/bg_headphone.png';
import bgmouse from '../../images/bg_mouse.png';
// import p1 from '../../images/p_1.png';
// import p2 from '../../images/p_2.png';
// import p3 from '../../images/p_3.png';
// import p4 from '../../images/p_4.png';
import Footer from '../Footer/Footer';



class Giohang extends React.Component {

    render() {
        return (

            <div>
        <section>
          <div className="cart__sect"> 
            
                <SPgiohang id={this.props.match.params.id}/>
              
          </div>
        </section>
        <Footer/>
      </div>
        );
    }
};

export default Giohang;