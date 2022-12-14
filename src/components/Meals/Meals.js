import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { useCallback, useEffect, useState } from "react";

const Meals = (props) => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals url={props.url} />
    </>
  );
};

export default Meals;
