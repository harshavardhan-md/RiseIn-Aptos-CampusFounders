// utils/aptosContract.js

export const checkAptosInvestorSBT = async (address, aptosClient) => {
  try {
    const moduleAddr = process.env.NEXT_PUBLIC_SBT_MODULE_ADDR;
    const moduleName = process.env.NEXT_PUBLIC_SBT_MODULE_NAME;
    
    console.log("Environment check:");
    console.log("- moduleAddr:", moduleAddr);
    console.log("- moduleName:", moduleName);
    console.log("- address:", address);
    console.log("- aptosClient:", !!aptosClient);
    
    if (!moduleAddr || !moduleName) {
      throw new Error("Missing environment variables for contract address or module name");
    }

    if (!aptosClient) {
      throw new Error("Aptos client not available");
    }

    // Ensure address is properly formatted
    const cleanAddress = address.startsWith('0x') ? address : `0x${address}`;
    console.log("Clean address:", cleanAddress);

    // Try direct REST API call as fallback
    try {
      const nodeUrl = process.env.NEXT_PUBLIC_APTOS_NODE_URL;
      const functionId = `${moduleAddr}::${moduleName}::get_investor_token`;
      
      console.log("Attempting direct REST API call...");
      const response = await fetch(`${nodeUrl}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function: functionId,
          type_arguments: [],
          arguments: [cleanAddress],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tokenIdResponse = await response.json();
      console.log("Raw tokenIdResponse (REST):", tokenIdResponse);
      
      const tokenId = tokenIdResponse[0];
      console.log("Token ID:", tokenId, typeof tokenId);

      if (!tokenId || tokenId === "0" || tokenId === 0) {
        return {
          hasToken: false,
          tokenId: null,
          isValid: false,
        };
      }

      // Check validity with REST API
      const validityResponse = await fetch(`${nodeUrl}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function: `${moduleAddr}::${moduleName}::is_verified_investor`,
          type_arguments: [],
          arguments: [cleanAddress],
        }),
      });

      if (!validityResponse.ok) {
        throw new Error(`HTTP error! status: ${validityResponse.status}`);
      }

      const isValidResponse = await validityResponse.json();
      const isValid = isValidResponse[0];
      console.log("Is valid response:", isValid);

      return {
        hasToken: true,
        tokenId: tokenId.toString(),
        isValid: isValid,
      };

    } catch (restError) {
      console.error("REST API call failed:", restError);
      
      // Fallback to SDK (if it works)
      console.log("Trying SDK as fallback...");
      const functionId = `${moduleAddr}::${moduleName}::get_investor_token`;
      console.log("Function ID:", functionId);

      const tokenIdResponse = await aptosClient.view({
        function: functionId,
        arguments: [cleanAddress],
        type_arguments: [],
      });

      console.log("Raw tokenIdResponse (SDK):", tokenIdResponse);
      const tokenId = tokenIdResponse[0];
      console.log("Token ID:", tokenId, typeof tokenId);

      if (!tokenId || tokenId === "0" || tokenId === 0) {
        return {
          hasToken: false,
          tokenId: null,
          isValid: false,
        };
      }

      const validityFunctionId = `${moduleAddr}::${moduleName}::is_verified_investor`;
      const isValidResponse = await aptosClient.view({
        function: validityFunctionId,
        arguments: [cleanAddress],
        type_arguments: [],
      });

      const isValid = isValidResponse[0];
      console.log("Is valid response:", isValid);

      return {
        hasToken: true,
        tokenId: tokenId.toString(),
        isValid: isValid,
      };
    }

  } catch (error) {
    console.error("Error checking Aptos investor SBT:", error);
    console.error("Error message:", error.message);
    
    throw error;
  }
};

export const mintAptosInvestorSBT = async (
  issuerAddress,
  recipientAddress,
  credentialHash,
  expiresAt,
  uri,
  aptosClient
) => {
  try {
    const moduleAddr = process.env.NEXT_PUBLIC_SBT_MODULE_ADDR;
    const moduleName = process.env.NEXT_PUBLIC_SBT_MODULE_NAME;

    if (!window.aptos) {
      throw new Error("Aptos wallet not found");
    }

    const transaction = {
      type: "entry_function_payload",
      function: `${moduleAddr}::${moduleName}::mint`,
      arguments: [
        recipientAddress,
        credentialHash,
        expiresAt.toString(),
        uri,
      ],
      type_arguments: [],
    };

    const pendingTransaction = await window.aptos.signAndSubmitTransaction(transaction);
    console.log("Transaction submitted:", pendingTransaction);

    // Wait for transaction to be confirmed
    const txnResult = await aptosClient.waitForTransaction({
      transactionHash: pendingTransaction.hash,
    });

    return txnResult;
  } catch (error) {
    console.error("Error minting Aptos investor SBT:", error);
    throw error;
  }
};

export const renewAptosInvestorSBT = async (
  tokenId,
  newExpiry,
  aptosClient
) => {
  try {
    const moduleAddr = process.env.NEXT_PUBLIC_SBT_MODULE_ADDR;
    const moduleName = process.env.NEXT_PUBLIC_SBT_MODULE_NAME;

    if (!window.aptos) {
      throw new Error("Aptos wallet not found");
    }

    const transaction = {
      type: "entry_function_payload",
      function: `${moduleAddr}::${moduleName}::renew`,
      arguments: [
        tokenId.toString(),
        newExpiry.toString(),
      ],
      type_arguments: [],
    };

    const pendingTransaction = await window.aptos.signAndSubmitTransaction(transaction);
    console.log("Renew transaction submitted:", pendingTransaction);

    const txnResult = await aptosClient.waitForTransaction({
      transactionHash: pendingTransaction.hash,
    });

    return txnResult;
  } catch (error) {
    console.error("Error renewing Aptos investor SBT:", error);
    throw error;
  }
};

export const revokeAptosInvestorSBT = async (
  tokenId,
  aptosClient
) => {
  try {
    const moduleAddr = process.env.NEXT_PUBLIC_SBT_MODULE_ADDR;
    const moduleName = process.env.NEXT_PUBLIC_SBT_MODULE_NAME;

    if (!window.aptos) {
      throw new Error("Aptos wallet not found");
    }

    const transaction = {
      type: "entry_function_payload",
      function: `${moduleAddr}::${moduleName}::revoke`,
      arguments: [tokenId.toString()],
      type_arguments: [],
    };

    const pendingTransaction = await window.aptos.signAndSubmitTransaction(transaction);
    console.log("Revoke transaction submitted:", pendingTransaction);

    const txnResult = await aptosClient.waitForTransaction({
      transactionHash: pendingTransaction.hash,
    });

    return txnResult;
  } catch (error) {
    console.error("Error revoking Aptos investor SBT:", error);
    throw error;
  }
};

export const getAptosCredential = async (tokenId, aptosClient) => {
  try {
    const moduleAddr = process.env.NEXT_PUBLIC_SBT_MODULE_ADDR;
    const moduleName = process.env.NEXT_PUBLIC_SBT_MODULE_NAME;

    const credentialResponse = await aptosClient.view({
      function: `${moduleAddr}::${moduleName}::get_credential`,
      arguments: [tokenId.toString()],
    });

    return credentialResponse[0];
  } catch (error) {
    console.error("Error getting Aptos credential:", error);
    throw error;
  }
};


