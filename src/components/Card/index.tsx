import { Help } from "@mui/icons-material";
import { alpha, Box, BoxProps, styled } from "@mui/material";
import { Subtitle1 } from "../Typo";

const RootContent = styled(Box)`
  width: 100%;
`;

const StyledBox = styled((props: { hover?: boolean } & BoxProps) => (
  <Box {...props} />
))`
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  ${({ hover }) => (hover ? "cursor: pointer;" : "")}

  ${({ theme, hover }) =>
    hover
      ? `&:hover {
          background-color: ${alpha(theme.palette.background.paper, 0.5)};
      }`
      : ""}
`;

const StyledInfo = styled(Help)`
  margin-right: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export type CardProps = BoxProps & {
  title?: string;
  titleWrapperProps?: BoxProps;
  hover?: boolean;
};

const Card = ({ title, children, titleWrapperProps, ...props }: CardProps) => {
  return (
    <RootContent>
      <StyledBox {...props}>
        {title ? (
          <Box sx={{ margin: 1 }} {...titleWrapperProps}>
            <Subtitle1>{title}</Subtitle1>
          </Box>
        ) : (
          <></>
        )}
        {children}
      </StyledBox>
    </RootContent>
  );
};

export const InfoCard = styled(({ children, ...props }: BoxProps) => (
  <Card display={"flex"} alignItems={"center"} {...props}>
    <StyledInfo />
    {children}
  </Card>
))`
  background-color: ${({ theme }) => alpha(theme.palette.secondary.dark, 0.1)};
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  font-size: ${({ theme }) => theme.typography.subtitle1};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export default Card;
