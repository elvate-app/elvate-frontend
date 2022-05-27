import { Paper, styled } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { CopyTooltip, OpenInNewTooltip } from "src/components/Tooltip";
import { Subtitle2 } from "src/components/Typo";
import { useExplorer } from "src/hooks/useExplorer";

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.theme.palette.divider};
  color: ${(props) => props.theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const StyledBox = styled(Subtitle2)`
  flex: 1;
  text-align: center;
`;

const PaperAccount = () => {
  const { account } = useWeb3React();
  const explorer = useExplorer();
  const smallAddress =
    account?.substring(0, 6) +
    "..." +
    account?.substring(account.length - 6, account.length);

  return (
    <StyledPaper>
      <StyledBox>{smallAddress}</StyledBox>
      <CopyTooltip
        iconProps={{ sx: { marginLeft: 1 } }}
        value={account ?? ""}
      />
      <OpenInNewTooltip
        iconProps={{ sx: { marginLeft: 1 } }}
        value={explorer + "address/" + account}
      />
    </StyledPaper>
  );
};

export default PaperAccount;
