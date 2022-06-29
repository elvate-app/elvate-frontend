import { createAction } from "@reduxjs/toolkit";
import { ElvatePair } from "src/types/v1/ElvateCore";

export const updatePairs = createAction<
  ElvatePair.PairStructOutput[] | undefined
>("application/updatePairs");
