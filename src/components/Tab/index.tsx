import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { FlexCenter } from "../Layout/Flex";

interface TabPanelProps {
  children?: JSX.Element | JSX.Element[];
  index: number;
  value: number;
}

const StyledButton = styled(
  (props: { index: number; last: number } & ButtonProps) => (
    <Button {...props} />
  )
)`
  flex: 1;
  border-radius: 0px;
  border-top-left-radius: ${({ index }) => (index === 0 ? "5px" : "0px")};
  border-bottom-left-radius: ${({ index }) => (index === 0 ? "5px" : "0px")};
  border-top-right-radius: ${({ index, last }) =>
    index === last ? "5px" : "0px"};
  border-bottom-right-radius: ${({ index, last }) =>
    index === last ? "5px" : "0px"};
`;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

type CustomTabsProps = {
  labels: Array<string>;
  childrens: Array<JSX.Element | JSX.Element[]>;
};

const CustomTabs = ({ labels, childrens }: CustomTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <FlexCenter>
        <FlexCenter flex={1} padding={2}>
          {labels.map((label, index) => (
            <StyledButton
              index={index}
              last={labels.length - 1}
              onClick={() => handleChange(index)}
              {...a11yProps(index)}
              key={`button-${index}`}
              variant={index === value ? "contained" : "outlined"}
            >
              {label}
            </StyledButton>
          ))}
        </FlexCenter>
      </FlexCenter>
      {childrens.map((children, index) => {
        return (
          <TabPanel value={value} index={index} key={`tabpanel-${index}`}>
            {children}
          </TabPanel>
        );
      })}
    </>
  );
};

export default CustomTabs;
