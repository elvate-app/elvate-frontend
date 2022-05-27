import { createAction } from "@reduxjs/toolkit";
import ElvateSubscription from "src/types/ElvateSubscription";

export const updateElvateSubscriptions = createAction<ElvateSubscription[]>(
  "application/updateElvateSubscriptions"
);
