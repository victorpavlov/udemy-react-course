import React from 'react';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const layout = (props) => (
  <>
    <Toolbar />
    <main className={classes.MainContent}>
      {props.children}
    </main>
  </>
);

export default layout;
