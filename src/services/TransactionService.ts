import {
  HelioIdl,
  SinglePaymentRequest,
  singlePaymentSC,
  singleSolPaymentSC,
} from "@heliofi/solana-adapter";
import { Cluster, PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";

export interface ApproveTransactionPayload {
  transactionSignature: string;
  paymentRequestId: string;
  amount: number;
  sender: string;
  recipient: string;
  currency: string;
  cluster: Cluster;
  customerDetails?: {
    email?: string;
    discordUsername?: string;
    twitterUsername?: string;
    fullName?: string;
    country?: string;
    deliveryAddress?: string;
  };
  quantity?: number;
  productDetails?: {
    name?: string;
    value?: string;
  };
}

const HELIO_BASE_API_URL = "https://test.api.hel.io";

const sendTransaction = async (
  symbol: string,
  request: SinglePaymentRequest,
  provider: Program<HelioIdl>
): Promise<string | undefined> => {
  try {
    if (symbol === "SOL") {
      return await singleSolPaymentSC(provider, request);
    }
    return await singlePaymentSC(provider, request);
  } catch (e) {
    // hangle error
  }
};

const approveTransaction = async (
  reqBody: ApproveTransactionPayload
): Promise<Response> => {
  const res = await fetch(`${HELIO_BASE_API_URL}/approve-transaction`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  return res;
};

interface CreatePayment {
  anchorProvider: Program<HelioIdl>;
  recipientPK: string;
  symbol: string;
  amount: number;
  paymentRequestId: string;
  customerDetails?: {
    email?: string;
    discordUsername?: string;
    twitterUsername?: string;
    fullName?: string;
    country?: string;
    deliveryAddress?: string;
  };
  quantity?: number;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onPending?: (response: any) => void;
  cluster: Cluster;
  mintAddress: string;
  currency: string;
}

export const createPayment = async ({
  anchorProvider,
  recipientPK,
  symbol,
  amount,
  paymentRequestId,
  onSuccess,
  onError,
  onPending,
  cluster,
  mintAddress,
  currency,
  quantity
}: CreatePayment) => {
  const sender = anchorProvider.provider.wallet.publicKey;
  const signature = await sendTransaction(
    symbol,
    {
      amount,
      sender: sender,
      recipient: new PublicKey(recipientPK),
      mintAddress: new PublicKey(mintAddress),
      cluster,
    },
    anchorProvider
  );

  if (signature === undefined) {
    onError?.({ errorMessage: "Failed to send transaction" });
    return;
  }

  const result = await approveTransaction({
    transactionSignature: signature,
    paymentRequestId: paymentRequestId,
    amount: amount,
    sender: String(sender),
    recipient: recipientPK,
    currency: currency,
    cluster: cluster,
    quantity: quantity,
  });
  console.log({ result });
};
