import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const ItemsReducer = (state, action) => {
  if (action.type === "REMOVE_CART_ITEM") {
    //get the index of the new item that exists already
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    //get the item by its index from the state
    const itemToRemove = state.items[existingItemIndex];
    let updatedItems;
    if (itemToRemove.amount === 1) {
      state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...itemToRemove, amount: itemToRemove.amount - 1 };
      //copy the state then override the existing item with new one
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount - itemToRemove.price,
    };
  }
  
  if (action.type === "ADD_CART_ITEM") {
    //get the index of the new item if exists already
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.newItem.id
    );
    //get the item by its index from the state
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    //check if it exists then update its amount
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.newItem.amount,
      };

      //copy the state then override the existing item with new one
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.newItem);
    }
    //alternative
    // const updatedItems = [...state.items];
    // updatedItems.unshift(action.newItem);

    return {
      items: updatedItems,
      totalAmount:
        state.totalAmount + action.newItem.price * action.newItem.amount,
    };
  }

  if (action.type==='CLEAR_CART'){
    return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [itemsState, dispatchItem] = useReducer(ItemsReducer, defaultCartState);

  const removeItemFromCart = (id) => {
    dispatchItem({ type: "REMOVE_CART_ITEM", id: id });
  };
  const addItemToCart = (item) => {
    dispatchItem({ type: "ADD_CART_ITEM", newItem: item });
  };
  const clearCartHandler = () => {
    dispatchItem({ type: "CLEAR_CART"});
  };

  const cartContextValue = {
    items: itemsState.items,
    totalAmount: itemsState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
