import Link from "next/link";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>Test your Helio checkout</a>
        </Link>
        <div className={styles.nav}>
          <Link href="/">
            <a className={styles.navItem}>Home</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>Products</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>Pricing</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>About</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>Contact</a>
          </Link>
          <button className={styles.button}>Buy Now!</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
