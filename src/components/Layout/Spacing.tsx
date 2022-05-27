import { Box, BoxProps, styled } from "@mui/system";

type SpacingProps = {
  flex?: number;
};

export const Spacing = styled((props: SpacingProps & BoxProps) => (
  <Box {...props} />
))`
  flex: ${(props) => (props.flex ? props.flex : 1)};
`;
