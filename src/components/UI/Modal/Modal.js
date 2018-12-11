import React from 'react';
import classes from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop';

const modal = (props) => (
  <>
    <div hidden={!props.show} className={classes.Modal}>
      {props.children}
    </div>
    <Backdrop show={props.show} clicked={props.modalClosed} />
  </>
);

export default modal;
