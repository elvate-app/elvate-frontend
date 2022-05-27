import ElvatePair from "src/types/ElvatePair";
import PairLine from "./PairLine";

type ViewListProps = {
  pairs: ElvatePair[] | null;
};

const ViewList = ({ pairs }: ViewListProps) => {
  if (!pairs) return <div>loading</div>;

  return (
    <>
      {pairs.map((pair: ElvatePair, index: number) => (
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
