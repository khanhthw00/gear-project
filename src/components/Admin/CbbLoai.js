import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Quanly extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
            news: []
		}
	};

  componentDidMount() {
      axios.get(`http://localhost:3000/loaisanpham`)
        .then(res => {
          const news = res.data;
          this.setState({ news: news });
          console.log(news);
        })
        .catch(error => console.log(error));
        
    }

    handleInputChange = (e) => {
        this.props.handleInputChange(e)
    }

    render() {
      return (
        <Fragment>
                <div className="col-sm-10">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" placeholder="Sản phẩm thuộc loại:" name="idloai" value={this.props.idloai} onChange={(e) => this.handleInputChange(e)}>
                        <option value="" hidden disabled>Chọn loại sản phẩm</option>
                        {this.state.news.map(data =>
                        <option key={data.IDLOAI} value={data.IDLOAI}>{data.TENLOAI}</option>
                        )}
                    </select>
                </div>
         </Fragment>
      );
    }
  }
export default Quanly;