import React from 'react';
import { connect } from 'react-redux';

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={classes.MainContent}>
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
