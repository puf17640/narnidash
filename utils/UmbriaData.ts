export type ChainData = {
  network: string;
  slug: string;
  tokens: { name: string; tokenAddress: string }[];
};

export type TokenPrices = Record<string, number> & {
  ETH?: number;
  GHST?: number;
  MATIC?: number;
  UMBR?: number;
  USDT?: number;
  USDC?: number;
  WBTC?: number;
};

export const chainData: ChainData[] = [
  {
    network: "Ethereum",
    slug: "ethereum",
    tokens: [
      { name: "ETH", tokenAddress: "0xETH" },
      {
        name: "GHST",
        tokenAddress: "0x3F382DbD960E3a9bbCeaE22651E88158d2791550",
      },
      {
        name: "MATIC",
        tokenAddress: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      },
      {
        name: "UMBR",
        tokenAddress: "0xa4bbe66f151b22b167127c770016b15ff97dd35c",
      },
      {
        name: "USDT",
        tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      },
      {
        name: "USDC",
        tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
      {
        name: "WBTC",
        tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      },
    ],
  },
  {
    network: "Polygon",
    slug: "matic",
    tokens: [
      {
        name: "ETH",
        tokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      },
      {
        name: "GHST",
        tokenAddress: "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
      },
      { name: "MATIC", tokenAddress: "0xMATIC" },
      {
        name: "UMBR",
        tokenAddress: "0x2e4b0fb46a46c90cb410fe676f24e466753b469f",
      },
      {
        name: "USDT",
        tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      },
      {
        name: "USDC",
        tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      },
      {
        name: "WBTC",
        tokenAddress: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
      },
    ],
  },
  {
    network: "Binance Smart Chain",
    slug: "binancesmartchain",
    tokens: [
      {
        name: "ETH",
        tokenAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      },
    ],
  },
  {
    network: "Avalanche",
    slug: "avax",
    tokens: [
      {
        name: "ETH",
        tokenAddress: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
      },
    ],
  },
  {
    network: "Fantom",
    slug: "fantom",
    tokens: [
      {
        name: "ETH",
        tokenAddress: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
      },
    ],
  },
];

export const tokenImages: Record<string, string> = {
  ETH: "/images/eth.svg",
  GHST: "/images/ghst.svg",
  MATIC: "/images/polygon.svg",
  UMBR: "/images/umbricon.webp",
  USDT: "/images/usdt.svg",
  USDC: "/images/usdc.svg",
  WBTC: "/images/wbtc.svg",
};

export async function loadAssetPrices() {
  const json = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Caavegotchi%2Cmatic-network%2Cumbra-network%2Ctether%2Cusd-coin%2Cwrapped-bitcoin&vs_currencies=usd"
  ).then((res) => res.json());
  return {
    ETH: json["ethereum"].usd,
    GHST: json["aavegotchi"].usd,
    MATIC: json["matic-network"].usd,
    UMBR: json["umbra-network"].usd,
    USDT: json["tether"].usd,
    USDC: json["usd-coin"].usd,
    WBTC: json["wrapped-bitcoin"].usd,
  };
}

export async function loadStakedAssets(address: string) {
  const data: Record<string, any> = {
    ethereum: {},
    matic: {},
    binancesmartchain: {},
    avax: {},
    fantom: {},
  };

  for (const { network, slug, tokens } of chainData) {
    for (const { name, tokenAddress } of tokens) {
      const json = await fetch(
        `https://bridge-api.umbria.network/api/pool/getStaked/?tokenAddress=${tokenAddress}&userAddress=${address}&network=${slug}`
      ).then((res) => res.json());
      if (json.error) {
        console.error(json.error);
      }
      if (json.amount == 0) {
        data[slug][name] = "0.00";
      } else {
        const tempBalance = `${json.amount}`
          .padStart(19, "0")
          .split("")
          .reverse();
        data[slug][name] = [...tempBalance.splice(0, 18), ".", ...tempBalance]
          .reverse()
          .join("");
      }
    }
  }
  return data;
}
