import { Button, styled } from "@mui/material";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlexColumn } from "src/components/Layout/Flex";
import { useAutoLogin } from "src/hooks/useAutoLogin";
import { updateAutoLogin } from "src/state/settings/actions";
import { injected } from "./Connectors";
import PaperAccount from "./PaperAccount";
import PaperError from "./PaperError";

const Root = styled(FlexColumn)`
  margin: ${(props) => props.theme.spacing(2)};
  flex-direction: column-reverse;
  height: 6em;
`;

const Connect = () => {
  const { active, activate, deactivate, error } = useWeb3React();
  const dispatch = useDispatch();
  const autoLogin = useAutoLogin();

  const handleSwitchNetwork = () => {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x13881",
          rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
          chainName: "Matic Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
      ],
    });
  };

  const handleConnect = useCallback(async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
    dispatch(updateAutoLogin("connected"));
  }, [activate, dispatch]);

  const handleDisconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
    dispatch(updateAutoLogin("disconnected"));
  };

  useEffect(() => {
    if (autoLogin === "connected" && !active) {
      handleConnect();
    }
  }, [active, handleConnect, autoLogin]);

  return (
    <Root>
      {active && !error ? (
        <>
          <Button variant="contained" onClick={handleDisconnect}>
            Disconnect
          </Button>
          <PaperAccount />
        </>
      ) : (
        <></>
      )}
      {!active &&
      !(error instanceof UnsupportedChainIdError) &&
      !(error instanceof NoEthereumProviderError) &&
      !(error instanceof UserRejectedRequestError) ? (
        <Button variant="contained" onClick={handleConnect}>
          Connect Wallet
        </Button>
      ) : (
        <></>
      )}
      {error instanceof UnsupportedChainIdError ? (
        <>
          <Button variant="contained" onClick={handleSwitchNetwork}>
            Change Network
          </Button>
          <PaperError title="Wrong Network" />
        </>
      ) : (
        <></>
      )}
      {error instanceof NoEthereumProviderError ? (
        <PaperError title="No Provider found" />
      ) : (
        <></>
      )}
      {error instanceof UserRejectedRequestError ? (
        <PaperError title="Rejected Request" />
      ) : (
        <></>
      )}
    </Root>
  );
};

export default Connect;
