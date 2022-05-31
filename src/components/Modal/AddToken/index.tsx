import { Box, Button, CircularProgress, DialogProps } from "@mui/material";
import { styled } from "@mui/system";
import {
  CallReturnContext,
  ContractCallResults,
} from "ethereum-multicall/dist/esm/models";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TokenIcon } from "src/components/Icons/TokenIcons";
import InputPaste from "src/components/Inputs/InputPaste";
import { FlexCenter } from "src/components/Layout/Flex";
import { ToolbarContent } from "src/components/Toolbar";
import { Subtitle1 } from "src/components/Typo";
import { Token, unknown } from "src/constants/tokens";
import ERC20Contract from "src/contracts/ERC20.json";
import { useTokenContract } from "src/hooks/useContract";
import { useAllTokens, useCustomTokens } from "src/hooks/useCustomTokens";
import useMulticall from "src/hooks/useMulticall";
import { updateCustomTokens } from "src/state/tokens/actions";
import { isAddress } from "src/utils/address";
import { ModalToolbar, StyledDialog } from "..";

const InputContainer = styled(Box)`
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};
`;

export type TokenListModalProps = {
  onCancel: () => void;
} & DialogProps;

const AddTokenModal = ({ title, onCancel, ...props }: TokenListModalProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [token, setToken] = useState<Token>(unknown);
  const customTokens = useCustomTokens();
  const dispatch = useDispatch();
  const tokenContract = useTokenContract(token ? token.address : undefined);
  const tokens = useAllTokens();
  const multicall = useMulticall();

  const isValidAddress = token !== undefined && isAddress(token.address);

  useEffect(() => {
    if (!tokenContract || !isValidAddress || !multicall) {
      setToken((state: Token) => {
        return { ...unknown, address: state.address };
      });
      return;
    }

    const fetchDatas = async () => {
      setIsFetching(true);

      const calls = [
        {
          reference: "decimals",
          methodName: "decimals",
          methodParameters: [],
        },
        {
          reference: "name",
          methodName: "name",
          methodParameters: [],
        },
        {
          reference: "symbol",
          methodName: "symbol",
          methodParameters: [],
        },
      ];

      const context = {
        reference: "tokenInfo",
        contractAddress: token.address,
        abi: ERC20Contract.abi,
        calls: calls,
      };

      const contractCallResult: ContractCallResults = await multicall.call(
        context
      );

      const decimals =
        contractCallResult.results.tokenInfo.callsReturnContext.find(
          (ret: CallReturnContext) => ret.reference === "decimals"
        )?.returnValues[0];
      const description =
        contractCallResult.results.tokenInfo.callsReturnContext.find(
          (ret: CallReturnContext) => ret.reference === "name"
        )?.returnValues[0];
      const symbol =
        contractCallResult.results.tokenInfo.callsReturnContext.find(
          (ret: CallReturnContext) => ret.reference === "symbol"
        )?.returnValues[0];

      setToken((state: Token) => {
        return {
          ...state,
          decimals: decimals,
          description: description,
          symbol: symbol,
        };
      });

      // Try to fetch datas from coingecko too
      const headers = { "Content-Type": "application/json" };
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${encodeURIComponent(
          token.address.toLowerCase()
        )}`,
        {
          method: "GET",
          headers,
        }
      );

      if (res.ok) {
        const json = await res.json();
        setToken((state: Token) => {
          return {
            ...state,
            coingeckoId: json.id,
            description: json.localization.en,
            icon: json.image.thumb,
          };
        });
      }

      setIsFetching(false);
    };

    fetchDatas();
  }, [tokenContract, isValidAddress, multicall, setToken, token.address]);

  const isAddressExist =
    tokens.find((t: Token) => t.address === token.address) !== undefined;

  const handleAddToken = async () => {
    if (!tokenContract || !isValidAddress) return;

    onCancel();
    dispatch(
      updateCustomTokens(!customTokens ? [token] : [...customTokens, token])
    );
  };

  return (
    <StyledDialog {...props}>
      <ModalToolbar title={"Import Token"} onCancel={onCancel} />
      <ToolbarContent contentProps={{ display: "flex" }} sx={{ padding: 0 }}>
        <Subtitle1>Add custom token</Subtitle1>
      </ToolbarContent>
      <Box sx={{ height: "9em" }}>
        <InputContainer>
          <InputPaste
            error={
              (!isValidAddress && token.address.length > 0) || isAddressExist
            }
            label="Token Address"
            helperText={
              !isValidAddress && token.address.length > 0
                ? "Invalid address"
                : isAddressExist
                ? "Token already added"
                : ""
            }
            variant="filled"
            value={token.address}
            onChange={(event) =>
              setToken({ ...token, address: event.target.value })
            }
            onPasteClick={(address) => setToken({ ...token, address: address })}
            fullWidth
          />
        </InputContainer>
        {isFetching ? (
          <FlexCenter>
            <CircularProgress size="1.5em" sx={{ marginTop: 2 }} />
          </FlexCenter>
        ) : token.coingeckoId.length !== 0 ? (
          <FlexCenter>
            <TokenIcon src={token.icon} sx={{ marginRight: 1 }} />
            {token.symbol.toUpperCase()}
          </FlexCenter>
        ) : isValidAddress ? (
          <FlexCenter>
            <TokenIcon src={unknown.icon} sx={{ marginRight: 1 }} />
            {token.symbol.toUpperCase()}
          </FlexCenter>
        ) : (
          <></>
        )}
      </Box>
      <Box width="100%" padding={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleAddToken()}
          disabled={
            !isValidAddress ||
            isAddressExist ||
            token.decimals === 0 ||
            isFetching
          }
        >
          Add Token
        </Button>
      </Box>
    </StyledDialog>
  );
};

export default AddTokenModal;
