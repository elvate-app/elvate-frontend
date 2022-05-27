import { createAction } from "@reduxjs/toolkit";
import { MapTokenPrice } from "./reducer";

export const updatePrices = createAction<MapTokenPrice | undefined>(
  "application/updatePrices"
);
