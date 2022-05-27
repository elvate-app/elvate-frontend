import { styled, Typography } from "@mui/material";
import { BigNumber, ethers } from "ethers";
import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { getDecimals } from "src/utils/number";

export const MainTitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h3};
  margin-top: ${(props) => props.theme.spacing(2)};
  font-family: pasajero;
  font-weight: normal;
  letter-spacing: 5px;
`;

export const H3 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h3};
`;

export const H4 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h4};
`;

export const H5 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h5};
  font-weight: bold;
`;

export const H6 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6};
`;

export const Subtitle1 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.subtitle2};
  color: ${(props) => props.theme.palette.text.secondary};
  font-variant-numeric: tabular-nums;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Subtitle2 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.subtitle2};
  color: ${(props) => props.theme.palette.text.primary};
  font-variant-numeric: tabular-nums;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Subtitle3 = styled(Typography)`
  font-size: ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.palette.text.disabled};
  font-variant-numeric: tabular-nums;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

type AnimatedNumberProps = {
  value: BigNumber;
  decimals?: number;
};

export const AnimatedNumber = ({
  value,
  decimals = 18,
}: AnimatedNumberProps) => {
  const previousValue = useRef(0);
  const val = Number(ethers.utils.formatUnits(value, decimals));

  useEffect(() => {
    previousValue.current = val;
  }, [decimals, val, value]);

  return (
    <CountUp
      start={previousValue.current}
      end={val}
      decimals={Math.max(1, getDecimals(val, 3))}
      duration={0.5}
      separator=","
    />
  );
};
