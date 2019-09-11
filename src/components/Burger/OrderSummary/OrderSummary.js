import React from 'react';
import Button from './../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return <li key={igKey}>{igKey}: {props.ingredients[igKey]}</li>;
  });
  return (
    <>
      <h3>Yor order</h3>
      <p>A delicious burger with:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price:</strong> {props.price.toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} clicked={props.btnCancel}>Cancel</Button>
      <Button btnType={'Success'} clicked={props.btnContinue}>Continue</Button>
    </>
  );
}

export default orderSummary;