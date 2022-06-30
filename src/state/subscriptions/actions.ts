import { createAction } from "@reduxjs/toolkit";
import { ElvateSubscriptions } from "./reducer";

export const updateElvateSubscriptions = createAction<ElvateSubscriptions>(
  "application/updateElvateSubscriptions"
);
