import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const LoadingButton = ({ onClick, ...props }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMounted = useRef(false);
  const theme = useTheme();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!onClick) return;

    setIsLoading(true);
    await onClick(event);
    if (isMounted.current) setIsLoading(false);
  };

  return (
    <Button {...props} onClick={handleClick} variant="contained">
      <Box style={isLoading ? { color: "transparent", display: "flex" } : {}}>
        {props.children}
      </Box>
      <CircularProgress
        size="1em"
        style={
          isLoading
            ? { position: "absolute", color: theme.palette.text.primary }
            : { position: "absolute", color: "transparent" }
        }
      />
    </Button>
  );
};

export default LoadingButton;
