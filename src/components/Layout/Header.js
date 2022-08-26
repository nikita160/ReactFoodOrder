import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/img1.jpg";
import HeaderCartButton from "./HeaderCartButton";

//const mealsImage = "https://media.eritcom.com/images/business/rest.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Restoraunt interior" />
      </div>
    </>
  );
};
export default Header;
