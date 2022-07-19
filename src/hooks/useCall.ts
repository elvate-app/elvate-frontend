import { ContractReceipt, ContractTransaction } from "ethers";
import useSnackbar from "src/hooks/useSnackbar";

const WAIT_BLOCK = 1;

const useCall = <T extends (...args: any[]) => any>(f: T) => {
  const { hash, error } = useSnackbar();

  return async (...args: Parameters<T>) => {
    try {
      const t: ContractTransaction = await f(...args);
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
