import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var urlAPI = 'https://gear-api-project.herokuapp.com'

class Sualsp extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: [],
            tenloai: "",
            idloai: 0
		}
	};

  componentDidMount() {
      const id = this.props?.id

      axios.get(`${urlAPI}/loaisanpham/${id}`)
        .then(res => {
          const news = res.data;

          this.setState({ news: news, tenloai: news[0].TENLOAI, idloai: news[0].IDLOAI });
          console.log(news);
        })
        .catch(error => console.log(error));
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };


    handleInsertSubmit = () => {

        const newItem = {
            TENLOAI: this.state.tenloai
        }

        const id = this.props?.id;
        axios.put(`${urlAPI}/loaisanpham/${id}`, newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {

            if (res.data.status === 500) {
                alert("Sản phẩm đã tồn tại xin vui lòng thay đổi!!! ")
            }
  
            if (res.data.status === 200) {
                alert("Update sản phẩm thành công ")
                window.location.href = `/quanly-loaisp`
            }

            let news = this.state.news;
            news = [newItem, ...news];
            this.setState({news: news});    

        }).catch(error => console.error(error));
    }

    isValid = () => {
        return this.state.tenloai !== ""
    }

    render() {
        console.log(this.state.idloai, this.state.tenloai) ;
      return (
            <div className="col-8 admin-fields">
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Tên loại sản phẩm: </label>
                   
                    <div className="col-sm-10">
                        <input type="text" className={`form-control ${this.state.tenloai === "" ? 'is-invalid' : 'is-valid'}`} name="tenloai" value={this.state.tenloai} placeholder="" onChange={this.handleInputChange}/>
                        <input type="text" readOnly class="form-control" value={this.state.idloai} placeholder=""/>
                    </div>
                   
                </div>                
                <div className="submit-button">
                    <button className="nav-link btn btn-outline-main" disabled={this.isValid() ? '' : true } onClick={this.handleInsertSubmit}>Update loại sản phẩm</button>
                    <button className="nav-link btn btn-outline-main"><Link to="/quanly-loaisp">Hủy thao tác</Link></button>
                </div>
            </div>
      );
    }
  }
export default Sualsp;