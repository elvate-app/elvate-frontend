import { combineReducers } from "@reduxjs/toolkit";
import application from "./application/reducer";
import pairs from "./pairs/reducer";
import portfolio from "./portfolio/reducer";
import prices from "./prices/reducer";
import settings from "./settings/reducer";
import subscriptions from "./subscriptions/reducer";
import tokens from "./tokens/reducer";

const reducer = combineReducers({
  application,
  pairs,
  portfolio,
  prices,
  settings,
  subscriptions,
  tokens,
});

export default reducer;
