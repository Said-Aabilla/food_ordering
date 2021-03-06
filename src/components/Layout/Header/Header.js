import mealsImage from "../../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

  const showCart = ()=>{
    props.onShowCartHandler()
  }

  return (
    <>
      <header className={classes.header}>
        <h1>React Food</h1>
        <HeaderCartButton onCartButtonClick={showCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
