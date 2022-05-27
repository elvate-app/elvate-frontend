import { createReducer } from "@reduxjs/toolkit";
import { updateTotalValueDeposited } from "./actions";

export interface ApplicationState {
  readonly totalValueDeposited: string | undefined;
}

const initialState: ApplicationState = {
  totalValueDeposited: undefined,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateTotalValueDeposited, (state, action) => {
    state.totalValueDeposited = action.payload;
  })
);
