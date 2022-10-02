import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import useBlock from "src/hooks/useBlock";
import { useTransactions } from "src/hooks/useTransactions";
import { updateTransaction } from "./actions";

export default function Updater(): null {
  const allTransactions = useTransactions();
  const transactions = useMemo(
    () => allTransactions[NETWORK_MATIC_MUMBAI_TESTNET] ?? {},
    [allTransactions]
  );
  const { library } = useActiveWeb3React();
  const { blockNumber } = useBlock();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!library) return;

    Object.keys(transactions).forEach((hash: string) => {
      if (transactions[hash].blockHash) return;

      library.getTransactionReceipt(hash).then((r) => {
        if (r) {
          dispatch(
            updateTransaction({ label: transactions[hash].label, ...r })
          );
        }
      });
    });
  }, [blockNumber, library, transactions, dispatch]);

  return null;
}
