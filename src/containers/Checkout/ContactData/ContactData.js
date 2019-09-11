import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from './../../../axios-orders'

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../../store/actions/index';

const initialFormState = {
  orderForm: {
    name: {
      type: 'text',
      label: 'User Name',
      value: '',
      elementConfig: {
        placeholder: 'Your First and Last name'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      type: 'text',
      label: 'User E-mail',
      value: '',
      elementConfig: {
        placeholder: ''
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      type: 'text',
      label: 'Street',
      value: '',
      elementConfig: {
        placeholder: ''
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    postalCode: {
      type: 'text',
      label: 'Zip',
      value: '',
      elementConfig: {
        placeholder: ''
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      type: 'select',
      label: 'Delivery Method',
      value: 'fastest',
      elementConfig: {
        options: [
          {value: 'fastest', name: 'Fastest'},
          {value: 'normal', name: 'Normal'}
        ]
      },
      validation: {},
      valid: true
    }
  }
};

const contactData = props => {
  const [formState, setFormState] = useState(initialFormState);
  const [validState, setValidState] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (const key in formState.orderForm) {
      if (formState.orderForm.hasOwnProperty(key)) {
        formData[key] = formState.orderForm[key].value;
      }
    }
    const order = {
      ingredients: props.ingredients,
      totalPrice: props.price,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token);
  }

  const checkValid = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...formState.orderForm
    };
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValid(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const key in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(key)) {
        formIsValid = updatedOrderForm[key].valid && formIsValid;
      }
    }
    setFormState({orderForm: updatedOrderForm});
    setValidState(formIsValid);
  }

  const formElementsArray = [];
  for (const key in formState.orderForm) {
    if (formState.orderForm.hasOwnProperty(key)) {
      const element = {
        id: key,
        name: key,
        type: formState.orderForm[key].type,
        label: formState.orderForm[key].label,
        value: formState.orderForm[key].value,
        config: formState.orderForm[key].elementConfig,
        required: formState.orderForm[key].validation ? formState.orderForm[key].validation.required : false,
        invalid: formState.orderForm[key].valid,
        touched: formState.orderForm[key].touched
      };

      formElementsArray.push(element);
    }
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          id={formElement.id}
          key={formElement.id}
          type={formElement.type}
          name={formElement.name}
          value={formElement.value}
          label={formElement.label}
          config={formElement.config}
          changed={(event) => inputChangedHandler(event, formElement.id)}
          required={formElement.required}
          invalid={!formElement.invalid}
          touched={formElement.touched} />
      ))}
      <Button
        btnType="Success"
        disabled={!validState}>
        Submit
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <>
      <h4>Enter your contact data</h4>
      {form}
    </>
  );
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));