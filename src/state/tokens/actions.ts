import { createAction } from "@reduxjs/toolkit";
import { CustomTokensType } from "./reducer";

export const updateCustomTokens = createAction<CustomTokensType>(
  "settings/updateCustomTokens"
);
