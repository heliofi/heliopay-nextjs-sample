import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/main.module.scss";

import {
  ErrorPaymentEvent,
  HelioPay,
  PendingPaymentEvent,
  SuccessPaymentEvent,
} from "@heliofi/react";

import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "../src/components/Header";
import { useState } from "react";

const Home: NextPage = () => {
  const [paymentRequestId, setPaymentRequestId] = useState<string>(
    "3785240e-f55c-40d8-9914-b75e9bba46fc"
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        <div className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroTitle}>Order TheGreatProduct</div>
            <div className={styles.heroText}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
              repellat voluptas laboriosam expedita omnis, voluptate nihil.
            </div>
            <div className={styles.product}>
              <div className={styles.productLeft}>
                {!isSuccess && (
                  <>
                    <div className={styles.productTitle}>
                      Choose your coffee
                    </div>
                    <select
                      className={styles.productSelect}
                      defaultValue={paymentRequestId}
                      onChange={(e) => {
                        setPaymentRequestId(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select one...
                      </option>
                      <option value="3785240e-f55c-40d8-9914-b75e9bba46fc">
                        Diyarbekir Menengich Coffee
                      </option>
                      <option value="ded08427-cbd4-4c9c-b29f-cd2c78e59f1c">
                        Italiano Cappucino
                      </option>
                      <option value="c5d4dd5d-d880-4b9f-a918-efb931a3aa1e">
                        White Mocha
                      </option>
                      <option value="7a0762a2-36d6-4e91-9c9d-7dedc989edee">
                        Irish Con Panna
                      </option>
                      <option value="77f02e26-43a1-4d9f-8601-961b4975b6e4">
                        British Affosat Coffee
                      </option>
                      <option value="48844779-5949-43dd-a3cb-69e0f37e3569">
                        British Affosat Coffee - without form
                      </option>
                    </select>
                  </>
                )}

                <div className={styles.paybutton}>
                  <HelioPay
                    cluster="devnet"
                    payButtonTitle="Buy Coffee"
                    paymentRequestId={paymentRequestId}
                    onSuccess={function (event: SuccessPaymentEvent): void {
                      console.log("onSuccess", event);
                      setIsSuccess(true);
                    }}
                    onError={function (event: ErrorPaymentEvent): void {
                      console.log("onError", event);
                      setIsSuccess(false);
                    }}
                    onPending={function (event: PendingPaymentEvent): void {
                      console.log("onPending", event);
                    }}
                    onStartPayment={function (): void {
                      console.log("onStartPayment");
                    }}
                    supportedCurrencies={["USDC", "SOL", "DUST", "BOO", "HALO"]}
                    totalAmount={0.145}
                    // theme={{
                    //     colors: {
                    //         primary: "#ff0000",
                    //         secondary: "#00ff00",
                    //     }
                    // }}
                  />
                </div>
              </div>
              <div className={styles.productRight}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.ambercay.com.tr/cropped/?src=dosyalar/page_77/img_11616842956.png&w=553&h=600"
                  alt="TheGreatProduct"
                  className={styles.productImage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
