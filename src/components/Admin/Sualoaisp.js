import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Sualsp from './Sualsp';

class Sualoaisp extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            news: []
		}
	};

  componentDidMount() {
      const id = this.props?.id
      axios.get(`http://localhost:3000/loaisanpham/${id}`)
        .then(res => {
          const news = res.data;
          this.setState({ news: news.news });
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
        };

      
        axios.post("http://localhost:3000/loaisanpham", newItem, { headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(res => {

            let news = this.state.news;
            news = [newItem, ...news];
            this.setState({news: news});

        }).catch(error => console.error(error));

        window.location.href = `/quanly-loaisp`
    }

    render() {
        console.log(this.state.news) 
      return (
      <div className="admin">
        <div className="row">
          <div className="col-2 admin-col">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <Sualsp id={this.props.match.params.id}/>
          <div className="col-2 admin-col">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      );
    }
  }
export default Sualoaisp;