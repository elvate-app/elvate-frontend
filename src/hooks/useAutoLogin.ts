import { useSelector } from "react-redux";
import { AppState } from "src/state";
import { AutoLoginType } from "src/state/settings/reducer";

export function useAutoLogin(): AutoLoginType | undefined {
  return useSelector((state: AppState) => state.settings.autoLogin);
}
