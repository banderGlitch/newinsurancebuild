import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'
import { Chain, mainnet } from 'wagmi/chains'

const amoy = {
  id: 1442,
  name: 'Polygon zkEVM Testnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ['https://rpc.public.zkevm-test.net'] },
    default: { http: ['https://rpc.public.zkevm-test.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'PolygonScan', url: 'https://testnet-zkevm.polygonscan.com' },
    default: { name: 'PolygonScan', url: 'https://testnet-zkevm.polygonscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 525686,
    },
  },
  testnet: true,
} as const satisfies Chain

// Define Hedera Testnet chain
const hedera = {
  id: 296,
  name: 'Hedera Testnet',
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 8,
  },
  rpcUrls: {
    public: { http: ['https://testnet.hashio.io/api'] },
    default: { http: ['https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/testnet' },
  },
  testnet: true,
} as const satisfies Chain

// Wagmi configuration
const config = createConfig({
  chains: [amoy, hedera, mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [amoy.id]: http(),
    [hedera.id]: http(),
    [mainnet.id]: http(),
  },
})

// Create a client for React Query
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)