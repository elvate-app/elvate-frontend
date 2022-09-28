import { SwapHoriz, SwapVert } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useState } from "react";
import LoadingButton from "src/components/Button/LoadingButton";
import Card, { InfoCard } from "src/components/Card";
import { FlexCenter, FlexColumn } from "src/components/Layout/Flex";
import { Token } from "src/constants/tokens";
import { useOwner, usePairCreationFees } from "src/hooks/useApplication";
import { useElvateCoreContract } from "src/hooks/useContract";
import { useDefaultToken } from "src/hooks/useToken";
import useCall from "src/hooks/useCall";
import SelectTokenButton from "./SelectTokenButton";

const Root = styled("div")`
  margin-top: ${(props) => props.theme.spacing(3)};
`;

const MainContainer = styled(FlexCenter)`
  margin: ${(props) => props.theme.spacing(0.5)};
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const TokensContainer = styled(FlexColumn)`
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.background.dark};
  border-radius: 10px;
`;

const ButtonContainer = styled(FlexCenter)`
  margin: ${(props) => props.theme.spacing(0.5)};
`;

const StyledSwapVert = styled(SwapVert)`
  font-size: ${(props) => props.theme.typography.h4};
  color: ${(props) => props.theme.palette.divider};
  margin: ${(props) => props.theme.spacing(2)};
  transition: all 0.3s;
  cursor: pointer;
  display: none;

  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;

const StyledSwapHoriz = styled(SwapHoriz)`
  font-size: ${(props) => props.theme.typography.h4};
  color: ${(props) => props.theme.palette.divider};
  margin: ${(props) => props.theme.spacing(2)};
  transition: all 0.3s;
  cursor: pointer;
  display: flex;

  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledLoadingButton = styled(LoadingButton)`
  margin-top: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const CreatePair = () => {
  const defaultToken1 = useDefaultToken(0);
  const defaultToken2 = useDefaultToken(1);
  const [tokenIn, setTokenIn] = useState<Token>(defaultToken1);
  const [tokenOut, setTokenOut] = useState<Token>(defaultToken2);
  const contract = useElvateCoreContract(true);
  const fees = usePairCreationFees();
  const owner = useOwner();
  const { account } = useWeb3React();
  const createPair = useCall(contract.createPair, "Create Pair");

  const handleSwap = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  };

  const handleClick = async () => {
    await createPair(tokenIn.address, tokenOut.address, {
      value: ethers.utils.parseEther(account === owner ? "0" : fees || "0"),
    });
  };

  return (
    <Root>
      <InfoCard width={{ xs: "18em", md: "auto" }}>
        You can create a pair with custom tokens that doesn't exist.
      </InfoCard>
      <Card padding={1}>
        <MainContainer>
          <TokensContainer>
            <SelectTokenButton
              token={tokenIn}
              onChange={setTokenIn}
              title="Select Input Token"
            />
          </TokensContainer>
          <StyledSwapVert onClick={handleSwap} />
          <StyledSwapHoriz onClick={handleSwap} />
          <TokensContainer>
            <SelectTokenButton
              token={tokenOut}
              onChange={setTokenOut}
              title="Select Output Token"
            />
          </TokensContainer>
        </MainContainer>
        <ButtonContainer>
          <StyledLoadingButton onClick={handleClick} fullWidth>
            Create Pair
          </StyledLoadingButton>
        </ButtonContainer>
      </Card>
    </Root>
  );
};

export default CreatePair;
