import classes from "./MealsSummary.module.css";

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>Food deliver to you</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis
        ac urna ac hendrerit.
      </p>
      <p>
        Nullam euismod cursus gravida. Fusce laoreet ultricies sapien, vitae
        pulvinar nisl volutpat at.
      </p>
    </section>
  );
};

export default MealsSummary;
