import { Paper, PaperProps, styled } from "@mui/material";

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.palette.error.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  padding: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type PaperErrorProps = {
  title: string;
} & PaperProps;

const PaperError = ({ title, ...props }: PaperErrorProps) => (
  <StyledPaper {...props}>{title}</StyledPaper>
);

export default PaperError;
