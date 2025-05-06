"use client";
import Link from "next/link";
import { useCart } from "../store";
import styles from "../page.module.css";
export default function Test() {
  const cart = useCart((state) => state.cart);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Handlekurv</h2>
        {cart.map((item) => (
          <div key={item.id}>
            Navn: {item.title} pris: {item.price * item.quantity} antall:{" "}
            {item.quantity}
          </div>
        ))}
        <Link href="/">
          <h3>Gå til Forsiden</h3>
        </Link>
      </main>
    </div>
  );
}
