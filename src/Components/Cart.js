import React from 'react';
import '../App.scss';
import CartItem from './CartItem.js';


export default class Cart extends React.Component {

  totalQuantity(quantities) {
  	let total = 0;
  	for (let i = 0; i < quantities.length; i++)
  	{
  		total += quantities[i];
  	}
  	return total;
  }

  proceedToCheckout = (price) => {
    if (this.props.quantities.length === 0)
    {
      alert('Add some product in the bag!');
    }
    else
    {
      alert(`Checkout - Subtotal: ${formatPrice(price)}`);
    }
  }

  render() {
    let subtotal = 0;
    for (let i = 0; i < this.props.cart_items.length; i++)
    {
    	subtotal += this.props.cart_items[i].price * this.props.quantities[i];
    }

    let index = -1; 
    const products = this.props.cart_items.map(p => {
      index = index + 1;
      return (
        <CartItem product={p} removeItem={this.props.removeItem} quantity={this.props.quantities[index]} key={p.id} />
      );
    });

    let classes = ['float-cart'];

    if (!!this.props.cart_open) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.props.cart_open && (
          <div
            onClick={() => this.props.closeCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.props.cart_open && (
          <span
            onClick={() => this.props.openCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{this.totalQuantity(this.props.quantities)}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{this.totalQuantity(this.props.quantities)}</span>
            </span>
            <span className="header-title">Bag</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the bag <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                ${formatPrice(subtotal)}
              </p>
            </div>
            <div onClick={() => this.proceedToCheckout(subtotal)} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
}