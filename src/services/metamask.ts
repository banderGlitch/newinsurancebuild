// src/services/metamask.ts
import { MetaMaskInpageProvider } from '@metamask/providers';
// import detectEthereumProvider from '@metamask/detect-provider';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const connectWallet = async (): Promise<string[] | null> => {
  try {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return null;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    return accounts as string[];
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    return null;
  }
};

export const getCurrentAccount = async (): Promise<string | null> => {
  try {
    if (!window.ethereum) {
      return null;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    return accounts && accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Failed to get current account:', error);
    return null;
  }
};
