import { Close } from "@mui/icons-material";
import { Dialog, dialogClasses, styled, Toolbar } from "@mui/material";
import { Spacing } from "src/components/Layout/Spacing";
import { H6 } from "src/components/Typo";
import { drawerWidth } from "src/views/AppBar";

export const StyledDialog = styled(Dialog)`
  & .${dialogClasses.paper} {
    border: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: ${(props) => props.theme.palette.background.dark};
    background-image: none;
    border-radius: 5px;
    overflow: hidden;
    width: 400px;
    margin: 0;
    margin-left: ${drawerWidth}px;
    border 2px solid blue;

    @media (max-width: 900px) {
      margin-left: 0px;
    }
  }
`;

const StyledToolbar = styled(Toolbar)`
  background-color: ${({ theme }) => theme.palette.divider};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  border-radius-top-right: 15px;
  border-radius-top-left: 15px;
`;

const StyledClose = styled(Close)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

export type ModalToolbarProps = {
  title: string;
  onCancel: () => void;
};

export const ModalToolbar = ({ title, onCancel }: ModalToolbarProps) => (
  <StyledToolbar>
    <H6>{title}</H6>
    <Spacing />
    <StyledClose onClick={onCancel} />
  </StyledToolbar>
);
