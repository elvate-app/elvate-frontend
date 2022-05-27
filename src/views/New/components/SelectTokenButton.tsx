import { Box, BoxProps, styled } from "@mui/material";
import { useModal } from "mui-modal-provider";
import ListItemToken from "src/components/List/ListItemToken";
import TokenListModal from "src/components/Modal/TokenList";
import { Token } from "src/constants/tokens";

const StyledBox = styled(Box)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

type SelectTokenButtonProps = {
  title: string;
  token: Token;
  onChange: (token: Token) => void;
} & Omit<BoxProps, "onChange">;

const SelectTokenButton = ({
  title,
  token,
  onChange,
  ...props
}: SelectTokenButtonProps) => {
  const { showModal } = useModal();

  return (
    <StyledBox {...props}>
      <ListItemToken
        onClick={() => {
          const modal = showModal(TokenListModal, {
            title: title,
            onCancel: () => {
              modal.hide();
            },
            onClick: (token: Token) => {
              onChange(token);
            },
          });
        }}
        token={token}
        width={"12em"}
        disable
      />
    </StyledBox>
  );
};

export default SelectTokenButton;
