import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  chainData,
  loadBridgeVolumeData,
  loadEarningsHistory,
  TokenPrices,
} from "../utils";

const initialVolumeData = [
  { label: "30d" },
  { label: "14d" },
  { label: "7d" },
  { label: "1d" },
];

const VolumeChart = ({ tokenPrices }: { tokenPrices: TokenPrices }) => {
  const [currentNetworkIndex, setCurrentNetworkIndex] = useState(1);
  const [volumeDataLoading, setVolumeDataLoading] = useState(false);
  const [volumeData, setVolumeData] = useState(initialVolumeData);
  useEffect(() => {
    if (!tokenPrices) return;
    setVolumeDataLoading(true);
    loadBridgeVolumeData(currentNetworkIndex, tokenPrices)
      .then((volumeData) => {
        console.log(volumeData);
        setVolumeData(volumeData);
        setVolumeDataLoading(false);
      })
      .catch((e) =>
        toast.error(`An error occured while loading bridge volume data.`, {
          autoClose: 5000,
        })
      );
  }, [currentNetworkIndex, tokenPrices]);

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
                  setVolumeData(initialVolumeData);
                  setCurrentNetworkIndex(
                    currentNetworkIndex - 1 < 0
                      ? chainData.length - 1
                      : currentNetworkIndex - 1
                  );
                }}
              />
              <div className="text-umbria-500 text-lg underline underline-offset-1">
                {chainData[currentNetworkIndex].network} Bridge Volume
              </div>
              <ChevronRightIcon
                className="h-8 w-8 text-[#ffffff4e] hover:text-umbria-200 transition-colors cursor-pointer"
                onClick={() => {
                  setVolumeData(initialVolumeData);
                  setCurrentNetworkIndex(
                    (currentNetworkIndex + 1) % chainData.length
                  );
                }}
              />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  volumeDataLoading || volumeData.length === 0
                    ? initialVolumeData
                    : volumeData
                }
                margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
              >
                <Tooltip />
                <XAxis dataKey="label" stroke="#9370DB" />
                <YAxis yAxisId={"avg"} stroke="#9370DB" />
                {/* <YAxis yAxisId={"total"} stroke="#9370DB" orientation="right" /> */}
                <CartesianGrid stroke="#ffffff1a" strokeDasharray="8 8" />
                <Legend />
                {chainData[currentNetworkIndex].tokens.map(
                  ({ name, color }) => (
                    <>
                      <Line
                        yAxisId={"avg"}
                        type="monotone"
                        dataKey={name}
                        stroke={color}
                        width={2}
                      />
                      {/* <Line
                        yAxisId={"total"}
                        key={`${name} (total)`}
                        type="monotone"
                        dataKey={`${name}Total`}
                        stroke={color}
                        width={2}
                      /> */}
                    </>
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeChart;
