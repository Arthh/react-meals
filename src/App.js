import { useState } from 'react';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartToggleHandler = () => {
    setCartIsShown(!cartIsShown);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart  onToggleCart={cartToggleHandler}/>}
      <Header onToggleCart={cartToggleHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
