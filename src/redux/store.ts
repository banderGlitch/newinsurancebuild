import { configureStore } from '@reduxjs/toolkit';

import chainReducer from '../_helpers/chainSlice'
import walletReducer from '../_helpers/walletSlice';

export const store = configureStore({
    reducer: {
      chain: chainReducer,
      wallet: walletReducer,
    },
  });
  
  // Define TypeScript types for RootState and AppDispatch
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

  // Optional: Re-export the ChainState type for other components if needed