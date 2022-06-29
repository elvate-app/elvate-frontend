import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Grid, styled } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ButtonTrigger from "src/components/Button/ButtonTrigger";
import TokenIcons from "src/components/Icons/TokenIcons";
import { FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import Toolbar, { ToolbarContent } from "src/components/Toolbar";
import { H5, H6, Subtitle1 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { useSubscriptionsFromPair } from "src/hooks/useSubscriptions";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { getTokenByAddress } from "src/utils/token";
import NextTriggerDate from "./NextTriggerDate";

const CustomArrowBack = styled(KeyboardArrowLeft)`
  font-size: ${(props) => props.theme.typography.h4};
  margin-right: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
`;

type PairToolbarProps = {
  pair: ElvatePair.PairStructOutput;
};

const PairToolbar = ({ pair }: PairToolbarProps) => {
  const navigate = useNavigate();
  const subscriptions = useSubscriptionsFromPair(pair.id);
  const tokens = useAllTokens();
  const tokenIn: Token = getTokenByAddress(pair.tokenIn, tokens);
  const tokenOut: Token = getTokenByAddress(pair.tokenOut, tokens);

  const totalAmount = useMemo(() => {
    return (
      subscriptions?.reduce((a, b) => {
        return a.add(b.amountIn);
      }, BigNumber.from(0)) ?? 0
    );
  }, [subscriptions]);

  if (!tokenIn || !tokenOut) return <></>;

  return (
    <>
      <Toolbar contentProps={{ display: "flex", alignItems: "center" }}>
        <FlexCenter>
          <CustomArrowBack onClick={() => navigate(-1)} />
          <TokenIcons pair={pair} />
          <H5>{`PAIR #${pair.id}`}</H5>
          <Subtitle1
            marginLeft={2}
          >{`${tokenIn.symbol.toUpperCase()}/${tokenOut.symbol.toUpperCase()}`}</Subtitle1>
        </FlexCenter>
        <Spacing />
        <Box display={{ xs: "none", md: "block" }}>
          <ButtonTrigger pair={pair} />
        </Box>
      </Toolbar>

      <ToolbarContent>
        <Grid container columns={{ xs: 4, md: 8, lg: 12 }}>
          <Grid item xs={2}>
            <FlexColumn>
              <Subtitle1>Total Subscriptions</Subtitle1>
              <H6 fontWeight={"bold"}>
                <>{subscriptions?.length} Subs</>
              </H6>
            </FlexColumn>
          </Grid>

          <Grid item xs={2}>
            <FlexColumn>
              <Subtitle1>Total Amount</Subtitle1>
              <H6 fontWeight={"bold"}>
                {ethers.utils.formatEther(totalAmount)}{" "}
                {tokenIn.symbol.toUpperCase()}
              </H6>
            </FlexColumn>
          </Grid>

          <Grid item xs={3} marginTop={{ xs: 2, md: 0 }}>
            <FlexColumn>
              <Subtitle1>Next Trigger</Subtitle1>
              <NextTriggerDate pair={pair} />
            </FlexColumn>
          </Grid>

          <Grid
            item
            xs={4}
            display={{ xs: "flex", md: "none" }}
            justifyContent="center"
            marginTop={4}
          >
            <ButtonTrigger pair={pair} />
          </Grid>
        </Grid>
      </ToolbarContent>
    </>
  );
};

export default PairToolbar;
