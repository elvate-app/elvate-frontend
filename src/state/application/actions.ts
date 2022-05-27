import { createAction } from "@reduxjs/toolkit";

export const updateTotalValueDeposited = createAction<string | undefined>(
  "application/updateTotalValueDeposited"
);
