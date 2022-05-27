import IconViewComfy from "@mui/icons-material/ViewComfy";
import IconViewList from "@mui/icons-material/ViewList";
import { Grid, styled } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import InputSearch from "src/components/Inputs/InputSearch";
import { Spacing } from "src/components/Layout/Spacing";
import { H6 } from "src/components/Typo";
import { useAllTokens } from "src/hooks/useCustomTokens";
import { usePairsNotSubscribed, usePairsSubscribed } from "src/hooks/usePairs";
import { useDefaultView } from "src/hooks/useSettings";
import { updateDefaultView } from "src/state/settings/actions";
import ElvatePair from "src/types/ElvatePair";
import { getTokenByAddress } from "src/utils/token";
import ViewComfy from "./ViewComfy";
import ViewList from "./ViewList";

const StyledViewList = styled(IconViewList)`
  height: 30px;
  width: 30px;
  cursor: pointer;
  transition: all 0.3s;
  margin: ${(props) => props.theme.spacing(0.5)};
  &:hover {
    color: ${(props) => props.theme.palette.primary.dark};
  }
`;

const StyledViewComfy = styled(IconViewComfy)`
  height: 30px;
  width: 30px;
  cursor: pointer;
  transition: all 0.3s;
  margin: ${(props) => props.theme.spacing(0.5)};
  &:hover {
    color: ${(props) => props.theme.palette.primary.dark};
  }
`;

export const PairsContent = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const defaultView = useDefaultView();
  const pairsSubscribed = usePairsSubscribed();
  const pairsNotSubscribed = usePairsNotSubscribed();
  const tokens = useAllTokens();

  const pairsSubscribedFiltered = useMemo(
    () =>
      pairsSubscribed
        ? pairsSubscribed
            .filter(
              (pair: ElvatePair) =>
                getTokenByAddress(pair.tokenIn, tokens)
                  .symbol.toUpperCase()
                  .includes(search.toUpperCase()) ||
                getTokenByAddress(pair.tokenOut, tokens)
                  .symbol.toUpperCase()
                  .includes(search.toUpperCase()) ||
                pair.tokenIn.toUpperCase().includes(search.toUpperCase()) ||
                pair.tokenOut.toUpperCase().includes(search.toUpperCase())
            )
            .sort((a: ElvatePair, b: ElvatePair) => a.id.sub(b.id).toNumber())
        : null,
    [pairsSubscribed, search, tokens]
  );

  const pairsNotSubscribedFiltered = useMemo(
    () =>
      pairsNotSubscribed
        ? pairsNotSubscribed
            .filter(
              (pair: ElvatePair) =>
                getTokenByAddress(pair.tokenIn, tokens)
                  .symbol.toUpperCase()
                  .includes(search.toUpperCase()) ||
                getTokenByAddress(pair.tokenOut, tokens)
                  .symbol.toUpperCase()
                  .includes(search.toUpperCase()) ||
                pair.tokenIn.toUpperCase().includes(search.toUpperCase()) ||
                pair.tokenOut.toUpperCase().includes(search.toUpperCase())
            )
            .sort((a: ElvatePair, b: ElvatePair) => a.id.sub(b.id).toNumber())
        : null,
    [pairsNotSubscribed, search, tokens]
  );

  return (
    <>
      <Grid container columns={{ xs: 2, md: 3 }} alignItems="center">
        <Grid item xs={2} md={1} padding={1} marginBottom={{ xs: 0, md: 2 }}>
          <InputSearch
            placeholder="Search by token, address..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} display="flex" padding={1}>
          <Spacing flex={1} />
          <StyledViewList
            color={defaultView === "list" ? "primary" : "disabled"}
            onClick={() => dispatch(updateDefaultView("list"))}
          />
          <StyledViewComfy
            color={defaultView === "comfy" ? "primary" : "disabled"}
            onClick={() => dispatch(updateDefaultView("comfy"))}
          />
        </Grid>
      </Grid>

      <H6 fontWeight={"bold"} margin={2} marginBottom={1} marginTop={0}>
        My Pairs
      </H6>

      {defaultView === "list" ? (
        <ViewList pairs={pairsSubscribedFiltered} />
      ) : (
        <ViewComfy pairs={pairsSubscribedFiltered} />
      )}

      <H6 fontWeight={"bold"} padding={2} paddingBottom={1}>
        Available Pairs
      </H6>

      {defaultView === "list" ? (
        <ViewList pairs={pairsNotSubscribedFiltered} />
      ) : (
        <ViewComfy pairs={pairsNotSubscribedFiltered} />
      )}
    </>
  );
};
