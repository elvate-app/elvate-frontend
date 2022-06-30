import { Grid } from "@mui/material";
import { ethers } from "ethers";
import { useMemo } from "react";
import Card from "src/components/Card";
import Skeleton from "src/components/Skeleton";
import { H6 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { useAllDeposit } from "src/hooks/usePortfolio";
import { useAllPrices } from "src/hooks/usePrices";

const DashboardInformation = () => {
  const allDeposit = useAllDeposit();
  const allPrices = useAllPrices();
  const tokens = useAllTokens();

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
      <Grid container columns={{ xs: 4, lg: 8 }} spacing={{ xs: 2, lg: 4 }}>
        {/* TODO: add eligible subscriptions, eligible subscription value */}
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
