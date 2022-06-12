export type PartialToken = {
  symbol: string;
  address: string;
  decimals: number;
};

export type Token = {
  description: string;
  coingeckoId: string;
  icon: string;
} & PartialToken;

export const unknown: Token = {
  symbol: "UNKNOWN",
  description: "unknown",
  coingeckoId: "",
  address: "",
  decimals: 0,
  icon: "https://img.icons8.com/flat-round/64/000000/question-mark.png",
};

export const bsct: Array<Token> = [
  {
    symbol: "WBNB",
    description: "Wrapped BNB",
    coingeckoId: "wbnb",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png?1600947313",
  },
  {
    symbol: "BUSD",
    description: "Binance USD",
    coingeckoId: "busd",
    address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/9576/small/BUSD.png?1568947766",
  },
  {
    symbol: "USDT",
    description: "Tether",
    coingeckoId: "tether",
    address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
  },
  {
    symbol: "DAI",
    description: "Dai",
    coingeckoId: "dai",
    address: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734",
  },
  {
    symbol: "ETH",
    description: "Ethereum",
    coingeckoId: "ethereum",
    address: "0x8BaBbB98678facC7342735486C851ABD7A0d17Ca",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  },
];

export const pmt: Array<Token> = [
  {
    symbol: "WMATIC",
    description: "Wrapped Matic",
    coingeckoId: "matic-network",
    address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
  },
  {
    symbol: "USDT",
    description: "Tether",
    coingeckoId: "tether",
    address: "0x3813e82e6f7098b9583FC0F33a962D02018B6803",
    decimals: 6,
    icon: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
  },
  {
    symbol: "DAI",
    description: "Dai",
    coingeckoId: "dai",
    address: "0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734",
  },
  {
    symbol: "USDC",
    description: "USDC",
    coingeckoId: "usd-coin",
    address: "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  },
  {
    symbol: "WETH",
    description: "Wrapped Ethereum",
    coingeckoId: "ethereum",
    address: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  },
  {
    symbol: "SAND",
    description: "The Sandbox",
    coingeckoId: "the-sandbox",
    address: "0xE03489D4E90b22c59c5e23d45DFd59Fc0dB8a025",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg?1597397942",
  },
];

export default pmt;
