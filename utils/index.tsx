export function shortenAddress(address: string) {
  return [address.substring(0, 5), "...", address.substring(38)].join("");
}

export type { Web3ProviderState, Web3Action } from "./Web3Provider";
export { web3InitialState, web3Reducer } from "./Web3Provider";
