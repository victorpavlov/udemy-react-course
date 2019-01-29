import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: null,
    price: null
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (const param of query.entries()) {
      if (param[0] === 'price') {
        this.setState({price: +param[1]})
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
      </div>
    );
  }
}

export default Checkout;