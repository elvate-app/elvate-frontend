import { createReducer } from "@reduxjs/toolkit";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { updateElvateSubscriptions } from "./actions";

export type ElvateSubscriptions = Map<string, ElvatePair.SubStructOutput[]>;

export interface ApplicationState {
  readonly elvateSubscriptions: ElvateSubscriptions;
}

const initialState: ApplicationState = {
  elvateSubscriptions: new Map(),
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateElvateSubscriptions, (state, action) => {
    state.elvateSubscriptions = action.payload;
  })
);
