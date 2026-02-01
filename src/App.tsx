import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./wagmi";
import Home from "./components/Home";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


const queryClient = new QueryClient();

import "@rainbow-me/rainbowkit/styles.css";

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Home />
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
