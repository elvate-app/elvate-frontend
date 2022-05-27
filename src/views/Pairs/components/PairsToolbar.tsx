import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexColumn } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import Skeleton from "src/components/Skeleton";
import Toolbar, { ToolbarContent } from "src/components/Toolbar";
import { H5, H6, Subtitle1 } from "src/components/Typo";
import usePairs, { usePairsSubscribed } from "src/hooks/usePairs";

const PairsToolbar = () => {
  const navigate = useNavigate();
  const allPairs = usePairs();
  const pairsSubscribed = usePairsSubscribed();

  return (
    <>
      <Toolbar contentProps={{ display: "flex", alignItems: "center" }}>
        <H5>Active Pairs</H5>
        <Spacing />
        <div>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/pairs/new");
            }}
          >
            new pair
          </Button>
        </div>
      </Toolbar>

      <ToolbarContent contentProps={{ display: "flex", alignItems: "center" }}>
        <Grid container columns={{ xs: 4, md: 6, lg: 12 }}>
          <Grid item xs={2}>
            <FlexColumn paddingRight={1}>
              <Subtitle1>Total Pairs</Subtitle1>
              <H6>{allPairs ? `${allPairs.length} Pairs` : <Skeleton />}</H6>
            </FlexColumn>
          </Grid>

          <Grid item xs={2}>
            <FlexColumn paddingRight={1}>
              <Subtitle1>Pairs Subscribed</Subtitle1>
              <H6>
                {pairsSubscribed ? (
                  `${pairsSubscribed.length} Pairs`
                ) : (
                  <Skeleton />
                )}
              </H6>
            </FlexColumn>
          </Grid>
        </Grid>
      </ToolbarContent>
    </>
  );
};

export default PairsToolbar;
