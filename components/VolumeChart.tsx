import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import {
  chainData,
  BridgeVolumeData,
  loadBridgeVolumeData,
  loadEarningsHistory,
  TokenPrices,
} from "../utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const VolumeChart = ({ tokenPrices }: { tokenPrices: TokenPrices }) => {
  const [currentNetworkIndex, setCurrentNetworkIndex] = useState(1);
  const [volumeDataLoading, setVolumeDataLoading] = useState(false);
  const [volumeData, setVolumeData] = useState<BridgeVolumeData[][]>([]);

  useEffect(() => {
    if (Object.keys(tokenPrices).length === 0) return;
    setVolumeDataLoading(true);
    console.log("loading volume data");
    loadBridgeVolumeData()
      .then((volumeData) => {
        setVolumeData(
          chainData.map((data) =>
            data.tokens.map(({ name, color }) => ({
              name,
              color,
              price: tokenPrices[name],
              days: volumeData[data.slug].map(({ days }) => `${days}d`),
              total: volumeData[data.slug].map((entry) =>
                isNaN(entry[name]) ? null : entry[name]
              ),
              avg: volumeData[data.slug].map((entry) =>
                isNaN(entry[name]) ? null : entry[name] / entry.days
              ),
              totalUsd: volumeData[data.slug].map((entry) =>
                isNaN(entry[name]) ? null : entry[name] * tokenPrices[name]
              ),
              avgUsd: volumeData[data.slug].map((entry) =>
                isNaN(entry[name])
                  ? null
                  : (entry[name] / entry.days) * tokenPrices[name]
              ),
            }))
          )
        );
        setVolumeDataLoading(false);
      })
      .catch((e) =>
        toast.error(`An error occured while loading bridge volume data.`, {
          autoClose: 5000,
        })
      );
  }, [tokenPrices]);

  return (
    <div className="container max-w-3xl mx-auto">
      <div
        className="mx-4 md:px-4 md:mx-0 rounded-2xl"
        style={{ boxShadow: "0 0.5rem 1rem 0 rgb(255 255 255 / 10%)" }}
      >
        <div className="pr-4 py-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden">
            <div className="flex justify-between items-center py-2 px-4 select-none">
              <ChevronLeftIcon
                className="h-8 w-8 text-[#ffffff4e] hover:text-umbria-200 transition-colors cursor-pointer"
                onClick={() => {
                  setCurrentNetworkIndex(
                    currentNetworkIndex - 1 < 0
                      ? chainData.length - 1
                      : currentNetworkIndex - 1
                  );
                }}
              />
              <div className="text-umbria-500 text-lg underline underline-offset-1 text-center">
                Average {chainData[currentNetworkIndex].network} Bridge Volume
              </div>
              <ChevronRightIcon
                className="h-8 w-8 text-[#ffffff4e] hover:text-umbria-200 transition-colors cursor-pointer"
                onClick={() => {
                  setCurrentNetworkIndex(
                    (currentNetworkIndex + 1) % chainData.length
                  );
                }}
              />
            </div>
            {typeof window !== "undefined" && (
              <Chart
                width={"100%"}
                height={"300px"}
                series={
                  volumeData[currentNetworkIndex]?.map(({ name, avgUsd }) => ({
                    name,
                    data: avgUsd,
                  })) ?? []
                }
                options={{
                  chart: {
                    id: "volume-chart",
                    height: "300px",
                    foreColor: "#e5e7eb",
                    zoom: { enabled: false },
                    background: "transparent",
                    fontFamily: "'DM Sans Regular', 'Arial', sans-serif",
                    animations: {
                      enabled: true,
                      easing: "easeinout",
                      animateGradually: {
                        enabled: true,
                        delay: 250,
                      },
                      dynamicAnimation: {
                        enabled: true,
                        speed: 250,
                      },
                    },
                  },
                  colors: volumeData[currentNetworkIndex]?.map(
                    ({ color }) => color
                  ),
                  dataLabels: {
                    enabled: false,
                  },
                  markers: {
                    size: 3,
                    strokeWidth: 1,
                    hover: {
                      size: 5,
                    },
                  },
                  stroke: {
                    curve: "smooth",
                    width: 2,
                  },
                  noData: {
                    text: volumeDataLoading ? "Loading..." : "No data.",
                    align: "center",
                    verticalAlign: "middle",
                    offsetY: -35,
                    style: {
                      fontSize: "1.125rem",
                    },
                  },
                  theme: { mode: "dark" },
                  grid: {
                    borderColor: "#ffffff1a",
                    strokeDashArray: 8,
                    xaxis: {
                      lines: {
                        show: true,
                      },
                    },
                    yaxis: {
                      lines: {
                        show: true,
                      },
                    },
                  },
                  xaxis: {
                    categories: ["30d", "14d", "7d", "1d"],
                  },
                  yaxis: {
                    labels: {
                      formatter: (value): any => {
                        return value
                          ? "$" + value.toLocaleString("en-US")
                          : null;
                      },
                    },
                  },
                }}
                type="line"
              ></Chart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeChart;
