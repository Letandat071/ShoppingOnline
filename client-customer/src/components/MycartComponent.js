import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td><span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>
          
        </tr>
      );
    });
    const table={
      marginLeft:"130px"
    }


    //style
const headertable = {
  display:'flex',
  width:'1200px',
  background:'#6A7CE0',
  borderRadius:"5px",
  margin: '0 auto'

}
const colandrow ={
padding:"10px",
width:'200px',
}
const colfordate ={
  padding:"10px",
  width:'300px',
}

const colorHeader ={
color : "white",

}

const tableRow = {
  backgroundColor:"#ffffff",
  boxShadow:"0px 0px 9px 0px rgba(0,0,0,0.1)",
  borderRadius:"5px",
  with:"1200px",
}

const full ={
  borderTopLeftRadius:"10px",
  borderTopRightRadius:"10px",
  padding: "10px",
  backgroundColor: "white",
  marginTop:"20px",
  width:"1400px"
}
const full1 ={
  padding: "10px",
  backgroundColor: "white",
  borderBottomLeftRadius:"10px",
  borderBottomRightRadius:"10px",
  width:"1400px"
}
    return (
      <div style={full}>
        <h2 className="text-centerr">ITEM LIST</h2>
        <table  style={headertable}>
          <tbody>
            <tr  style={colorHeader}>
              <th style={colandrow}>No.</th>
              <th style={colandrow}>ID</th>
              <th style={colandrow}>Name</th>
              <th style={colandrow}>Category</th>
              <th style={colandrow}>Image</th>
              <th style={colandrow}>Price</th>
              <th style={colandrow}>Quantity</th>
              <th style={colandrow}>Amount</th>
              <th style={colandrow}>Action</th>
            </tr>
            {mycart}
            <tr>
              <td colSpan="6"></td>
              <td>Total</td>
              <td>{CartUtil.getTotal(this.context.mycart)}</td>
              <td><span className="link" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
   // event-handlers
   lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }
   // apis
   apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default withRouter(Mycart);
// export default Mycart;