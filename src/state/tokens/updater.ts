import { useDispatch } from "react-redux";
import { useCustomTokens } from "src/hooks/useCustomTokens";
import { updateCustomTokens } from "./actions";

export default function Updater(): null {
  const tokens = useCustomTokens();
  const dispatch = useDispatch();

  if (tokens === undefined) dispatch(updateCustomTokens([]));
  return null;
}
