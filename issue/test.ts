import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { BackendInstances, Circuits, Noirs } from "./types.js";
import { compile, createFileManager } from "@noir-lang/noir_wasm";
import { join, resolve } from "path";
import { ProofData } from "@noir-lang/types";
import { storageInputs } from "./storage-inputs.js";

async function getCircuit(name: string) {
  const basePath = resolve(join("./noir", name));
  const fm = createFileManager(basePath);
  const compiled = await compile(fm, basePath);
  if (!("program" in compiled)) {
    throw new Error("Compilation failed");
  }
  return compiled.program;
}

const main = async () => {
  let circuits: Circuits;
  let backends: BackendInstances;
  let noirs: Noirs;

  const mainInput = storageInputs;

  circuits = {
    main: await getCircuit("main"),
  };
  backends = {
    main: new BarretenbergBackend(circuits.main, { threads: 8 }),
  };
  noirs = {
    main: new Noir(circuits.main, backends.main),
  };

  let intermediateProof: ProofData;

  const { witness } = await noirs.main.execute(mainInput);
  intermediateProof = await backends.main.generateProof(witness);
  console.log("intermediateProof", JSON.stringify(intermediateProof, null, 2));

  const { proof, publicInputs } = intermediateProof;

  const verified = await backends.main.verifyProof({
    proof,
    publicInputs,
  });

  console.log("verified", verified);

  const numPublicInputs = 0;
  const { proofAsFields, vkAsFields, vkHash } =
    await backends.main.generateRecursiveProofArtifacts(
      { publicInputs, proof },
      numPublicInputs
    );

  const recursiveInputs = {
    verification_key: vkAsFields,
    proof: proofAsFields,
    public_inputs: [],
    key_hash: vkHash,
  };

  console.log("recursiveInputs2", JSON.stringify(recursiveInputs, null, 2));

  await backends.main.destroy();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
