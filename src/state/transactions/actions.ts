import { createAction } from "@reduxjs/toolkit";
import { TransactionDetails } from "./reducer";

export const addTransaction = createAction<TransactionDetails>(
  "transactions/addTransaction"
);

export const updateTransaction = createAction<TransactionDetails>(
  "transactions/updateTransaction"
);

export const clearAllTransactions = createAction(
  "transactions/clearAllTransactions"
);
