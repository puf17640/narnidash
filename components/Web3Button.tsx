import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/solid";
import { shortenAddress } from "../utils";
import { useWeb3Context } from "../context";

interface ConnectProps {
  connect: () => Promise<void>;
}

const ConnectButton = ({ connect }: ConnectProps) => {
  return (
    <div
      onClick={connect}
      className="cursor-pointer text-sm block px-2.5 py-1.5 font-bold rounded text-umbriagrey-background bg-umbria-500 hover:bg-umbria-600"
    >
      <div className="flex gap-2">
        <span>Connect</span>
        <LockClosedIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

interface DisconnectProps {
  disconnect: () => Promise<void>;
  address?: string;
}

const DisconnectButton = ({ disconnect, address }: DisconnectProps) => {
  return (
    <div
      onClick={disconnect}
      className="cursor-pointer text-sm block px-2.5 py-1.5 font-bold rounded text-umbriagrey-background bg-umbria-500 hover:bg-umbria-600"
    >
      <div className="flex gap-2">
        <span>{shortenAddress(address)}</span>
        <LockOpenIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

const Web3Button = () => {
  const { web3Provider, connect, disconnect, address } = useWeb3Context();

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} address={address} />
  ) : (
    <ConnectButton connect={connect} />
  );
};

export default Web3Button;
