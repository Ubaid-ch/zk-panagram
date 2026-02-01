import { UltraHonkBackend,Barretenberg } from "@aztec/bb.js";
import circuit from "../../circuits/target/zk_pangram.json";
// @ts-ignore
import { Noir } from "@noir-lang/noir_js";

//import { CompiledCircuit } from '@noir-lang/types';

import { ANSWER_HASH } from "../constant";


export async function generateProof(guess: string, address: string, showLog:(content: string) => void): Promise<{ proof: Uint8Array, publicInputs: string[] }> {
  try {
     const api = await Barretenberg.new({ threads: 8 });
    const noir = new Noir(circuit as any);
    const honk = new UltraHonkBackend(circuit.bytecode, api);
    const inputs = { guess_hash: guess, answer_double_hash: ANSWER_HASH, address: address };

    showLog("Generating witness... ⏳");
    const { witness } = await noir.execute(inputs);
    showLog("Generated witness... ✅");

    showLog("Generating proof... ⏳");
    const { proof, publicInputs } = await honk.generateProof(witness, { verifierTarget: "evm" });
    const offChainProof = await honk.generateProof(witness);
    showLog("Generated proof... ✅");
    showLog("Verifying proof... ⏳");
    const isValid = await honk.verifyProof(offChainProof);
    showLog(`Proof is valid: ${isValid} ✅`);

    // no longer needed for bb:)
    // const cleanProof = proof.slice(4); // remove first 4 bytes (buffer size)
    return { proof, publicInputs };
  } catch (error) {
    console.log(error);
    throw error;
  }
};