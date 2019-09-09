import React, {useState} from 'react';
import { connect } from 'react-redux';

import Toolbar from './../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css'

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

    return (
      <>
        <Toolbar
          isAuth={props.isAuthenticated}
          toggleClicked={sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={showSideDrawer}
          closed={sideDrawerClosedHandler} />
        <main className={classes.MainContent}>
          {props.children}
        </main>
      </>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(layout);
