import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from './../../store/actions/index';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';

const initFormState = {
  email: {
    type: 'email',
    label: 'E-mail',
    value: '',
    elementConfig: {
      placeholder: ''
    },
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  password: {
    type: 'password',
    label: 'Password',
    value: '',
    elementConfig: {
      placeholder: ''
    },
    validation: {
      required: true,
      minLength: 7
    },
    valid: false,
    touched: false
  }
};

const auth = props => {
  
  const [formState, setFormState] = useState(initFormState);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const {bildingBurger, authRedirectPath, onSetAuthRedirectPath} = props; 
  useEffect(() => {
    if (!bildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [bildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const checkValid = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...formState
    };
    const updatedFormElement = {...updatedAuthForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValid(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const key in updatedAuthForm) {
      if (updatedAuthForm.hasOwnProperty(key)) {
        formIsValid = updatedAuthForm[key].valid && formIsValid;
      }
    }
    setFormState(updatedAuthForm);
    setFormIsValid(formIsValid);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(formState.email.value, formState.password.value, isSignUp);
  }

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  }

  const formElementsArray = [];
  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      const element = {
        id: key,
        name: key,
        type: formState[key].type,
        label: formState[key].label,
        value: formState[key].value,
        config: formState[key].elementConfig,
        required: formState[key].validation ? formState[key].validation.required : false,
        invalid: formState[key].valid,
        touched: formState[key].touched
      };

      formElementsArray.push(element);
    }
  }

  let form = formElementsArray.map(formElement => (
    <Input
      id={formElement.id}
      key={formElement.id}
      type={formElement.type}
      name={formElement.name}
      value={formElement.value}
      label={formElement.label}
      config={formElement.config}
      changed={(event) => inputChangedHandler(event, formElement.id)}
      required={formElement.required}
      invalid={!formElement.invalid}
      touched={formElement.touched} />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p>{ this.props.error.message }</p>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <>
      { authRedirect }
      { errorMessage }
      <form onSubmit={submitHandler}>
        { form }
        <Button
          btnType="Success"
          disabled={!formIsValid}>
          Submit
        </Button>
        <Button
          btnType="Danger"
          disabled={!formIsValid}
          clicked={switchAuthModeHandler}>
          SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </form>
    </>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);