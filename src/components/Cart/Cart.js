import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const closeCartHandler = () => {
    props.onHideCartHandler();
  };

  const addItemToCartHandler= (item)=>{
    cartCtx.addItem({...item, amount:1})
  }
  const removeItemFromCartHandler= (id)=>{
    cartCtx.removeItem(id)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
        key={item.id} 
        price={item.price}
        name={item.name}
        amount={item.amount}
        onAdd={addItemToCartHandler.bind(null,item)}
        onRemove={removeItemFromCartHandler.bind(null,item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeCartHandler}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
