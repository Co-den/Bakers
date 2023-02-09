import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,

    });
    //1
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        //2 houses number 1
        const enteredName = nameInputRef.current.value;
        const enteredStreet = nameInputRef.current.value;
        const enteredPostalCode = nameInputRef.current.value;
        const enteredCity = nameInputRef.current.value;

        //3 houses number 2
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
        //checking form validity

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });

        //4 houses number 3
        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    };
    //5
    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;


    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={nameControlClasses}>
                <label htmlFor='name'> Your name </label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'> Street </label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>please enter a valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'> Postal code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputValidity.postalCode && <p>please enter a valid postalCode(5 characters long)!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'> City </label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;