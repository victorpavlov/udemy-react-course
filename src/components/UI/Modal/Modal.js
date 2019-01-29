import React from 'react';
import classes from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  // componentWillUpdate() {
  //   console.log('Modal component Will Update');
  // }

  render() {
    return (
      <>
        <div hidden={!this.props.show} className={classes.Modal}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
      </>
    );
  }
}

export default Modal;
