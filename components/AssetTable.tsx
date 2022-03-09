import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../context";
import {
  ChainData,
  TokenPrices,
  shortenAddress,
  loadStakedAssets,
  loadAssetPrices,
  chainData,
  tokenImages,
} from "../utils";

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

const tableHeaders = ["Pool", "Balance", "Value ($)", "Total Value ($)"];

const AssetTable = () => {
  const { address } = useWeb3Context();
  const [tableData, setTableData] = useState<TableData>({});
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({});
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const {
    query: { wallet },
  } = useRouter();

  useEffect(() => {
    console.log("loading token prices");
    loadAssetPrices().then(setTokenPrices);
  }, []);

  useEffect(() => {
    setTableData({});
    if (!address && !wallet) return;
    setTableDataLoading(true);
    console.log(
      `reloading stats for ${shortenAddress(address ?? (wallet as string))}`
    );

    loadStakedAssets(address ?? (wallet as string)).then((data) => {
      setTableData(data);
      setTableDataLoading(false);
    });
  }, [address, wallet]);

  return (
    <div
      className="container max-w-3xl px-4 mx-auto my-8 rounded-2xl sm:px-8"
      style={{ boxShadow: "0 0.5rem 1rem 0 rgb(255 255 255 / 10%)" }}
    >
      <div className="px-4 pb-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden">
          <table className="min-w-full leading-normal">
            <tbody>
              {chainData.map(({ network, slug, tokens }) => (
                <>
                  <tr className="border-b-2 border-umbria-200 text-umbria-500">
                    <td
                      colSpan={4}
                      className="box-border p-4 text-lg text-center"
                    >
                      {network} Bridge
                    </td>
                  </tr>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        scope="col"
                        className="px-4 py-3 text-base text-left text-gray-200 uppercase border-b border-gray-200 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                  {tokens.map(({ name, tokenAddress }) => (
                    <tr>
                      <td className="px-4 py-4 text-sm border-b border-gray-200">
                        <div className="md:flex md:items-center">
                          <div className="flex-shrink-0">
                            <img
                              width={40}
                              height={40}
                              src={tokenImages[name]}
                              className="w-10 h-10 mx-auto text-white object-fit"
                            />
                          </div>
                          <div className="hidden md:ml-3 md:block">
                            <p className="text-gray-300 whitespace-no-wrap">
                              {name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm border-b border-gray-200">
                        <p className="text-gray-300 whitespace-no-wrap">
                          {tableData[slug] != null ? (
                            tableData[slug][name]
                          ) : tableDataLoading ? (
                            <div className="animate-pulse">Loading...</div>
                          ) : (
                            "0.00"
                          )}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm border-b border-gray-200">
                        <p className="text-gray-300 whitespace-no-wrap">
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
                      <td className="px-4 py-4 text-sm border-b border-gray-200">
                        <p className="text-gray-300 whitespace-no-wrap">
                          {tableData[slug] != null ? (
                            "$" +
                            (
                              tableData[slug][name] * tokenPrices[name]
                            ).toLocaleString("en-US", {
                              maximumFractionDigits: 4,
                            })
                          ) : tableDataLoading ? (
                            <div className="animate-pulse">Loading...</div>
                          ) : (
                            "0.00"
                          )}
                        </p>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
