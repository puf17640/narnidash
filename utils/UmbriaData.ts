export type TokenData = { name: string; tokenAddress: string; color: string };

export type ChainData = {
  network: string;
  slug: string;
  tokens: TokenData[];
};

export type BridgeVolumeData = {
  name: string;
  color: string;
  price: number;
  days: string[];
  total: (number | null)[];
  avg: (number | null)[];
  totalUsd: (number | null)[];
  avgUsd: (number | null)[];
};

export type EarningsHistoryData = {
  name: string;
  color: string;
  amount: number[];
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

export type VolumeMonthData = Record<string, string | number> & {
  label: string;
  ETH?: number;
  GHST?: number;
  MATIC?: number;
  UMBR?: number;
  USDT?: number;
  USDC?: number;
  WBTC?: number;
};

export type TvlData = Record<string, Record<string, number | undefined>>;

export const chainData: ChainData[] = [
  {
    network: "Ethereum",
    slug: "ethereum",
    tokens: [
      { name: "ETH", tokenAddress: "0xETH", color: "#aaa" },
      {
        name: "GHST",
        tokenAddress: "0x3F382DbD960E3a9bbCeaE22651E88158d2791550",
        color: "#E648EB",
      },
      {
        name: "MATIC",
        tokenAddress: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
        color: "#8247E5",
      },
      {
        name: "UMBR",
        tokenAddress: "0xa4bbe66f151b22b167127c770016b15ff97dd35c",
        color: "#9370DB",
      },
      {
        name: "USDT",
        tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        color: "#477666",
      },
      {
        name: "USDC",
        tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        color: "#3E72C4",
      },
      {
        name: "WBTC",
        tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        color: "#E39652",
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
        color: "#aaa",
      },
      {
        name: "GHST",
        tokenAddress: "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
        color: "#E648EB",
      },
      { name: "MATIC", tokenAddress: "0xMATIC", color: "#8247E5" },
      {
        name: "UMBR",
        tokenAddress: "0x2e4b0fb46a46c90cb410fe676f24e466753b469f",
        color: "#9370DB",
      },
      {
        name: "USDT",
        tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        color: "#477666",
      },
      {
        name: "USDC",
        tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        color: "#3E72C4",
      },
      {
        name: "WBTC",
        tokenAddress: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
        color: "#E39652",
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
        color: "#777777",
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
        color: "#777777",
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
        color: "#777777",
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

export function getFormattedAmount(amountString: string) {
  const tempBalance = amountString.padStart(19, "0").split("").reverse();
  return [...tempBalance.splice(0, 18), ".", ...tempBalance].reverse().join("");
}

export async function loadTVLData() {
  const data: TvlData = {
    ethereum: {},
    matic: {},
  };

  for (const [slug] of Object.entries(data)) {
    for (const { name, tokenAddress } of (
      chainData.find((chain) => chain.slug === slug) as ChainData
    ).tokens) {
      const json = await fetch(
        `https://bridge-api.umbria.network/api/bridge/getAvailableLiquidity/?network=${slug}&currency=${tokenAddress}`
      ).then((res) => res.json());
      data[slug][name] = parseInt(json.totalLiquidity) / 1e18;
    }
  }
  return data;
}

export async function loadBridgeVolumeData() {
  const getToday = () => Math.floor(+new Date() / 1e3);
  const daySeconds = 60 * 60 * 24;

  let data: Record<string, Record<string, number>[]> = {
    ethereum: [],
    matic: [],
    binancesmartchain: [],
    avax: [],
    fantom: [],
  };
  const promises = [];
  const info: { days: number; slug: string }[] = [];
  for (const { slug } of chainData) {
    for (const days of [30, 14, 7, 1]) {
      info.push({ days, slug });
      promises.push(
        fetch(
          `https://bridge-api.umbria.network/api/bridge/getAvgBridgeVolumeAll/?network=${slug}&timeSince=${
            getToday() - days * daySeconds
          }`
        ).then((res) => {
          if (!res.ok) throw Error(res.statusText);
          return res.json();
        })
      );
    }
  }

  const resolutions: {
    error: string;
    result: Record<string, string>;
  }[] = await Promise.all(promises);

  resolutions.map((res, i) => {
    data[info[i].slug].push({
      days: info[i].days,
      ETH: (+res.result["ether"] || 0) / 1e18,
      GHST: (+res.result["ghost"] || 0) / 1e18,
      MATIC: (+res.result["MATIC"] || 0) / 1e18,
      UMBR: (+res.result["umbria"] || 0) / 1e18,
      USDT: (+res.result["tether"] || 0) / 1e18,
      USDC: (+res.result["usdc"] || 0) / 1e18,
      WBTC: (+res.result["wbtc"] || 0) / 1e18,
    });
  });
  return data;
}

export async function loadEarningsHistory(
  userAddress: string,
  networkIndex: number
) {
  let data: VolumeMonthData[] = [
    { label: "Jan" },
    { label: "Feb" },
    { label: "Mar" },
    { label: "Apr" },
    { label: "May" },
    { label: "Jun" },
    { label: "Jul" },
    { label: "Aug" },
    { label: "Sep" },
    { label: "Oct" },
    { label: "Nov" },
    { label: "Dec" },
  ];
  for (const { name, tokenAddress } of chainData[networkIndex].tokens) {
    const apiRes = await fetch(
      `https://bridge-api.umbria.network/api/pool/getEarningsHistoryByLiquidityAddress/?&userAddress=${userAddress}&tokenAddress=${tokenAddress}&network=${chainData[networkIndex].slug}&liquidityAddress=0x18C6f86ee9f099DeFe10b4201e48B2eF53BeAbd0`
    );

    if (!apiRes.ok) throw Error(apiRes.statusText);
    const res: Record<string, string>[] = await apiRes.json();

    const json = res.map((earning) => {
      const date = new Date(earning.time + " UTC");
      return {
        amount:
          date.getUTCFullYear() === new Date().getUTCFullYear()
            ? parseInt(earning.amount)
            : 0,
        month: date.getUTCMonth(),
      };
    });

    const newData = json.reduce(
      (sumByMonth: any, cur) => {
        if (sumByMonth[cur.month][name])
          sumByMonth[cur.month][name] += cur.amount;
        else sumByMonth[cur.month][name] = cur.amount;
        return sumByMonth;
      },
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    );
    data = data.map((entry, index) => ({
      ...entry,
      [name]: (newData[index][name] ?? 0) / 1e18,
    }));
  }
  return data;
}

export async function loadAssetPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Caavegotchi%2Cmatic-network%2Cumbra-network%2Ctether%2Cusd-coin%2Cwrapped-bitcoin&vs_currencies=usd"
  ).then((res) => res.json());

  return {
    ETH: res["ethereum"].usd,
    GHST: res["aavegotchi"].usd,
    MATIC: res["matic-network"].usd,
    UMBR: res["umbra-network"].usd,
    USDT: res["tether"].usd,
    USDC: res["usd-coin"].usd,
    WBTC: res["wrapped-bitcoin"].usd,
  };
  // return {
  //   ETH: Math.random() * 10000,
  //   GHST: Math.random() * 30,
  //   MATIC: Math.random() * 10,
  //   UMBR: Math.random() * 50,
  //   USDT: 1 + (Math.random() - 0.5) / 100,
  //   USDC: 1 + (Math.random() - 0.5) / 100,
  //   WBTC: Math.random() * 100000,
  // };
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
        data[slug][name] = getFormattedAmount(`${json.amount}`);
      }
      // data[slug][name] =
      //   Math.random() > 0.25 ? (Math.random() * 10000).toString() : "0.00";
    }
  }
  return data;
}
