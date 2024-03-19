import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { CompiledCircuit, ProofData } from "@noir-lang/types";

export type Circuits = {
  main: CompiledCircuit;
};

export type BackendInstances = {
  main: BarretenbergBackend;
};

export type Noirs = {
  main: Noir;
};

export interface ProofArtifacts extends ProofData {
  proofAsFields: string[];
  vkAsFields: string[];
  vkHash: string;
}
