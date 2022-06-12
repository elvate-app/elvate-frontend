import { useSelector } from "react-redux";
import { AppState } from "src/state";

export function useTotalDeposit(): string | undefined {
  return useSelector(
    (state: AppState) => state.application.totalValueDeposited
  );
}
export function useSwapFees(): string | undefined {
  return useSelector((state: AppState) => state.application.swapFees);
}

export function usePairCreationFees(): string | undefined {
  return useSelector((state: AppState) => state.application.pairCreationFees);
}
