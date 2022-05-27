import { Box, Button, CircularProgress, DialogProps } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TokenIcon } from "src/components/Icons/TokenIcons";
import InputPaste from "src/components/Inputs/InputPaste";
import { FlexCenter } from "src/components/Layout/Flex";
import { ToolbarContent } from "src/components/Toolbar";
import { Subtitle1 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useTokenContract } from "src/hooks/useContract";
import { useAllTokens, useCustomTokens } from "src/hooks/useCustomTokens";
import { updateCustomTokens } from "src/state/tokens/actions";
import { isAddress } from "src/utils/address";
import { ModalToolbar, StyledDialog } from "..";

const InputContainer = styled(Box)`
  padding: ${(props) => props.theme.spacing(2)};
`;

export type TokenListModalProps = {
  onCancel: () => void;
} & DialogProps;

const AddTokenModal = ({ title, onCancel, ...props }: TokenListModalProps) => {
  const [address, setAddress] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [decimals, setDecimals] = useState<number | undefined>(undefined);
  const [coingeckoInfo, setCoingeckoInfo] = useState<any | undefined>(
    undefined
  );
  const customTokens = useCustomTokens();
  const dispatch = useDispatch();
  const isValidAddress = isAddress(address);
  const tokenContract = useTokenContract(address);
  const tokens = useAllTokens();

  useEffect(() => {
    if (!tokenContract || !isValidAddress) {
      setCoingeckoInfo(undefined);
      setDecimals(undefined);
      return;
    }

    const fetchDatas = async () => {
      setIsFetching(true);

      setDecimals(await tokenContract.decimals());
      const headers = { "Content-Type": "application/json" };
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${encodeURIComponent(
          // address.toLowerCase()
          // "0xc2132D05D31c914a87C6611C10748AEb04B58e8F".toLowerCase() // USDT
          "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683".toLowerCase() // SAND
        )}`,
        {
          method: "GET",
          headers,
        }
      );

      if (res.ok) {
        const json = await res.json();
        setCoingeckoInfo(json);
      }

      setIsFetching(false);
    };

    fetchDatas();
  }, [tokenContract, isValidAddress]);

  const isAddressExist =
    tokens.find((token: Token) => token.address === address) !== undefined;

  const handleAddToken = async (address: string) => {
    if (!tokenContract || !isValidAddress || !coingeckoInfo || !decimals)
      return;

    const newToken: Token = {
      address: address,
      symbol: coingeckoInfo.symbol.toUpperCase(),
      decimals: decimals,
      description: coingeckoInfo.localization.en,
      coingeckoId: coingeckoInfo.id,
      icon: coingeckoInfo.image.thumb,
    };

    onCancel();
    dispatch(
      updateCustomTokens(
        !customTokens ? [newToken] : [...customTokens, newToken]
      )
    );
  };

  // dispatch(updateCustomTokens([]));

  return (
    <StyledDialog {...props}>
      <ModalToolbar title={"Import Token"} onCancel={onCancel} />
      <ToolbarContent contentProps={{ display: "flex" }} sx={{ padding: 0 }}>
        <Subtitle1>Add custom token</Subtitle1>
      </ToolbarContent>
      <Box sx={{ height: "12em" }}>
        <InputContainer>
          <InputPaste
            error={(!isValidAddress && address.length > 0) || isAddressExist}
            label="Token Address"
            helperText={
              !isValidAddress && address.length > 0
                ? "Invalid address"
                : isAddressExist
                ? "Token already added"
                : ""
            }
            variant="filled"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            onPasteClick={setAddress}
            fullWidth
          />
        </InputContainer>
        {coingeckoInfo !== undefined ? (
          <FlexCenter>
            <TokenIcon
              src={coingeckoInfo.image.thumb}
              sx={{ marginRight: 1 }}
            />
            {coingeckoInfo.symbol.toUpperCase()}
          </FlexCenter>
        ) : isFetching ? (
          <FlexCenter>
            <CircularProgress size="1em" />
          </FlexCenter>
        ) : (
          <></>
        )}
      </Box>
      <Box width="100%" padding={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleAddToken(address)}
          disabled={
            !isValidAddress ||
            isAddressExist ||
            coingeckoInfo === undefined ||
            decimals === undefined
          }
        >
          Add Token
        </Button>
      </Box>
    </StyledDialog>
  );
};

export default AddTokenModal;
