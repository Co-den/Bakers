import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  //this function handles the opening of the Cart
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  //this function handles the closing of the cart
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  //to close the cart anytime we open it, we add an onClick to the Cart
  //and pass in the hidecartHandler
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header showCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
