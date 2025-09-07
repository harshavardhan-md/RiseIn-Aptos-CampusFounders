"use client";
import { useEffect, useState } from "react";
import useAptosWallet from "../hooks/useWallet";
import { checkAptosInvestorSBT } from "../utils/aptosContract";
import MilestoneForm from "../components/MilestoneForm";
import MentorDashboard from "../components/MentorDashboard";
import BlockchainDebugger from "../components/BlockchainDebugger";

export default function Home() {
  const { address, connected, connectWallet, aptosClient } = useAptosWallet();
  const [hasSBT, setHasSBT] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);
  const [activeTab, setActiveTab] = useState("verification");

  const addDebugLog = (message) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const checkSBT = async () => {
    if (!address || !aptosClient) {
      addDebugLog("No address or Aptos client available");
      return;
    }
    
    setLoading(true);
    addDebugLog(`Starting SBT check for address: ${address}`);
    
    try {
      // Debug environment variables first
      addDebugLog(`Contract address: ${process.env.NEXT_PUBLIC_SBT_MODULE_ADDR}`);
      addDebugLog(`Module name: ${process.env.NEXT_PUBLIC_SBT_MODULE_NAME}`);
      addDebugLog(`Network: ${process.env.NEXT_PUBLIC_APTOS_NETWORK}`);
      addDebugLog(`Node URL: ${process.env.NEXT_PUBLIC_APTOS_NODE_URL}`);
      
      // Test if environment variables are undefined
      if (!process.env.NEXT_PUBLIC_SBT_MODULE_ADDR) {
        addDebugLog("❌ NEXT_PUBLIC_SBT_MODULE_ADDR is undefined!");
        return;
      }
      
      if (!process.env.NEXT_PUBLIC_SBT_MODULE_NAME) {
        addDebugLog("❌ NEXT_PUBLIC_SBT_MODULE_NAME is undefined!");
        return;
      }
      
      const result = await checkAptosInvestorSBT(address, aptosClient);
      
      if (result.hasToken) {
        addDebugLog(`Found SBT with Token ID: ${result.tokenId}`);
        addDebugLog(`Token is valid: ${result.isValid}`);
        
        if (result.isValid) {
          setHasSBT(true);
          setTokenId(result.tokenId);
          addDebugLog("✅ Successfully detected valid SBT");
        } else {
          addDebugLog("❌ SBT exists but is invalid or revoked");
          setHasSBT(false);
          setTokenId(null);
        }
      } else {
        addDebugLog("❌ No SBT found for this address");
        setHasSBT(false);
        setTokenId(null);
      }
      
    } catch (error) {
      addDebugLog(`❌ Error in checkSBT: ${error.message}`);
      console.error("Full error:", error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (connected && address && aptosClient) {
      addDebugLog("Wallet connected, checking SBT status");
      checkSBT();
    }
  }, [connected, address, aptosClient]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🚀 CampusFounders Aptos Platform</h1>
      
      {!connected ? (
        <div>
          <p>Connect your Aptos wallet to access the platform</p>
          <button 
            onClick={connectWallet}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Connect Petra Wallet
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Connected Wallet:</strong> {address}</p>
          
          {/* Tab Navigation */}
          <div style={{
            display: "flex",
            marginTop: "1rem",
            marginBottom: "2rem",
            borderBottom: "2px solid #eee"
          }}>
            <button
              onClick={() => setActiveTab("verification")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                backgroundColor: "transparent",
                borderBottom: activeTab === "verification" ? "2px solid #0070f3" : "none",
                color: activeTab === "verification" ? "#0070f3" : "#666",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              🏅 Investor Verification
            </button>
            <button
              onClick={() => setActiveTab("milestones")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                backgroundColor: "transparent",
                borderBottom: activeTab === "milestones" ? "2px solid #0070f3" : "none",
                color: activeTab === "milestones" ? "#0070f3" : "#666",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              🏆 Submit Milestones
            </button>
            <button
              onClick={() => setActiveTab("mentor")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                backgroundColor: "transparent",
                borderBottom: activeTab === "mentor" ? "2px solid #0070f3" : "none",
                color: activeTab === "mentor" ? "#0070f3" : "#666",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              🧑‍🏫 Mentor Dashboard
            </button>
            <button
              onClick={() => setActiveTab("debug")}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                backgroundColor: "transparent",
                borderBottom: activeTab === "debug" ? "2px solid #0070f3" : "none",
                color: activeTab === "debug" ? "#0070f3" : "#666",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              🔍 Debug
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "verification" && (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : hasSBT ? (
                <div style={{
                  padding: "1rem",
                  backgroundColor: "#d4edda",
                  border: "1px solid #c3e6cb",
                  borderRadius: "5px",
                  marginTop: "1rem"
                }}>
                  <h2>✅ Verified Investor!</h2>
                  <p><strong>Token ID:</strong> {tokenId}</p>
                  <p>You can now access verified investor features and milestone verification.</p>
                </div>
              ) : (
                <div style={{
                  padding: "1rem",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "5px",
                  marginTop: "1rem"
                }}>
                  <h2>❌ No Investor Verification Found</h2>
                  <p>You don't have a verified investor SBT yet.</p>
                </div>
              )}
              
              <button 
                onClick={checkSBT}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  marginTop: "1rem"
                }}
              >
                Refresh Status
              </button>
            </div>
          )}

          {activeTab === "milestones" && (
            <div>
              <MilestoneForm address={address} aptosClient={aptosClient} />
            </div>
          )}

          {activeTab === "mentor" && (
            <div>
              <MentorDashboard address={address} aptosClient={aptosClient} />
            </div>
          )}

          {activeTab === "debug" && (
            <div>
              <BlockchainDebugger address={address} aptosClient={aptosClient} />
            </div>
          )}
          
          {/* Debug Information - Only show on verification tab */}
          {activeTab === "verification" && (
            <div style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
              fontSize: "0.9rem"
            }}>
              <h3>Debug Log:</h3>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {debugInfo.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}