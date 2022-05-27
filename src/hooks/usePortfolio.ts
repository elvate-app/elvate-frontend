import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { AppState } from "src/state";
import { MapTokenValue } from "src/state/portfolio/reducer";

export function useAllDeposit(): MapTokenValue | undefined {
  return useSelector((state: AppState) => state.portfolio.deposit);
}

export function useDeposit(address: string): BigNumber | undefined {
  const deposit = useAllDeposit();
  return deposit ? deposit[address] : undefined;
}

export function useAllBalance(): MapTokenValue | undefined {
  return useSelector((state: AppState) => state.portfolio.balance);
}

export function useBalance(address: string): BigNumber | undefined {
  const balance = useAllBalance();
  return balance ? balance[address] : undefined;
}
