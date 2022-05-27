import { Box, styled } from "@mui/material";
import { TokenIcon } from "src/components/Icons/TokenIcons";
import { Flex, FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import Skeleton from "src/components/Skeleton";
import { OpenInNewTooltip } from "src/components/Tooltip";
import {
  AnimatedNumber,
  Subtitle1,
  Subtitle2,
  Subtitle3,
} from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useExplorer } from "src/hooks/useExplorer";
import { useBalance, useDeposit } from "src/hooks/usePortfolio";

const Root = styled(FlexColumn)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.background.dark};
  border-radius: 10px;
  width: 100%;
`;

const TextContainer = styled(FlexColumn)`
  margin: ${({ theme }) => theme.spacing(1)};
  width: 7em;
  flex: 1;
`;

const TokenContainer = styled(FlexCenter)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
`;

type PairTokenDescriptionProps = {
  token: Token;
};

const PairTokenDescription = ({ token }: PairTokenDescriptionProps) => {
  const balance = useBalance(token.address);
  const deposit = useDeposit(token.address);
  const explorer = useExplorer();

  return (
    <Root>
      <TokenContainer>
        <TokenIcon src={token.icon} />
        <Box margin={1}>
          <Subtitle2>{token.symbol}</Subtitle2>
          <Subtitle1>{token.description}</Subtitle1>
        </Box>
        <Spacing />
        <OpenInNewTooltip value={explorer + "address/" + token.address} />
      </TokenContainer>
      <Flex width="100%">
        <TextContainer>
          <Subtitle3>Balance</Subtitle3>
          <Subtitle2>
            {!balance ? (
              <Skeleton />
            ) : (
              <AnimatedNumber value={balance} decimals={token.decimals} />
            )}
          </Subtitle2>
        </TextContainer>
        <TextContainer>
          <Subtitle3>Deposit</Subtitle3>
          <Subtitle2>
            {!deposit ? (
              <Skeleton />
            ) : (
              <AnimatedNumber value={deposit} decimals={token.decimals} />
            )}
          </Subtitle2>
        </TextContainer>
      </Flex>
    </Root>
  );
};

export default PairTokenDescription;
