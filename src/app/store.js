import { create } from "zustand";
import { persist } from "zustand/middleware";

//Zustand er en state management library for React som gjør det enkelt å håndtere global state i applikasjonen din
//https://dev.to/rifkyalfarez/cart-feature-in-reactjs-using-zustand-515l

export const useCart = create(
  //Persist og set bruker du for å lagre noe i browser så det blir tilgjengelig selv om du refresher siden og på alle sider
  persist(
    (set) => ({
      //Count er antall av produkter i handlekurven
      count: 0,
      //Cart er en array som inneholder produktene i handlekurven
      cart: [],
      //funksjon for å legge et produkt i handlekurven.
      addProduct: (item) =>
        //set er en funksjon som oppdaterer state i zustand
        set((state) => {
          //Finnes produktet fra før i handlekurven?
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          //Hvis produktet finnes fra før så øker vi antall med 1
          if (existingItem) {
            return {
              count: state.count + 1,
              //Map brukes for å loop igjennom arrayen og oppdatere den
              //Vi bruker spread operatoren for å oppdatere produktet i handlekurven
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }
          //Hvis produktet ikke finnes fra før så legger vi det til i handlekurven med quantity 1
          return {
            //oppdater antall av produkter i handlekurven med 1
            count: state.count + 1,
            //Legg til produktet i handlekurven med quantity 1
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        }),
      //funksjon for å fjerne et produkt fra handlekurven.
      removeProduct: (id) =>
        //set er en funksjon som oppdaterer state i zustand
        set((state) => {
          //Finnes produktet fra før i handlekurven?
          const existingItem = state.cart.find((item) => item.id === id);

          //Hvis produktet finnes fra før så fjerner vi det fra handlekurven
          if (existingItem) {
            return {
              //oppdater antall av produkter i handlekurven minus det som ble fjernet
              count: state.count - existingItem.quantity,
              //Vi bruker filter for å fjerne produktet fra handlekurven
              cart: state.cart.filter((cartItem) => cartItem.id !== id),
            };
          }

          //Hvis produktet ikke finnes fra før så gjør vi ingenting
          return {
            count: state.count,
            cart: [...state.cart],
          };
        }),

      //funksjon for å redusere antall av et produkt i handlekurven.
      decreaseCount: (id) =>
        //set er en funksjon som oppdaterer state i zustand
        set((state) => {
          //Finnes produktet fra før i handlekurven?
          const existingItem = state.cart.find((item) => item.id === id);
          //hvis produktet finnes fra før og antallet er større enn 1 så reduserer vi antall med 1
          if (existingItem && existingItem.quantity > 1) {
            return {
              //oppdater antall av produkter i handlekurven minus 1
              count: state.count - 1,
              //Map brukes for å loop igjennom arrayen og oppdatere den
              cart: state.cart.map((cartItem) =>
                cartItem.id === id
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
              ),
            };
          }
          //hvis produktet finnes fra før og antallet er 1 så fjerner vi det fra handlekurven
          return {
            count: state.count - 1,
            cart: state.cart.filter((item) => item.id !== id),
          };
        }),
    }),
    {
      //Navn på localStorage key
      name: "cart-storage",
    }
  )
);
