import React from 'react';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Button from './../../UI/Button/Button';

import classes from './Toolbar.module.scss';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <span className={classes.Toolbar__NavToggle}>
      <Button clicked={props.toggleClicked}>
        ☰
      </Button>
    </span>
    <Logo parentClass={classes.Toolbar__Logo} />
    <nav className={classes.Toolbar__Nav}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
