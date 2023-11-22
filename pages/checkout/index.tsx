import 'reflect-metadata';
import type {NextPage} from "next";
import Head from "next/head";
import styles from "../../styles/main.module.scss";
import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "../../src/components/Header";
import {useRef, useState} from 'react';

interface Paylink {
    name: string,
    type: 'devnet' | 'mainnet',
    params: any
}

const paylinks: Paylink[] = [
    {
        name: "USDC Solana payment button",
        type: "devnet",
        params: {
            paylinkId: "6527e9785751e27089d566b5",
            display: "BUTTON",
            network: "test"
        }
    },
    {
        name: "USDC Solana payment inline",
        type: "devnet",
        params: {
            paylinkId: "6527e9785751e27089d566b5",
            display: "INLINE",
            network: "test"
        }
    },
    {
        name: "Solana payment (devnet)",
        type: "devnet",
        params: {
            paylinkId: "655209c5357050021e19025f",
            network: "test"
        }
    },
    {
        name: "USDC Solana payment",
        type: "mainnet",
        params: {
            paylinkId: "655ddfc799ba1bd688f1ebbb",
            network: "main"
        }
    },
    {
        name: "Multi blockchain payment",
        type: "devnet",
        params: {
            paylinkId: "652900c95751e27089d5fa91",
            network: "test"
        }
    },
    {
        name: "Multi blockchain payment",
        type: "mainnet",
        params: {
            paylinkId: "655ddf1ba55d1f66f6ffd517",
            network: "main"
        }
    },
    {
        name: "Name your own price",
        type: "devnet",
        params: {
            paylinkId: '6532a3c8e608a8674659f738',
            network: 'test'
        }
    },
    {
        name: "Name your own price",
        type: "mainnet",
        params: {
            paylinkId: '655ddd9fa55d1f66f6ffaefa',
            network: 'main'
        }
    },
]

// (embed.hel.io for production builds)
const HOSTNAME = 'helio-embed-git-develop-heliofi.vercel.app'

const Checkout: NextPage = () => {
    const [selectedPaylink, setSelectedPaylink] = useState<Paylink>()

    const [onSuccessCallbackResponse, setOnSuccessCallbackResponse] = useState<any>()

    const embedRef = useRef(null)
    return (
        <div>
            <Head>
                <title>Helio Embed Sample App</title>
                <meta name="description" content="Helio Embed Sample App"/>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script
                    src={`https://${HOSTNAME}/assets/index-v1.js`}
                    type="module"
                />
                <link rel="stylesheet" href={`https://${HOSTNAME}/assets/index-v1.css`}/>
            </Head>

            <main className={styles.main}>
                <Header/>

                <div className={styles.heroContainer}>
                    <h1 className={styles.heroTitle}>Helio Checkout Embed Widget Demo</h1>

                    {!selectedPaylink &&
                        <div className="grid grid-cols-3	">
                            {paylinks.map(paylink =>
                                <button
                                    className={styles.button}
                                    key={`${paylink.name}-${paylink.type}`}
                                    onClick={() => {
                                        setSelectedPaylink(paylink);

                                        (window as any).embedHelio(
                                            embedRef.current, {
                                                paylinkId: paylink.params.paylinkId,
                                                onSuccess: setOnSuccessCallbackResponse,
                                                ...paylink.params,
                                            }
                                        )
                                    }}>
                                    <span>{paylink.name}</span>
                                    {' '}
                                    <b className={paylink.type === 'mainnet' ? styles.networkTypeMainnet : styles.networkTypeTestnet}>{paylink.type}</b>
                                </button>)}
                        </div>
                    }

                    {selectedPaylink && <div>
                        <h2 className={styles.heroText}>{selectedPaylink.name}</h2>
                    </div>}

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div ref={embedRef}/>
                    </div>

                </div>

                {onSuccessCallbackResponse && <div style={{maxWidth: "100%", overflow: "auto", margin: '5em'}}>
                    <h2>On success callback data:</h2>

                    <p>We also have other callbacks, and webhooks for your server to track completed paylink
                        purchases.</p>

                    <pre style={{margin: "2em"}}><code>{JSON.stringify(onSuccessCallbackResponse, null, 2)}</code></pre>

                </div>}
            </main>
        </div>
    );
};

export default Checkout;
