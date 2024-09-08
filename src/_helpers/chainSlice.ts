// src/redux/chainSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
export interface ChainState {
  chainId: string | null;
  chainName: string | null;
}

const initialState: ChainState = {
  chainId: null,
  chainName: null,
};

// Helper function to map chain IDs to names
const getChainName = (chainId: string) => {
  switch (chainId) {
    case '0x1':
      return 'Ethereum Mainnet';
    case '0x89':
      return 'Polygon Mainnet';
    case '0x128':
      return 'Hedera Mainnet';
    case '0x4':
      return 'Rinkeby Testnet'; // Example testnet
    default:
      return `Unknown Network (Chain ID: ${chainId})`;
  }
};

const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    setChain: (state, action: PayloadAction<ChainState>) => {
      state.chainId = action.payload.chainId;
      state.chainName = getChainName(action.payload.chainId!);
    },
    resetChain: () => initialState,
  },
});

export const { setChain, resetChain } = chainSlice.actions;
export default chainSlice.reducer;
