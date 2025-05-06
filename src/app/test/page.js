"use client";
import { useCart } from "../store";
export default function Test() {
  const cart = useCart((state) => state.cart);
  return (
    <div>
      <h2>Handlekurv</h2>
      {cart.map((item) => (
        <div key={item.id}>
          Navn: {item.title} pris: {item.price * item.quantity} antall:{" "}
          {item.quantity}
        </div>
      ))}
    </div>
  );
}
