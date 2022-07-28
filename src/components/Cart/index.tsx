/* eslint-disable @next/next/no-img-element */
import { useAnchorProvider } from "../../providers/Anchor/AnchorContext";
import styles from "./styles.module.scss";

interface Props {
    cartItems: {
        id: string | number;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }[];
}
const Cart = ({ cartItems }: Props) => {
  const anchorProvider = useAnchorProvider();

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  };
  return (
    <div className={styles.cart}>
      <div className={styles.cart__header}>
        <div className={styles.cart__header__title}>Cart</div>
        <div className={styles.cart__header__total}>
          Total: <b>${getTotalPrice()}</b>
        </div>
      </div>
      <div className={styles.cart__body}>
        {cartItems.map((item) => (
          <div className={styles.cart__item} key={item.id}>
            <div className={styles.cart__item__image}>
              <img src={item.image} alt="" />
            </div>
            <div className={styles.cart__item__info}>
              <div className={styles.cart__item__title}>{item.name}</div>
              <div className={styles.cart__item__price}>${item.price}</div>
            </div>
            <div className={styles.cart__item__quantity}>{item.quantity}</div>
          </div>
        ))}
      </div>
      <div className={styles.cart__footer}>
        <button className={styles.cart__button}>
          Checkout (${getTotalPrice()})
        </button>
      </div>
    </div>
  );
};
export default Cart;
