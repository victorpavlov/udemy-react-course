import React from 'react';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.3,
  meat: 1
}

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://udemy-react-cours.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {
        this.setState({error: true})
      });
  }

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

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount =  this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount =  this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;
    
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'User Name',
        address: {
          street: 'Street Name',
          zip: '12345',
          country: 'Ukraine'
        },
        email: 'test@mail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice} />
        </>
        
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          btnCancel={this.purchaseCancelHandler}
          btnContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice} />
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

export default withErrorHandler(BurgerBuilder, axios);