import { Grid, styled } from "@mui/material";
import { Content } from "src/components/Toolbar";
import ElvatePair from "src/types/ElvatePair";
import PairCard from "./PairCard";

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

type ViewComfyProps = {
  pairs: ElvatePair[] | null;
};

const ViewComfy = ({ pairs }: ViewComfyProps) => {
  if (!pairs) return <div>loading</div>;

  return (
    <Content>
      <Grid container columns={{ xs: 4, md: 4, lg: 8, xl: 12 }}>
        {pairs.map((pair: ElvatePair) => {
          return (
            <StyledGrid item xs={4} md={4} lg={4} key={pair.id.toNumber()}>
              <PairCard pair={pair} />
            </StyledGrid>
          );
        })}
      </Grid>
    </Content>
  );
};

export default ViewComfy;
