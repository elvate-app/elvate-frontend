import { Button, Grid, styled } from "@mui/material";
import { ethers } from "ethers";
import { useModal } from "mui-modal-provider";
import Card, { CardProps } from "src/components/Card";
import { TokenIcon } from "src/components/Icons/TokenIcons";
import { FlexCenter } from "src/components/Layout/Flex";
import { Spacing } from "src/components/Layout/Spacing";
import {
  DepositTokenModal,
  WithdrawTokenModal,
} from "src/components/Modal/ManageAssets";
import Skeleton from "src/components/Skeleton";
import { OpenInNewTooltip } from "src/components/Tooltip";
import { AnimatedNumber, Subtitle2, Subtitle3 } from "src/components/Typo";
import { Token } from "src/constants/tokens";
import { useExplorer } from "src/hooks/useExplorer";
import { useBalance, useDeposit } from "src/hooks/usePortfolio";

const TokenTextContainer = styled("div")`
  margin-left: ${(props) => props.theme.spacing(1)};
`;

const CustomButton = styled(Button)`
  margin-left: ${(props) => props.theme.spacing(1)};
  margin-right: ${(props) => props.theme.spacing(1)};

  @media (max-width: 900px) {
    margin: ${(props) => props.theme.spacing(1)};
    margin-top: ${(props) => props.theme.spacing(2)};
  }
`;

const IconContainer = styled(FlexCenter)`
  @media (max-width: 1200px) {
    margin-top: ${(props) => props.theme.spacing(1)};
    margin-bottom: ${(props) => props.theme.spacing(1)};
  }
`;

type TokenLineProps = {
  token: Token;
} & CardProps;

const TokenLine = ({ token, ...props }: TokenLineProps) => {
  const { showModal } = useModal();
  const explorer = useExplorer();
  const deposit = useDeposit(token.address);
  const balance = useBalance(token.address);

  return (
    <Card {...props} display={"flex"} padding={1} marginBottom={"2px"}>
      <Grid container columns={{ xs: 4, lg: 9 }}>
        <Grid item xs={4} lg={2} display="flex" alignItems="center">
          <IconContainer>
            <TokenIcon src={token.icon} />
            <TokenTextContainer>
              <Subtitle2>{token.symbol.toUpperCase()}</Subtitle2>
              <Subtitle3>{token.description}</Subtitle3>
            </TokenTextContainer>
          </IconContainer>
          <Spacing />
          <OpenInNewTooltip
            value={explorer + "address/" + token.address}
            iconProps={{
              sx: {
                marginRight: 1,
                display: { xs: "block", md: "none" },
              },
            }}
          />
        </Grid>

        <Grid
          item
          xs={2}
          md={2}
          alignSelf="center"
          marginBottom={{ xs: 1, lg: 0 }}
        >
          <TokenTextContainer>
            <Subtitle3>Balance</Subtitle3>
            <Subtitle2>
              {balance === undefined ? (
                <Skeleton />
              ) : (
                <AnimatedNumber value={balance} decimals={token.decimals} />
              )}
            </Subtitle2>
          </TokenTextContainer>
        </Grid>

        <Grid
          item
          xs={2}
          md={2}
          alignSelf="center"
          marginBottom={{ xs: 1, lg: 0 }}
        >
          <TokenTextContainer>
            <Subtitle3>Deposit</Subtitle3>
            <Subtitle2>
              {deposit === undefined ? (
                <Skeleton />
              ) : (
                <AnimatedNumber value={deposit} decimals={token.decimals} />
              )}
            </Subtitle2>
          </TokenTextContainer>
        </Grid>

        <Grid item xs={4} md={4} lg={3}>
          <FlexCenter sx={{ height: "100%", width: "100%" }}>
            <CustomButton
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => {
                const modal = showModal(WithdrawTokenModal, {
                  title: `Withdraw ${token.symbol}`,
                  max: ethers.utils.formatUnits(deposit ?? "0", token.decimals),
                  decimal: token.decimals,
                  address: token.address,
                  onCancel: () => {
                    modal.hide();
                  },
                });
              }}
            >
              Withdraw
            </CustomButton>
            <Spacing />
            <CustomButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                const modal = showModal(DepositTokenModal, {
                  title: `Deposit ${token.symbol}`,
                  max: ethers.utils.formatUnits(balance ?? "0", token.decimals),
                  decimal: token.decimals,
                  address: token.address,
                  onCancel: () => {
                    modal.hide();
                  },
                });
              }}
            >
              Deposit
            </CustomButton>
            <Spacing />
            <OpenInNewTooltip
              value={explorer + "address/" + token.address}
              iconProps={{
                sx: {
                  marginLeft: 1,
                  marginRight: 1,
                  marginTop: { xs: 1, md: 0 },
                  display: { xs: "none", md: "block" },
                },
              }}
            />
          </FlexCenter>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TokenLine;
