import { Multicall } from "ethereum-multicall";
import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";

const useMulticall = () => {
  const { library } = useActiveWeb3React();

  return useMemo(() => {
    if (!library) return undefined;

    return new Multicall({
      ethersProvider: library,
      tryAggregate: true,
    });
  }, [library]);
};

export default useMulticall;
