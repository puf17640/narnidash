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
import { useWeb3Context } from "../context";
import { chainData, loadEarningsHistory } from "../utils";

const initialEarningsData = [
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

const EarningsChart = () => {
  const { address } = useWeb3Context();
  const [currentNetworkIndex, setCurrentNetworkIndex] = useState(1);
  const [earningsDataLoading, setEarningsDataLoading] = useState(false);
  const [earningsData, setEarningsData] = useState(initialEarningsData);

  const {
    query: { wallet },
  } = useRouter();

  useEffect(() => {
    if (!address && !wallet) return;
    setEarningsDataLoading(true);
    loadEarningsHistory(address ?? wallet, currentNetworkIndex)
      .then((earnings) => {
        const indices = [
          earnings.findIndex(
            ({ label, ...month }) =>
              Object.values(month).reduce((a, b) => a + parseFloat(b), 0) > 0
          ),
          earnings.length -
            [...earnings]
              .reverse()
              .findIndex(
                ({ label, ...month }) =>
                  Object.values(month).reduce((a, b) => a + parseFloat(b), 0) >
                  0
              ),
        ];
        setEarningsData(
          earnings.splice(
            Math.max(indices[0] - 1, 0),
            Math.min(indices[1] - indices[0] + 2, earnings.length)
          )
        );
        setEarningsDataLoading(false);
      })
      .catch((e) =>
        toast.error(`An error occured while loading earnings history.`, {
          autoClose: 5000,
        })
      );
  }, [currentNetworkIndex, address, wallet]);

  // console.log(currentNetworkIndex, earningsData);

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
                  setEarningsData(initialEarningsData);
                  setCurrentNetworkIndex(
                    currentNetworkIndex - 1 < 0
                      ? chainData.length - 1
                      : currentNetworkIndex - 1
                  );
                }}
              />
              <div className="text-umbria-500 text-lg underline underline-offset-1">
                {chainData[currentNetworkIndex].network} Earnings History
              </div>
              <ChevronRightIcon
                className="h-8 w-8 text-[#ffffff4e] hover:text-umbria-200 transition-colors cursor-pointer"
                onClick={() => {
                  setEarningsData(initialEarningsData);
                  setCurrentNetworkIndex(
                    (currentNetworkIndex + 1) % chainData.length
                  );
                }}
              />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  earningsDataLoading || earningsData.length === 0
                    ? initialEarningsData
                    : earningsData
                }
                margin={{ top: 15, right: 15, bottom: 15, left: 0 }}
              >
                <Tooltip />
                <XAxis dataKey="label" stroke="#9370DB" />
                <YAxis stroke="#9370DB" />
                <CartesianGrid stroke="#ffffff1a" strokeDasharray="8 8" />
                <Legend />
                {chainData[currentNetworkIndex].tokens.map(
                  ({ name, color }) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={color}
                      width={2}
                    />
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

export default EarningsChart;
