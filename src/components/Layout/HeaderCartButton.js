import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-contex';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnBump, setBtnBump] = useState(false);
  const carContext = useContext(CartContext);
  const { items } = carContext;

  const numberOfCarItems = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);


  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''} `;

  useEffect(() =>{
    if (items.length === 0) 
      return;
  
    setBtnBump(true);

    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  },[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCarItems}</span>
    </button>
  )
};

export default HeaderCartButton;