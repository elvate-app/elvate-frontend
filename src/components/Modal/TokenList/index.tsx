import { DialogProps, List } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import InputSearch from "src/components/Inputs/InputSearch";
import { FlexCenter } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import ListItemToken from "src/components/List/ListItemToken";
import Skeleton from "src/components/Skeleton";
import { ToolbarContent } from "src/components/Toolbar";
import { AnimatedNumber, Subtitle1 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { useAllDeposit } from "src/hooks/usePortfolio";
import { ModalToolbar, ModalToolbarProps, StyledDialog } from "..";

const StyledList = styled(List)`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 15em;
  overflow-y: scroll;

  & ul {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

const InputContainer = styled(FlexCenter)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.background.darker};
`;

export type TokenListModalProps = {
  title: string;
  onCancel: () => void;
  onClick: (token: Token) => void;
} & Omit<DialogProps, "onClick"> &
  ModalToolbarProps;

const TokenListModal = ({
  title,
  onCancel,
  onClick,
  ...props
}: TokenListModalProps) => {
  const [search, setSearch] = useState<string>("");
  const tokens = useAllTokens();
  const balance = useAllDeposit();
  const handleClick = (token: Token) => {
    setSearch("");
    onClick(token);
    onCancel();
  };

  return (
    <StyledDialog {...props}>
      <ModalToolbar title={title} onCancel={onCancel} />
      <InputContainer>
        <InputSearch
          value={search}
          fullWidth={true}
          placeholder="search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputContainer>
      <ToolbarContent contentProps={{ display: "flex" }} sx={{ padding: 0 }}>
        <Subtitle1>Token</Subtitle1>
        <Spacing />
        <Subtitle1>Current Deposit</Subtitle1>
      </ToolbarContent>
      <StyledList>
        <li>
          <ul>
            {tokens
              .filter(
                (token: Token) =>
                  token.symbol.toUpperCase().includes(search.toUpperCase()) ||
                  token.description
                    .toUpperCase()
                    .includes(search.toUpperCase()) ||
                  token.address.toUpperCase().includes(search.toUpperCase())
              )
              .map((token: Token) => (
                <ListItemToken
                  key={token.symbol.toUpperCase()}
                  token={token}
                  secondary={
                    balance && balance[token.address] ? (
                      <AnimatedNumber
                        value={balance[token.address]}
                        decimals={token.decimals}
                      />
                    ) : (
                      <Skeleton />
                    )
                  }
                  onClick={() => handleClick(token)}
                />
              ))}
          </ul>
        </li>
      </StyledList>
    </StyledDialog>
  );
};

export default TokenListModal;
