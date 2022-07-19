import { styled } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { FlexCenterColumn } from "src/components/Layout/Flex";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { getTokenByAddress } from "src/utils/token";

const Img = styled("img")`
  height: 30px;
  width: 30px;
`;

type TokenIconProps = {
  src?: string;
};

export const TokenIcon = styled((props: TokenIconProps & CommonProps) => (
  <FlexCenterColumn {...props}>
    <Img src={props.src} alt="Logo" />
  </FlexCenterColumn>
))`
  border: 2px solid ${(props) => props.theme.palette.background.default};
  background-color: ${(props) => props.theme.palette.background.dark};
  border-radius: 50px;
  height: 50px;
  width: 50px;
`;

const TokenIconRight = styled(TokenIcon)`
  position: relative;
  right: 15px;
`;

type TokenIconsProps = {
  pair: ElvatePair.PairStructOutput;
};

const TokenIcons = ({ pair }: TokenIconsProps) => {
  const tokens = useAllTokens();
  const tokenIn: Token = getTokenByAddress(pair.tokenIn, tokens);
  const tokenOut: Token = getTokenByAddress(pair.tokenOut, tokens);

  if (!tokenIn || !tokenOut) return <></>;

  return (
    <>
      <TokenIcon src={tokenIn.icon} />
      <TokenIconRight src={tokenOut.icon} />
    </>
  );
};

export default TokenIcons;
