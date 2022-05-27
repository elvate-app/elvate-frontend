import { ContentCopy } from "@mui/icons-material";
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

const StyledContentCopy = styled(ContentCopy)`
  width: 0.8em;
  cursor: pointer;
`;

type CopyTooltipProps = {
  value: string;
  iconProps?: SvgIconProps;
} & Omit<
  TooltipProps,
  "children" | "title" | "TransitionComponent" | "placement" | "open"
>;

const CopyTooltip = ({ iconProps, value, ...props }: CopyTooltipProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleTooltipClose = () => {
    setOpen(false);
    setTimeout(() => setIsClicked(false), 500);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClick = () => {
    setIsClicked(true);
    setOpen(true);
    navigator.clipboard.writeText(value);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box sx={{ display: "flex" }}>
        <StyledTooltip
          arrow
          placement="top-end"
          TransitionComponent={Zoom}
          open={open}
          title={isClicked ? "Copied!" : "Copy"}
          {...props}
        >
          <StyledContentCopy
            {...iconProps}
            onClick={handleTooltipClick}
            onMouseEnter={handleTooltipOpen}
            onMouseLeave={handleTooltipClose}
          />
        </StyledTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default CopyTooltip;
