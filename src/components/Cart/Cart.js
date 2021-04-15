import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-contex';
import CartItem from './CartItem';
import { useContext, useState } from 'react';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoverHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };

  const oderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = 
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onToggleCart} >Close</button>
        {hasItems && <button className={classes.button} 
        onClick={oderHandler} >Order</button>}
      </div>;

  const submiteOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-curso-1fc5b-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = (
  <ul className={classes['cart-items']}>
    {cartContext.items.map(item => (
      <CartItem 
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoverHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    ))}
  </ul>
    );

  const cartModalContent = 
  <> 
  {cartItems}
    <div className={classes.total}> 
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout 
    ? <Checkout onCancel={props.onToggleCart} onConfirm={submiteOrderHandler}/> 
    : modalActions}
  </>

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = 
  <>
  <p>Sucessfully sent the order</p>
  <div className={classes.actions}>
    <button className={classes.button} onClick={props.onToggleCart}>
      Close
    </button>
  </div>
  </>

  return (
    <Modal onClick={props.onToggleCart}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;