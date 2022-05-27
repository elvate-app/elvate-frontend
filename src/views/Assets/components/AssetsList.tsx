import { Box, Button, Grid } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useModal } from "mui-modal-provider";
import { useEffect, useMemo, useState } from "react";
import Card from "src/components/Card";
import InputSearch from "src/components/Inputs/InputSearch";
import { FlexCenter } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import { DepositModal } from "src/components/Modal/ManageAssets";
import CustomSkeleton from "src/components/Skeleton";
import { InfoTooltip } from "src/components/Tooltip";
import { AnimatedNumber, H6, Subtitle2, Subtitle3 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useCustomTokens } from "src/hooks/useCustomTokens";
import useTokenList from "src/hooks/useToken";
import TokenLine from "./TokenLine";

const AssetsList = () => {
  const [search, setSearch] = useState<string>("");
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);
  const customTokens = useCustomTokens();
  const supportedTokens = useTokenList();
  const { library, account } = useWeb3React();
  const { showModal } = useModal();

  const supportedTokensFiltered = useMemo(
    () =>
      supportedTokens.filter(
        (token: Token) =>
          token.address.toUpperCase().includes(search.toUpperCase()) ||
          token.description.toUpperCase().includes(search.toUpperCase()) ||
          token.symbol.toUpperCase().includes(search.toUpperCase())
      ),
    [search, supportedTokens]
  );

  const customTokensFiltered = useMemo(
    () =>
      customTokens?.filter(
        (token: Token) =>
          token.address.toUpperCase().includes(search.toUpperCase()) ||
          token.description.toUpperCase().includes(search.toUpperCase()) ||
          token.symbol.toUpperCase().includes(search.toUpperCase())
      ),
    [search, customTokens]
  );

  useEffect(() => {
    if (!library || !account) return;

    library.getBalance(account).then((res: BigNumber) => setBalance(res));
  }, [account, library]);

  return (
    <>
      <Grid container columns={{ xs: 2, md: 3 }} alignItems="center">
        <Grid item xs={2} md={1} padding={1} marginBottom={2}>
          <InputSearch
            placeholder="Search by name, address..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} display="flex" alignItems="center">
          <Spacing flex={1} display={{ xs: "none", md: "flex" }} />
          <Box
            width={{ xs: "100%", md: "auto" }}
            marginBottom={{ xs: 3, md: 0 }}
          >
            <Card padding={2} display="flex" alignItems="center">
              <Box width="8em" marginRight={1}>
                <Subtitle3>MATIC Balance</Subtitle3>
                <Subtitle2>
                  {balance ? (
                    <AnimatedNumber value={balance} />
                  ) : (
                    <CustomSkeleton />
                  )}
                </Subtitle2>
              </Box>
              <Spacing display={{ xs: "flex", md: "none" }} />
              <Button
                variant="contained"
                sx={{ marginRight: 1 }}
                onClick={() => {
                  const modal = showModal(DepositModal, {
                    title: `Deposit BNB`,
                    max: ethers.utils.formatEther(balance ?? "0"),
                    decimal: 18,
                    onCancel: () => {
                      modal.hide();
                    },
                  });
                }}
              >
                Deposit
              </Button>
              <InfoTooltip
                iconProps={{ sx: { marginLeft: 1 } }}
                title="MATIC deposit will automatically be converted to WMATIC"
                arrow
              />
            </Card>
          </Box>
        </Grid>
      </Grid>

      <H6 fontWeight={"bold"} margin={2} marginBottom={1} marginTop={0}>
        Supported Assets
      </H6>

      {supportedTokensFiltered && supportedTokensFiltered.length > 0 ? (
        <>
          {supportedTokensFiltered.map((token: Token, index: number) => (
            <TokenLine
              token={token}
              key={token.address}
              sx={{
                borderRadius:
                  index === 0
                    ? "5px 5px 0px 0px"
                    : index === supportedTokensFiltered.length - 1
                    ? "0px 0px 5px 5px"
                    : "0px",
              }}
            />
          ))}
        </>
      ) : (
        <FlexCenter height={64}>
          <Subtitle2>No Token Found</Subtitle2>
        </FlexCenter>
      )}

      <H6 fontWeight={"bold"} margin={2} marginBottom={1} marginTop={2}>
        Custom Assets
      </H6>

      {customTokensFiltered && customTokensFiltered.length > 0 ? (
        <>
          {customTokensFiltered?.map((token: Token, index: number) => (
            <TokenLine
              token={token}
              key={token.address}
              sx={{
                borderRadius:
                  index === 0
                    ? "5px 5px 0px 0px"
                    : index === customTokensFiltered.length - 1
                    ? "0px 0px 5px 5px"
                    : "0px",
              }}
            />
          ))}
        </>
      ) : (
        <FlexCenter height={64}>
          <Subtitle2>No Token Found</Subtitle2>
        </FlexCenter>
      )}
    </>
  );
};

export default AssetsList;
