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
      address: "0x9c06B95640455ae3DEc830A0a05370d4Cd6fFef8",
      startBlock: 41987493,
    },
    Equity: {
      network: "bscTestnet",
      abi: Equity,
      address: "0x47DeAd2B6150eCEbFD0D5fd2F884a02Ee3966886",
      startBlock: 41762708,
    },
    MintingHub: {
      network: "bscTestnet",
      abi: MintingHub,
      address: "0xF92B19b4D4dF3C25F5a238034eF4A0B3c05556a6",
      startBlock: 41960602,
    },
    Position: {
      network: "bscTestnet",
      abi: Position,
      factory: {
        address: "0xF92B19b4D4dF3C25F5a238034eF4A0B3c05556a6",
        event: openPositionEvent,
        parameter: "position",
      },
      startBlock: 41960602,
    },
  },
});
