import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from './../../assets/images/burger-logo.png'

const logo = (props) => (
  <div className={[classes.Logo, props.parentClass].join(' ')}>
    <img src={burgerLogo} className={classes.LogoImg} alt="Logo" />
  </div>
);

export default logo;