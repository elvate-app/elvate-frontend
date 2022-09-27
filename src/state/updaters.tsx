import ApplicationUpdater from "src/state/application/updater";
import PairsUpdater from "src/state/pairs/updater";
import PortfolioUpdater from "src/state/portfolio/updater";
import PriceUpdater from "src/state/prices/updater";
import SubscriptionsUpdater from "src/state/subscriptions/updater";
import TokensUpdater from "src/state/tokens/updater";
import TransactionsUpdater from "src/state/transactions/updater";

export const StateUpdater = () => (
  <>
    <ApplicationUpdater />
    <PairsUpdater />
    <PortfolioUpdater />
    <PriceUpdater />
    <SubscriptionsUpdater />
    <TokensUpdater />
    <TransactionsUpdater />
  </>
);
