import React from 'react';
import './App.scss';
import ShoppingTable from './Components/ShoppingTable.js';
import Cart from './Components/Cart.js';

// firebase id is new-shopping-cart-4daee
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

  itemIndex = (item) => {
    let index = 0;
    let return_value = -1;
    this.state.cart_items.forEach((prod) => {
      if (item === prod) {
        return_value = index;
      }
      index = index + 1;
    });
    return return_value;
  }

  add_to_cart = (item) => {
    let index = this.itemIndex(item); 
    if (index !== -1)
    {
      let new_q = this.state.quantities.slice();
      new_q[index] = new_q[index] + 1;
      this.setState({
      	quantities: new_q, 
      	cart_open: true
      });
    }
    else
    {
      let new_ = this.state.cart_items.concat(item);
      let new_q = this.state.quantities.concat(1);
      this.setState({ cart_items: new_, quantities: new_q, cart_open: true});
    }
  }

  removeFromCart = (product) => {
  	let new_cart_items = this.state.cart_items;
  	let new_quantities = this.state.quantities;
    const index = this.state.cart_items.findIndex(p => p.id === product.id);
    if (index >= 0) {
      new_cart_items.splice(index, 1);
      new_quantities.splice(index, 1)
    }

    this.setState({
    	cart_items: new_cart_items
    });
  }

  render() {
    return (
      <div>
        <Cart cart_items={this.state.cart_items}
        	  quantities={this.state.quantities}
        	  cart_open={this.state.cart_open}
        	  removeItem={this.removeFromCart}
        	  openCart={this.openCart}
        	  closeCart={this.closeCart}/>
        <ShoppingTable products={this.props.products} click={this.add_to_cart}/>
      </div>
    );
  }
}

//==================================================================//