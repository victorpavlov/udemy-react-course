import React from 'react';
import axios from './../../../axios-orders'

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.address.street,
          zip: this.state.address.postalCode,
        }
      },
      deliveryMethod: 'fastest'
    };
    axios.post('orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let form = (
      <form>
        <p><input type="text" name="name"/></p>
        <p><input type="email" name="email"/></p>
        <p><input type="text" name="street"/></p>
        <p><input type="text" name="postalCode"/></p>

        <Button
          btnType="Success"
          clicked={this.orderHandler}>
          Submit
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <>
        <h4>Enter your contact data</h4>
        {form}
      </>
    );
  }
}

export default ContactData;