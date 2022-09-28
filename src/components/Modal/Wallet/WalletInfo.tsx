import { styled } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { Flex, FlexColumn } from "src/components/Layout/Flex";
import CustomSkeleton from "src/components/Skeleton";
import { CopyTooltip, OpenInNewTooltip } from "src/components/Tooltip";
import { AnimatedNumber, Subtitle1, Subtitle2 } from "src/components/Typo";
import { useExplorer } from "src/hooks/useExplorer";

const Root = styled(FlexColumn)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.background.darker};
`;

const WalletInfo = () => {
  const { account, library } = useWeb3React();
  const explorer = useExplorer();
  const smallAddress =
    account?.substring(0, 18) +
    "..." +
    account?.substring(account.length - 18, account.length);
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);

  useEffect(() => {
    if (!library || !account) return;

    library.getBalance(account).then((res: BigNumber) => setBalance(res));
  }, [account, library]);

  return (
    <Root>
      <Subtitle2>Address:</Subtitle2>
      <Flex justifyContent="center" alignItems="center">
        <Subtitle1 sx={{ marginTop: 0.5, flex: 1 }}>{smallAddress}</Subtitle1>
        <CopyTooltip
          value={account || ""}
          iconProps={{ sx: { marginLeft: 1 } }}
        />
        <OpenInNewTooltip
          value={explorer + "address/" + account}
          iconProps={{ sx: { marginLeft: 1 } }}
        />
      </Flex>

      <Subtitle2 sx={{ marginTop: 2 }}>MATIC Balance:</Subtitle2>
      <Subtitle1 sx={{ marginTop: 0.5 }}>
        {balance ? (
          <AnimatedNumber value={balance} />
        ) : (
          <CustomSkeleton width={"7em"} height="100%" />
        )}
      </Subtitle1>
    </Root>
  );
};

export default WalletInfo;
