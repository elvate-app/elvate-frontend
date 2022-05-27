import { createAction } from "@reduxjs/toolkit";
import { MapTokenValue } from "./reducer";

export const updateBalance = createAction<MapTokenValue | undefined>(
  "application/updateBalance"
);

export const updateDeposit = createAction<MapTokenValue | undefined>(
  "application/updateDeposit"
);
