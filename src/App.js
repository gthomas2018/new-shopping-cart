import React from 'react';
import './App.scss';
import PropTypes from 'prop-types';


class Product extends React.Component {
  render() {
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
      <div className="shelf-item__buy-btn" onClick={() => this.props.click(this.props.product)}>Add to cart</div>
      </div>
    );
  }
}


class ProductTable extends React.Component {
  render() {
    const product_list = [];

    for(let i = 0; i < this.props.products.length; i++)
    {
      product_list.push(<Product product={this.props.products[i]} click={this.props.click}/>);
    }
    return (
      <div className="shelf-container">
        {product_list}
      </div> 
    );
  }
}


class CartProduct extends React.Component {
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
          <img src={require(`./static/data/products/${product.sku}_2.jpg`)} alt={product.title} title={product.title}/>
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


class Cart extends React.Component {
  removeProduct = product => {
    const { updateCart } = this.props;

    const index = this.props.cart_products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.props.cart_products.splice(index, 1);
      updateCart(this.props.cart_products);
    }
  };

  proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
      currencyFormat,
      currencyId
    } = this.props.cartTotal;

    if (this.props.quantities.length === 0) {
      alert('Add some product in the bag!');
    } else {
      alert(
        `Checkout - Subtotal: ${currencyFormat} ${formatPrice(
          totalPrice,
          currencyId
        )}`
      );
    }
  };

  render() {
    let subtotal = 0;
    this.props.cart_items.forEach((product) => {
      subtotal = subtotal + product.price;
    });

    let index = -1; 
    const products = this.props.cart_items.map(p => {
      index = index + 1;
      return (
        <CartProduct product={p} removeProduct={removeProduct} quantity={this.props.quantities[index]} key={p.id} />
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
            <span className="bag__quantity">{1}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{1}</span>
            </span>
            <span className="header-title">Bag</span>
          </div>

          <div className="float-cart__product-table">
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
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class ShoppingTable extends React.Component {
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
        <ProductTable products={this.props.products} click={this.add_to_cart}/>
      </div>
    );
  }
}

export default ShoppingTable;

//==================================================================//

const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

const updateCart = cart_products => dispatch => {
  let productQuantity = cart_products.reduce((sum, p) => {
    sum += p.quantity;
    return sum;
  }, 0);

  let totalPrice = cart_products.reduce((sum, p) => {
    sum += p.price * p.quantity;
    return sum;
  }, 0);

  let installments = cart_products.reduce((greater, p) => {
    greater = p.installments > greater ? p.installments : greater;
    return greater;
  }, 0);

  let cartTotal = {
    productQuantity,
    installments,
    totalPrice,
    currencyId: 'USD',
    currencyFormat: '$'
  };

  dispatch({
    type: 'UPDATE_CART',
    payload: cartTotal
  });
};

const loadCart = products => ({
  type: 'LOAD_CART',
  payload: products
});

const addProduct = product => ({
  type: 'ADD_PRODUCT',
  payload: product
});

const removeProduct = product => ({
  type: 'REMOVE_PRODUCT',
  payload: product
});

const mapStateToProps = state => ({
  newProduct: state.cart_items.productToAdd,
  productToRemove: state.cart_items.productToRemove,
  cartTotal: state.total.data
});