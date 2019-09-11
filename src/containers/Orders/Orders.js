import React, { useEffect } from 'react';

import axios from  './../../axios-orders';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import * as actions from './../../store/actions/index';

const orders = props => {
  const {onFetchOrders, token, userId} = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);
  
  let orders = <Spinner />;

  if (props.orders.length) {
    const ordersList = props.orders;
    orders = ordersList.map(order => (
      <Order
        ingredients={order.ingredients}
        price={order.totalPrice}
        key={order.id} />
    ));
  }
  
  return (
    <>
      {orders}
    </>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));