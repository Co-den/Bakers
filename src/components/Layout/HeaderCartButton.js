import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css';

const CartButton = props => {
    const [btnHighLighted, setBtnIsHighLighted]=useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    
    const btnClasses = `${classes.button} ${ btnHighLighted ? classes.bump: ''}`;
    //for the animation
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighLighted(true);
       const timer =  setTimeout(()=>{
         setBtnIsHighLighted(false);
        },300);

        return () =>{
            clearTimeout(timer);
        }
  }, [items]);



    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default CartButton;