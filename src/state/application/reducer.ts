import { createReducer } from "@reduxjs/toolkit";
import {
  updateOwner,
  updatePairCreationFees,
  updatePrecision,
  updateSwapFees,
  updateTotalValueDeposited,
} from "./actions";

export interface ApplicationState {
  readonly totalValueDeposited: string | undefined;
  readonly swapFees: string | undefined;
  readonly pairCreationFees: string | undefined;
  readonly owner: string | undefined;
  readonly precision: string | undefined;
}

const initialState: ApplicationState = {
  totalValueDeposited: undefined,
  swapFees: undefined,
  pairCreationFees: undefined,
  owner: undefined,
  precision: undefined,
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
    .addCase(updateOwner, (state, action) => {
      state.owner = action.payload;
    })
    .addCase(updatePrecision, (state, action) => {
      state.precision = action.payload;
    })
);
