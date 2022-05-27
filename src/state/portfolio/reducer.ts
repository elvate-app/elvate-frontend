import { createReducer } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { updateBalance, updateDeposit } from "./actions";

export type MapTokenValue = Record<string, BigNumber>;

export interface PortfolioState {
  readonly balance: MapTokenValue | undefined;
  readonly deposit: MapTokenValue | undefined;
}

const initialState: PortfolioState = {
  balance: undefined,
  deposit: undefined,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBalance, (state, action) => {
      console.log("STATE: updateBalance");
      state.balance = action.payload;
    })
    .addCase(updateDeposit, (state, action) => {
      console.log("STATE: updateDeposit");
      state.deposit = action.payload;
    })
);
