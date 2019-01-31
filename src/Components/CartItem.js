import React from 'react';
import '../App.scss';
import PropTypes from 'prop-types';


export default class CartItem extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired
  };

  state = {
    isMouseOver: false
  };

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  render() {
    const { product, removeProduct, quantity } = this.props;
    const classes = ['item'];

    if (!!this.state.isMouseOver) {
      classes.push('item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <div className="item__thumb">
          <img src={require(`../static/data/products/${product.sku}_2.jpg`)} alt={product.title} title={product.title}/>
        </div>
        <div className="item__details">
          <p className="title">{product.title}</p>
          <p className="desc">
            {`${product.style}`} <br />
            Quantity: {this.props.quantity}
          </p>
        </div>
        <div className="item__price">
          <p>{`${product.currencyFormat}  ${formatPrice(product.price)}`}</p>
        </div>

        <div className="clearfix" />
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