import { Skeleton, SkeletonProps, styled } from "@mui/material";

export const CustomSkeleton = styled((props: SkeletonProps) => (
  <Skeleton {...props} />
))`
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme.palette.mode === "light"
      ? props.theme.palette.divider
      : props.theme.palette.background.paper};
`;

export default CustomSkeleton;
