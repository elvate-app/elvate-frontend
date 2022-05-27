import { useSelector } from "react-redux";
import { AppState } from "src/state";
import { DefaultViewType, ThemeType } from "src/state/settings/reducer";

export function useThemeType(): ThemeType | undefined {
  return useSelector((state: AppState) => state.settings.theme);
}

export function useDefaultView(): DefaultViewType | undefined {
  return useSelector((state: AppState) => state.settings.defaultView);
}
