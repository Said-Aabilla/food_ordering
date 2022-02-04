import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { useContext } from "react";
import CartContext from "../../../store/cart/cart-context";

const MealItem = (props) => {
 
  const context = useContext(CartContext);
 
  const addToCartHandler = (amount) => {

    const ItemToAdd = {
      id: props.id,
      name: props.name,
      description: props.description,
      price:props.price,
      amount: amount,
    };

    context.addItem(ItemToAdd);
  };

  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
