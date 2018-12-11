import React from 'react';

const orderSummary = (props) => {
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
      <p>Continue to Checkout?</p>
    </>
  );
};

export default orderSummary;