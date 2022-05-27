import { Token, unknown } from "src/constants/tokens";
import { MapTokenPrice } from "src/state/prices/reducer";

export const getTokenByAddress = (
  address: string | undefined,
  tokens: Token[]
) => {
  if (!address) return unknown;

  const token = tokens.find(
    (token) => token.address.toUpperCase() === address.toUpperCase()
  );

  return token
    ? token
    : { ...unknown, symbol: address.substring(0, 6), address: address };
};

export const getTokenPriceByAddress = (
  address: string | undefined,
  prices: MapTokenPrice,
  tokens: Token[]
) => {
  if (!address) return 0;

  const token = getTokenByAddress(address, tokens);
  return token ? prices[token.coingeckoId].usd : 0;
};
