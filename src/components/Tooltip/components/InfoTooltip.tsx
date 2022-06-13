import {
  Box,
  ClickAwayListener,
  styled,
  SvgIconProps,
  TooltipProps,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import StyledTooltip from "./Tooltip";

const Container = styled(Box)`
  color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
`;

type InfoTooltipProps = {
  icon: SvgIconProps;
} & Omit<TooltipProps, "children">;

const InfoTooltip = ({ icon, ...props }: InfoTooltipProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box sx={{ display: "flex" }}>
        <StyledTooltip
          placement="top-end"
          TransitionComponent={Zoom}
          open={open}
          arrow
          {...props}
        >
          <Container
            onClick={handleTooltipOpen}
            onMouseEnter={handleTooltipOpen}
            onMouseLeave={handleTooltipClose}
          >
            {icon}
          </Container>
        </StyledTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default InfoTooltip;
