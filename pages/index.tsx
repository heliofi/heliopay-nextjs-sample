import 'reflect-metadata';
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/main.module.scss";

import { HelioPay } from "@heliofi/react";

import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "../src/components/Header";
import { useEffect, useMemo, useState } from "react";
import { HelioSDK, ClusterHelioType, ClusterHelio } from "@heliofi/sdk";
import { Paylink, PaymentRequestType } from "@heliofi/common";

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
  const defaultPaymentRequestId = '63c5b1a765f452f94a1e5ade';
  const [initialized, setInitialized] = useState<boolean>(false);
  const [paymentRequestId, setPaymentRequestId] = useState<string>(defaultPaymentRequestId);
  const [cluster, setCluster] = useState<ClusterHelioType>(ClusterHelio.Mainnet);
  const [paymentType, setPaymentType] = useState<PaymentRequestType>(PaymentRequestType.PAYLINK);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [paymentRequest, setPaymentRequest] = useState<Paylink | null>(null);
  const [isShownCustom, setIsShownCustom] = useState<boolean>(false);

  const sdk = useMemo(() => {
    return new HelioSDK({ cluster, customApiUrl: '' })
  }, [cluster]);

  useEffect( () => {
    const fetchPaylink = async () => {
      if (paymentType === PaymentRequestType.PAYLINK && paymentRequestId) {
        const paylink = await sdk.apiService.getPaymentRequestByIdPublic(paymentRequestId, paymentType);
        setPaymentRequest(paylink as Paylink);
        setInitialized(true);
      } else {
        setPaymentRequest(null);
      }

    }
    fetchPaylink();

  }, [paymentRequestId, sdk.apiService, paymentType])

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
                        setIsShownCustom(!e.target.value);
                        setCluster(e.target[e.target.selectedIndex].getAttribute('data-cluster') as ClusterHelioType);
                        setPaymentType(e.target[e.target.selectedIndex].getAttribute('data-payment-type') as PaymentRequestType);
                        setPaymentRequestId(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select one...
                      </option>
                      <option
                          value={defaultPaymentRequestId}
                          data-payment-type={PaymentRequestType.PAYLINK}
                          data-cluster={ClusterHelio.Mainnet}
                      >
                        Coffee order (mainnet Pay Link)
                      </option>
                      <option
                          value="63c552ac5cff95b55ea5fcfc"
                          data-payment-type={PaymentRequestType.PAYLINK}
                          data-cluster={ClusterHelio.Devnet}
                      >
                        Coffee order (devnet Pay Link)
                      </option>
                      <option
                          value="641305a1b3953f52a45fc68a"
                          data-payment-type={PaymentRequestType.PAYSTREAM}
                          data-cluster={ClusterHelio.Mainnet}
                      >
                        Coffee order (mainnet Pay Stream)
                      </option>
                      <option
                          value="64130521bcb19399cb11af57"
                          data-payment-type={PaymentRequestType.PAYSTREAM}
                          data-cluster={ClusterHelio.Devnet}
                      >
                        Coffee order (devnet Pay Stream)
                      </option>
                      <option
                        value={'6464cba89ecd5288aeba1472'}
                        data-payment-type={PaymentRequestType.PAYLINK}
                        data-cluster={ClusterHelio.Devnet}
                      >
                        Coffee order evm (devnet Pay Link)
                      </option>
                      <option
                          value={''}
                          data-payment-type={PaymentRequestType.PAYLINK}
                          data-cluster={ClusterHelio.Mainnet}
                      >
                        Custom
                      </option>
                    </select>
                    {isShownCustom && <>
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
                              value={ClusterHelio.Mainnet}
                              checked={cluster === ClusterHelio.Mainnet}
                              onChange={() => setCluster(ClusterHelio.Mainnet)}
                          />
                          &nbsp; mainnet-beta
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                              type="radio"
                              name="cluster"
                              value={ClusterHelio.Devnet}
                              checked={cluster === ClusterHelio.Devnet}
                              onChange={() => setCluster(ClusterHelio.Devnet)}
                          />
                          &nbsp; devnet
                        </label>
                      </div>
                      <br />
                      <br />
                      <div>
                        <label title={'1-time payment'}>
                          <input
                              type="radio"
                              name="requestType"
                              value={PaymentRequestType.PAYLINK}
                              checked={paymentType === PaymentRequestType.PAYLINK}
                              onChange={() => setPaymentType(PaymentRequestType.PAYLINK)}
                          />
                          &nbsp; Pay Link
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        <label title={'Recurring payment'}>
                          <input
                              type="radio"
                              name="requestType"
                              value={PaymentRequestType.PAYSTREAM}
                              checked={paymentType === PaymentRequestType.PAYSTREAM}
                              onChange={() => setPaymentType(PaymentRequestType.PAYSTREAM)}
                          />
                          &nbsp; Pay Stream
                        </label>
                      </div>
                      <br />
                      <br />
                    </>}
                  </>
                )}

                <div className={styles.paybutton}>
                  {<HelioPay
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
                    supportedCurrencies={paymentRequest?.dynamic ? ['USDC'] : undefined}
                    totalAmount={paymentRequest?.dynamic ? 0.01 : undefined}
                    paymentType={paymentType}
                    // theme={{
                    //     colors: {
                    //         primary: "#ff0000",
                    //         secondary: "#00ff00",
                    //     }
                    // }}
                  />
                  }
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
