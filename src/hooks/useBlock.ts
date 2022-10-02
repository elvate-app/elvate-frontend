import { useCallback, useEffect, useState } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import useDebounce from "./useDebounce";

export default function useBlock() {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const { library } = useActiveWeb3React();

  const onBlock = useCallback(
    (block: number) => {
      setBlockNumber(block);
    },
    [setBlockNumber]
  );

  useEffect(() => {
    if (!library) return;

    library.on("block", onBlock);
    return () => {
      library.removeListener("block", onBlock);
    };
  }, [library, onBlock]);

  const blockNumberDebounce = useDebounce(blockNumber, 1000);

  return { blockNumber: blockNumberDebounce };
}
