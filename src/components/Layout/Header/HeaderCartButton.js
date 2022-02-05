import { useContext, useState } from "react";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart/cart-context";
import { useEffect } from "react";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

  const numberOfCartItems = cartContext.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    //add a bump to the button when an item is changed
    isButtonHighlighted ? classes.bump : ""
  }`;

  const { items } = cartContext;

  useEffect(() => {
    if (items.length === 0) return;

    //set the highlight
    setIsButtonHighlighted(true);

    //remove the bump style after 300ms
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300);

    //clean up
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const showCart = () => {
    props.onCartButtonClick();
  };

  return (
    <button className={btnClasses} onClick={showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
