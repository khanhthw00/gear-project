import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
// import { getCategory } from '../../model/category';
import axios from 'axios';

import p2 from '../../images/p_2.png';

class Bestproduct extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            sanpham: []        
		}
	}

    componentDidMount() {
        axios.get(`http://localhost:3000/spbanchay`)
        .then(res => {
          const sanpham = res.data;
          this.setState({ sanpham });
        })
        .catch(error => console.log(error));

    }

    render() {
        return (
            <Fragment>           
                {this.state.sanpham.map(sanpham => 
                <div className="item-product__box" key={sanpham.IDLOAI}>
                    {/* <a href={`/sanpham/${sanpham.id}`} onClick={(e) => { e.preventDefault(); return false}}> */}
                        <div className="img-box"> 
                            <Link to={`/ctsanpham/${sanpham.IDSP}`} >
                                <div className="fix-img"> <img src={sanpham.URLSP} /> </div>
                            </Link>
                        </div>
                        <Link to={`/ctsanpham/${sanpham.IDSP}`} >
                                <div className="content" >
                                    <h4 className="name">{sanpham.TENSP}</h4>
                                    <p className="text-danger">{(sanpham.GIA).toLocaleString()}đ</p>
                                    <p className="status">{sanpham.TIEUDE}</p>
                                </div>
                        </Link>
                    {/* </a> */}
                </div>
            
                    )}
            </Fragment>
        );
    }
    
};

export default Bestproduct;