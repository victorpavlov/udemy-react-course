import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.Input]
  
  if (props.invalid && props.required && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch(props.type) {
    case('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.changed}
        required={props.required}/>;
      break;
    case('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.changed}
          required={props.required}>
          {props.config.options.map(option => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.config.placeholder}
        onChange={props.changed}
        value={props.value}
        required={props.required}/>
  }

  return (
    <div className={classes.InputWrapper}>
      <label className={classes.InputLabel} htmlFor={props.id}>
        {props.label}:{props.required ? <span style={{color: 'red'}}>*</span> : ''}
      </label>
      { inputElement }
    </div>
  )
};

export default input;