import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useCallback, useEffect, useState } from "react";

const url = "https://react-http-8a750-default-rtdb.firebaseio.com/meals.json";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(url);
      if (!response.ok) setIsLoaded(false);
      else {
        const dataset = await response.json();

        const loadedMeals = [];

        for (const key in dataset) {
          loadedMeals.push(dataset[key]);
        }
        setMeals(loadedMeals);
        setIsLoaded(true);
      }
    };

    fetchMeals();
  }, []);

  let mealsList = [];

  if (isLoaded) {
    mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        price={meal.price}
        name={meal.name}
        description={meal.description}
      />
    ));
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {!isLoaded && <p>Loading...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
