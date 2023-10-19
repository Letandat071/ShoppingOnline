import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

import withRouter from '../utils/withRouter';
class Footer extends Component {
    static contextType = MyContext
    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          txtKeyword: ''
        };
    }
    render(
       
    ) {
        
const cates = this.state.categories.map((item) => {
            return (
              <li key={item._id} className="hoverr" ><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
              
              
            );
          });

      return (

        

        <footer>
      <div class="container">
        <div class="row">
          <div>
            <h6>About</h6>
          </div>

          <div >
            <h6>About Us</h6>
            <ul>
              <li><p>1/11/52 Hẻm 1 Đặng Thùy Trâm, Bình Thạnh, Hồ Chí Minh</p></li>
              <li><p>0123456789</p></li>
              <li><p>Loremlpsum@gmail.com</p></li>
            </ul>
          </div>

          <div>
            <h6>Shoping</h6>
            <ul class="footer-links">
               {cates}
            </ul>
          </div>
          <div>
            <h6>customer</h6>
            <ul class="footer-links">
            <div className="float-left">
        {this.context.token === '' ?
          <div><Link   to='/login' >Login</Link> | <Link  to='/signup'>Sign-up</Link> | <Link   to='/active'>Active</Link></div>
          :
          <div>
          Hello <b>{this.context.customer.name}</b><br />
          <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link><br />
          <Link to='/myprofile'>My Profile</Link>
        </div>
        
        }        </div> 
            </ul>
          </div>
        </div>
        </div>
        
    
</footer>




      )}

      lnkLogoutClick() {
        this.context.setToken('');
        this.context.setCustomer(null);
        this.context.setMycart([]);
      }

      componentDidMount() {
        this.apiGetCategories();
      }
      apiGetCategories() {
        axios.get('/api/customer/categories').then((res) => {
          const result = res.data;
          this.setState({ categories: result });
        });
      }
}
export default Footer;