import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .${tooltipClasses.tooltip} {
    background-color: ${({ theme }) => theme.palette.divider};
  }
  & .${tooltipClasses.arrow} {
    color: ${({ theme }) => theme.palette.divider};
  }
`;

export default StyledTooltip;
