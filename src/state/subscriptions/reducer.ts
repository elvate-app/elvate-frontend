import { createReducer } from "@reduxjs/toolkit";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { updateEligibleSubs, updateSubs } from "./actions";

export type ElvateSubscriptions = Map<string, ElvatePair.SubStructOutput[]>;

export interface ApplicationState {
  readonly subs: ElvateSubscriptions;
  readonly eligibleSubs: ElvateSubscriptions;
}

const initialState: ApplicationState = {
  subs: new Map(),
  eligibleSubs: new Map(),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateSubs, (state, action) => {
      state.subs = action.payload;
    })
    .addCase(updateEligibleSubs, (state, action) => {
      state.eligibleSubs = action.payload;
    })
);
