import { useSelector } from "react-redux";
import { AppState } from "src/state";

export function useTotalDeposit(): string | undefined {
  return useSelector(
    (state: AppState) => state.application.totalValueDeposited
  );
}
