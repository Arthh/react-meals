import classes from './Checkout.module.css';

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
    props.onConfirm({
      name: event.target.name.value,
      street: event.target.street.value,
      city: event.target.city.value,
      postalCode: event.target.postal.value
    })
    
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" required id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" required id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" required id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" required id="city" />
      </div>
      <div className={classes.actions}>
      <button type="button" required onClick={props.onCancel}>Cancel</button>
      <button >Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;