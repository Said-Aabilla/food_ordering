import { useContext } from 'react';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../../store/cart/cart-context';

const HeaderCartButton = (props) => {

  const context = useContext(CartContext);

  const numberOfCartItems = context.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  
  const showCart = () => {
     props.onCartButtonClick()
  }

  return (
    <button className={classes.button} onClick={showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
