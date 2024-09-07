import { LitAuthClient, GoogleProvider } from '@lit-protocol/lit-auth-client';
import { ProviderType } from '@lit-protocol/constants'; // Import ProviderType for Google
import { IRelayPKP } from '@lit-protocol/types'; // Import PKP type

// Replace with your actual Client ID
const CLIENT_ID = '585391369321-e0ko2cf5hnqlpv7svucrktou1sv7ifja.apps.googleusercontent.com';

// Initialize the LitAuthClient
const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: 'test-api-key', // Replace with your Lit Relay API Key
  },
});

/**
 * Redirect to Google login
 * @param {string} redirectUri - The URL to redirect back after login
 */
export async function signInWithGoogle(redirectUri: string): Promise<void> {
  try {
     // Store the provider in localStorage
     localStorage.setItem('oauth_provider', 'google');
     
     console.log("Redirecting to Google login with redirectUri:", redirectUri);

     const googleProvider: GoogleProvider = litAuthClient.initProvider<GoogleProvider>(
       ProviderType.Google, // Fix: Use ProviderType.Google from the enum
       { redirectUri, clientId: CLIENT_ID } // Pass the Client ID here
     );

    await googleProvider.signIn();
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
}

/**
 * Authenticate after Google redirect and get PKP (Programmable Key Pair)
 * @param {string} redirectUri - The URL to redirect back after login
 * @returns {IRelayPKP | undefined} - The PKP containing the Ethereum wallet-like address
 */
export async function authenticateWithGoogle(
  redirectUri: string
): Promise<IRelayPKP | undefined> {
  try {

    const provider = localStorage.getItem('oauth_provider');


    console.log("provider--------->",provider)

    if (provider !== 'google') {
      throw new Error(`OAuth provider "${provider}" passed in redirect callback URL does not match "google"`);
    }

    const googleProvider: GoogleProvider = litAuthClient.initProvider<GoogleProvider>(
      ProviderType.Google, // Fix: Use ProviderType.Google from the enum
      { redirectUri, clientId: CLIENT_ID } // Use the same Client ID here
    );
    
    const authMethod = await googleProvider.authenticate();

    console.log("authMethod", authMethod)

    // Fetch the PKP (Programmable Key Pair) associated with the authenticated Google account
    const pkps: IRelayPKP[] = await googleProvider.fetchPKPsThroughRelayer(authMethod);

    // Return the first PKP (which contains the wallet address)
    console.log("pkps",pkps[0])
    return pkps[0];
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return undefined;
  }
}


// import { LitAuthClient, GoogleProvider } from '@lit-protocol/lit-auth-client';
// import { AuthMethod } from '@lit-protocol/types';
// import { ProviderType } from '@lit-protocol/constants'; // Import ProviderType

// // Initialize the LitAuthClient
// const litAuthClient = new LitAuthClient({
//   litRelayConfig: {
//     relayApiKey: 'test-api-key', // Replace with your Lit Relay API Key
//   },
// });

// /**
//  * Redirect to Google login
//  * @param {string} redirectUri - The URL to redirect back after login
//  * @returns {Promise<void>} - Initiates Google login process
//  */
// export async function signInWithGoogle(redirectUri: string): Promise<void> {
//   try {
//     // Initialize the Google provider using ProviderType.Google
//     const googleProvider: GoogleProvider = litAuthClient.initProvider<GoogleProvider>(
//       ProviderType.Google, // Use the enum value instead of the string
//       { redirectUri }
//     );
    
//     // Redirect the user to the Google sign-in page
//     await googleProvider.signIn();
//   } catch (error) {
//     console.error("Error during Google sign-in:", error);
//   }
// }

// /**
//  * Authenticate after Google redirect
//  * @param {string} redirectUri - The URL to redirect back after login
//  * @returns {Promise<AuthMethod | undefined>} - The authenticated Google session signature
//  */
// export async function authenticateWithGoogle(redirectUri: string): Promise<AuthMethod | undefined> {
//   try {
//     // Initialize the Google provider using ProviderType.Google
//     const googleProvider: GoogleProvider = litAuthClient.initProvider<GoogleProvider>(
//       ProviderType.Google, // Use the enum value instead of the string
//       { redirectUri }
//     );
    
//     // Complete the authentication process and retrieve the session signature
//     const authMethod: AuthMethod = await googleProvider.authenticate();
    
//     // Return the authenticated session signature (AuthMethod)
//     return authMethod;
//   } catch (error) {
//     console.error("Error during Google authentication:", error);
//     return undefined;
//   }
// }
