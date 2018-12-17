import React from 'react';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css'

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render() {
    return (
      <>
        <Toolbar toggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.MainContent}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default Layout;
