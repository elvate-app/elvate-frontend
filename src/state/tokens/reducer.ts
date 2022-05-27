import { createReducer } from "@reduxjs/toolkit";
import { Token } from "src/constants/tokens";
import { updateCustomTokens } from "./actions";

export type CustomTokensType = Array<Token> | undefined;

export interface ApplicationState {
  readonly customTokens: CustomTokensType;
}

const initialState: ApplicationState = {
  customTokens: undefined,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateCustomTokens, (state, action) => {
    console.log("updateCustomTokens");
    console.log(action.payload);
    state.customTokens = action.payload;
  })
);
