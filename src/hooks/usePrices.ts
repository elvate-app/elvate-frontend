import { useSelector } from "react-redux";
import { Token } from "src/constants/tokens";
import { AppState } from "src/state";
import { MapTokenPrice } from "src/state/prices/reducer";

export function useAllPrices(): MapTokenPrice | undefined {
  return useSelector((state: AppState) => state.prices.prices);
}

export function usePrice(token: Token): number | undefined {
  const prices: MapTokenPrice | undefined = useSelector(
    (state: AppState) => state.prices.prices
  );
  if (!prices) return undefined;
  return prices[token.coingeckoId].usd;
}
