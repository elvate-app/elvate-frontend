import { ElvatePair } from "src/types/v1/ElvateCore";
import PairLine from "./PairLine";

type ViewListProps = {
  pairs: ElvatePair.PairStructOutput[] | null;
};

const ViewList = ({ pairs }: ViewListProps) => {
  if (!pairs) return <div>loading</div>;

  return (
    <>
      {pairs.map((pair: ElvatePair.PairStructOutput, index: number) => (
        <PairLine
          pair={pair}
          key={pair.id.toString()}
          sx={{
            borderRadius:
              index === 0
                ? "5px 5px 0px 0px"
                : index === pairs.length - 1
                ? "0px 0px 5px 5px"
                : "0px",
          }}
        />
      ))}
    </>
  );
};

export default ViewList;
