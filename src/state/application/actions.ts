import { createAction } from "@reduxjs/toolkit";

export const updateTotalValueDeposited = createAction<string | undefined>(
  "application/updateTotalValueDeposited"
);
export const updateSwapFees = createAction<string | undefined>(
  "application/updateSwapFees"
);

export const updatePairCreationFees = createAction<string | undefined>(
  "application/updatePairCreationFees"
);

export const updateOwner = createAction<string | undefined>(
  "application/updateOwner"
);
