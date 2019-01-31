import React from 'react';
import './App.scss';
import ShoppingTable from './Components/ShoppingTable.js';
import Cart from './Components/Cart.js';

// firebase id is new-shopping-cart
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_items : [],
      cart_open : false,
      quantities : [],
    }
  }

  openCart = () => {
    this.setState({cart_open : true})
  }

  closeCart = () => {
    this.setState({cart_open : false})
  }

  already_in_cart = product => {
    let index = 0;
    let return_value = -1;
    this.state.cart_items.forEach((prod) => {
      if (product === prod) {
        return_value = index;
      }
      index = index + 1;
    });
    return return_value;
  }

  add_to_cart = product => {
    let index = this.already_in_cart(product); 
    if (index !== -1) {
      let new_q = this.state.quantities.slice();
      new_q[index] = new_q[index] + 1;
      this.setState({ quantities: new_q, cart_open: true});
    } else {
      let new_ = this.state.cart_items.concat(product);
      let new_q = this.state.quantities.concat(1);
      this.setState({ cart_items: new_, quantities: new_q, cart_open: true});
    }
  }

  render() {
    return (
      <div>
        <Cart cart_items={this.state.cart_items} quantities={this.state.quantities} cart_open={this.state.cart_open} openCart={this.openCart} closeCart={this.closeCart}/>
        <ShoppingTable products={this.props.products} click={this.add_to_cart}/>
      </div>
    );
  }
}

//==================================================================//