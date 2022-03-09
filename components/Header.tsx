import Link from "next/link";
import Web3Button from "./Web3Button";

const Header = () => {
  return (
    <nav className="px-6 py-4 border-b md:px-12 lg:px-24 lg:py-8 border-b-umbriagrey-border bg-umbriagrey-background">
      <div className="flex flex-col items-center justify-between lg:max-w-7xl lg:mx-auto md:flex-row">
        <Link href="/" passHref>
          <h1 className="px-2 mb-6 text-3xl font-black text-center uppercase border-b-2 cursor-pointer md:text-xl md:mb-0 border-b-umbria-500 text-umbria-500 md:text-left">
            NarniDash
          </h1>
        </Link>
        <div className="flex gap-4">
          <Web3Button />
          <Link href="/" passHref>
            <div className="cursor-pointer block px-2.5 py-1.5 font-bold rounded text-umbriagrey-background bg-umbria-500 hover:bg-umbria-600 text-sm">
              Dashboard
            </div>
          </Link>
          <a
            target={"_blank"}
            className="block px-2.5 py-1.5 font-bold rounded text-umbriagrey-background bg-umbria-500 hover:bg-umbria-600 text-sm"
            href="https://bridge.umbria.network"
          >
            Bridge
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
