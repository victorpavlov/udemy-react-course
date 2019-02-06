import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from './../../store/actions';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  // componentDidMount() {
  //   axios.get('https://udemy-react-cours.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       this.setState({ingredients: response.data});
  //     })
  //     .catch(error => {
  //       this.setState({error: true})
  //     });
  // }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
    .map(
      igKey => {
        return ingredients[igKey];
      }
    )
    .reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientDeleted}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice} />
        </>
        
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          btnCancel={this.purchaseCancelHandler}
          btnContinue={this.purchaseContinueHandler}
          price={this.props.totalPrice} />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    onIngredientAdded: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onIngredientDeleted: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));