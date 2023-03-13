import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/main.module.scss";

import {
  HelioPay
} from "@heliofi/react";

import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "../src/components/Header";
import { useEffect, useMemo, useState } from "react";
import { Cluster } from "@solana/web3.js";
import { HelioSDK } from "@heliofi/sdk";
import { Paylink } from "@heliofi/common";

type Favicon = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicon> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
  {
    rel: 'shortcut icon',
    href: '/favicon/favicon.ico',
  },
];

const Home: NextPage = () => {
  const [paymentRequestId, setPaymentRequestId] = useState<string>(
    "63c5b1a765f452f94a1e5ade"
  );
  const [cluster, setCluster] = useState<Cluster>("mainnet-beta");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [paymentRequest, setPaymentRequest] = useState<Paylink>();

  const sdk = useMemo(() => {
    return new HelioSDK({ cluster })
  }, [cluster]);

  useEffect( () => {
    const fetchPaylink = async () => {
      const paylink = await sdk.apiService.getPaymentRequestByIdPublic(paymentRequestId);
      setPaymentRequest(paylink);
    }
    fetchPaylink();

  }, [paymentRequestId, sdk.apiService])
  return (
    <div>
      <Head>
        <title>Helio Embed Sample App</title>
        <meta name="description" content="Helio Embed Sample App" />
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
      </Head>

      <main className={styles.main}>
        <Header />

        <div className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroTitle}>Your coffee order</div>
            <div className={styles.heroText}>Speciality 80+ arabica single origin coffee beans. Characterised by zesty
              acidity and heavy body, with slightly herbal, chocolate, citric undertones.
              All coffee is roasted daily and fresh!
            </div>
            <div className={styles.product}>
              <div className={styles.productLeft}>
                {!isSuccess && (
                  <>
                    <div className={styles.productTitle}>
                      Choose an example
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
                      <option value="63c5b1a765f452f94a1e5ade">
                        Coffee order (mainnet)
                      </option>
                      <option value="63c552ac5cff95b55ea5fcfc">
                        Coffee order (testnet)
                      </option>
                    </select>
                    <div className={styles.productTitle} data-tooltip={'Log in to hel.io and create a Pay Link or ' +
                        '"Dynamic payment". Copy paste the paymentRequestId  from Step 4: Integrate Helio'}>
                      Paste you payment ID here to test your checkout
                    </div>
                    <input
                      type="text"
                      value={paymentRequestId}
                      onChange={(e) => setPaymentRequestId(e.target.value)}
                    />
                    <br />
                    <br />
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="cluster"
                          value="mainnet-beta"
                          checked={cluster === "mainnet-beta"}
                          onChange={() => setCluster("mainnet-beta")}
                        />
                        &nbsp; mainnet-beta
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name="cluster"
                          value="devnet"
                          checked={cluster === "devnet"}
                          onChange={() => setCluster("devnet")}
                        />
                        &nbsp; devnet
                      </label>
                    </div>
                    <br />
                    <br />
                  </>
                )}

                <div className={styles.paybutton}>
                  <HelioPay
                    cluster={cluster}
                    payButtonTitle="Buy Coffee"
                    paymentRequestId={paymentRequestId}
                    onSuccess={function (event): void {
                      console.log("onSuccess", event);
                      setIsSuccess(true);
                    }}
                    onError={function (event): void {
                      console.log("onError", event);
                      setIsSuccess(false);
                    }}
                    onPending={function (event): void {
                      console.log("onPending", event);
                    }}
                    onStartPayment={function (): void {
                      console.log("onStartPayment");
                    }}
                    supportedCurrencies={['USDC']}
                    totalAmount={paymentRequest?.dynamic ? 0.01 : undefined}
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
