import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { useCallback, useEffect, useState } from "react";

const url = "https://react-http-8a750-default-rtdb.firebaseio.com/meals.json";

const Meals = (props) => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
