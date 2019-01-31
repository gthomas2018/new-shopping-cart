import React from 'react';
import '../App.scss';

export default class ShoppingItem extends React.Component {
  render() {
    const product = this.props.product;
    const img = product.sku;
    let formattedPrice = formatPrice(product.price, product.currencyId);

    return (
      <div className="shelf-item" onClick={() => this.props.click(this.props.product)}>
        <div className=""><img src={require("../static/data/products/" + img + "_1.jpg")}
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

const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};