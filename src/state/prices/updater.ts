import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { updatePrices } from "./actions";
import { MapTokenPrice } from "./reducer";

type PriceState = {
  prices: MapTokenPrice | undefined;
};

export default function Updater(): null {
  const dispatch = useDispatch();
  const tokens = useAllTokens();
  const [state, setState] = useState<PriceState>({
    prices: undefined,
  });

  const tokenIds = useMemo(
    () => tokens.reduce((a: any, v: Token) => `${a}${v.coingeckoId},`, ""),
    [tokens]
  );

  const updatePricessCallback = useCallback(async () => {
    // coingecko call
    const data = { ids: tokenIds, vs_currencies: "usd" };
    const headers = { "Content-Type": "application/json" };
    let handler: NodeJS.Timeout;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
        data.ids
      )}&vs_currencies=${encodeURIComponent(data.vs_currencies)}`,
      {
        method: "GET",
        headers,
      }
    );

    if (res.ok) {
      const json = await res.json();
      setState({ prices: json });
    } else {
      console.error("unable to fetch price");
      handler = setTimeout(updatePricessCallback, 5000);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [setState, tokenIds]);

  useEffect(() => {
    if (tokens.length === 0) return;

    updatePricessCallback();
  }, [updatePricessCallback, tokens]);

  useEffect(() => {
    dispatch(updatePrices(state.prices));
  }, [dispatch, state.prices]);

  return null;
}
