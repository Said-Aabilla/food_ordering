import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const ItemsReducer = (state, action) => {
  if (action.type === "REMOVE_CART_ITEM") {
    const newItems = state.items.filter((item) => item.id !== action.itemId);
    return { items: newItems, totalAmount: state.totalAmount + 1 };
  }
  if (action.type === "ADD_CART_ITEM") {
    const updatedItems = state.items.concat(action.newItem);
    //alternative
    // const updatedItems = [...state.items];
    // updatedItems.unshift(action.newItem);

    return { items: updatedItems, totalAmount: state.totalAmount + action.newItem.price * action.newItem.amount };
  }
};

const CartProvider = (props) => {
  const [itemsState, dispatchItem] = useReducer(ItemsReducer, defaultCartState);

  const removeItemFromCart = (id) => {
    dispatchItem({ type: "REMOVE_CART_ITEM", itemId: id });
  };
  const addItemToCart = (item) => {
    dispatchItem({ type: "ADD_CART_ITEM", newItem: item });
  };

  const cartContextValue = {
    items: itemsState.items,
    totalAmount: itemsState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
