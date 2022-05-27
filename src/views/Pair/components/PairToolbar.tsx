import ArrowBack from "@mui/icons-material/ArrowBack";
import { Grid, styled } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ButtonTrigger from "src/components/Button/ButtonTrigger";
import SubscribedChip from "src/components/Chip/Subscribed";
import ValidChip from "src/components/Chip/Valid";
import TokenIcons from "src/components/Icons/TokenIcons";
import { FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import PairTriggerProgress from "src/components/LinearProgress/PairTriggerProgress";
import Toolbar, { ToolbarContent } from "src/components/Toolbar";
import { H6, Subtitle1 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { useSubscriptionsFromPair } from "src/hooks/useSubscriptions";
import ElvatePair from "src/types/ElvatePair";
import { getTokenByAddress } from "src/utils/token";
import NextTriggerDate from "./NextTriggerDate";

const CustomArrowBack = styled(ArrowBack)`
  font-size: ${(props) => props.theme.typography.h4};
  margin-right: ${(props) => props.theme.spacing(2)};
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const LinearProgressContainer = styled(FlexCenter)`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const InfoContainer = styled(Grid)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const ButtonToolbarContainer = styled(FlexCenter)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonContentContainer = styled(FlexCenter)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    margin-left: ${(props) => props.theme.spacing(2)};
  }
`;

type PairToolbarProps = {
  pair: ElvatePair;
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
          <H6 fontWeight={"bold"}>{`PAIR #${pair.id}`}</H6>
          <H6
            marginLeft={2}
          >{`${tokenIn.symbol.toUpperCase()}/${tokenOut.symbol.toUpperCase()}`}</H6>
        </FlexCenter>
        <Spacing />
        <ButtonToolbarContainer>
          <ValidChip pair={pair} sx={{ marginRight: 1 }} />
          <SubscribedChip pairId={pair.id} sx={{ marginRight: 3 }} />
          <div>
            <ButtonTrigger pair={pair} />
          </div>
        </ButtonToolbarContainer>
      </Toolbar>

      <ToolbarContent>
        <Grid container columns={{ xs: 4, md: 8, lg: 12 }}>
          <InfoContainer item xs={2}>
            <FlexColumn>
              <Subtitle1>Total Subscriptions</Subtitle1>
              <H6 fontWeight={"bold"}>
                <>{subscriptions?.length} Subs</>
              </H6>
            </FlexColumn>
          </InfoContainer>

          <InfoContainer item xs={2}>
            <FlexColumn>
              <Subtitle1>Total Amount</Subtitle1>
              <H6 fontWeight={"bold"}>
                {ethers.utils.formatEther(totalAmount)}{" "}
                {tokenIn.symbol.toUpperCase()}
              </H6>
            </FlexColumn>
          </InfoContainer>

          <InfoContainer item xs={3}>
            <FlexColumn>
              <Subtitle1>Next Trigger</Subtitle1>
              <NextTriggerDate pair={pair} />
            </FlexColumn>
          </InfoContainer>

          <LinearProgressContainer>
            <PairTriggerProgress pair={pair} />

            <ButtonContentContainer>
              <div>
                <ButtonTrigger pair={pair} />
              </div>
            </ButtonContentContainer>
          </LinearProgressContainer>
        </Grid>
      </ToolbarContent>
    </>
  );
};

export default PairToolbar;
