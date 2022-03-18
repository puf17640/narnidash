import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Layout, AssetTable, EarningsChart, VolumeChart } from "../components";
import { loadAssetPrices, TokenPrices } from "../utils";

function Index() {
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({});

  useEffect(() => {
    console.log("loading token prices");
    loadAssetPrices()
      .then(setTokenPrices)
      .catch((e) =>
        toast.error(`An error occured while loading asset prices.`, {
          autoClose: 5000,
        })
      );
  }, []);

  return (
    <Layout>
      <div className="pt-16 pb-8">
        <AssetTable tokenPrices={tokenPrices} />
      </div>
      <div className="py-8">
        <VolumeChart tokenPrices={tokenPrices} />
      </div>
      {/* <div className="py-8">
        <EarningsChart />
      </div> */}
    </Layout>
  );
}

export default Index;
