import { createAction } from "@reduxjs/toolkit";
import { AutoLoginType, DefaultViewType, ThemeType } from "./reducer";

export const updateAutoLogin = createAction<AutoLoginType>(
  "settings/updateAutoLogin"
);
export const updateDefaultView = createAction<DefaultViewType>(
  "settings/updateDefaultView"
);
export const updateTheme = createAction<ThemeType>("settings/updateTheme");
