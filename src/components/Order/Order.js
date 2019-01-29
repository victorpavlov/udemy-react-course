import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (const key in props.ingredients) {
    if (props.ingredients.hasOwnProperty(key)) {
      const element = `${key} (${props.ingredients[key]})`;
      ingredients.push(element);
    }
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients.join(', ')}</p>
      <p>Price: {props.price}</p>
    </div>
  );
};

export default order;