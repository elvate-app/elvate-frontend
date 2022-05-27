import { Grid } from "@mui/material";
import { ethers } from "ethers";
import { useMemo } from "react";
import Card from "src/components/Card";
import Skeleton from "src/components/Skeleton";
import { H6 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import usePairs from "src/hooks/usePairs";
import { useAllDeposit } from "src/hooks/usePortfolio";
import { useAllPrices } from "src/hooks/usePrices";
import { useSubscriptionsFromAccount } from "src/hooks/useSubscriptions";
import ElvateSubscription from "src/types/ElvateSubscription";
import { getPairById } from "src/utils/pair";
import { getTokenByAddress } from "src/utils/token";

const DashboardInformation = () => {
  const allPairs = usePairs();
  const userSubscriptions = useSubscriptionsFromAccount();
  const allDeposit = useAllDeposit();
  const allPrices = useAllPrices();
  const tokens = useAllTokens();

  const validSubscriptions: ElvateSubscription[] | undefined = useMemo(() => {
    if (!allPairs || !allDeposit || !userSubscriptions) return undefined;

    return userSubscriptions.filter((sub: ElvateSubscription) => {
      const pair = getPairById(sub.pairId, allPairs);
      if (!pair) return false;
      const depositIn = allDeposit[pair.tokenIn];
      return depositIn >= sub.amountIn;
    });
  }, [allDeposit, userSubscriptions, allPairs]);

  const ineligibleSubscriptions =
    userSubscriptions?.length === undefined ||
    validSubscriptions?.length === undefined
      ? undefined
      : userSubscriptions.length - validSubscriptions.length;

  const validSubscriptionsValue = useMemo(() => {
    return validSubscriptions
      ?.reduce((a: number, v: ElvateSubscription) => {
        const pair = getPairById(v.pairId, allPairs);

        if (!pair || !allPrices) return 0;
        const token = getTokenByAddress(pair.tokenIn, tokens);
        const price = allPrices[token.coingeckoId].usd;
        return a + price;
      }, 0)
      .toFixed(2);
  }, [validSubscriptions, allPrices, allPairs, tokens]);

  const totalDepositUSD = useMemo(() => {
    if (!allDeposit || !allPrices) return undefined;

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
  }, [allDeposit, allPrices, tokens]);

  return (
    <>
      <H6 fontWeight={"bold"} marginTop={2} marginBottom={1}>
        My Informations
      </H6>
      <Grid container columns={{ xs: 4, lg: 8 }} spacing={{ lg: 4 }}>
        <Grid item xs={2} marginBottom={{ xs: 2, lg: 0 }}>
          <Card
            title="My Eligible Subscriptions"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {validSubscriptions ? (
                `${validSubscriptions.length} Subs`
              ) : (
                <Skeleton />
              )}
            </H6>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card
            title="My Ineligible Subscriptions"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {ineligibleSubscriptions !== undefined ? (
                `${ineligibleSubscriptions} Subs`
              ) : (
                <Skeleton />
              )}
            </H6>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card
            title="My Subscriptions Value"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {validSubscriptionsValue !== undefined ? (
                `$${validSubscriptionsValue}`
              ) : (
                <Skeleton />
              )}
            </H6>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card
            title="My Deposit Value"
            padding={1}
            titleWrapperProps={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H6 width="100%" textAlign="center">
              {totalDepositUSD !== undefined ? (
                `$${totalDepositUSD}`
              ) : (
                <Skeleton />
              )}
            </H6>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardInformation;
