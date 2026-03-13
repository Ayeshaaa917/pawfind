"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import PetCard from "./PetCard";

const CONTRACT = "0xfe71e8bb0be8adc089827208c1e66e2ef3d0bcfc";

const ABI = [
  {
    type: "event",
    name: "LostPetReported",
    inputs: [
      { name: "petId", type: "uint256", indexed: true },
      { name: "owner", type: "address", indexed: true },
      { name: "cid", type: "string", indexed: false },
      { name: "reward", type: "uint256", indexed: false },
    ],
  },
] as const;

const client = createPublicClient({
  chain: base,
  transport: http(),
});

export default function LostFeed() {
  const [pets, setPets] = useState<any[]>([]);

  async function loadPets() {
    try {
      const logs = await client.getLogs({
        address: CONTRACT as `0x${string}`,
        event: ABI[0],
        fromBlock: 0n,
      });

      const parsed = logs.map((log: any) => ({
        id: Number(log.args.petId),
        name: "Lost Pet",
        breed: "",
        lastSeenLocation: "",
        reward: Number(log.args.reward) / 1e18,
        postedAt: Date.now(),
        imageUrl: "https://placedog.net/400/300",
      }));

      setPets(parsed);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadPets();
  }, []);

  if (pets.length === 0) {
    return (
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
        No pets reported yet
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
