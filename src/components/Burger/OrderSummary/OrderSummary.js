import React from 'react';
import Button from './../../UI/Button/Button'

class OrderSummary extends React.Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return <li key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li>;
    });
    return (
      <>
        <h3>Yor order</h3>
        <p>A delicious burger with:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price:</strong> {this.props.price.toFixed(2)}</p>
        <p>Continue to Checkout?</p>
        <Button btnType={'Danger'} clicked={this.props.btnCancel}>Cancel</Button>
        <Button btnType={'Success'} clicked={this.props.btnContinue}>Continue</Button>
      </>
    );
  }
}

export default OrderSummary;