import { Button, styled } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import CustomSkeleton from "src/components/Skeleton";
import { CopyTooltip, OpenInNewTooltip } from "src/components/Tooltip";
import { AnimatedNumber, Subtitle1, Subtitle2 } from "src/components/Typo";
import { useExplorer } from "src/hooks/useExplorer";
import useTokenList from "src/hooks/useToken";
import { updateAutoLogin } from "src/state/settings/actions";

const Root = styled(FlexColumn)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.background.darker};
`;

const AddressContainer = styled(FlexCenter)`
  background-color: ${(props) => props.theme.palette.background.dark};
  padding: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
  justify-content: center;
  alignitems: center;
  border-radius: 5px;
`;

const Img = styled("img")`
  margin-right: ${(props) => props.theme.spacing(1)};
  height: 1.5em;
  width: 1.5em;
`;

const WalletInfo = () => {
  const { account, library, deactivate } = useWeb3React();
  const explorer = useExplorer();
  const smallAddress =
    account?.substring(0, 16) +
    "..." +
    account?.substring(account.length - 16, account.length);
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);
  const tokens = useTokenList();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!library || !account) return;

    library.getBalance(account).then((res: BigNumber) => setBalance(res));
  }, [account, library]);

  const handleDisconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
    dispatch(updateAutoLogin("disconnected"));
  };

  return (
    <Root>
      <Subtitle2>Address:</Subtitle2>
      <AddressContainer>
        <Subtitle1 sx={{ marginTop: 0.5, flex: 1 }}>{smallAddress}</Subtitle1>
        <CopyTooltip
          value={account || ""}
          iconProps={{ sx: { marginLeft: 1 } }}
        />
        <OpenInNewTooltip
          value={explorer + "address/" + account}
          iconProps={{ sx: { marginLeft: 1 } }}
        />
      </AddressContainer>

      <Subtitle2 sx={{ marginTop: 2 }}>MATIC Balance:</Subtitle2>
      <AddressContainer>
        <Img src={tokens[0].icon} />
        <Subtitle1>
          {balance ? (
            <AnimatedNumber value={balance} />
          ) : (
            <CustomSkeleton width={"5em"} height="1em" />
          )}{" "}
        </Subtitle1>
      </AddressContainer>

      <FlexCenter>
        <Button
          variant="contained"
          sx={{ marginTop: 4, marginBottom: 1 }}
          onClick={handleDisconnect}
        >
          disconnect
        </Button>
      </FlexCenter>
    </Root>
  );
};

export default WalletInfo;
