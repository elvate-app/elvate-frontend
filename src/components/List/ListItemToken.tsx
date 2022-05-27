import {
  alpha,
  Box,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { Token } from "src/constants/tokens";

const StyledListItem = styled(ListItem)`
  color: ${(props) => props.theme.palette.text.secondary};
  padding: 0;

  & span {
    color: ${(props) => props.theme.palette.text.primary};
  }

  & p {
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${(props) => props.theme.spacing(1.5)};
  padding-right: ${(props) => props.theme.spacing(1.5)};
`;

const StyledBoxEnable = styled(StyledBox)`
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => alpha(props.theme.palette.divider, 0.15)};
  }
`;

const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: ${(props) => props.theme.typography.subtitle1};
  width: 10em;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type ListItemTokenProps = {
  token: Token;
  secondary?: any;
  onClick?: () => void;
  disable?: boolean;
  width?: string;
};

const ListItemToken = ({
  token,
  secondary,
  onClick,
  disable,
  width,
}: ListItemTokenProps) => {
  const BoxCustom = disable ? StyledBox : StyledBoxEnable;
  return (
    <BoxCustom sx={{ width: width }}>
      <StyledListItem key={token.symbol} onClick={onClick}>
        <img
          src={token.icon}
          height={30}
          alt="Logo"
          style={{ marginRight: "1em" }}
        />
        <ListItemText primary={token.symbol} secondary={token.description} />
      </StyledListItem>
      {secondary ? <StyledTypography>{secondary}</StyledTypography> : <></>}
    </BoxCustom>
  );
};

export default ListItemToken;
