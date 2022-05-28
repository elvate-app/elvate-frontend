import { Grid } from "@mui/material";
import { FlexColumn } from "src/components/Layout/Flex";
import Skeleton from "src/components/Skeleton";
import Toolbar, { ToolbarContent } from "src/components/Toolbar";
import { H5, H6, Subtitle1 } from "src/components/Typo";
import { useTotalDeposit } from "src/hooks/useApplication";
import usePairs from "src/hooks/usePairs";
import useSubscriptions from "src/hooks/useSubscriptions";

const DashboardToolbar = () => {
  const totalDeposited = useTotalDeposit();
  const pairs = usePairs();
  const subscriptions = useSubscriptions();

  return (
    <>
      <Toolbar contentProps={{ display: "flex", alignItems: "center" }}>
        <H5>Dashboard</H5>
      </Toolbar>
      <ToolbarContent>
        <Grid container columns={{ xs: 4, md: 6, lg: 12 }}>
          <Grid item xs={2}>
            <FlexColumn paddingRight={1}>
              <Subtitle1>Total Pairs Available</Subtitle1>
              <H6>{pairs ? `${pairs.length} Pairs` : <Skeleton />}</H6>
            </FlexColumn>
          </Grid>
          <Grid item xs={2}>
            <FlexColumn paddingRight={1}>
              <Subtitle1>Total Subscriptions</Subtitle1>
              <H6>
                {subscriptions ? `${subscriptions.length} Subs` : <Skeleton />}
              </H6>
            </FlexColumn>
          </Grid>
          <Grid item xs={2}>
            <FlexColumn paddingRight={1} marginTop={{ xs: 2, md: 0 }}>
              <Subtitle1>Total Value Deposited</Subtitle1>
              <H6>{totalDeposited ? `$${totalDeposited}` : <Skeleton />}</H6>
            </FlexColumn>
          </Grid>
        </Grid>
      </ToolbarContent>
    </>
  );
};

export default DashboardToolbar;
