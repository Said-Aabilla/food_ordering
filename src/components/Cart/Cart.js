import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout/Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  //Custom hook to send checkout
  const { isLoading, error, sendRequest: sendCheckout } = useHttp();

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const closeCartHandler = () => {
    props.onHideCartHandler();
  };

  const addItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderClickHandler = () => {
    setIsCheckout((prevState) => true);
  };

  //this executes once the request is sent, it receives the response
  const catchResponse = (response) => {
    if (response.name) {
      setDidSubmit((prevState) => true);
      cartCtx.clearCart();
    }
    setTimeout(() => {
      closeCartHandler();
    }, 3000);
  };

  const submitCheckoutHandler = (data) => {
    const checkoutBody = {
      ...data,
      meals: cartCtx.items,
      amount: cartCtx.totalAmount,
    };
    sendCheckout(
      {
        url: "https://react-http-a0d8b-default-rtdb.firebaseio.com/checkouts.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutBody),
      },
      catchResponse
    );
  };

  //cart items
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onAdd={addItemToCartHandler.bind(null, item)}
          onRemove={removeItemFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  //Cart modal actions
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={closeCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  //cart modal content
  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {!isCheckout && modalActions}
      {isCheckout && (
        <Checkout
          onSubmit={submitCheckoutHandler}
          onCancel={closeCartHandler}
        />
      )}
    </>
  );

  return (
    <Modal>
      {!didSubmit && !isLoading && modalContent}
      {!didSubmit && isLoading && <p>sending order...</p>}
      {!didSubmit && error && <p>{error}</p>}
      {didSubmit && <p>Order submitted successfully!</p>}
    </Modal>
  );
};

export default Cart;
