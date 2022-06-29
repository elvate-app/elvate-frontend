import { Grid, styled } from "@mui/material";
import { ElvatePair } from "src/types/v1/ElvateCore";
import PairCard from "./PairCard";

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

type ViewComfyProps = {
  pairs: ElvatePair.PairStructOutput[] | null;
};

const ViewComfy = ({ pairs }: ViewComfyProps) => {
  if (!pairs) return <div>loading</div>;

  return (
    <Grid container columns={{ xs: 4, md: 4, lg: 8, xl: 12 }}>
      {pairs.map((pair: ElvatePair.PairStructOutput) => {
        return (
          <StyledGrid item xs={4} md={4} lg={4} key={pair.id.toNumber()}>
            <PairCard pair={pair} />
          </StyledGrid>
        );
      })}
    </Grid>
  );
};

export default ViewComfy;
