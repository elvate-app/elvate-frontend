import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import useDebounce from "src/hooks/useDebounce";
import { useTransactions } from "src/hooks/useTransactions";
import { updateTransaction } from "./actions";

export default function Updater(): null {
  const allTransactions = useTransactions();
  const transactions = useMemo(
    () => allTransactions[NETWORK_MATIC_MUMBAI_TESTNET] ?? {},
    [allTransactions]
  );
  const { library } = useActiveWeb3React();
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const dispatch = useDispatch();

  const onBlock = useCallback(
    (block: number) => {
      setBlockNumber(block);
    },
    [setBlockNumber]
  );

  const blockNumberDebounce = useDebounce(blockNumber, 1000);

  useEffect(() => {
    if (!library) return;

    Object.keys(transactions).forEach((hash: string) => {
      if (transactions[hash].blockHash) return;

      library.getTransactionReceipt(hash).then((r) => {
        if (r) {
          dispatch(updateTransaction(r));
        }
      });
    });
  }, [blockNumberDebounce, library, transactions, dispatch]);

  useEffect(() => {
    if (!library) return;

    library.on("block", onBlock);
    return () => {
      library.removeListener("block", onBlock);
    };
  }, [library, onBlock]);

  return null;
}
