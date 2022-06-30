import { Button, ButtonProps, Grid, styled } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { H6 } from "src/components/Typo";
import usePairs from "src/hooks/usePairs";
import useSubs from "src/hooks/useSubscriptions";
import { ElvatePair } from "src/types/v1/ElvateCore";
import { PairTriggerTimeLeft } from "src/views/Pairs/components/PairStats";
import DashboardPairCard from "./DashboardPairCard";

const PairsContainer = styled(Grid)`
  flex-direction: column;
  display: flex;
`;

const ButtonContainer = styled(Grid)`
  margin: ${({ theme }) => theme.spacing(3)};
  justify-content: center;
  alig-items: center;
  display: flex;
`;

const ButtonViewMore = ({ ...props }: Omit<ButtonProps, "onClick">) => {
  const navigate = useNavigate();

  return (
    <Button {...props} onClick={() => navigate("/pairs")}>
      View More
    </Button>
  );
};

const DashboardTop = () => {
  const allPairs = usePairs();
  const allSubscriptions = useSubs();

  const allTopPairs = useMemo(() => {
    if (!allSubscriptions || !allPairs) return undefined;

    return [...allPairs]
      .sort((pair1, pair2) => {
        return pair2.subs.length - pair1.subs.length;
      })
      .slice(0, 3);
  }, [allSubscriptions, allPairs]);

  const allPairsTriggers = useMemo(
    () =>
      allPairs
        ? allPairs
            .slice()
            .sort(
              (
                a: ElvatePair.PairStructOutput,
                b: ElvatePair.PairStructOutput
              ) => a.lastPaidAt.sub(b.lastPaidAt).toNumber()
            )
            .slice(0, 3)
        : null,
    [allPairs]
  );

  return (
    <Grid container columns={{ xs: 2, md: 2 }} marginTop={{ xs: 0, md: 1 }}>
      <PairsContainer item xs={2} md={1} paddingRight={1}>
        <H6 fontWeight={"bold"} marginTop={2} marginBottom={1}>
          Top Pairs
        </H6>
        {allTopPairs?.map(
          (pair: ElvatePair.PairStructOutput, index: number) => (
            <DashboardPairCard
              key={pair.id.toString()}
              pair={pair}
              info="Subscriptions:"
              value={`${pair.subs.length} Subs`}
              sx={{
                borderRadius:
                  index === 0
                    ? "5px 5px 0px 0px"
                    : index === allTopPairs.length - 1
                    ? "0px 0px 5px 5px"
                    : "0px",
              }}
            />
          )
        )}
        <ButtonViewMore sx={{ display: { xs: "block", md: "none" } }} />
      </PairsContainer>
      <PairsContainer item xs={2} md={1} paddingLeft={1}>
        <H6 fontWeight={"bold"} marginTop={2} marginBottom={1}>
          Next Triggers
        </H6>
        {allPairsTriggers?.map(
          (pair: ElvatePair.PairStructOutput, index: number) => (
            <DashboardPairCard
              key={pair.id.toString()}
              pair={pair}
              info="Next Trigger:"
              value={<PairTriggerTimeLeft pair={pair} />}
              sx={{
                borderRadius:
                  index === 0
                    ? "5px 5px 0px 0px"
                    : index === allPairsTriggers.length - 1
                    ? "0px 0px 5px 5px"
                    : "0px",
              }}
            />
          )
        )}
        <ButtonViewMore sx={{ display: { xs: "block", md: "none" } }} />
      </PairsContainer>
      <ButtonContainer item md={2} sx={{ display: { xs: "none", md: "flex" } }}>
        <ButtonViewMore />
      </ButtonContainer>
    </Grid>
  );
};

export default DashboardTop;
