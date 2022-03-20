import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../context";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/react/solid";
import {
  ChainData,
  TokenPrices,
  TokenData,
  shortenAddress,
  loadStakedAssets,
  chainData,
  tokenImages,
} from "../utils";
import { toast } from "react-toastify";

interface HideSectionsState extends Record<string, boolean> {
  ethereum: boolean;
  matic: boolean;
  binancesmartchain: boolean;
  avax: boolean;
  fantom: boolean;
}

interface TableData extends Record<string, any> {
  ethereum?: {
    ETH?: number;
    GHST?: number;
    MATIC?: number;
    UMBR?: number;
    USDT?: number;
    USDC?: number;
    WBTC?: number;
  };
  matic?: {
    ETH?: number;
    GHST?: number;
    MATIC?: number;
    UMBR?: number;
    USDT?: number;
    USDC?: number;
    WBTC?: number;
  };
  binancesmartchain?: {
    ETH?: number;
  };
  avax?: {
    ETH?: number;
  };
  fantom?: {
    ETH?: number;
  };
}

const tableHeaders: {
  name: string;
  sorter: "none" | "balance" | "value" | "totalvalue";
}[] = [
  { name: "Token", sorter: "none" },
  { name: "Balance", sorter: "balance" },
  { name: "Value ($)", sorter: "value" },
  { name: "Total ($)", sorter: "totalvalue" },
];

