"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useCart } from "./store";
export default function Home() {
  //Dette er en array med produkter som vi bruker for å vise produktene på siden
  const products = [
    { id: 1, title: "Produkt 1", price: 100 },
    { id: 2, title: "Produkt 2", price: 200 },
    { id: 3, title: "Produkt 3", price: 300 },
  ];
  //useCart er en custom hook som vi bruker for å få tilgang til handlekurven og vi henter funksjonene til handlekurven
  //addProduct er en funksjon som vi bruker for å legge til produkter i handlekurven

  const addProduct = useCart((state) => state.addProduct);
  //decreaseCount er en funksjon som vi bruker for å redusere antall av produkter i handlekurven

  const decreaseCount = useCart((state) => state.decreaseCount);
  //removeProduct er en funksjon som vi bruker for å fjerne produkter fra handlekurven

  const removeProduct = useCart((state) => state.removeProduct);
  //cart er en array som inneholder produktene i handlekurven
  const cart = useCart((state) => state.cart);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Vi bruker map for å loope igjennom produktene og vise dem på siden */}
        {products.map((product) => (
          <div key={product.id}>
            <h2>
              {product.title}, Pris: {product.price}
            </h2>
            <div className={styles.ctas}>
              <button
                className={styles.primary}
                onClick={() => addProduct(product)}
              >
                +
              </button>
              <button
                className={styles.primary}
                onClick={() => decreaseCount(product.id)}
              >
                -
              </button>
              <button
                className={styles.primary}
                onClick={() => removeProduct(product.id)}
              >
                Fjern
              </button>
            </div>
          </div>
        ))}

        <h2>Handlekurv</h2>
        {/* Vi bruker map for å loope igjennom handlekurven og vise produktene på siden */}
        {/* cart er en array som inneholder produktene i handlekurven */}
        {/* Vi bruker map for å loope igjennom handlekurven og vise produktene på siden */}
        {cart.map((item) => (
          <div key={item.id}>
            Navn: {item.title} pris: {item.price * item.quantity} antall:{" "}
            {item.quantity}
          </div>
        ))}
        <Link href="/test">
          <h3>Gå til handlekurven</h3>
        </Link>
      </main>
    </div>
  );
}
