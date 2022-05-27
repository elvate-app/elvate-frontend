import { styled } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { Flex, FlexColumn } from "src/components/Layout/Flex";
import Skeleton from "src/components/Skeleton";
import { Subtitle1, Subtitle2 } from "src/components/Typo";
import { useSubscriptionsFromPair } from "src/hooks/useSubscriptions";
import useTimeLeft from "src/hooks/useTimeLeft";
import ElvatePair from "src/types/ElvatePair";
import { getTimeLeft } from "src/utils/time";

const Root = styled(Flex)`
  flex: 1 0 50px;
`;

const Content = styled(Subtitle2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface StatContainerProps {
  title: string;
  load: boolean;
  content?: any;
  separator?: boolean;
  width?: string;
  flex?: number;
}

const StatContainer = styled((props: StatContainerProps & CommonProps) => (
  <FlexColumn {...props}>
    <Subtitle1>{props.title}</Subtitle1>
    {props.load ? <Skeleton></Skeleton> : <Content>{props.content}</Content>}
  </FlexColumn>
))`
  margin-top: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  padding-right: ${(props) => props.theme.spacing(2)};
  padding-left: ${(props) => props.theme.spacing(2)};
  border-right: ${(props) => (props.separator ? 1 : 0)}px solid
    ${(props) => props.theme.palette.divider};
  flex: ${(props) => props.flex} 0 25px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: ${(props) => props.theme.spacing(0)};
    padding-right: ${(props) => props.theme.spacing(0)};
  }
`;

type PairStatsProps = {
  pair: ElvatePair;
};

export const PairTriggerTimeLeft = ({ pair }: PairStatsProps) => {
  const { time } = useTimeLeft(pair.lastPaidAt.toNumber());
  const { days, hours, minutes, seconds } = getTimeLeft(time);
  return <>{`${days}d ${hours}:${minutes}:${seconds}`}</>;
};

export const PairSubscriptions = ({ pair }: PairStatsProps) => {
  const subscriptions = useSubscriptionsFromPair(pair.id);
  return <>{subscriptions?.length}</>;
};

export const PairSubscriptionAmount = ({ pair }: PairStatsProps) => {
  const subscriptions = useSubscriptionsFromPair(pair.id);
  const { account } = useWeb3React();
  const sub = subscriptions?.filter((sub) => sub.owner === account)[0];
  const amountIn = sub ? sub.amountIn : undefined;
  return amountIn ? <>{ethers.utils.formatEther(amountIn)}</> : <>Empty</>;
};

type PairStatsContainerProps = {
  pair: ElvatePair;
  separator?: boolean;
};

const PairStats = ({ pair, separator = true }: PairStatsContainerProps) => {
  const subscriptions = useSubscriptionsFromPair(pair.id);

  return (
    <Root>
      <StatContainer
        separator={separator}
        title="Subs"
        content={<PairSubscriptions pair={pair} />}
        load={subscriptions === null}
        flex={1}
      />

      <StatContainer
        separator={separator}
        title="Next Trigger"
        content={<PairTriggerTimeLeft pair={pair} />}
        load={subscriptions === null}
        flex={2}
      />

      <StatContainer
        title="Amount"
        content={<PairSubscriptionAmount pair={pair} />}
        load={subscriptions === null}
        flex={2}
      />
    </Root>
  );
};

export default PairStats;
