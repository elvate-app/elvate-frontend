import { BigNumber } from "@ethersproject/bignumber";
import {
  Contract,
  ContractReceipt,
  ContractTransaction,
} from "@ethersproject/contracts";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import SnackbarTransaction, {
  SnackbarMessageContent,
  SnackbarMessageHash,
} from "src/components/Snackbar/SnackbarTransaction";

const WAIT_BLOCK = 1;
const HIDE_DURATION = 6000;

type MethodOptionsArg = { value: BigNumber };
type MethodArg = string | number | BigNumber;
export type OptionalMethodInputs =
  | Array<MethodArg | MethodArg[] | MethodOptionsArg | undefined | null>
  | undefined;

export const getContractCall = async (
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs
) => {
  // TODO: add check methodname and inputs
  try {
    if (!contract) return null;
    if (!inputs) return await contract[methodName]();
    return await contract[methodName](...inputs);
  } catch (e) {
    console.error(e);
    console.error(methodName);
    console.error(inputs);
    throw e;
  }
};

export const getContrackCallWithSnackbar = async (
  contract: Contract | null | undefined,
  methodName: string,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey,
  inputs?: OptionalMethodInputs
) => {
  try {
    const transaction: ContractTransaction = await getContractCall(
      contract,
      methodName,
      inputs
    );

    enqueueSnackbar(
      <SnackbarMessageHash title="Transaction sent" hash={transaction.hash} />,
      {
        autoHideDuration: HIDE_DURATION,
        content: (key, message) => (
          <SnackbarTransaction id={key} message={message} variant="info" />
        ),
      }
    );

    await transaction.wait(WAIT_BLOCK).then((receipt: ContractReceipt) => {
      enqueueSnackbar(
        <SnackbarMessageHash
          title={
            receipt.status === 0 ? "Transaction error" : "Transaction success"
          }
          hash={transaction.hash}
        />,
        {
          autoHideDuration: HIDE_DURATION,
          content: (key, message) => (
            <SnackbarTransaction
              id={key}
              message={message}
              variant={receipt.status === 0 ? "error" : "success"}
            />
          ),
        }
      );
    });
  } catch (e: any) {
    console.error(e.data);
    enqueueSnackbar(
      <SnackbarMessageContent
        title="Transaction reverted"
        content={e.data.message
          .replace("execution reverted: ", "")
          .replace("err: ", "")}
      />,
      {
        autoHideDuration: HIDE_DURATION,
        content: (key, message) => (
          <SnackbarTransaction id={key} message={message} variant="error" />
        ),
      }
    );
    return;
  }
};
