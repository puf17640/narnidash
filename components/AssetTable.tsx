import { useEffect } from "react";
import { useWeb3Context } from "../context";

const tableHeaders = ["Pool", "Balance", "Value ($)", "Total Value ($)"];

const AssetTable = () => {
  const { address } = useWeb3Context();

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      scope="col"
                      className="px-5 py-3 text-base text-left text-gray-200 uppercase border-b border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/svg/eth.svg"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">ETH</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      1.020934385536581118
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">$2570.2</p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $2624.0055577061207
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/svg/ghst.svg"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">GHST</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      102.232495150097852455
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">$1.92</p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $196.2863906882234
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/icon/umbricon.png"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">UMBR</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      2334.242153949515829145
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">$3.16</p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $7,376.205206480521539491
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/svg/usdt.svg"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">USDT</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      232.537282430052434501
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">$0.99977</p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $232.483798855124218134
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/svg/usdc.svg"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">USDC</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      142.590345823045123001
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $0.998605
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $142.391432290659424501
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/svg/polygon.svg"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">MATIC</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      675.234978700783523164
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">$1.45</p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $979.090719116135240245
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 hidden md:block">
                        <a href="#" class="block relative">
                          <img
                            width={40}
                            height={40}
                            src="https://bridge.umbria.network/assets/images/svg/wbtc.svg"
                            class="mx-auto object-fit h-10 w-10 text-white"
                          />
                        </a>
                      </div>
                      <div class="md:ml-3">
                        <p class="text-gray-300 whitespace-no-wrap">WBTC</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      0.242214535001232435
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">$38,631</p>
                  </td>
                  <td className="px-5 py-5 text-sm border-b border-gray-200">
                    <p className="text-gray-300 whitespace-no-wrap">
                      $9,356.989701632635348021
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
