// litClient.js (helper function for the Lit Node)
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";

export const initLitClient = async () => {
  const litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.Datil,  // or another network you need
  });

  await litNodeClient.connect(); // Establish connection
  return litNodeClient;
};