const AssetTable = ({ tokenPrices }: { tokenPrices: TokenPrices }) => {
  const { address } = useWeb3Context();
  const [tableData, setTableData] = useState<TableData>({});
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [hideSections, setHideSections] = useState<HideSectionsState>({
    ethereum: false,
    matic: false,
    binancesmartchain: false,
    avax: false,
    fantom: false,
  });
  const [sortAscending, setSortAscending] = useState(false);
  const [sorting, setSorting] = useState<
    "none" | "balance" | "value" | "totalvalue"
  >("none");

  const {
    query: { wallet },
  } = useRouter();

  useEffect(() => {
    if (Object.keys(tokenPrices).length === 0) return;
    setTableData({});
    if (!address && !wallet) return;
    setTableDataLoading(true);
    console.log(
      `reloading stats for ${shortenAddress(address ?? (wallet as string))}`
    );

    loadStakedAssets(address ?? (wallet as string))
      .then((data) => {
        setTableData(data);
        setTableDataLoading(false);
      })
      .catch((e) =>
        toast.error(`An error occured while loading staked assets.`, {
          autoClose: 5000,
        })
      );
  }, [address, wallet, tokenPrices]);

  const getSortedTokens = (tokens: TokenData[], slug: string) => {
    if (sorting === "none")
      return sortAscending ? [...tokens].reverse() : tokens;
    const sorted = [...tokens].sort(({ name: nameA }, { name: nameB }) => {
      if (tableDataLoading || tableData[slug] == null) return 0;

      switch (sorting) {
        case "balance":
          return tableData[slug][nameB] - tableData[slug][nameA];
        case "value":
          return tokenPrices[nameB] - tokenPrices[nameA];
        case "totalvalue":
          return (
            tableData[slug][nameB] * tokenPrices[nameB] -
            tableData[slug][nameA] * tokenPrices[nameA]
          );
      }
    });
    return sortAscending ? sorted.reverse() : sorted;
  };

  const renderTokenList = (tokens: TokenData[], slug: string) => {
    const sortedTokens = getSortedTokens(tokens, slug).filter(({ name }) => {
      return (
        tableData[slug] == null ||
        !hideZeroBalances ||
        parseInt(tableData[slug][name].replace(".", "")) > 0
      );
    });

    if (
      sortedTokens.length > 0 &&
      (tableDataLoading || tableData[slug] != null) &&
      (address ?? (wallet as string))
    ) {
      return sortedTokens.map(({ name, tokenAddress }) => (
        <tr
          className={`${
            hideSections[slug] || (!tableDataLoading && tableData[slug] == null)
              ? "hidden"
              : ""
          }`}
        >
          <td
            data-label={tableHeaders[0].name}
            className="px-4 py-4 border-b flex justify-center items-center md:table-cell md:before:hidden"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 order-2 md:order-1">
                <img
                  width={40}
                  height={40}
                  src={tokenImages[name]}
                  className="w-10 h-10 mx-auto text-white object-fit"
                />
              </div>
              <div className="mr-3 md:ml-3 order-1 md:order-2">
                <p className="text-gray-300 whitespace-no-wrap">{name}</p>
              </div>
            </div>
          </td>
          <td
            data-label={tableHeaders[1].name}
            className="px-4 py-4 text-sm border-b border-gray-200 flex justify-between items-center md:table-cell before:content-[attr(data-label)] before:w-24 before:text-gray-300 before:underline-offset-2 md:before:hidden"
          >
            <p className="text-gray-300 text-center whitespace-no-wrap">
              {tableData[slug] != null ? (
                tableData[slug][name]
              ) : tableDataLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                "0.00"
              )}
            </p>
          </td>
          <td
            data-label={tableHeaders[2].name}
            className="px-4 py-4 text-sm border-b border-gray-200 flex justify-between items-center md:table-cell before:content-[attr(data-label)] before:w-24 before:text-gray-300 before:underline-offset-2 md:before:hidden"
          >
            <p className="text-gray-300 text-center whitespace-no-wrap">
              {tokenPrices[name] ? (
                "$" +
                tokenPrices[name].toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })
              ) : (
                <div className="animate-pulse">Loading...</div>
              )}
            </p>
          </td>
          <td
            data-label={tableHeaders[3].name}
            className="px-4 py-4 text-sm border-b border-gray-200 flex justify-between items-center md:table-cell before:content-[attr(data-label)] before:w-24 before:text-gray-300 before:underline-offset-2 md:before:hidden"
          >
            <p className="text-gray-300 text-center whitespace-no-wrap">
              {tableData[slug] != null ? (
                "$" +
                (tableData[slug][name] * tokenPrices[name]).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              ) : tableDataLoading ? (
                <div className="animate-pulse">Loading...</div>
              ) : (
                "0.00"
              )}
            </p>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr className={`${hideSections[slug] ? "hidden" : ""}`}>
          <td
            colSpan={4}
            className="px-4 py-4 text-sm border-b border-gray-200"
          >
            <p className="text-lg text-center text-gray-300">
              No balances to show.
            </p>
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="container max-w-3xl mx-auto">
      <div
        className="mx-4 md:px-4 md:mx-0 rounded-2xl"
        style={{ boxShadow: "0 0.5rem 1rem 0 rgb(255 255 255 / 10%)" }}
      >
        <div className="px-4 py-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden">
            <table className="min-w-full leading-normal">
              <tbody>
                {chainData.map(({ network, slug, tokens }) => (
                  <>
                    <tr className="border-b-2 border-umbria-200 text-umbria-500">
                      <td colSpan={4}>
                        <div className="flex flex-col items-center select-none md:flex-row">
                          <div className="flex flex-1 items-center order-2 gap-2 pb-4 md:order-1 md:pb-0">
                            <div className="inline-block text-base text-umbria-500 whitespace-nowrap">
                              Hide Zero Balances
                            </div>
                            <div
                              className="relative inline-block align-middle select-none w-9"
                              onClick={() =>
                                setHideZeroBalances(!hideZeroBalances)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={hideZeroBalances}
                                readOnly
                                className="checked:bg-umbria-300 outline-none focus:outline-none right-2/4 checked:right-0.5 duration-200 ease-in absolute block w-4 h-4 top-0.5 rounded-full bg-umbriagrey-border border-umbriagrey-background appearance-none cursor-pointer"
                              />
                              <label className="block h-5 overflow-hidden border-2 rounded-full cursor-pointer bg-umbriagrey-background border-umbria-500"></label>
                            </div>
                          </div>
                          <div
                            className="flex flex-1 justify-center box-border order-1 pb-4 pt-4 text-lg underline cursor-pointer md:order-2 underline-offset-1"
                            onClick={() =>
                              setHideSections({
                                ...hideSections,
                                [slug]: !hideSections[slug],
                              })
                            }
                          >
                            <div className="flex items-center gap-2">
                              <span className="whitespace-nowrap">
                                {network} Bridge
                              </span>
                              {hideSections[slug] ? (
                                <EyeOffIcon className="w-5 h-5 transition-color text-umbria-500" />
                              ) : (
                                <EyeIcon className="w-5 h-5 transition-color text-umbria-500" />
                              )}
                            </div>
                          </div>
                          <div className="flex flex-1 order-3 justify-end pb-4 md:pb-0">
                            {tableDataLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              "$" +
                              (tableData[slug] != null
                                ? tokens
                                    .reduce(
                                      (sum, { name }) =>
                                        sum +
                                        tokenPrices[name] *
                                          tableData[slug][name],
                                      0
                                    )
                                    .toLocaleString("en-US", {
                                      maximumFractionDigits: 2,
                                      minimumFractionDigits: 2,
                                    })
                                : "0.00")
                            )}{" "}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr
                      className={`hidden ${
                        hideSections[slug] ? "" : "md:table-row"
                      }`}
                    >
                      {tableHeaders.map(
                        ({
                          name,
                          sorter,
                        }: {
                          name: string;
                          sorter: "none" | "balance" | "value" | "totalvalue";
                        }) => (
                          <th
                            onClick={() => {
                              if (sorter === sorting) {
                                setSortAscending(!sortAscending);
                              } else {
                                setSorting(sorter);
                                setSortAscending(false);
                              }
                            }}
                            scope="col"
                            className="px-4 py-3 text-base text-left text-gray-200 uppercase border-b border-gray-200 cursor-pointer select-none whitespace-nowrap"
                          >
                            <div className="flex justify-center items-center gap-1">
                              <span key="name">{name}</span>
                              {sortAscending && sorter === sorting ? (
                                <ArrowDownIcon
                                  className={`w-4 h-4 transition-colors ${
                                    sorter === sorting
                                      ? "text-umbria-500"
                                      : "text-gray-500"
                                  }`}
                                />
                              ) : (
                                <ArrowUpIcon
                                  className={`w-4 h-4 transition colors ${
                                    sorter === sorting
                                      ? "text-umbria-500"
                                      : "text-gray-500"
                                  }`}
                                />
                              )}
                            </div>
                          </th>
                        )
                      )}
                    </tr>
                    {renderTokenList(tokens, slug)}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
