import React from 'react';
import Modal from './../../components/UI/Modal/Modal';
import useHttpErrorHandler from './../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal
          modalClosed={errorConfirmedHandler}
          show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  }
}

export default withErrorHandler;