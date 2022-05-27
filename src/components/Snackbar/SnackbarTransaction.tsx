import { Close } from "@mui/icons-material";
import { Box, Link, styled, useTheme } from "@mui/material";
import { SnackbarContent, useSnackbar } from "notistack";
import { forwardRef } from "react";
import { FlexCenter } from "src/components/Layout/Flex";
import { Subtitle1, Subtitle2 } from "src/components/Typo";
import { useExplorer } from "src/hooks/useExplorer";

const Root = styled(FlexCenter)`
  background-color: ${(props) => props.theme.palette.background.default};
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;
  width: 20em;
`;

const StyledClose = styled(Close)`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-right: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
`;

const Type = styled(Box)`
  width: 0.7em;
  height: 100%;
`;

type SnackbarMessageHashProps = {
  title: string;
  hash: string;
};

export const SnackbarMessageHash = ({
  title,
  hash,
}: SnackbarMessageHashProps) => {
  const explorer = useExplorer();
  return (
    <Box>
      <Subtitle2 marginBottom={0.5}>{title}</Subtitle2>
      <Subtitle1>
        View on explorer:{" "}
        <StyledLink href={explorer + "tx/" + hash} target="_blank">
          {hash.substring(0, 15)}...
        </StyledLink>
      </Subtitle1>
    </Box>
  );
};

type SnackbarMessageContentProps = {
  title: string;
  content: string;
};

export const SnackbarMessageContent = ({
  title,
  content,
}: SnackbarMessageContentProps) => {
  return (
    <Box overflow="hidden" width="15em">
      <Subtitle2 marginBottom={0.5}>{title}</Subtitle2>
      <Subtitle1>{content}</Subtitle1>
    </Box>
  );
};

type SnackbarTransactionProps = {
  id: string | number;
  message: string | React.ReactNode;
  variant?: "info" | "error" | "success";
};

const SnackbarTransaction = forwardRef<
  HTMLDivElement,
  SnackbarTransactionProps
>(({ id, message, variant = "info" }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const theme = useTheme();

  return (
    <SnackbarContent ref={ref}>
      <Root>
        <Type
          sx={{
            backgroundColor:
              variant === "info"
                ? theme.palette.secondary.main
                : variant === "error"
                ? theme.palette.error.main
                : theme.palette.primary.main,
          }}
        />
        <Box padding={2} flex={1}>
          {message}
        </Box>
        <StyledClose onClick={() => closeSnackbar(id)} />
      </Root>
    </SnackbarContent>
  );
});

export default SnackbarTransaction;
