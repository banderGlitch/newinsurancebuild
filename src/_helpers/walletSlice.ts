// src/redux/walletSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WalletState { // Ensure the WalletState type is exported
  walletConnected: boolean;
  walletAddress: string | null;
  walletBalance: string | null;
  litNodeClient: any | null;
}

const initialState: WalletState = {
  walletConnected: false,
  walletAddress: null,
  walletBalance: null,
  litNodeClient: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.walletConnected = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string | null>) => {
      state.walletAddress = action.payload;
    },
    setWalletBalance: (state, action: PayloadAction<string | null>) => {
      state.walletBalance = action.payload;
    },
    setLitNodeClient: (state, action: PayloadAction<any>) => {
      state.litNodeClient = action.payload;
    },
    resetWalletState: () => initialState,
  },
});

export const {
  setWalletConnected,
  setWalletAddress,
  setWalletBalance,
  setLitNodeClient,
  resetWalletState,
} = walletSlice.actions;

export default walletSlice.reducer;

// // src/redux/walletSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface WalletState {
//   walletConnected: boolean;
//   walletAddress: string | null;
//   walletBalance: string | null;
//   litNodeClient: any | null;
// }

// const initialState: WalletState = {
//   walletConnected: false,
//   walletAddress: null,
//   walletBalance: null,
//   litNodeClient: null,
// };

// const walletSlice = createSlice({
//   name: 'wallet',
//   initialState,
//   reducers: {
//     setWalletConnected: (state, action: PayloadAction<boolean>) => {
//       state.walletConnected = action.payload;
//     },
//     setWalletAddress: (state, action: PayloadAction<string | null>) => {
//       state.walletAddress = action.payload;
//     },
//     setWalletBalance: (state, action: PayloadAction<string | null>) => {
//       state.walletBalance = action.payload;
//     },
//     setLitNodeClient: (state, action: PayloadAction<any>) => {
//       state.litNodeClient = action.payload;
//     },
//     resetWalletState: (state) => {
//       state.walletConnected = false;
//       state.walletAddress = null;
//       state.walletBalance = null;
//       state.litNodeClient = null;
//     },
//   },
// });

// export const {
//   setWalletConnected,
//   setWalletAddress,
//   setWalletBalance,
//   setLitNodeClient,
//   resetWalletState,
// } = walletSlice.actions;

// export default walletSlice.reducer;
