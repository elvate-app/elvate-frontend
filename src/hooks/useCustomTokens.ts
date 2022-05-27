import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Token } from "src/constants/tokens";
import { AppState } from "src/state";
import { CustomTokensType } from "src/state/tokens/reducer";
import useTokenList from "./useToken";

export function useCustomTokens(): CustomTokensType {
  return useSelector((state: AppState) => state.tokens.customTokens);
}

export function useAllTokens(): Token[] {
  const tokens = useTokenList();
  const customTokens = useCustomTokens();

  const res = useMemo(
    () => (customTokens === undefined ? [] : [...tokens, ...customTokens]),
    [tokens, customTokens]
  );
  return res;
}
