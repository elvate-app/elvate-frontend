import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { FlexCenter } from "../Layout/Flex";

interface TabPanelProps {
  children?: JSX.Element | JSX.Element[];
  index: number;
  value: number;
}

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <FlexCenter>
        <Tabs
          sx={{ flex: 1 }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {labels.map((label, index) => (
            <Tab
              label={label}
              {...a11yProps(index)}
              sx={{ flex: 1 }}
              key={`tab-${index}`}
            />
          ))}
        </Tabs>
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
