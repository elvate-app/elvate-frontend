import { createReducer } from "@reduxjs/toolkit";
import {
  updatePairCreationFees,
  updateSwapFees,
  updateTotalValueDeposited,
} from "./actions";

export interface ApplicationState {
  readonly totalValueDeposited: string | undefined;
  readonly swapFees: string | undefined;
  readonly pairCreationFees: string | undefined;
}

const initialState: ApplicationState = {
  totalValueDeposited: undefined,
  swapFees: undefined,
  pairCreationFees: undefined,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateTotalValueDeposited, (state, action) => {
      state.totalValueDeposited = action.payload;
    })
    .addCase(updatePairCreationFees, (state, action) => {
      state.pairCreationFees = action.payload;
    })
    .addCase(updateSwapFees, (state, action) => {
      state.swapFees = action.payload;
    })
);
