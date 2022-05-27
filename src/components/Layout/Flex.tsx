import { Box, BoxProps, styled } from "@mui/material";

type FlexProps = {
  fullWidth?: boolean;
};
export const Flex = styled((props: FlexProps & BoxProps) => <Box {...props} />)`
  display: flex;
  ${(props) => (props.fullWidth ? "width: 100%" : "")}
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexCenterColumn = styled(FlexCenter)`
  flex-direction: column;
`;
