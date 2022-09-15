import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { Checkout, Checkouts } from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (event) => {
    setIsCheckOut(true);
  };

  const cancelHandler = () => {
    setIsCheckOut(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(`${props.url}orders.json`, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    if (response.ok) {
      setDidSubmit(true);
      setIsSubmitting(false);
      cartCtx.clear();
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          id={item.id}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total amout:</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout
          onCLose={props.onClose}
          onCancel={cancelHandler}
          onConfirm={submitOrderHandler}
        />
      )}
      {!isCheckOut && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Submitting...</p>;
  const didSubmittedModalContent = (
    <>
      <p>Order succesfully submitted</p>
      <div className={classes.actions}>
        {" "}
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && !didSubmit && cartModalContent}
      {!isSubmitting && didSubmit && didSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
