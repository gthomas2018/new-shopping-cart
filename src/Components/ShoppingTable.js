import React from 'react';
import '../App.scss';
import ShoppingItem from './ShoppingItem.js';

export default class ShoppingTable extends React.Component {
  render() {
    const product_list = [];

    for(let i = 0; i < this.props.products.length; i++)
    {
      product_list.push(<ShoppingItem product={this.props.products[i]} click={this.props.click}/>);
    }
    return (
      <div className="shelf-container">
        {product_list}
      </div> 
    );
  }
}