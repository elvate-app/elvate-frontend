import { useSelector } from "react-redux";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import { AppState } from "src/state";
import {
  TransactionDetails,
  TransactionState,
} from "src/state/transactions/reducer";

export function useTransaction(hash: string): TransactionDetails | undefined {
  return useSelector(
    (state: AppState) => state.transactions[NETWORK_MATIC_MUMBAI_TESTNET][hash]
  );
}

export function useTransactions(): TransactionState {
  return useSelector((state: AppState) => state.transactions);
}
