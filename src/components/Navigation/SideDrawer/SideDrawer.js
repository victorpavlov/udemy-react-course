import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop'

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
  const attachedClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close
  ];
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo parentClass={classes.SideDrawer__Logo} />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;