import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar as useSnackbarNotistack,
} from "notistack";
import SnackbarTransaction, {
  SnackbarMessageContent,
  SnackbarMessageHash,
} from "src/components/Snackbar/SnackbarTransaction";

const HIDE_DURATION = 6000;

const enqueueMessageHash = (
  hash: string,
  title: string,
  variant: "info" | "error" | "success" | undefined,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey
) => {
  enqueueSnackbar(
    <SnackbarMessageHash title={title.toUpperCase()} hash={hash} />,
    {
      autoHideDuration: HIDE_DURATION,
      content: (key, message) => (
        <SnackbarTransaction id={key} message={message} variant={variant} />
      ),
    }
  );
};

const enqueueError = (
  e: any,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey
) =>
  enqueueSnackbar(
    <SnackbarMessageContent
      title={"Transaction reverted".toUpperCase()}
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

const useSnackbar = () => {
  const { enqueueSnackbar } = useSnackbarNotistack();

  return {
    hash: (hash: string, title: string, variant: any) =>
      enqueueMessageHash(hash, title, variant, enqueueSnackbar),
    error: (e: any) => enqueueError(e, enqueueSnackbar),
  };
};

export default useSnackbar;
