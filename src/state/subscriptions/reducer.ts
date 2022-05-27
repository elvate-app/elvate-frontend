import { createReducer } from "@reduxjs/toolkit";
import ElvateSubscriptions from "src/types/ElvateSubscription";
import { updateElvateSubscriptions } from "./actions";

export interface ApplicationState {
  readonly elvateSubscriptions: ElvateSubscriptions[];
}

const initialState: ApplicationState = {
  elvateSubscriptions: [],
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateElvateSubscriptions, (state, action) => {
    const elvateSubscriptions: ElvateSubscriptions[] = action.payload;
    state.elvateSubscriptions = elvateSubscriptions;
  })
);
