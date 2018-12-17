import React from 'react';
import classes from './NavigationItem.module.scss';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <a
      className={[classes.NavigationItem__link, props.active ? classes.active : null].join(' ')}
      href={props.link}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;