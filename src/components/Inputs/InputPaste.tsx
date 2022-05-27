import { ContentPasteGo } from "@mui/icons-material";
import { styled, TextFieldProps } from "@mui/material";
import { TextField } from "./Input";

const StyledPasteGo = styled(ContentPasteGo)`
  color: ${(props) => props.theme.palette.divider};
  background-color: ${(props) => props.theme.palette.background.darker};
  margin-left: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
`;

export type InputPasteProps = {
  onPasteClick: (data: string) => void;
} & TextFieldProps;

const InputPaste = ({ onPasteClick, ...props }: InputPasteProps) => {
  const handlePaste = async () => {
    const data: string = await navigator.clipboard.readText();
    onPasteClick(data);
  };

  return (
    <TextField
      margin="dense"
      variant="filled"
      InputProps={{
        endAdornment: <StyledPasteGo onClick={handlePaste} />,
        disableUnderline: true,
      }}
      {...props}
    />
  );
};

export default InputPaste;
