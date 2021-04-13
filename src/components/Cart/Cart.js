import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartItems = <ul className={classes['cart-items']}>{[{id: 'c1', name:'sasasa', amount: 2, price: 12.22}]
    .map(item => <li>{item.name}</li>)}</ul>;

  return (
    <Modal onClick={props.onToggleCart}>
      {cartItems}
      <div className={classes.total}> 
        <span>Total Amount</span>
        <span>22.22</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onToggleCart} >Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;