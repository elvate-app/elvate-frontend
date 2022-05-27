import { Card, CardActions } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)`
  margin: 1em;
  padding: 1em;
  border-radius: 15px;
  max-width: 40em;
`;

export const StyledCardActionsRight = styled(CardActions)`
  padding: 0px;
  display: flex;
  justify-content: flex-end;
`;

export default StyledCard;
