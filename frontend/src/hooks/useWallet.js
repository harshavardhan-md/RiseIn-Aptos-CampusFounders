// "use client";

// import { useState, useEffect } from "react";
// import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// export default function useWallet() {
//   const [address, setAddress] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [aptosClient, setAptosClient] = useState(null);

//   useEffect(() => {
//     // Initialize Aptos client for Testnet
//     const config = new AptosConfig({ network: Network.TESTNET });
//     const client = new Aptos(config);
//     setAptosClient(client);

//     // Check if wallet was previously connected
//     checkConnection();
//   }, []);

//   const checkConnection = async () => {
//     try {
//       if (typeof window !== "undefined" && window.aptos) {
//         const response = await window.aptos.account();
//         if (response && response.address) {
//           setAddress(response.address);
//           setConnected(true);
//         }
//       }
//     } catch (error) {
//       // Wallet not connected
//       console.log("Wallet not connected");
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (typeof window === "undefined") {
//         alert("Please use a browser with wallet support");
//         return;
//       }

//       // Check if Petra wallet is installed
//       if (!window.aptos) {
//         alert("Petra Wallet not detected. Please install Petra Wallet from the Chrome Web Store.");
//         // Open Petra installation page
//         window.open("https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci", "_blank");
//         return;
//       }

//       console.log("Petra wallet detected, attempting connection...");
      
//       // First try to connect
//       const response = await window.aptos.connect();
//       console.log("Wallet connection response:", response);
      
//       if (response && response.address) {
//         setAddress(response.address);
//         setConnected(true);
//         console.log("Wallet connected successfully:", response.address);
//       } else {
//         console.error("No address returned from wallet");
//         alert("Wallet connection failed: No address received");
//       }
//     } catch (err) {
//       console.error("Wallet connection failed:", err);
      
//       // Handle specific error cases
//       if (err.code === 4001 || err.message.includes("User rejected")) {
//         alert("Connection cancelled by user");
//       } else if (err.message.includes("already pending")) {
//         alert("Connection request already pending. Please check your wallet.");
//       } else {
//         alert(`Wallet connection failed: ${err.message}`);
//       }
//     }
//   };

//   const disconnectWallet = async () => {
//     try {
//       if (typeof window !== "undefined" && window.aptos) {
//         await window.aptos.disconnect();
//         setAddress(null);
//         setConnected(false);
//       }
//     } catch (err) {
//       console.error("Wallet disconnect failed:", err);
//     }
//   };

//   return {
//     address,
//     connected,
//     connectWallet,
//     disconnectWallet,
//     aptosClient,
//   };
// }


"use client";

import { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export default function useWallet() {
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);
  const [aptosClient, setAptosClient] = useState(null);

  useEffect(() => {
    // Initialize Aptos client for Testnet
    const config = new AptosConfig({ network: Network.TESTNET });
    const client = new Aptos(config);
    setAptosClient(client);

    // Force disconnect any existing connection on page load
    forceDisconnectOnLoad();
  }, []);

  const forceDisconnectOnLoad = async () => {
    try {
      if (typeof window !== "undefined" && window.aptos) {
        await window.aptos.disconnect();
        setAddress(null);
        setConnected(false);
        console.log("Force disconnected wallet on page load");
      }
    } catch (error) {
      console.log("No existing connection to disconnect");
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window === "undefined") {
        alert("Please use a browser with wallet support");
        return;
      }

      if (!window.aptos) {
        alert("Petra Wallet not detected. Please install Petra Wallet from the Chrome Web Store.");
        window.open("https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci", "_blank");
        return;
      }

      console.log("Petra wallet detected, attempting connection...");
      
      const response = await window.aptos.connect();
      console.log("Wallet connection response:", response);
      
      if (response && response.address) {
        setAddress(response.address);
        setConnected(true);
        console.log("Wallet connected successfully:", response.address);
      } else {
        console.error("No address returned from wallet");
        alert("Wallet connection failed: No address received");
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
      
      if (err.code === 4001 || err.message.includes("User rejected")) {
        alert("Connection cancelled by user");
      } else if (err.message.includes("already pending")) {
        alert("Connection request already pending. Please check your wallet.");
      } else {
        alert(`Wallet connection failed: ${err.message}`);
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      if (typeof window !== "undefined" && window.aptos) {
        await window.aptos.disconnect();
        setAddress(null);
        setConnected(false);
      }
    } catch (err) {
      console.error("Wallet disconnect failed:", err);
    }
  };

  return {
    address,
    connected,
    connectWallet,
    disconnectWallet,
    aptosClient,
  };
}