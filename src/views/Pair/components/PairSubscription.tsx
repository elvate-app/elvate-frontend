import { DoubleArrow } from "@mui/icons-material";
import { Box, keyframes, Palette, styled } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import ButtonEdit from "src/components/Button/ButtonEdit";
import ButtonSubscribe from "src/components/Button/ButtonSubscribe";
import Card from "src/components/Card";
import { Input } from "src/components/Inputs";
import { Flex, FlexCenter } from "src/components/Layout/Flex";
import Skeleton from "src/components/Skeleton";
import { InfoTooltip } from "src/components/Tooltip";
import { Subtitle1, Subtitle2 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { useIsSubscribed, useSubscription } from "src/hooks/useSubscriptions";
import ElvatePair from "src/types/ElvatePair";
import { isNumber } from "src/utils/number";
import { getTokenByAddress } from "src/utils/token";
import PairTokenDescription from "./PairTokenDescription";

function animation(palette: Palette) {
  return keyframes`
  0%{color: ${palette.secondary.dark}};
  50%{color: ${palette.secondary.main}};
  100%{color: ${palette.secondary.dark}};
}`;
}

const StyledDoubleArrow = styled(DoubleArrow)`
  animation: ${(props) => animation(props.theme.palette)} linear 2s infinite;
  font-size: ${(props) => props.theme.typography.h4};
  margin: ${(props) => props.theme.spacing(2)};

  @media (max-width: 900px) {
    transform: rotate(90deg);
  }
`;

const MainContainer = styled(FlexCenter)`
  margin: ${(props) => props.theme.spacing(0.5)};
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const CustomInput = styled(Input)`
  background-color: ${(props) => props.theme.palette.background.dark};
`;

type SubscriptionProps = {
  pair: ElvatePair;
};

const PairSubscription = ({ pair }: SubscriptionProps) => {
  const tokens = useAllTokens();
  const tokenIn: Token = getTokenByAddress(pair.tokenIn, tokens);
  const tokenOut: Token = getTokenByAddress(pair.tokenOut, tokens);
  const isSubscribed = useIsSubscribed(pair.id);
  const subscription = useSubscription(pair.id);
  const amountIn = isSubscribed
    ? subscription?.amountIn ?? null
    : BigNumber.from(0);
  const [amount, setAmount] = useState<string>("");

  return (
    <div>
      <Card padding={1} marginTop={2}>
        <MainContainer>
          <PairTokenDescription token={tokenIn} />
          <StyledDoubleArrow />
          <PairTokenDescription token={tokenOut} />
        </MainContainer>
      </Card>

      <Card padding={1} marginTop={2}>
        <Flex>
          <Box margin={1} flex={1}>
            <Subtitle2>Current Subscription:</Subtitle2>
            <Subtitle1 marginTop={0.5}>
              {!amountIn ? (
                <Skeleton />
              ) : (
                <>
                  {ethers.utils.formatEther(amountIn)}{" "}
                  {tokenIn?.symbol.toUpperCase()}
                </>
              )}
            </Subtitle1>
          </Box>

          <InfoTooltip
            iconProps={{ sx: { margin: 1 } }}
            title={`The subscription ammount will be spent to buy ${tokenOut?.symbol.toUpperCase()}`}
            arrow
          />
        </Flex>

        <FlexCenter width="100%">
          <CustomInput
            sx={{ margin: 1 }}
            value={amount}
            disableUnderline={true}
            placeholder="amount"
            fullWidth
            onChange={(event) => {
              if (isNumber(event.target.value) || event.target.value === "") {
                setAmount(event.target.value);
              }
            }}
          />
          <Box sx={{ margin: 1 }}>
            {isSubscribed ? (
              <ButtonEdit pair={pair} amount={amount ? amount : "0"} />
            ) : (
              <ButtonSubscribe pair={pair} amount={amount ? amount : "0"} />
            )}
          </Box>
        </FlexCenter>
      </Card>
    </div>
  );
};

export default PairSubscription;
