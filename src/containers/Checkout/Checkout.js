import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  let summary = <Redirect to="/" />;
  if (props.ingredients) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <>
        {purchaseRedirect}
        <CheckoutSummary
    ingredients={props.ingredients}
    checkoutCancelled={checkoutCancelledHandler}
    checkoutContinued={checkoutContinuedHandler}/>
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </>
    );
  }
  return summary;
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
}

export default connect(mapStateToProps)(checkout);