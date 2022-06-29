import { createReducer } from "@reduxjs/toolkit";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { updatePairs } from "./actions";

export interface ApplicationState {
  readonly Pairs: ElvatePair.PairStructOutput[] | undefined;
}

const initialState: ApplicationState = {
  Pairs: undefined,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updatePairs, (state, action) => {
    state.Pairs = action.payload;
  })
);
