import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useCallback, useEffect, useState } from "react";

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

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`${props.url}meals.json`);

      if (!response.ok) {
        console.log("response not ok");
        throw new Error("Error");
      } else {
        console.log("response ok");
        const dataset = await response.json();

        const loadedMeals = [];

        for (const key in dataset) {
          loadedMeals.push(dataset[key]);
        }
        setMeals(loadedMeals);
        setIsLoaded(true);
        setHasError(false);
      }
    };

    fetchMeals()
      .then()
      .catch((error) => {
        setHasError(true);
        setIsLoaded(false);
      });
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
      {isLoaded ? (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      ) : (
        <div className={classes["loading--message"]}>
          {!hasError ? <p>Loading...</p> : <p> Something went wrong!</p>}
        </div>
      )}
    </section>
  );
};

export default AvailableMeals;
