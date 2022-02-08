import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useState } from "react";
import useHttp from "../../hooks/use-http";
import { useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(
      { url: "https://react-http-a0d8b-default-rtdb.firebaseio.com/meals.json" },
      transformMeals
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <div className={classes.loader}>Loading...</div>}
        {error && <p>{error}</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
