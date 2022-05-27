import {
  filledInputClasses,
  Input as MuiInput,
  styled,
  TextField as MuiTextField,
} from "@mui/material";

export const Input = styled(MuiInput)`
  background-color: ${(props) => props.theme.palette.background.darker};
  color: ${(props) => props.theme.palette.text.secondary};
  border-radius: 5px;
  padding: 0.5em;
  height: 3em;

  & input {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
`;

export const TextField = styled(MuiTextField)`
  color: ${(props) => props.theme.palette.text.secondary};

  & .${filledInputClasses.root}:hover {
    background-color: ${({ theme }) => theme.palette.background.darker};
  }

  & .${filledInputClasses.root} {
    background-color: ${({ theme }) => theme.palette.background.darker};
  }

  & .${filledInputClasses.root}.${filledInputClasses.focused} {
    background-color: ${({ theme }) => theme.palette.background.darker};
  }

  & input {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
`;
