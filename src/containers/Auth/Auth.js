import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from './../../store/actions/index';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';

class Auth extends React.Component {
  state = {
    controls: {
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
    },
    formIsValid: false,
    isSignUp: true
  }

  componentDidMount() {
    if (!this.props.bildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValid = (value, rules) => {
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.controls
    };
    const updatedFormElement = {...updatedAuthForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValid(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const key in updatedAuthForm) {
      if (updatedAuthForm.hasOwnProperty(key)) {
        formIsValid = updatedAuthForm[key].valid && formIsValid;
      }
    }
    this.setState({controls: updatedAuthForm, formIsValid: formIsValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    });
  }

  render() {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      if (this.state.controls.hasOwnProperty(key)) {
        const element = {
          id: key,
          name: key,
          type: this.state.controls[key].type,
          label: this.state.controls[key].label,
          value: this.state.controls[key].value,
          config: this.state.controls[key].elementConfig,
          required: this.state.controls[key].validation ? this.state.controls[key].validation.required : false,
          invalid: this.state.controls[key].valid,
          touched: this.state.controls[key].touched
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
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        required={formElement.required}
        invalid={!formElement.invalid}
        touched={formElement.touched} />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{ this.props.error.message }</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <>
        { authRedirect }
        { errorMessage }
        <form onSubmit={this.submitHandler}>
          { form }
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}>
            Submit
          </Button>
          <Button
            btnType="Danger"
            disabled={!this.state.formIsValid}
            clicked={this.switchAuthModeHandler}>
            SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </form>
      </>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);