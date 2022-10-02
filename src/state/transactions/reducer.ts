import { createReducer } from "@reduxjs/toolkit";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import {
  addTransaction,
  clearAllTransactions,
  updateTransaction,
} from "./actions";

export interface TransactionDetails {
  transactionHash: string;
  label: string;
  to?: string;
  from?: string;
  blockHash?: string;
  blockNumber?: number;
  status?: number;
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(clearAllTransactions, (state, actions) => {
      state[NETWORK_MATIC_MUMBAI_TESTNET] = {};
    })
    .addCase(
      addTransaction,
      (transactions, { payload: { transactionHash, label } }) => {
        console.log("addTransaction");
        console.log(transactionHash);

        if (transactions[NETWORK_MATIC_MUMBAI_TESTNET]?.[transactionHash]) {
          throw Error("Attempted to add existing transaction.");
        }

        const txs = transactions[NETWORK_MATIC_MUMBAI_TESTNET] ?? {};
        txs[transactionHash] = { transactionHash, label };
        transactions[NETWORK_MATIC_MUMBAI_TESTNET] = txs;
      }
    )
    .addCase(
      updateTransaction,
      (
        transactions,
        {
          payload: {
            transactionHash,
            label,
            to,
            from,
            blockHash,
            blockNumber,
            status,
          },
        }
      ) => {
        console.log("updateTransaction");
        console.log(transactionHash);

        if (!transactions[NETWORK_MATIC_MUMBAI_TESTNET]?.[transactionHash]) {
          throw Error("Attempted to edit non existing transaction.");
        }

        const txs = transactions[NETWORK_MATIC_MUMBAI_TESTNET] ?? {};
        txs[transactionHash] = {
          transactionHash,
          label,
          to,
          from,
          blockHash,
          blockNumber,
          status,
        };
        transactions[NETWORK_MATIC_MUMBAI_TESTNET] = txs;
      }
    )
);
