import { InjectedConnector } from "@web3-react/injected-connector";
import { NETWORK_MATIC_MUMBAI_TESTNET } from "src/constants/chain";

export const injected = new InjectedConnector({
  supportedChainIds: [NETWORK_MATIC_MUMBAI_TESTNET],
});
