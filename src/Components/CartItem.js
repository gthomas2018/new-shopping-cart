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
    const classes = ['shelf-item'];

    //if (!!this.state.isMouseOver) {
      //classes.push('shelf-item--mouseover');
    //}

    return (
      <div className={classes.join(' ')}>
      	<div className="shelf-item">
	        <div
	          className="shelf-item__del"
	          //onMouseOver={() => this.handleMouseOver()}
	          //onMouseOut={() => this.handleMouseOut()}
	          //onClick={() => removeProduct(product)}
	        />
	        <div className="shelf-item__thumb">
	          <img src={require(`../static/data/products/${product.sku}_2.jpg`)} alt={product.title} title={product.title}/>
	        </div>
	        <div className="shelf-item__details">
	          <p className="shelf-item__title">{product.title}</p>
	          <p className="shelf-item__desc">
	            {`${product.style}`} <br />
	            Quantity: {this.props.quantity}
	          </p>
	        </div>
	        <div className="shelf-item__price">
	          <p>{`${product.currencyFormat}  ${formatPrice(product.price)}`}</p>
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
};