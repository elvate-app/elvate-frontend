import { createAction } from "@reduxjs/toolkit";
import ElvatePair from "src/types/ElvatePair";

export const updatePairs = createAction<ElvatePair[] | undefined>(
  "application/updatePairs"
);
