import { createReducer } from "@reduxjs/toolkit";
import { updatePrices } from "./actions";

export type MapTokenPrice = Record<string, { usd: number }>;

export interface PricesState {
  readonly prices: MapTokenPrice | undefined;
}

const initialState: PricesState = {
  prices: undefined,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updatePrices, (state, action) => {
    console.log("STATE: updatePrices");
    state.prices = action.payload;
  })
);
