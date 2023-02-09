import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckedOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    //we want to output the total amount
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const removeItemHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const addItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    }
    const orderHandler = () => {
        setIsCheckedOut(true);
    };
    //data submission to the back-end
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://e-commerce-d120c-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const CartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={removeItemHandler.bind(null, item.id)}
                onAdd={addItemHandler.bind(null, item)} />
        ))};
    </ul>
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (<button className={classes.button}
                onClick={orderHandler}>Order</button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {CartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div>
                {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
                {!isCheckout && modalActions}
            </div>
        </React.Fragment>
    );

    const isSubmittingModalContent = (
        <p>Sending order data...</p>
    );

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        //we then pass that onClose props down to the buttons that are to carry out 
        //that function
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;