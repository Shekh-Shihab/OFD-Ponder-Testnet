import { createConfig } from "@ponder/core";
import { http, parseAbiItem } from "viem";

import { bscTestnet } from "viem/chains";

import { Equity } from "./abis/Equity";
import { MintingHub } from "./abis/MintingHub";
import { OracleFreeDollar } from "./abis/OracleFreeDollar";
import { Position } from "./abis/Position";

const chain = bscTestnet;
const transport = http(
  (chain.id as number) === 97
    ? process.env.PONDER_RPC_URL_1
    : chain.rpcUrls.default.http[0]
);

console.log(transport);
const openPositionEvent = parseAbiItem(
  "event PositionOpened(address indexed owner,address indexed position,address ofd,address collateral,uint256 price)"
);

export default createConfig({
  networks: {
    bscTestnet: {
      chainId: 97,
      transport,
    },
  },
  contracts: {
    OracleFreeDollar: {
      network: "bscTestnet",
      abi: OracleFreeDollar,
      address: "0x09037FAA3b14C5894994471aD65cCd98622DDD0e",
      startBlock: 41784556,
    },
    Equity: {
      network: "bscTestnet",
      abi: Equity,
      address: "0xd8d015A2121697E8Cd226225369340d133927DB9",
      startBlock: 41784580,
    },
    MintingHub: {
      network: "bscTestnet",
      abi: MintingHub,
      address: "0x7830a287878824Fed2De9E35794babd78302B422",
      startBlock: 41784561,
    },
    Position: {
      network: "bscTestnet",
      abi: Position,
      factory: {
        address: "0x7830a287878824Fed2De9E35794babd78302B422",
        event: openPositionEvent,
        parameter: "position",
      },
      startBlock: 41784561,
    },
  },
});
