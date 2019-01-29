import React from 'react';

import axios from  './../../axios-orders';

import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const data = res.data;
        const orders = [];
        
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            orders.push({...element, id: key});
          }
        }
        this.setState({orders: orders, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }
  
  render () {
    let orders = <Spinner />;

    if (this.state.orders.length) {
      const ordersList = this.state.orders;
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

export default withErrorHandler(Orders, axios);