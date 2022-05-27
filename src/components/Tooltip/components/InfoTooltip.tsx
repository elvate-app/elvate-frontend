import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  styled,
  SvgIconProps,
  TooltipProps,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import { Flex } from "src/components/Layout/Flex";
import StyledTooltip from "./Tooltip";

const StyledInfo = styled(InfoOutlined)`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

type InfoTooltipProps = {
  iconProps?: SvgIconProps;
} & Omit<TooltipProps, "children">;

const InfoTooltip = ({ iconProps, ...props }: InfoTooltipProps) => {
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
          {...props}
        >
          <StyledInfo
            {...iconProps}
            onClick={handleTooltipOpen}
            onMouseEnter={handleTooltipOpen}
            onMouseLeave={handleTooltipClose}
          />
        </StyledTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default InfoTooltip;
