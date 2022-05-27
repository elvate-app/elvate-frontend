import { Button, Grid } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useModal } from "mui-modal-provider";
import { useMemo } from "react";
import { FlexColumn } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import AddTokenModal from "src/components/Modal/AddToken";
import Skeleton from "src/components/Skeleton";
import Toolbar, { ToolbarContent } from "src/components/Toolbar";
import { H5, H6, Subtitle1 } from "src/components/Typo";
import tokens, { Token } from "src/constants/tokens";
import { useAllBalance, useAllDeposit } from "src/hooks/usePortfolio";
import { useAllPrices } from "src/hooks/usePrices";

const AssetsToolbar = () => {
  const { account } = useWeb3React();
  const deposit = useAllDeposit();
  const balance = useAllBalance();
  const prices = useAllPrices();
  const { showModal } = useModal();

  const totalBalanceUSD = useMemo(() => {
    if (!balance || !prices || !account) return undefined;

    return tokens
      .reduce((a: number, v: Token) => {
        const tokenValue =
          prices[v.coingeckoId].usd *
          Number.parseFloat(
            ethers.utils.formatUnits(balance[v.address], v.decimals)
          );
        return a + tokenValue;
      }, 0)
      .toFixed(2);
  }, [balance, prices, account]);

  const totalDepositUSD = useMemo(() => {
    if (!deposit || !prices || !account) return undefined;

    return tokens
      .reduce((a: number, v: Token) => {
        const tokenValue =
          prices[v.coingeckoId].usd *
          Number.parseFloat(ethers.utils.formatEther(deposit[v.address]));
        return a + tokenValue;
      }, 0)
      .toFixed(2);
  }, [deposit, prices, account]);

  return (
    <>
      <Toolbar contentProps={{ display: "flex", alignItems: "center" }}>
        <H5>Manage Assets</H5>
        <Spacing />
        <Button
          variant="contained"
          onClick={() => {
            const modal = showModal(AddTokenModal, {
              onCancel: () => {
                modal.hide();
              },
            });
          }}
        >
          Add Token
        </Button>
      </Toolbar>
      <ToolbarContent sx={{ padding: 3 }}>
        <Grid container columns={{ xs: 4, md: 6, lg: 12 }}>
          <Grid item xs={2}>
            <FlexColumn paddingRight={1}>
              <Subtitle1>Available Assets</Subtitle1>
              <H6>{totalBalanceUSD ? `$${totalBalanceUSD}` : <Skeleton />}</H6>
            </FlexColumn>
          </Grid>

          <Grid item xs={2}>
            <FlexColumn paddingRight={1}>
              <Subtitle1>Total Token deposited</Subtitle1>
              <H6>{totalDepositUSD ? `$${totalDepositUSD}` : <Skeleton />}</H6>
            </FlexColumn>
          </Grid>
        </Grid>
      </ToolbarContent>
    </>
  );
};

export default AssetsToolbar;
