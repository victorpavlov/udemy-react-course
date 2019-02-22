import React from 'react';

import axios from  './../../axios-orders';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import * as actions from './../../store/actions/index';

class Orders extends React.Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  
  render () {
    let orders = <Spinner />;

    if (this.props.orders.length) {
      const ordersList = this.props.orders;
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
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));