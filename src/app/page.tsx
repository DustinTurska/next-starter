'use client';

import Image from "next/image";
import { ConnectButton, ClaimButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { optimism } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useState } from 'react';
import { Confetti } from "./Confetti";
import { MediaRenderer } from "thirdweb/react";

const wallets = [
  createWallet("io.metamask"),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [openSea, setOpenSea] = useState("op-superchain-accelerator")

  const handleTransactionSent = (transactionResult: { readonly transactionHash: `0x${string}`; client: any; chain: any; maxBlocksWaitTime?: number }) => {
    const { transactionHash } = transactionResult;
    setShowConfetti(true);
    setTransactionHash(transactionHash);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex flex-col md:flex-row justify-between items-center mb-20">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <MediaRenderer
              src="ipfs://QmZ1512rWfso1iUh2UkK5LUjw73zCHsxc5RXnsh6NfJo63/TreasureChests.png"
              alt="Example NFT image"
              width="100%"
              height="auto"
              client={client}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="mb-10">
              <ConnectButton
                client={client}
                accountAbstraction={{
                  chain: optimism,
                  factoryAddress: "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00",
                  gasless: true,
                }}
              />
            </div>
            <div>
              <ClaimButton
                contractAddress="0x2992e480001AfA6097a4BC7bB8c02d7df819d4cE"
                chain={optimism}
                client={client}
                onTransactionSent={handleTransactionSent}
                claimParams={{
                  type: "ERC721",
                  quantity: 1n,
                }}
              >
                Claim NFT
              </ClaimButton>
            </div>
          </div>
        </div>

        <Confetti fire={showConfetti} />

        {transactionHash && (
          <div className="text-center mt-4">
            <p>Transaction sent! Fee covered by thirdweb OP Superchain Grant Credits! View on block explorer to see the paymaster transaction:</p>
            <a
              href={`https://optimistic.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {transactionHash}
            </a>
            <p>View your NFT on OpenSea!</p>
            <a
              href={`https://opensea.io/collection/${openSea}?search[sortAscending]=false&search[sortBy]=CREATED_DATE`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {openSea}
            </a>
          </div>
        )}

        <ThirdwebResources />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      {/* <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      /> */}

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        OP Superchain App Accelerator
      </h1>
      <h3 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Gasless mint!
      </h3>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">

    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
