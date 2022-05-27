import { Zero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getContractCall } from "src/utils/getContractCall";
import { useElvateCoreContract, useTokenContract } from "./useContract";

// return null if not fetched
// return false if no allowance
// return true if allowance
export const useTokenAllowance = (tokenAddress: string) => {
  const { account } = useWeb3React();
  const contract = useTokenContract(tokenAddress, true);
  const address = useElvateCoreContract()?.address;
  const [allowance, setAllowance] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowance(null);
  }, [account, tokenAddress]);

  const filter = useMemo(() => contract?.filters.Approval(account), [
    account,
    contract,
  ]);

  const fetchContractCall = useCallback(async () => {
    if (!account) return null;
    const res = await getContractCall(contract, "allowance", [
      account,
      address,
    ]);

    if (!res) return null;
    if (res.eq(Zero)) setAllowance(false);
    if (!res.eq(Zero)) setAllowance(true);
  }, [account, address, contract]);

  useEffect(() => {
    if (!contract || !account || !filter) return;

    fetchContractCall();
    contract.on(filter, fetchContractCall);

    return () => {
      contract.removeListener(filter, fetchContractCall);
    };
  }, [account, address, contract, fetchContractCall, filter]);

  return {
    allowance,
  };
};

export default useTokenAllowance;
