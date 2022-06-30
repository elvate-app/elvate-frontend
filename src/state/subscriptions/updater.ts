import ElvateCoreJson from "@elvate/v1-core/artifacts/contracts/ElvateCore.sol/ElvateCore.json";
import { ContractCallResults } from "ethereum-multicall/dist/esm/models";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useActiveWeb3React from "src/hooks/useActiveWeb3React";
import { useElvateCoreContract } from "src/hooks/useContract";
import useMulticall from "src/hooks/useMulticall";
import usePairs from "src/hooks/usePairs";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { getPairById } from "src/utils/pair";
import { updateEligibleSubs, updateSubs } from "./actions";
import { ElvateSubscriptions } from "./reducer";

type SubscriptionState = {
  subs: ElvateSubscriptions | null;
  eligibleSubs: ElvateSubscriptions | null;
};

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();
  const contract = useElvateCoreContract(false);
  const pairs = usePairs();
  const multicall = useMulticall();

  const [state, setState] = useState<SubscriptionState>({
    subs: null,
    eligibleSubs: null,
  });

  const fetchSubs = useCallback(async () => {
    if (!contract || !multicall || !pairs) return;

    const subsCall = pairs.map((pair) => ({
      reference: pair.id.toString(),
      methodName: "getSubs",
      methodParameters: [pair.tokenIn, pair.tokenOut],
    }));

    const eligibleSubsCall = pairs.map((pair) => ({
      reference: pair.id.toString(),
      methodName: "getEligibleSubs",
      methodParameters: [pair.tokenIn, pair.tokenOut],
    }));

    const context = [
      {
        reference: "subs",
        contractAddress: contract.address,
        abi: ElvateCoreJson.abi,
        calls: subsCall,
      },
      {
        reference: "eligibleSubs",
        contractAddress: contract.address,
        abi: ElvateCoreJson.abi,
        calls: eligibleSubsCall,
      },
    ];

    const contractCallResult: ContractCallResults = await multicall.call(
      context
    );

    const allSubs: ElvateSubscriptions = new Map(
      contractCallResult.results.subs.callsReturnContext.map(
        (callReturnContext) => {
          return [
            callReturnContext.reference,
            callReturnContext.returnValues.map((value) => ({
              ...[BigNumber.from(value[0]), value[1]],
              amountIn: BigNumber.from(value[0]),
              owner: value[1],
            })),
          ];
        }
      )
    );

    const allEligibleSubs: ElvateSubscriptions = new Map(
      contractCallResult.results.eligibleSubs.callsReturnContext.map(
        (callReturnContext) => {
          return [
            callReturnContext.reference,
            callReturnContext.returnValues?.[0].map((value: any) => ({
              ...[BigNumber.from(value[0]), value[1]],
              amountIn: BigNumber.from(value[0]),
              owner: value[1],
            })),
          ];
        }
      )
    );

    setState({ eligibleSubs: allEligibleSubs, subs: allSubs });
  }, [contract, multicall, pairs]);

  const onElvateSubEdited = useCallback(
    async (pairId: BigNumber, owner: string, amountIn: BigNumber) => {
      const pair = getPairById(pairId, pairs);
      const deposit = await contract.depositByOwnerByToken(
        owner,
        pair?.tokenIn || ""
      );

      setState((state) => {
        const newSub = {
          ...[amountIn, owner],
          amountIn: amountIn,
          owner: owner,
        } as ElvatePair.SubStructOutput;

        if (!state.subs) return { ...state };

        const newSubs = [
          ...(state.subs
            .get(pairId.toString())
            ?.filter((sub) => sub.owner !== owner) || []),
          newSub,
        ];

        const res = new Map([...state.subs]);
        res.set(pairId.toString(), newSubs);

        return { ...state, subs: res };
      });

      setState((state) => {
        const newSub = {
          ...[amountIn, owner],
          amountIn: amountIn,
          owner: owner,
        } as ElvatePair.SubStructOutput;

        if (!state.eligibleSubs) return { ...state };

        const newSubs = deposit.lt(amountIn)
          ? [
              ...(state.eligibleSubs
                .get(pairId.toString())
                ?.filter((sub) => sub.owner !== owner) || []),
            ]
          : [
              ...(state.eligibleSubs
                .get(pairId.toString())
                ?.filter((sub) => sub.owner !== owner) || []),
              newSub,
            ];

        const res = new Map([...state.eligibleSubs]);
        res.set(pairId.toString(), newSubs);

        return { ...state, eligibleSubs: res };
      });
    },
    [contract, pairs, setState]
  );

  // attach/detach listeners
  useEffect(() => {
    setState({ subs: null, eligibleSubs: null });

    if (!library || !chainId || !contract || !pairs) return undefined;

    fetchSubs();

    // TODO: add event on deposit / withdraw to update eligibleSubs
    // TODO: filter on user only
    contract.on("SubEdited", onElvateSubEdited);

    return () => {
      contract.removeListener("SubEdited", onElvateSubEdited);
    };
  }, [library, chainId, contract, fetchSubs, onElvateSubEdited, pairs]);

  useEffect(() => {
    if (!state.subs) return;
    dispatch(updateSubs(state.subs));
  }, [dispatch, state.subs]);

  useEffect(() => {
    if (!state.eligibleSubs) return;
    dispatch(updateEligibleSubs(state.eligibleSubs));
  }, [dispatch, state.eligibleSubs]);

  return null;
}
