import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 5;

export const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const entredCity = cityInputRef.current.value;

    //Validation

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostcodeIsValid = isFiveChars(enteredPostcode);
    const entredCityIsValid = !isEmpty(entredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostcodeIsValid,
      city: entredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostcodeIsValid &&
      entredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: entredCity,
      postal: enteredPostcode,
      street: enteredStreet,
    });
  };

  const nameInputClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const streetInputClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  const postalInputClasses = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;

  const cityInputClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputValidity.name && <p>Name field cannot be empty!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="name" ref={streetInputRef}></input>
        {!formInputValidity.street && <p>Street field cannot be empty!</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postcode">Post code</label>
        <input type="text" id="postcode" ref={postcodeInputRef}></input>
        {!formInputValidity.postal && <p>Post code must have 5 characters!</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputValidity.city && <p>City field cannot be empty!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};
