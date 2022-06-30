import { createAction } from "@reduxjs/toolkit";
import { ElvateSubscriptions } from "./reducer";

export const updateSubs = createAction<ElvateSubscriptions>(
  "application/updateSubs"
);

export const updateEligibleSubs = createAction<ElvateSubscriptions>(
  "application/updateEligibleSubs"
);
