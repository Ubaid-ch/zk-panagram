import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

// const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
// if (!projectId) {
//   throw new Error("Missing VITE_WALLETCONNECT_PROJECT_ID");
// }

export const config = getDefaultConfig({
  appName: "Panagram",
  projectId: "661f74b25f64aef03774eb4da032e7f9",
  chains: [sepolia],
  ssr: true,
});
