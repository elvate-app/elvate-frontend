import { createReducer } from "@reduxjs/toolkit";
import { updateAutoLogin, updateDefaultView, updateTheme } from "./actions";

export type AutoLoginType = "connected" | "disconnected";
export type DefaultViewType = "comfy" | "list";
export type ThemeType = "dark" | "light";

export interface ApplicationState {
  readonly autoLogin: AutoLoginType;
  readonly defaultView: DefaultViewType;
  readonly theme: ThemeType;
}

const initialState: ApplicationState = {
  autoLogin: "disconnected",
  defaultView: "comfy",
  theme: "dark",
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateTheme, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(updateAutoLogin, (state, action) => {
      state.autoLogin = action.payload;
    })
    .addCase(updateDefaultView, (state, action) => {
      state.defaultView = action.payload;
    })
);
