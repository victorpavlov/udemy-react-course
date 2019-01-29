import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Logo.module.css';
import burgerLogo from './../../assets/images/burger-logo.png'

const logo = (props) => (
  <div className={[classes.Logo, props.parentClass].join(' ')}>
    <Link to="/">
      <img src={burgerLogo} className={classes.LogoImg} alt="Logo" />
    </Link>
  </div>
);

export default logo;