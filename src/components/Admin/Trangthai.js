import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// import Menu from './Menu'
// import Imagelogo from '../images/logo.png';
// import Image from '../images/banner_mini.jpg';

import Leftmenu from '../Trangchu/Leftmenu';
import Footer from '../Footer/Footer';

class Trangthai extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
           
		}
	};


    handleInputChange = (e) => {
        this.props.handleInputChange(e)
    }

    render() {
      const { index, data } = this.props;
      console.log(this.props.idtrangthai)
      return (
        <Fragment>
                <div className="col-sm-10">
                    <select class="form-select form-select-sm" id={`idtrangthai_${index}`} value={this.props.idtrangthai} onChange={(e) => this.handleInputChange(e)}>
                        {/* <option value="" hidden disabled>Chọn loại sản phẩm</option> */}
                        {data && data.map(item =>
                         <option key={item.IDTRANGTHAI} value={item.IDTRANGTHAI}>{item.TRANGTHAI}</option>
                        )}
                    </select>
                </div>
         </Fragment>
      );
    }
  }
export default Trangthai;