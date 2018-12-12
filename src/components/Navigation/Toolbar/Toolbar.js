import React from 'react';
import Logo from './../../Logo/Logo'
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo parentClass={classes.Toolbar__Logo} />
    <nav>...</nav>
  </header>
);

export default toolbar;
