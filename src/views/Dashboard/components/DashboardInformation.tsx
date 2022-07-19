import { Grid } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { useMemo } from "react";
import Card from "src/components/Card";
import Skeleton from "src/components/Skeleton";
import { H6 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import usePairs from "src/hooks/usePairs";
import { useAllDeposit } from "src/hooks/usePortfolio";
import { useAllPrices } from "src/hooks/usePrices";
import { useEligibleSubsFromAccount } from "src/hooks/useSubscriptions";
import { getPairById } from "src/utils/pair";
import { getTokenByAddress } from "src/utils/token";

const DashboardInformation = () => {
  const allDeposit = useAllDeposit();
  const allPrices = useAllPrices();
  const pairs = usePairs();
  const tokens = useAllTokens();
  const eligibleSubs = useEligibleSubsFromAccount();

  const eligibleSubsLength = useMemo(
    () =>
      eligibleSubs
        ? [...eligibleSubs].reduce((total, value) => value[1].length + total, 0)
        : undefined,
    [eligibleSubs]
  );

  const totalAmountInSubs = useMemo(
    () =>
      eligibleSubs
        ? [...eligibleSubs]
            .reduce((total, value) => {
              const pair = getPairById(BigNumber.from(value[0]), pairs);
              const token = getTokenByAddress(pair?.tokenIn, tokens);

              if (value[1][0])
                return (
                  total +
                  Number(ethers.utils.formatEther(value[1][0].amountIn)) *
                    (allPrices?.[token.coingeckoId].usd || 0)
                );
              return total;
            }, 0)
            .toFixed(2)
        : undefined,
    [allPrices, eligibleSubs, pairs, tokens]
  );

  const totalDepositUSD = useMemo(() => {
    if (!allDeposit || !allPrices || !eligibleSubs) return undefined;

    return tokens
      .reduce((a: number, v: Token) => {
        // TODO: handle no token price
        const price =
          allPrices[v.coingeckoId] && allPrices[v.coingeckoId].usd
            ? allPrices[v.coingeckoId].usd
            : 0;
        const tokenValue =
          price *
          Number.parseFloat(ethers.utils.formatEther(allDeposit[v.address]));
        return a + tokenValue;
      }, 0)
      .toFixed(2);
  }, [allDeposit, allPrices, eligibleSubs, tokens]);

  const loading =
    eligibleSubsLength === undefined ||
    totalAmountInSubs === undefined ||
    totalDepositUSD === undefined;

  return (
    <>
      <H6 fontWeight={"bold"} marginTop={2} marginBottom={1}>
        My Informations
      </H6>
      <Grid container columns={{ xs: 3, lg: 9 }} spacing={{ xs: 2, lg: 4 }}>
        <Grid item xs={3}>
          <Card
            title="My Deposit Value"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {!loading ? `$${totalDepositUSD}` : <Skeleton />}
            </H6>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card
            title="My Subs"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {!loading ? `${eligibleSubsLength} Subs` : <Skeleton />}
            </H6>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card
            title="My Amount In"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {!loading ? `$${totalAmountInSubs}` : <Skeleton />}
            </H6>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardInformation;
