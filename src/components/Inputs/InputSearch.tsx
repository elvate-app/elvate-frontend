import { Search } from "@mui/icons-material";
import { InputProps, styled } from "@mui/material";
import { Input } from "./Input";

const StyledSearch = styled(Search)`
  color: ${(props) => props.theme.palette.divider};
  background-color: ${(props) => props.theme.palette.background.darker};
  margin-right: ${(props) => props.theme.spacing(1)};
`;

const InputSearch = ({ ...props }: InputProps) => {
  return (
    <Input
      startAdornment={<StyledSearch />}
      disableUnderline={true}
      {...props}
    />
  );
};

export default InputSearch;
