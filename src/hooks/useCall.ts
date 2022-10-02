import { ContractReceipt, ContractTransaction } from "ethers";
import { useDispatch } from "react-redux";
import useSnackbar from "src/hooks/useSnackbar";
import { addTransaction } from "src/state/transactions/actions";

const WAIT_BLOCK = 1;

const useCall = <T extends (...args: any[]) => any>(f: T, label: string) => {
  const { hash, error } = useSnackbar();
  const dispatch = useDispatch();

  return async (...args: Parameters<T>) => {
    try {
      const t: ContractTransaction = await f(...args);
      dispatch(
        addTransaction({
          transactionHash: t.hash,
          label: label,
        })
      );
      hash(t.hash, "transaction sent", "info");

      await t.wait(WAIT_BLOCK).then((receipt: ContractReceipt) => {
        if (receipt.status !== 0) {
          hash(t.hash, "Transaction success", "success");
        } else {
          hash(t.hash, "Transaction error", "error");
        }
      });
    } catch (e: any) {
      error(e);
      console.error(e.data);
    }
  };
};

export default useCall;
