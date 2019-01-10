import React from 'react';
import './App.scss';


class Product extends React.Component {
  render() {
    function formatPrice(x, currency) {
      switch (currency) {
        case 'BRL':
          return x.toFixed(2).replace('.', ',');
        default:
          return x.toFixed(2);
      }
    };

    const product = this.props.product;
    const img = product.sku;
    let formattedPrice = formatPrice(product.price, product.currencyId);

    return (
      <div className="shelf-item">
        <div className=""><img src={require("./static/data/products/" + img + "_1.jpg")}
                  alt="This is nice shirt"/></div>
        <p className="shelf-item__title">{product.title}</p>
        <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      <div className="shelf-item__buy-btn">Add to cart</div>
      </div>
    );
  }
}


class ProductTable extends React.Component {
  render() {
    let PRODUCTS = this.props.products;
    const product_list= [];

    for(let i = 0; i < PRODUCTS.products.length; i++)
    {
      product_list.push(<Product product={PRODUCTS.products[i]}/>);
    }
    return (
      <div className="shelf-container">
        {product_list}
      </div> 
    );
  }
}


class ShoppingCart extends React.Component {
  render() {
    return (
      <div className="float-cart">
        <div className="bag bag--float-cart-closed">
          <button type="button"></button>
        </div>
      </div>
    );
  }
}


class ShoppingTable extends React.Component {
  render() {
    let PRODUCTS = require('./static/data/products.json')

    return (
      <div>
        <ShoppingCart />
        <ProductTable products={PRODUCTS}/>
      </div>
    );
  }
}

export default ShoppingTable;
