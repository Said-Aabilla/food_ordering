import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {

  //ref the input for the amount
  const amountRef = useRef(1);
  //manage a simple state for input validity
  const [isValidAmount, setIsValidAmount] = useState(true);

  const submitItemHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().lenght === 0 ||
      enteredAmountNumber > 5 ||
      enteredAmountNumber < 1
    ) {
      setIsValidAmount(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber)

  };
  return (
    <form className={classes.form}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={submitItemHandler}>+ Add</button>
      {!isValidAmount && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
