import { Box, BoxProps, styled } from "@mui/material";
import TokenIcons from "src/components/Icons/TokenIcons";
import { Flex, FlexColumn } from "src/components/Layout/Flex";
import { Subtitle1, Subtitle2 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { getTokenByAddress } from "src/utils/token";

const Root = styled(Flex)`
  color: ${(props) => props.theme.palette.text.primary};
  align-items: center;
`;

type PairIconProps = {
  pair: ElvatePair.PairStructOutput;
} & BoxProps;

const PairIcon = ({ pair, ...props }: PairIconProps) => {
  const tokens = useAllTokens();
  const tokenIn: Token = getTokenByAddress(pair.tokenIn, tokens);
  const tokenOut: Token = getTokenByAddress(pair.tokenOut, tokens);

  if (!tokenIn || !tokenOut) return <></>;

  return (
    <Root {...props}>
      <TokenIcons pair={pair} />
      <Box>
        <FlexColumn>
          <Subtitle2>PAIR #{pair.id.toString()}</Subtitle2>
          <Subtitle1>
            {tokenIn.symbol}/{tokenOut.symbol}
          </Subtitle1>
        </FlexColumn>
      </Box>
    </Root>
  );
};

export default PairIcon;
