import { createReducer } from "@reduxjs/toolkit";
import ElvatePair from "src/types/ElvatePair";
import { updatePairs } from "./actions";

export interface ApplicationState {
  readonly Pairs: ElvatePair[] | undefined;
}

const initialState: ApplicationState = {
  Pairs: undefined,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updatePairs, (state, action) => {
    state.Pairs = action.payload;
  })
);
