import { useReducer } from 'react';
import CartContext from './cart-context';

//so outside the component function we will create our
//reducer function, the reason why we create it outside is because
//we dont need anything from the component function.
//the action will be imported into our code below and the state
//the state is the last state snapshot of the state
const defaultCartState = {
    items: [],
    totalAmount: 0
};
const CartReducer = (state, action) => {
    if (action.identifier === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount
        //checking for existing items on the cart
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        //we add an updated item variable
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;

        } else {
            updatedItems = state.items.concat(action.item)
        };


        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    /*this is our logic for decreasing the item by 1*/
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            item: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'CLEAR') {
        return defaultCartState;
    }
    return defaultCartState;
};
//then we make use of our useReducer in the cartReducer,
//and in the cart reducer we give it two arguments, the first being our CartReducer
//and the second beign our defaultCartState which we defined earlier above.
const CartProvider = (props) => {
    //our useReducer returns an array with exactly two element
    //so we use array destructuring
    //our first array element is always our state snapshot
    const [CartState, dispatchAction] = useReducer(CartReducer, defaultCartState);

    const AddItemToCartHandler = (item) => {
        dispatchAction(
            { identifier: 'ADD', item: item }
        );
    };
    const RemoveItemHandler = (id) => {
        dispatchAction(
            { identifer: 'REMOVE', id: id }
        );
    };

    const clearCartHandler = () => {
        dispatchAction({ type: 'CLEAR' });
    }
    const cartContext = {
        items: CartState.items,
        totalAmount: CartState.totalAmount,
        addItem: AddItemToCartHandler,
        removeItem: RemoveItemHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;