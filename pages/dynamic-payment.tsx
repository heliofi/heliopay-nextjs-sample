import { NextPage } from "next";
import Cart from "../src/components/Cart";
import { AnchorProvider } from "../src/providers/Anchor";
import { useAnchorProvider } from "../src/providers/Anchor/AnchorContext";
import styles from "../styles/dynamic-payment.module.scss";

const CART_ITEMS = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    quantity: 1,
    image: "https://picsum.photos/200/250",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20,
    quantity: 2,
    image: "https://picsum.photos/200/250",
  },
  {
    id: 3,
    name: "Product 3",
    price: 20,
    quantity: 2,
    image: "https://picsum.photos/200/250",
  },
  {
    id: 4,
    name: "Product 4",
    price: 20,
    quantity: 2,
    image: "https://picsum.photos/200/250",
  },
];

const DynamicPayment: NextPage = () => {
  return (
    <AnchorProvider>
      <div className={styles.wrapper}>
        <Cart cartItems={CART_ITEMS} />
      </div>
    </AnchorProvider>
  );
};

export default DynamicPayment;
