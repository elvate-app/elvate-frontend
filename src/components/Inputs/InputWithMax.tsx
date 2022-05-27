import { Button, Input, InputProps, styled } from "@mui/material";

const StyledInput = styled(Input)`
  border-radius: 5px;
  padding: 0.5em;
  height: 3em;
  background-color: ${(props) => props.theme.palette.background.darker};
  color: ${(props) => props.theme.palette.text.secondary};
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;

  & input {
    text-align: right;
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
`;

const StyledButton = styled(Button)`
  width: 1em;
  height: 3em;
  border-radius: 0;
  background-color: ${(props) => props.theme.palette.background.darker};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

type InputWithMaxProps = {
  max: string;
  onMaxClick: (max: string) => void;
} & InputProps;

const InputWithMax = ({ max, onMaxClick, ...props }: InputWithMaxProps) => {
  return (
    <>
      <StyledInput disableUnderline={true} placeholder="0" {...props} />
      <StyledButton color="primary" onClick={() => onMaxClick(max)}>
        MAX
      </StyledButton>
    </>
  );
};

export default InputWithMax;
