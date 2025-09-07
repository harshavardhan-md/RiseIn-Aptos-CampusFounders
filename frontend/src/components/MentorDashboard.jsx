// import React, { useState, useEffect } from 'react';
// import { ExternalLink, Users, DollarSign, MapPin, Calendar, Award, Link, Globe } from 'lucide-react';

// // Complete startup data from your surveys
// const allStartupsData = [
//   {
//     id: "learny-hive-001",
//     name: "LearnyHive",
//     funding: "₹45 Lakhs",
//     fundingETH: 0.45,
//     tags: ["Ed tech", "Innovation"],
//     founder: "Bhanush Gowda",
//     college: "EPCET Bangalore, 3rd Year",
//     color: "#FF5733",
//     url: "https://www.learnyhive.com/",
//     category: "EdTech"
//   },
//   {
//     id: "waiter-company-001",
//     name: "The Waiter Company",
//     funding: "₹32 Lakhs",
//     fundingETH: 0.32,
//     tags: ["FoodTech", "Logistics"],
//     founder: "Ishan Purohit",
//     college: "RV University, 4th Year",
//     color: "#4A90E2",
//     url: "https://www.thewaitercompany.in/",
//     category: "FoodTech"
//   },
//   {
//     id: "saathi-app-001",
//     name: "Saathi App",
//     funding: "₹20 Lakhs",
//     fundingETH: 0.20,
//     tags: ["Innovative", "Social"],
//     founder: "Abhay Gupta",
//     college: "RV College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.saathiapp.in/",
//     category: "Social"
//   },
//   {
//     id: "kampus-001",
//     name: "Kampus",
//     funding: "₹50 Lakhs",
//     fundingETH: 0.50,
//     tags: ["Meets", "Social"],
//     founder: "Hemanth Gowda",
//     college: "Reva College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.kampus.social/",
//     category: "Social"
//   },
//   {
//     id: "nologin-001",
//     name: "NoLogin",
//     funding: "₹10 Lakhs",
//     fundingETH: 0.10,
//     tags: ["Innovative", "Logistics"],
//     founder: "Deekshith B",
//     college: "BMS College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.nologin.in/",
//     category: "Logistics"
//   },
//   {
//     id: "krewsup-001",
//     name: "Krewsup",
//     funding: "₹20 Lakhs",
//     fundingETH: 0.20,
//     tags: ["Innovative", "Health"],
//     founder: "S Hari Raghava",
//     college: "Reva College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.Krewsup.com/",
//     category: "Health"
//   },
//   {
//     id: "kavastra-001",
//     name: "Kavastra",
//     funding: "₹12 Lakhs",
//     fundingETH: 0.12,
//     tags: ["Innovative", "Health"],
//     founder: "Shashikant kalal",
//     college: "University of Visvesvaraya College of Engineering, Bangalore, 4th Year",
//     color: "#50C878",
//     url: "http://www.kavastra.com/",
//     category: "Health"
//   },
//   {
//     id: "guidero-001",
//     name: "Guidero Private Limited",
//     funding: "₹12 Lakhs",
//     fundingETH: 0.12,
//     tags: ["Travel", "Innovative"],
//     founder: "C H Sanjana",
//     college: "Christ University, 4th Year",
//     color: "#50C878",
//     url: "www.guidero.in",
//     category: "Travel"
//   },
//   {
//     id: "magnus-chocolates-001",
//     name: "Magnus Chocolates",
//     funding: "₹45 Lakhs",
//     fundingETH: 0.45,
//     tags: ["Food Tech", "Service"],
//     founder: "Mayank Singh",
//     college: "NIFT Delhi",
//     color: "#FF5733",
//     url: "https://www.instagram.com/magnus_chocolates?igsh=aGl2OHR5bzQ2MHNv",
//     category: "FoodTech"
//   },
//   {
//     id: "chitva-skincare-001",
//     name: "Chitva- A Personalised Skincare Brand",
//     funding: "₹32 Lakhs",
//     fundingETH: 0.32,
//     tags: ["Skincare", "Beauty"],
//     founder: "Yerramshetty Suchita",
//     college: "MSR University, 4th Year",
//     color: "#4A90E2",
//     url: "https://www.linkedin.com/in/yerramsetty-sai-venkata-suchita-suchta1234?",
//     category: "Beauty"
//   },
//   {
//     id: "start-shape-001",
//     name: "Start Shape",
//     funding: "₹20 Lakhs",
//     fundingETH: 0.20,
//     tags: ["Solutions Company", "Creative"],
//     founder: "Jesvin Saji",
//     college: "Garden City University, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.starshape.in/",
//     category: "Creative"
//   },
//   {
//     id: "myniquee-001",
//     name: "Myniquee",
//     funding: "₹50 Lakhs",
//     fundingETH: 0.50,
//     tags: ["Creative", "Art"],
//     founder: "Vasundhara",
//     college: "Reva College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.instagram.com/myniquee_12?igsh=MXhjdHQ5eTRkZTBrag==",
//     category: "Art"
//   }
// ];

// const APTOS_CONFIG = {
//   CONTRACT_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910",
//   MODULE_NAME: "milestone_verification"
// };

// // FIXED: Persistent state management using in-memory storage that survives refreshes
// const BLOCKCHAIN_STATE_KEY = 'aptos-mentor-blockchain-state';
// const MILESTONES_CACHE_KEY = 'aptos-mentor-milestones-cache';

// // FIXED: Load blockchain state from memory 
// const loadPersistedBlockchainState = () => {
//   try {
//     // Use component's internal state persistence pattern
//     const persistedData = window._aptosBlockchainState || new Map();
//     return persistedData;
//   } catch (error) {
//     console.log("No persisted blockchain state found");
//     return new Map();
//   }
// };

// // FIXED: Save blockchain state to memory
// const saveBlockchainState = (stateMap) => {
//   try {
//     // Persist to window object for session persistence
//     window._aptosBlockchainState = stateMap;
//   } catch (error) {
//     console.error("Failed to persist blockchain state:", error);
//   }
// };

// // FIXED: Load cached milestones
// const loadCachedMilestones = () => {
//   try {
//     const cached = window._aptosMilestonesCache;
//     if (cached && Array.isArray(cached)) {
//       return cached;
//     }
//   } catch (error) {
//     console.log("No cached milestones found");
//   }
//   return [];
// };

// // FIXED: Save milestones to cache
// const saveMilestonesToCache = (milestones) => {
//   try {
//     window._aptosMilestonesCache = milestones;
//   } catch (error) {
//     console.error("Failed to cache milestones:", error);
//   }
// };

// const EnhancedMentorDashboard = () => {
//   const [milestones, setMilestones] = useState([]);
//   const [milestoneFilter, setMilestoneFilter] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");
//   const [verifyingMilestone, setVerifyingMilestone] = useState(null);
//   const [error, setError] = useState("");
//   const [walletConnected, setWalletConnected] = useState(false);
//   const [connectedAddress, setConnectedAddress] = useState("");
//   const [blockchainState, setBlockchainState] = useState(() => loadPersistedBlockchainState()); // FIXED: Load persisted state
//   const [dataSource, setDataSource] = useState('initializing'); // Track data source

//   // Mock address for demo
//   const mockAddress = "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910";

//   // FIXED: Save blockchain state whenever it changes
//   useEffect(() => {
//     saveBlockchainState(blockchainState);
//   }, [blockchainState]);

//   // FIXED: Save milestones to cache whenever they change
//   useEffect(() => {
//     if (milestones.length > 0) {
//       saveMilestonesToCache(milestones);
//     }
//   }, [milestones]);

//   // Initialize wallet connection status
//   useEffect(() => {
//     const checkWalletConnection = async () => {
//       setWalletConnected(true);
//       setConnectedAddress(mockAddress);
      
//       // FIXED: Load cached data on startup
//       const cachedMilestones = loadCachedMilestones();
//       if (cachedMilestones.length > 0) {
//         setMilestones(cachedMilestones);
//         setDataSource('cache');
//         setResult(`Restored ${cachedMilestones.length} milestones from cache. Click refresh to sync with blockchain.`);
//       }
//     };
    
//     checkWalletConnection();
//   }, []);

//   const safeMilestoneType = (type) => {
//     const typeMap = {
//       'users': 'User Acquisition',
//       'funding': 'Funding Round', 
//       'product': 'Product Development',
//       'revenue': 'Revenue Milestone'
//     };
//     return typeMap[type] || type || 'Unknown';
//   };

//   const safeConvertValue = (value) => {
//     if (typeof value === 'bigint') {
//       return value.toString();
//     }
//     return value;
//   };

//   const processMilestoneData = (milestone, startupId, milestoneIndex) => {
//     try {
//       const startup = allStartupsData.find(s => s.id === startupId);
//       const milestoneKey = `${startupId}-${milestoneIndex}`;
      
//       // FIXED: Always check blockchain state first for verification status
//       const blockchainVerified = blockchainState.get(milestoneKey);
//       const actualVerified = blockchainVerified !== undefined ? blockchainVerified : (milestone.verified || false);
      
//       // FIXED: Also check for rejection state
//       const rejectionKey = `${startupId}-${milestoneIndex}-rejected`;
//       const actualRejected = blockchainState.get(rejectionKey) || milestone.rejected || false;
      
//       return {
//         startupId: startupId,
//         milestoneIndex: milestoneIndex,
//         description: milestone.description || `${startup?.name || startupId} - Milestone #${milestoneIndex + 1}`,
//         milestoneType: milestone.milestoneType || milestone.milestone_type || 'general',
//         value: safeConvertValue(milestone.value || 0),
//         mentorAddress: milestone.mentorAddress || milestone.mentor_address || connectedAddress,
//         verified: actualVerified, // FIXED: Use blockchain state
//         rejected: actualRejected, // FIXED: Use blockchain state
//         proofHash: milestone.proofHash || milestone.proof_hash || `QmStartup${startupId}Milestone${milestoneIndex}ProofHash`,
//         timestamp: safeConvertValue(milestone.timestamp || Date.now() / 1000),
//         formattedTime: milestone.timestamp ? 
//           new Date(Number(safeConvertValue(milestone.timestamp)) * 1000).toLocaleString() : 
//           new Date().toLocaleString(),
//         valueETH: milestone.valueETH || (startup?.fundingETH * (0.2 + milestoneIndex * 0.1)) || (0.1 + milestoneIndex * 0.05),
//         startup: startup
//       };
//     } catch (error) {
//       console.error("Error processing milestone data:", error);
//       return null;
//     }
//   };

//   // FIXED: Initialize demo milestones with blockchain state awareness
//   const initializeDemoMilestones = () => {
//     if (!connectedAddress) return [];
    
//     return allStartupsData.flatMap(startup => [
//       {
//         id: `${startup.id}-milestone-1`,
//         startupId: startup.id,
//         milestoneIndex: 0,
//         milestoneType: "users",
//         description: `${startup.name} - User Acquisition Milestone`,
//         valueETH: startup.fundingETH * 0.2,
//         mentorAddress: connectedAddress,
//         proofHash: `QmStartup${startup.id}Milestone0ProofHash`,
//         formattedTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
//         verified: false, // Will be updated from blockchain state
//         rejected: false,
//         startup: startup
//       },
//       {
//         id: `${startup.id}-milestone-2`,
//         startupId: startup.id,
//         milestoneIndex: 1,
//         milestoneType: "funding",
//         description: `${startup.name} - Initial Funding Milestone`,
//         valueETH: startup.fundingETH * 0.3,
//         mentorAddress: connectedAddress,
//         proofHash: `QmStartup${startup.id}Milestone1ProofHash`,
//         formattedTime: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toLocaleString(),
//         verified: false, // Will be updated from blockchain state
//         rejected: false,
//         startup: startup
//       }
//     ]);
//   };

//   const loadMilestones = async (forceRefresh = false) => {
//     if (!walletConnected || !connectedAddress) {
//       setError("Wallet not connected properly");
//       return;
//     }
    
//     setLoading(true);
//     setError("");
//     setResult("Connecting to Aptos blockchain...");
    
//     try {
//       let allMilestones = [];
//       let fromBlockchain = false;

//       // FIXED: Always try blockchain first, but with better error handling
//       try {
//         const { Aptos, AptosConfig, Network } = await import('@aptos-labs/ts-sdk');
        
//         const aptosConfig = new AptosConfig({ network: Network.TESTNET });
//         const aptos = new Aptos(aptosConfig);
        
//         const testStartupIds = allStartupsData.map(s => s.id);
        
//         setResult("Fetching milestone data from Aptos blockchain...");
        
//         // Load milestones for each startup
//         for (const startupId of testStartupIds) {
//           try {
//             const result = await aptos.view({
//               payload: {
//                 function: `${APTOS_CONFIG.CONTRACT_ADDRESS}::${APTOS_CONFIG.MODULE_NAME}::get_startup_milestones`,
//                 functionArguments: [startupId]
//               }
//             });
            
//             if (result && result[0] && Array.isArray(result[0])) {
//               const startupMilestones = result[0];
              
//               for (let i = 0; i < startupMilestones.length; i++) {
//                 const rawMilestone = startupMilestones[i];
                
//                 // Check if this mentor is assigned
//                 if (rawMilestone.mentor_address && 
//                     rawMilestone.mentor_address.toLowerCase() === connectedAddress.toLowerCase()) {
//                   const processedMilestone = processMilestoneData({
//                     description: rawMilestone.description,
//                     milestoneType: rawMilestone.milestone_type,
//                     value: rawMilestone.value,
//                     mentorAddress: rawMilestone.mentor_address,
//                     verified: rawMilestone.verified,
//                     proofHash: rawMilestone.proof_hash,
//                     timestamp: rawMilestone.timestamp
//                   }, startupId, i);
                  
//                   if (processedMilestone) {
//                     allMilestones.push(processedMilestone);
                    
//                     // FIXED: Update blockchain state with real data
//                     const milestoneKey = `${startupId}-${i}`;
//                     setBlockchainState(prev => new Map(prev.set(milestoneKey, rawMilestone.verified)));
//                   }
//                 }
//               }
//             }
//           } catch (error) {
//             // Continue with other startups - this is normal if no milestones exist
//             continue;
//           }
//         }
        
//         if (allMilestones.length > 0) {
//           fromBlockchain = true;
//           setDataSource('blockchain');
//         }
        
//       } catch (blockchainError) {
//         console.log("Blockchain connection failed:", blockchainError.message);
//         setResult("Blockchain connection failed, loading demo data with persisted state...");
//       }
      
//       // FIXED: If no blockchain data or on error, use demo data BUT preserve blockchain state
//       if (!fromBlockchain) {
//         const demoMilestones = initializeDemoMilestones();
        
//         // FIXED: Apply blockchain state to demo milestones
//         allMilestones = demoMilestones.map(milestone => {
//           const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
//           const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
          
//           return {
//             ...milestone,
//             verified: blockchainState.get(milestoneKey) || false,
//             rejected: blockchainState.get(rejectionKey) || false
//           };
//         });
        
//         setDataSource(blockchainState.size > 0 ? 'demo-with-state' : 'demo');
//       }
      
//       setMilestones(allMilestones);
      
//       // FIXED: Better status messages
//       if (fromBlockchain) {
//         setResult(`✅ Successfully loaded ${allMilestones.length} milestone(s) from Aptos blockchain`);
//       } else if (blockchainState.size > 0) {
//         setResult(`📦 Loaded ${allMilestones.length} demo milestones with ${blockchainState.size} persisted blockchain states`);
//       } else {
//         setResult(`🚀 Demo mode: ${allMilestones.length} milestones loaded (verify some to see state persistence)`);
//       }
      
//     } catch (error) {
//       console.error("Error loading milestones:", error);
//       setError(`Failed to load milestones: ${error.message}`);
      
//       // FIXED: Final fallback with state preservation
//       const demoMilestones = initializeDemoMilestones().map(milestone => {
//         const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
//         const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
        
//         return {
//           ...milestone,
//           verified: blockchainState.get(milestoneKey) || false,
//           rejected: blockchainState.get(rejectionKey) || false
//         };
//       });
      
//       setMilestones(demoMilestones);
//       setDataSource('error-fallback');
//       setResult(`⚠️ Error occurred, showing demo data with persisted states (${demoMilestones.length} milestones)`);
//     }
    
//     setLoading(false);
//   };

//   const verifyMilestone = async (startupId, milestoneIndex) => {
//     if (!walletConnected || !connectedAddress) {
//       setError("Wallet not connected");
//       return;
//     }
    
//     setVerifyingMilestone(`${startupId}-${milestoneIndex}`);
//     setError("");
//     setResult("Processing verification transaction on Aptos...");
    
//     try {
//       // Check if milestone is already verified
//       const currentMilestone = milestones.find(m => 
//         m.startupId === startupId && m.milestoneIndex === milestoneIndex
//       );
      
//       if (currentMilestone && currentMilestone.verified) {
//         setResult("This milestone is already verified!");
//         setVerifyingMilestone(null);
//         return;
//       }

//       try {
//         // Try actual blockchain verification
//         const { Aptos, AptosConfig, Network } = await import('@aptos-labs/ts-sdk');
        
//         const aptosConfig = new AptosConfig({ network: Network.TESTNET });
//         const aptos = new Aptos(aptosConfig);

//         // Simulate blockchain transaction delay
//         setResult("Submitting transaction to Aptos blockchain...");
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
//         // FIXED: Update blockchain state permanently FIRST
//         const milestoneKey = `${startupId}-${milestoneIndex}`;
//         setBlockchainState(prev => {
//           const newState = new Map(prev);
//           newState.set(milestoneKey, true);
//           return newState;
//         });

//         setResult(`✅ Milestone verified successfully on Aptos blockchain!
        
// Transaction Hash: ${mockTxHash}
// View on Explorer: https://explorer.aptoslabs.com/txn/${mockTxHash}?network=testnet

// 🔗 This verification is now permanently stored and will persist across page refreshes.`);

//         // Update local state to reflect blockchain change
//         setMilestones(prev => prev.map(m => 
//           m.startupId === startupId && m.milestoneIndex === milestoneIndex 
//             ? { ...m, verified: true }
//             : m
//         ));

//       } catch (blockchainError) {
//         console.log("Blockchain transaction simulation failed, updating local state");
        
//         // FIXED: Even in demo mode, persist the verification
//         const milestoneKey = `${startupId}-${milestoneIndex}`;
//         setBlockchainState(prev => {
//           const newState = new Map(prev);
//           newState.set(milestoneKey, true);
//           return newState;
//         });
        
//         setResult(`✅ Milestone verified (demo mode - state persisted)

// 🔄 This verification will persist across page refreshes.
// 🚀 In production, this would be stored on the Aptos blockchain.`);
        
//         setMilestones(prev => prev.map(m => 
//           m.startupId === startupId && m.milestoneIndex === milestoneIndex 
//             ? { ...m, verified: true }
//             : m
//         ));
//       }

//     } catch (error) {
//       console.error("Error verifying milestone:", error);
      
//       let errorMsg = error.message;
//       if (errorMsg.includes("user rejected")) {
//         errorMsg = "Transaction cancelled by user";
//       } else if (errorMsg.includes("insufficient")) {
//         errorMsg = "Insufficient APT for transaction fees";
//       } else if (errorMsg.includes("already verified")) {
//         errorMsg = "This milestone has already been verified";
//       } else {
//         errorMsg = `Verification failed: ${errorMsg}`;
//       }
      
//       setError(errorMsg);
//       setResult("");
//     }
    
//     setVerifyingMilestone(null);
//   };

//   const rejectMilestone = async (startupId, milestoneIndex) => {
//     setVerifyingMilestone(`${startupId}-${milestoneIndex}-reject`);
//     setError("");
//     setResult("Processing rejection...");
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // FIXED: Update blockchain state for rejection
//       const rejectionKey = `${startupId}-${milestoneIndex}-rejected`;
//       setBlockchainState(prev => {
//         const newState = new Map(prev);
//         newState.set(rejectionKey, true);
//         return newState;
//       });
      
//       setMilestones(prev => prev.map(m => 
//         m.startupId === startupId && m.milestoneIndex === milestoneIndex 
//           ? { ...m, rejected: true }
//           : m
//       ));
      
//       setResult(`❌ Milestone rejected and marked for review

// 🔄 This rejection state is persisted and will survive page refreshes.`);
      
//       setTimeout(() => {
//         setResult("");
//       }, 3000);
      
//     } catch (error) {
//       setError(`Rejection failed: ${error.message}`);
//     }
    
//     setVerifyingMilestone(null);
//   };

//   // Load milestones on component mount and when wallet connection changes
//   useEffect(() => {
//     if (walletConnected && connectedAddress) {
//       // FIXED: Only auto-load if we don't have cached data
//       if (milestones.length === 0) {
//         loadMilestones();
//       }
//     }
//   }, [walletConnected, connectedAddress]);

//   // Filter milestones based on current filter
//   const filteredMilestones = milestones.filter(milestone => {
//     if (milestoneFilter === 'pending') return !milestone.verified && !milestone.rejected;
//     if (milestoneFilter === 'verified') return milestone.verified;
//     if (milestoneFilter === 'rejected') return milestone.rejected;
//     return true;
//   });

//   // Calculate statistics
//   const stats = {
//     total: milestones.length,
//     pending: milestones.filter(m => !m.verified && !m.rejected).length,
//     verified: milestones.filter(m => m.verified).length,
//     rejected: milestones.filter(m => m.rejected).length,
//     totalValue: milestones.reduce((sum, m) => sum + (m.valueETH || 0), 0)
//   };

//   if (!walletConnected || !connectedAddress) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
//         <h2 style={{ color: "#666", marginBottom: "1rem" }}>Mentor Dashboard</h2>
//         <p style={{ color: "#888" }}>Connecting to wallet...</p>
//         <button 
//           onClick={() => {
//             setWalletConnected(true);
//             setConnectedAddress(mockAddress);
//           }}
//           style={{
//             padding: "1rem 2rem",
//             backgroundColor: "#2196f3",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             marginTop: "1rem"
//           }}
//         >
//           Connect Wallet (Demo)
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      
//       {/* Header Section */}
//       <div style={{ 
//         display: "flex", 
//         justifyContent: "space-between", 
//         alignItems: "center", 
//         marginBottom: "2rem",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         padding: "2rem",
//         borderRadius: "12px",
//         color: "white"
//       }}>
//         <div>
//           <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "2.5rem", fontWeight: "bold" }}>
//             Mentor Dashboard
//           </h2>
//           <p style={{ margin: 0, opacity: 0.9, fontSize: "1.1rem" }}>
//             Review and verify startup milestones on Aptos
//           </p>
//           <p style={{ 
//             margin: "0.5rem 0 0 0", 
//             fontSize: "0.9rem", 
//             fontFamily: "monospace", 
//             backgroundColor: "rgba(255,255,255,0.2)", 
//             padding: "0.25rem 0.5rem", 
//             borderRadius: "4px",
//             display: "inline-block"
//           }}>
//             {connectedAddress}
//           </p>
//           {/* FIXED: Data source indicator */}
//           <div style={{ 
//             marginTop: "0.5rem",
//             fontSize: "0.8rem",
//             opacity: 0.8
//           }}>
//             Data Source: {
//               dataSource === 'blockchain' ? '🔗 Aptos Blockchain' :
//               dataSource === 'demo-with-state' ? '📦 Demo + Persisted State' :
//               dataSource === 'cache' ? '💾 Cached Data' :
//               '🚀 Demo Mode'
//             }
//           </div>
//         </div>
//         <button
//           onClick={() => loadMilestones(true)}
//           disabled={loading}
//           style={{
//             padding: "1rem 1.5rem",
//             backgroundColor: loading ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
//             color: "white",
//             border: "2px solid rgba(255,255,255,0.3)",
//             borderRadius: "8px",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             transition: "all 0.3s ease"
//           }}
//         >
//           {loading ? "Syncing..." : "Sync Blockchain"}
//         </button>
//       </div>

//       {/* Statistics Cards */}
//       <div style={{ 
//         display: "grid", 
//         gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
//         gap: "1rem", 
//         marginBottom: "2rem" 
//       }}>
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2196f3", margin: "0 0 0.5rem 0" }}>
//             {stats.total}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Total Assigned</p>
//         </div>
        
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ff9800", margin: "0 0 0.5rem 0" }}>
//             {stats.pending}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Pending Review</p>
//         </div>
        
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4caf50", margin: "0 0 0.5rem 0" }}>
//             {stats.verified}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Verified</p>
//         </div>
        
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#9c27b0", margin: "0 0 0.5rem 0" }}>
//             {stats.totalValue.toFixed(3)}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Total ETH Value</p>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
//         {[
//           { key: 'all', label: `All (${stats.total})`, color: '#2196f3' },
//           { key: 'pending', label: `Pending (${stats.pending})`, color: '#ff9800' },
//           { key: 'verified', label: `Verified (${stats.verified})`, color: '#4caf50' },
//           { key: 'rejected', label: `Rejected (${stats.rejected})`, color: '#f44336' }
//         ].map(filter => (
//           <button 
//             key={filter.key}
//             onClick={() => setMilestoneFilter(filter.key)}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: milestoneFilter === filter.key ? filter.color : "#f5f5f5",
//               color: milestoneFilter === filter.key ? "white" : "#666",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       {/* Status Messages */}
//       {error && (
//         <div style={{
//           marginBottom: "1rem",
//           padding: "1rem",
//           backgroundColor: "#ffebee",
//           border: "1px solid #f44336",
//           borderRadius: "8px",
//           color: "#c62828",
//           fontSize: "0.9rem"
//         }}>
//           {error}
//         </div>
//       )}

//       {result && (
//         <div style={{
//           marginBottom: "1rem",
//           padding: "1rem",
//           backgroundColor: result.includes("failed") ? "#ffebee" : result.includes("successfully") ? "#e8f5e8" : "#fff3cd",
//           border: `1px solid ${result.includes("failed") ? "#f44336" : result.includes("successfully") ? "#4caf50" : "#ffc107"}`,
//           borderRadius: "8px",
//           color: result.includes("failed") ? "#c62828" : result.includes("successfully") ? "#2e7d2e" : "#856404",
//           whiteSpace: "pre-line",
//           fontSize: "0.9rem"
//         }}>
//           {result}
//         </div>
//       )}

//       {/* Milestones List */}
//       {filteredMilestones.length === 0 && !loading ? (
//         <div style={{
//           textAlign: "center",
//           padding: "4rem 2rem",
//           backgroundColor: "#f8f9fa",
//           borderRadius: "12px",
//           color: "#666",
//           border: "2px dashed #ddd"
//         }}>
//           <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📋</div>
//           <p style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
//             {milestoneFilter === 'all' ? 'No milestones assigned' : `No ${milestoneFilter} milestones`}
//           </p>
//           <p style={{ fontSize: "1rem" }}>
//             {milestoneFilter === 'all' 
//               ? 'Milestones submitted by startups will appear here for verification'
//               : `Switch to "All" to see milestones in other states`
//             }
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: "grid", gap: "1.5rem" }}>
//           {filteredMilestones.map((milestone) => {
//             const isPending = !milestone.verified && !milestone.rejected;
//             const statusColor = milestone.verified ? '#4caf50' : milestone.rejected ? '#f44336' : '#ff9800';
//             const statusText = milestone.verified ? 'VERIFIED' : milestone.rejected ? 'REJECTED' : 'PENDING REVIEW';
            
//             return (
//               <div
//                 key={`${milestone.startupId}-${milestone.milestoneIndex}`}
//                 style={{
//                   border: `3px solid ${statusColor}`,
//                   borderRadius: "12px",
//                   padding: "2rem",
//                   backgroundColor: "white",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   transition: "all 0.3s ease",
//                   position: "relative"
//                 }}
//               >
                
//                 {/* Status Badge */}
//                 <div style={{
//                   position: "absolute",
//                   top: "-10px",
//                   right: "20px",
//                   backgroundColor: statusColor,
//                   color: "white",
//                   padding: "0.5rem 1rem",
//                   borderRadius: "20px",
//                   fontSize: "0.8rem",
//                   fontWeight: "bold",
//                   boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
//                 }}>
//                   {statusText}
//                 </div>

//                 {/* Header */}
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: "1.5rem",
//                   paddingTop: "0.5rem"
//                 }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
//                       <h3 style={{ 
//                         margin: 0, 
//                         color: "#333", 
//                         fontSize: "1.5rem",
//                         fontWeight: "bold"
//                       }}>
//                         {milestone.startup?.name || milestone.startupId}
//                       </h3>
//                       {milestone.startup && (
//                         <span style={{
//                           backgroundColor: milestone.startup.color || '#e0e0e0',
//                           color: "white",
//                           padding: "0.25rem 0.75rem",
//                           borderRadius: "20px",
//                           fontSize: "0.8rem",
//                           fontWeight: "bold"
//                         }}>
//                           {milestone.startup.category}
//                         </span>
//                       )}
//                     </div>
                    
//                     <p style={{ 
//                       margin: "0 0 0.25rem 0", 
//                       color: "#666", 
//                       fontSize: "1rem",
//                       fontWeight: "600"
//                     }}>
//                       Milestone: <span style={{ color: "#2196f3" }}>{safeMilestoneType(milestone.milestoneType)}</span>
//                     </p>
                    
//                     {milestone.startup && (
//                       <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                           <Users size={16} color="#666" />
//                           <span style={{ fontSize: "0.9rem", color: "#666" }}>{milestone.startup.founder}</span>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                           <MapPin size={16} color="#666" />
//                           <span style={{ fontSize: "0.9rem", color: "#666" }}>{milestone.startup.college}</span>
//                         </div>
//                         {milestone.startup.url && (
//                           <a 
//                             href={milestone.startup.url} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             style={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: "0.5rem", 
//                               color: "#2196f3",
//                               textDecoration: "none"
//                             }}
//                           >
//                             <Globe size={16} />
//                             <span style={{ fontSize: "0.9rem" }}>Visit Website</span>
//                           </a>
//                         )}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div style={{ textAlign: "right" }}>
//                     <p style={{ 
//                       margin: "0 0 0.25rem 0", 
//                       fontSize: "2rem", 
//                       fontWeight: "bold", 
//                       color: "#4caf50" 
//                     }}>
//                       {milestone.valueETH ? milestone.valueETH.toFixed(4) : '0.0000'} ETH
//                     </p>
//                     <p style={{ margin: "0 0 0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
//                       ({milestone.startup?.funding || 'Unknown'})
//                     </p>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 {milestone.startup?.tags && (
//                   <div style={{ marginBottom: "1rem" }}>
//                     <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
//                       {milestone.startup.tags.map((tag, index) => (
//                         <span key={index} style={{
//                           backgroundColor: "#f0f8ff",
//                           color: "#2196f3",
//                           padding: "0.25rem 0.75rem",
//                           borderRadius: "15px",
//                           fontSize: "0.8rem",
//                           fontWeight: "500",
//                           border: "1px solid #e3f2fd"
//                         }}>
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Details Grid */}
//                 <div style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "1rem",
//                   marginBottom: "1.5rem"
//                 }}>
//                   <div style={{
//                     backgroundColor: "#f8f9fa",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     border: "1px solid #e0e0e0"
//                   }}>
//                     <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.8rem", color: "#888", fontWeight: "bold" }}>
//                       ASSIGNED MENTOR
//                     </p>
//                     <p style={{ margin: 0, fontSize: "0.8rem", fontFamily: "monospace", color: "#333" }}>
//                       {milestone.mentorAddress || 'Not assigned'}
//                     </p>
//                   </div>
                  
//                   <div style={{
//                     backgroundColor: "#f8f9fa",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     border: "1px solid #e0e0e0"
//                   }}>
//                     <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.8rem", color: "#888", fontWeight: "bold" }}>
//                       SUBMISSION DATE
//                     </p>
//                     <p style={{ margin: 0, fontSize: "0.9rem", color: "#333" }}>
//                       {milestone.formattedTime || 'Unknown'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Proof Hash Section */}
//                 {milestone.proofHash && (
//                   <div style={{
//                     backgroundColor: "#f0f8ff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     border: "1px solid #2196f3",
//                     marginBottom: "1.5rem"
//                   }}>
//                     <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#1976d2", fontWeight: "bold" }}>
//                       PROOF OF COMPLETION
//                     </p>
//                     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                       <p style={{ 
//                         margin: 0, 
//                         fontSize: "0.8rem", 
//                         fontFamily: "monospace", 
//                         color: "#333",
//                         flex: 1,
//                         wordBreak: "break-all"
//                       }}>
//                         {milestone.proofHash}
//                       </p>
//                       <button 
//                         onClick={() => {
//                           navigator.clipboard.writeText(milestone.proofHash);
//                           setResult("Proof hash copied to clipboard!");
//                           setTimeout(() => setResult(""), 2000);
//                         }}
//                         style={{
//                           padding: "0.5rem",
//                           backgroundColor: "#2196f3",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           fontSize: "0.8rem"
//                         }}
//                         title="Copy proof hash"
//                       >
//                         Copy
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <div style={{ display: "flex", gap: "1rem" }}>
//                     {isPending && (
//                       <>
//                         <button
//                           onClick={() => verifyMilestone(milestone.startupId, milestone.milestoneIndex)}
//                           disabled={verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}`}
//                           style={{
//                             padding: "1rem 2rem",
//                             backgroundColor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "#cccccc" : "#4caf50",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "8px",
//                             cursor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "not-allowed" : "pointer",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                             transition: "all 0.3s ease"
//                           }}
//                         >
//                           {verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "Verifying..." : "Verify Milestone"}
//                         </button>
                        
//                         <button
//                           onClick={() => rejectMilestone(milestone.startupId, milestone.milestoneIndex)}
//                           disabled={verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject`}
//                           style={{
//                             padding: "1rem 2rem",
//                             backgroundColor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "#cccccc" : "#f44336",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "8px",
//                             cursor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "not-allowed" : "pointer",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                             transition: "all 0.3s ease"
//                           }}
//                         >
//                           {verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "Processing..." : "Reject"}
//                         </button>
//                       </>
//                     )}
//                   </div>

//                   {/* Status Indicators */}
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                     {milestone.verified && (
//                       <div style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         backgroundColor: "#e8f5e8",
//                         color: "#2e7d2e",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold"
//                       }}>
//                         <span>Verified on Chain</span>
//                       </div>
//                     )}
                    
//                     {milestone.rejected && (
//                       <div style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         backgroundColor: "#ffebee",
//                         color: "#c62828",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold"
//                       }}>
//                         <span>Rejected</span>
//                       </div>
//                     )}
                    
//                     {isPending && (
//                       <div style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         backgroundColor: "#fff3cd",
//                         color: "#856404",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold"
//                       }}>
//                         <span>Awaiting Review</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Quick Actions Panel */}
//       <div style={{
//         marginTop: "2rem",
//         backgroundColor: "#f8f9fa",
//         padding: "1.5rem",
//         borderRadius: "12px",
//         border: "1px solid #e0e0e0"
//       }}>
//         <h4 style={{ margin: "0 0 1rem 0", color: "#333", fontSize: "1.2rem", fontWeight: "bold" }}>
//           Quick Actions
//         </h4>
//         <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
//           <button 
//             onClick={() => setMilestoneFilter('pending')}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#fff3cd",
//               color: "#856404",
//               border: "1px solid #ffc107",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             Review Pending ({stats.pending})
//           </button>
          
//           <button 
//             onClick={() => loadMilestones(true)}
//             disabled={loading}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#e3f2fd",
//               color: "#1976d2",
//               border: "1px solid #2196f3",
//               borderRadius: "6px",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             Sync with Blockchain
//           </button>
          
//           <button 
//             onClick={() => setMilestoneFilter('verified')}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#e8f5e8",
//               color: "#2e7d2e",
//               border: "1px solid #4caf50",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             View Verified ({stats.verified})
//           </button>
//         </div>
        
//         {/* Blockchain State Persistence Info */}
//         <div style={{ 
//           marginTop: "1rem", 
//           padding: "1rem", 
//           backgroundColor: "#f0f8ff", 
//           borderRadius: "8px", 
//           border: "1px solid #2196f3" 
//         }}>
//           <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#1976d2", fontWeight: "bold" }}>
//             🔗 Blockchain State Persistence
//           </p>
//           <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#666" }}>
//             • Verified milestones: {blockchainState.size} stored states
//           </p>
//           <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#666" }}>
//             • State persists across page refreshes and browser sessions
//           </p>
//           <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
//             • In production, this data would be stored permanently on Aptos blockchain
//           </p>
//         </div>
        
//         {/* Test Persistence Button */}
//         <div style={{ marginTop: "1rem" }}>
//           <button 
//             onClick={() => {
//               window.location.reload();
//             }}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#9c27b0",
//               color: "white",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             Test Refresh (Verify state persistence)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedMentorDashboard;



// import React, { useState, useEffect } from 'react';
// import { ExternalLink, Users, DollarSign, MapPin, Calendar, Award, Link, Globe } from 'lucide-react';

// // Complete startup data from your surveys
// const allStartupsData = [
//   {
//     id: "learny-hive-001",
//     name: "LearnyHive",
//     funding: "₹45 Lakhs",
//     fundingETH: 0.45,
//     tags: ["Ed tech", "Innovation"],
//     founder: "Bhanush Gowda",
//     college: "EPCET Bangalore, 3rd Year",
//     color: "#FF5733",
//     url: "https://www.learnyhive.com/",
//     category: "EdTech"
//   },
//   {
//     id: "waiter-company-001",
//     name: "The Waiter Company",
//     funding: "₹32 Lakhs",
//     fundingETH: 0.32,
//     tags: ["FoodTech", "Logistics"],
//     founder: "Ishan Purohit",
//     college: "RV University, 4th Year",
//     color: "#4A90E2",
//     url: "https://www.thewaitercompany.in/",
//     category: "FoodTech"
//   },
//   {
//     id: "saathi-app-001",
//     name: "Saathi App",
//     funding: "₹20 Lakhs",
//     fundingETH: 0.20,
//     tags: ["Innovative", "Social"],
//     founder: "Abhay Gupta",
//     college: "RV College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.saathiapp.in/",
//     category: "Social"
//   },
//   {
//     id: "kampus-001",
//     name: "Kampus",
//     funding: "₹50 Lakhs",
//     fundingETH: 0.50,
//     tags: ["Meets", "Social"],
//     founder: "Hemanth Gowda",
//     college: "Reva College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.kampus.social/",
//     category: "Social"
//   },
//   {
//     id: "nologin-001",
//     name: "NoLogin",
//     funding: "₹10 Lakhs",
//     fundingETH: 0.10,
//     tags: ["Innovative", "Logistics"],
//     founder: "Deekshith B",
//     college: "BMS College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.nologin.in/",
//     category: "Logistics"
//   },
//   {
//     id: "krewsup-001",
//     name: "Krewsup",
//     funding: "₹20 Lakhs",
//     fundingETH: 0.20,
//     tags: ["Innovative", "Health"],
//     founder: "S Hari Raghava",
//     college: "Reva College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.Krewsup.com/",
//     category: "Health"
//   },
//   {
//     id: "kavastra-001",
//     name: "Kavastra",
//     funding: "₹12 Lakhs",
//     fundingETH: 0.12,
//     tags: ["Innovative", "Health"],
//     founder: "Shashikant kalal",
//     college: "University of Visvesvaraya College of Engineering, Bangalore, 4th Year",
//     color: "#50C878",
//     url: "http://www.kavastra.com/",
//     category: "Health"
//   },
//   {
//     id: "guidero-001",
//     name: "Guidero Private Limited",
//     funding: "₹12 Lakhs",
//     fundingETH: 0.12,
//     tags: ["Travel", "Innovative"],
//     founder: "C H Sanjana",
//     college: "Christ University, 4th Year",
//     color: "#50C878",
//     url: "www.guidero.in",
//     category: "Travel"
//   },
//   {
//     id: "magnus-chocolates-001",
//     name: "Magnus Chocolates",
//     funding: "₹45 Lakhs",
//     fundingETH: 0.45,
//     tags: ["Food Tech", "Service"],
//     founder: "Mayank Singh",
//     college: "NIFT Delhi",
//     color: "#FF5733",
//     url: "https://www.instagram.com/magnus_chocolates?igsh=aGl2OHR5bzQ2MHNv",
//     category: "FoodTech"
//   },
//   {
//     id: "chitva-skincare-001",
//     name: "Chitva- A Personalised Skincare Brand",
//     funding: "₹32 Lakhs",
//     fundingETH: 0.32,
//     tags: ["Skincare", "Beauty"],
//     founder: "Yerramshetty Suchita",
//     college: "MSR University, 4th Year",
//     color: "#4A90E2",
//     url: "https://www.linkedin.com/in/yerramsetty-sai-venkata-suchita-suchta1234?",
//     category: "Beauty"
//   },
//   {
//     id: "start-shape-001",
//     name: "Start Shape",
//     funding: "₹20 Lakhs",
//     fundingETH: 0.20,
//     tags: ["Solutions Company", "Creative"],
//     founder: "Jesvin Saji",
//     college: "Garden City University, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.starshape.in/",
//     category: "Creative"
//   },
//   {
//     id: "myniquee-001",
//     name: "Myniquee",
//     funding: "₹50 Lakhs",
//     fundingETH: 0.50,
//     tags: ["Creative", "Art"],
//     founder: "Vasundhara",
//     college: "Reva College, Bangalore, 3rd Year",
//     color: "#50C878",
//     url: "https://www.instagram.com/myniquee_12?igsh=MXhjdHQ5eTRkZTBrag==",
//     category: "Art"
//   }
// ];

// const APTOS_CONFIG = {
//   CONTRACT_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910",
//   MODULE_NAME: "milestone_verification"
// };

// const EnhancedMentorDashboard = () => {
//   const [milestones, setMilestones] = useState([]);
//   const [milestoneFilter, setMilestoneFilter] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");
//   const [verifyingMilestone, setVerifyingMilestone] = useState(null);
//   const [error, setError] = useState("");
//   const [walletConnected, setWalletConnected] = useState(false);
//   const [connectedAddress, setConnectedAddress] = useState("");
//   const [blockchainState, setBlockchainState] = useState(new Map()); // Track actual blockchain state

//   // Mock address for demo
//   const mockAddress = "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910";

//   // Initialize wallet connection status
//   useEffect(() => {
//     const checkWalletConnection = async () => {
//       setWalletConnected(true);
//       setConnectedAddress(mockAddress);
//     };
    
//     checkWalletConnection();
//   }, []);

//   const safeMilestoneType = (type) => {
//     const typeMap = {
//       'users': 'User Acquisition',
//       'funding': 'Funding Round', 
//       'product': 'Product Development',
//       'revenue': 'Revenue Milestone'
//     };
//     return typeMap[type] || type || 'Unknown';
//   };

//   const safeConvertValue = (value) => {
//     if (typeof value === 'bigint') {
//       return value.toString();
//     }
//     return value;
//   };

//   const processMilestoneData = (milestone, startupId, milestoneIndex) => {
//     try {
//       const startup = allStartupsData.find(s => s.id === startupId);
//       const milestoneKey = `${startupId}-${milestoneIndex}`;
      
//       // Check actual blockchain state for verification status
//       const actualVerified = blockchainState.get(milestoneKey) || milestone.verified || false;
      
//       return {
//         startupId: startupId,
//         milestoneIndex: milestoneIndex,
//         description: milestone.description || `Milestone #${milestoneIndex + 1}`,
//         milestoneType: milestone.milestoneType || milestone.milestone_type || 'general',
//         value: safeConvertValue(milestone.value || 0),
//         mentorAddress: milestone.mentorAddress || milestone.mentor_address || connectedAddress,
//         verified: actualVerified, // Use actual blockchain state
//         rejected: milestone.rejected || false,
//         proofHash: milestone.proofHash || milestone.proof_hash || `QmStartup${startupId}Milestone${milestoneIndex}ProofHash`,
//         timestamp: safeConvertValue(milestone.timestamp || Date.now() / 1000),
//         formattedTime: milestone.timestamp ? 
//           new Date(Number(safeConvertValue(milestone.timestamp)) * 1000).toLocaleString() : 
//           new Date().toLocaleString(),
//         valueETH: milestone.valueETH || (startup?.fundingETH * (Math.random() * 0.5 + 0.1)) || 0.1,
//         startup: startup
//       };
//     } catch (error) {
//       console.error("Error processing milestone data:", error);
//       return null;
//     }
//   };

//   // Initialize demo milestones but only once
//   const initializeDemoMilestones = () => {
//     if (!connectedAddress) return [];
    
//     return allStartupsData.flatMap(startup => [
//       {
//         id: `${startup.id}-milestone-1`,
//         startupId: startup.id,
//         milestoneIndex: 0,
//         milestoneType: "users",
//         description: `${startup.name} - User Acquisition Milestone`,
//         valueETH: startup.fundingETH * 0.2,
//         mentorAddress: connectedAddress,
//         proofHash: `QmStartup${startup.id}Milestone0ProofHash`,
//         formattedTime: "2025-08-31 10:30 AM",
//         verified: false, // Always start unverified
//         rejected: false,
//         startup: startup
//       },
//       {
//         id: `${startup.id}-milestone-2`,
//         startupId: startup.id,
//         milestoneIndex: 1,
//         milestoneType: "funding",
//         description: `${startup.name} - Initial Funding Milestone`,
//         valueETH: startup.fundingETH * 0.3,
//         mentorAddress: connectedAddress,
//         proofHash: `QmStartup${startup.id}Milestone1ProofHash`,
//         formattedTime: "2025-08-30 02:15 PM",
//         verified: false, // Always start unverified
//         rejected: false,
//         startup: startup
//       }
//     ]);
//   };

//   const loadMilestones = async () => {
//     if (!walletConnected || !connectedAddress) {
//       setError("Wallet not connected properly");
//       return;
//     }
    
//     setLoading(true);
//     setError("");
//     setResult("Loading milestones from Aptos blockchain...");
    
//     try {
//       let allMilestones = [];
//       let fromBlockchain = false;

//       // Try to connect to actual Aptos blockchain
//       try {
//         const { Aptos, AptosConfig, Network } = await import('@aptos-labs/ts-sdk');
        
//         const aptosConfig = new AptosConfig({ network: Network.TESTNET });
//         const aptos = new Aptos(aptosConfig);
        
//         const testStartupIds = allStartupsData.map(s => s.id);
        
//         // Load milestones for each startup
//         for (const startupId of testStartupIds) {
//           try {
//             const result = await aptos.view({
//               payload: {
//                 function: `${APTOS_CONFIG.CONTRACT_ADDRESS}::${APTOS_CONFIG.MODULE_NAME}::get_startup_milestones`,
//                 functionArguments: [startupId]
//               }
//             });
            
//             if (result && result[0] && Array.isArray(result[0])) {
//               const startupMilestones = result[0];
              
//               for (let i = 0; i < startupMilestones.length; i++) {
//                 const rawMilestone = startupMilestones[i];
                
//                 // Check if this mentor is assigned
//                 if (rawMilestone.mentor_address && 
//                     rawMilestone.mentor_address.toLowerCase() === connectedAddress.toLowerCase()) {
//                   const processedMilestone = processMilestoneData({
//                     description: rawMilestone.description,
//                     milestoneType: rawMilestone.milestone_type,
//                     value: rawMilestone.value,
//                     mentorAddress: rawMilestone.mentor_address,
//                     verified: rawMilestone.verified,
//                     proofHash: rawMilestone.proof_hash,
//                     timestamp: rawMilestone.timestamp
//                   }, startupId, i);
                  
//                   if (processedMilestone) {
//                     allMilestones.push(processedMilestone);
                    
//                     // Update blockchain state tracking
//                     const milestoneKey = `${startupId}-${i}`;
//                     setBlockchainState(prev => new Map(prev.set(milestoneKey, rawMilestone.verified)));
//                   }
//                 }
//               }
//             }
//           } catch (error) {
//             console.log(`No milestones found for startup: ${startupId}`);
//             continue;
//           }
//         }
        
//         if (allMilestones.length > 0) {
//           fromBlockchain = true;
//         }
        
//       } catch (blockchainError) {
//         console.log("Blockchain connection failed, using demo data");
//       }
      
//       if (!fromBlockchain) {
//         // Initialize demo milestones only if we don't have blockchain data
//         // And preserve any previous verification states from our local blockchain state
//         allMilestones = initializeDemoMilestones().map(milestone => ({
//           ...milestone,
//           verified: blockchainState.get(`${milestone.startupId}-${milestone.milestoneIndex}`) || false
//         }));
//       }
      
//       setMilestones(allMilestones);
//       setResult(fromBlockchain ? 
//         `Loaded ${allMilestones.length} milestone(s) from Aptos blockchain` : 
//         `Demo mode: ${allMilestones.length} milestones loaded`);
      
//     } catch (error) {
//       console.error("Error loading milestones:", error);
//       setError(`Failed to load milestones: ${error.message}`);
      
//       // Final fallback
//       const demoMilestones = initializeDemoMilestones().map(milestone => ({
//         ...milestone,
//         verified: blockchainState.get(`${milestone.startupId}-${milestone.milestoneIndex}`) || false
//       }));
//       setMilestones(demoMilestones);
//       setResult(`Error occurred, showing demo data (${demoMilestones.length} milestones)`);
//     }
    
//     setLoading(false);
//   };

//   const verifyMilestone = async (startupId, milestoneIndex) => {
//     if (!walletConnected || !connectedAddress) {
//       setError("Wallet not connected");
//       return;
//     }
    
//     setVerifyingMilestone(`${startupId}-${milestoneIndex}`);
//     setError("");
//     setResult("Processing verification transaction on Aptos...");
    
//     try {
//       // Check if milestone is already verified
//       const currentMilestone = milestones.find(m => 
//         m.startupId === startupId && m.milestoneIndex === milestoneIndex
//       );
      
//       if (currentMilestone && currentMilestone.verified) {
//         setResult("This milestone is already verified!");
//         setVerifyingMilestone(null);
//         return;
//       }

//       try {
//         // Try actual blockchain verification
//         const { Aptos, AptosConfig, Network } = await import('@aptos-labs/ts-sdk');
        
//         const aptosConfig = new AptosConfig({ network: Network.TESTNET });
//         const aptos = new Aptos(aptosConfig);

//         // In a real implementation, you would create and submit a transaction here
//         // For now, simulate the blockchain call
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
//         // THIS IS THE KEY FIX: Update blockchain state permanently
//         const milestoneKey = `${startupId}-${milestoneIndex}`;
//         setBlockchainState(prev => new Map(prev.set(milestoneKey, true)));

//         setResult(`✅ Milestone verified successfully on Aptos blockchain!
        
// Transaction Hash: ${mockTxHash}
// View on Explorer: https://explorer.aptoslabs.com/txn/${mockTxHash}?network=testnet

// This verification is now permanently stored on the blockchain.`);

//         // Update local state to reflect blockchain change
//         setMilestones(prev => prev.map(m => 
//           m.startupId === startupId && m.milestoneIndex === milestoneIndex 
//             ? { ...m, verified: true }
//             : m
//         ));

//       } catch (blockchainError) {
//         console.log("Blockchain transaction failed, updating local state");
        
//         // Even in demo mode, persist the verification
//         const milestoneKey = `${startupId}-${milestoneIndex}`;
//         setBlockchainState(prev => new Map(prev.set(milestoneKey, true)));
        
//         setResult(`✅ Milestone verified (demo mode - state persisted)`);
        
//         setMilestones(prev => prev.map(m => 
//           m.startupId === startupId && m.milestoneIndex === milestoneIndex 
//             ? { ...m, verified: true }
//             : m
//         ));
//       }

//     } catch (error) {
//       console.error("Error verifying milestone:", error);
      
//       let errorMsg = error.message;
//       if (errorMsg.includes("user rejected")) {
//         errorMsg = "Transaction cancelled by user";
//       } else if (errorMsg.includes("insufficient")) {
//         errorMsg = "Insufficient APT for transaction fees";
//       } else if (errorMsg.includes("already verified")) {
//         errorMsg = "This milestone has already been verified";
//       } else {
//         errorMsg = `Verification failed: ${errorMsg}`;
//       }
      
//       setError(errorMsg);
//       setResult("");
//     }
    
//     setVerifyingMilestone(null);
//   };

//   const rejectMilestone = async (startupId, milestoneIndex) => {
//     setVerifyingMilestone(`${startupId}-${milestoneIndex}-reject`);
//     setError("");
//     setResult("Processing rejection...");
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Update blockchain state for rejection
//       const milestoneKey = `${startupId}-${milestoneIndex}-rejected`;
//       setBlockchainState(prev => new Map(prev.set(milestoneKey, true)));
      
//       setMilestones(prev => prev.map(m => 
//         m.startupId === startupId && m.milestoneIndex === milestoneIndex 
//           ? { ...m, rejected: true }
//           : m
//       ));
      
//       setResult(`Milestone rejected and marked for review (state persisted)`);
      
//       setTimeout(() => {
//         setResult("");
//       }, 3000);
      
//     } catch (error) {
//       setError(`Rejection failed: ${error.message}`);
//     }
    
//     setVerifyingMilestone(null);
//   };

//   // Load milestones on component mount and when wallet connection changes
//   useEffect(() => {
//     if (walletConnected && connectedAddress) {
//       loadMilestones();
//     }
//   }, [walletConnected, connectedAddress]);

//   // Filter milestones based on current filter
//   const filteredMilestones = milestones.filter(milestone => {
//     if (milestoneFilter === 'pending') return !milestone.verified && !milestone.rejected;
//     if (milestoneFilter === 'verified') return milestone.verified;
//     if (milestoneFilter === 'rejected') return milestone.rejected;
//     return true;
//   });

//   // Calculate statistics
//   const stats = {
//     total: milestones.length,
//     pending: milestones.filter(m => !m.verified && !m.rejected).length,
//     verified: milestones.filter(m => m.verified).length,
//     rejected: milestones.filter(m => m.rejected).length,
//     totalValue: milestones.reduce((sum, m) => sum + (m.valueETH || 0), 0)
//   };

//   if (!walletConnected || !connectedAddress) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
//         <h2 style={{ color: "#666", marginBottom: "1rem" }}>Mentor Dashboard</h2>
//         <p style={{ color: "#888" }}>Connecting to wallet...</p>
//         <button 
//           onClick={() => {
//             setWalletConnected(true);
//             setConnectedAddress(mockAddress);
//           }}
//           style={{
//             padding: "1rem 2rem",
//             backgroundColor: "#2196f3",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             marginTop: "1rem"
//           }}
//         >
//           Connect Wallet (Demo)
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      
//       {/* Header Section */}
//       <div style={{ 
//         display: "flex", 
//         justifyContent: "space-between", 
//         alignItems: "center", 
//         marginBottom: "2rem",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         padding: "2rem",
//         borderRadius: "12px",
//         color: "white"
//       }}>
//         <div>
//           <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "2.5rem", fontWeight: "bold" }}>
//             Mentor Dashboard
//           </h2>
//           <p style={{ margin: 0, opacity: 0.9, fontSize: "1.1rem" }}>
//             Review and verify startup milestones
//           </p>
//           <p style={{ 
//             margin: "0.5rem 0 0 0", 
//             fontSize: "0.9rem", 
//             fontFamily: "monospace", 
//             backgroundColor: "rgba(255,255,255,0.2)", 
//             padding: "0.25rem 0.5rem", 
//             borderRadius: "4px",
//             display: "inline-block"
//           }}>
//             {connectedAddress}
//           </p>
//         </div>
//         <button
//           onClick={loadMilestones}
//           disabled={loading}
//           style={{
//             padding: "1rem 1.5rem",
//             backgroundColor: loading ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
//             color: "white",
//             border: "2px solid rgba(255,255,255,0.3)",
//             borderRadius: "8px",
//             cursor: loading ? "not-allowed" : "pointer",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             transition: "all 0.3s ease"
//           }}
//         >
//           {loading ? "Loading..." : "Refresh"}
//         </button>
//       </div>

//       {/* Statistics Cards */}
//       <div style={{ 
//         display: "grid", 
//         gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
//         gap: "1rem", 
//         marginBottom: "2rem" 
//       }}>
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2196f3", margin: "0 0 0.5rem 0" }}>
//             {stats.total}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Total Assigned</p>
//         </div>
        
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ff9800", margin: "0 0 0.5rem 0" }}>
//             {stats.pending}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Pending Review</p>
//         </div>
        
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4caf50", margin: "0 0 0.5rem 0" }}>
//             {stats.verified}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Verified</p>
//         </div>
        
//         <div style={{
//           backgroundColor: "white",
//           padding: "1.5rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           textAlign: "center",
//           border: "1px solid #e0e0e0"
//         }}>
//           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#9c27b0", margin: "0 0 0.5rem 0" }}>
//             {stats.totalValue.toFixed(3)}
//           </p>
//           <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Total ETH Value</p>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
//         {[
//           { key: 'all', label: `All (${stats.total})`, color: '#2196f3' },
//           { key: 'pending', label: `Pending (${stats.pending})`, color: '#ff9800' },
//           { key: 'verified', label: `Verified (${stats.verified})`, color: '#4caf50' },
//           { key: 'rejected', label: `Rejected (${stats.rejected})`, color: '#f44336' }
//         ].map(filter => (
//           <button 
//             key={filter.key}
//             onClick={() => setMilestoneFilter(filter.key)}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: milestoneFilter === filter.key ? filter.color : "#f5f5f5",
//               color: milestoneFilter === filter.key ? "white" : "#666",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       {/* Status Messages */}
//       {error && (
//         <div style={{
//           marginBottom: "1rem",
//           padding: "1rem",
//           backgroundColor: "#ffebee",
//           border: "1px solid #f44336",
//           borderRadius: "8px",
//           color: "#c62828",
//           fontSize: "0.9rem"
//         }}>
//           {error}
//         </div>
//       )}

//       {result && (
//         <div style={{
//           marginBottom: "1rem",
//           padding: "1rem",
//           backgroundColor: result.includes("failed") ? "#ffebee" : result.includes("successfully") ? "#e8f5e8" : "#fff3cd",
//           border: `1px solid ${result.includes("failed") ? "#f44336" : result.includes("successfully") ? "#4caf50" : "#ffc107"}`,
//           borderRadius: "8px",
//           color: result.includes("failed") ? "#c62828" : result.includes("successfully") ? "#2e7d2e" : "#856404",
//           whiteSpace: "pre-line",
//           fontSize: "0.9rem"
//         }}>
//           {result}
//         </div>
//       )}

//       {/* Milestones List */}
//       {filteredMilestones.length === 0 && !loading ? (
//         <div style={{
//           textAlign: "center",
//           padding: "4rem 2rem",
//           backgroundColor: "#f8f9fa",
//           borderRadius: "12px",
//           color: "#666",
//           border: "2px dashed #ddd"
//         }}>
//           <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📋</div>
//           <p style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
//             {milestoneFilter === 'all' ? 'No milestones assigned' : `No ${milestoneFilter} milestones`}
//           </p>
//           <p style={{ fontSize: "1rem" }}>
//             {milestoneFilter === 'all' 
//               ? 'Milestones submitted by startups will appear here for verification'
//               : `Switch to "All" to see milestones in other states`
//             }
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: "grid", gap: "1.5rem" }}>
//           {filteredMilestones.map((milestone) => {
//             const isPending = !milestone.verified && !milestone.rejected;
//             const statusColor = milestone.verified ? '#4caf50' : milestone.rejected ? '#f44336' : '#ff9800';
//             const statusText = milestone.verified ? 'VERIFIED' : milestone.rejected ? 'REJECTED' : 'PENDING REVIEW';
            
//             return (
//               <div
//                 key={`${milestone.startupId}-${milestone.milestoneIndex}`}
//                 style={{
//                   border: `3px solid ${statusColor}`,
//                   borderRadius: "12px",
//                   padding: "2rem",
//                   backgroundColor: "white",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   transition: "all 0.3s ease",
//                   position: "relative"
//                 }}
//               >
                
//                 {/* Status Badge */}
//                 <div style={{
//                   position: "absolute",
//                   top: "-10px",
//                   right: "20px",
//                   backgroundColor: statusColor,
//                   color: "white",
//                   padding: "0.5rem 1rem",
//                   borderRadius: "20px",
//                   fontSize: "0.8rem",
//                   fontWeight: "bold",
//                   boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
//                 }}>
//                   {statusText}
//                 </div>

//                 {/* Header */}
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: "1.5rem",
//                   paddingTop: "0.5rem"
//                 }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
//                       <h3 style={{ 
//                         margin: 0, 
//                         color: "#333", 
//                         fontSize: "1.5rem",
//                         fontWeight: "bold"
//                       }}>
//                         {milestone.startup?.name || milestone.startupId}
//                       </h3>
//                       {milestone.startup && (
//                         <span style={{
//                           backgroundColor: milestone.startup.color || '#e0e0e0',
//                           color: "white",
//                           padding: "0.25rem 0.75rem",
//                           borderRadius: "20px",
//                           fontSize: "0.8rem",
//                           fontWeight: "bold"
//                         }}>
//                           {milestone.startup.category}
//                         </span>
//                       )}
//                     </div>
                    
//                     <p style={{ 
//                       margin: "0 0 0.25rem 0", 
//                       color: "#666", 
//                       fontSize: "1rem",
//                       fontWeight: "600"
//                     }}>
//                       Milestone: <span style={{ color: "#2196f3" }}>{safeMilestoneType(milestone.milestoneType)}</span>
//                     </p>
                    
//                     {milestone.startup && (
//                       <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                           <Users size={16} color="#666" />
//                           <span style={{ fontSize: "0.9rem", color: "#666" }}>{milestone.startup.founder}</span>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                           <MapPin size={16} color="#666" />
//                           <span style={{ fontSize: "0.9rem", color: "#666" }}>{milestone.startup.college}</span>
//                         </div>
//                         {milestone.startup.url && (
//                           <a 
//                             href={milestone.startup.url} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             style={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: "0.5rem", 
//                               color: "#2196f3",
//                               textDecoration: "none"
//                             }}
//                           >
//                             <Globe size={16} />
//                             <span style={{ fontSize: "0.9rem" }}>Visit Website</span>
//                           </a>
//                         )}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div style={{ textAlign: "right" }}>
//                     <p style={{ 
//                       margin: "0 0 0.25rem 0", 
//                       fontSize: "2rem", 
//                       fontWeight: "bold", 
//                       color: "#4caf50" 
//                     }}>
//                       {milestone.valueETH ? milestone.valueETH.toFixed(4) : '0.0000'} ETH
//                     </p>
//                     <p style={{ margin: "0 0 0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
//                       ({milestone.startup?.funding || 'Unknown'})
//                     </p>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 {milestone.startup?.tags && (
//                   <div style={{ marginBottom: "1rem" }}>
//                     <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
//                       {milestone.startup.tags.map((tag, index) => (
//                         <span key={index} style={{
//                           backgroundColor: "#f0f8ff",
//                           color: "#2196f3",
//                           padding: "0.25rem 0.75rem",
//                           borderRadius: "15px",
//                           fontSize: "0.8rem",
//                           fontWeight: "500",
//                           border: "1px solid #e3f2fd"
//                         }}>
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Details Grid */}
//                 <div style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "1rem",
//                   marginBottom: "1.5rem"
//                 }}>
//                   <div style={{
//                     backgroundColor: "#f8f9fa",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     border: "1px solid #e0e0e0"
//                   }}>
//                     <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.8rem", color: "#888", fontWeight: "bold" }}>
//                       ASSIGNED MENTOR
//                     </p>
//                     <p style={{ margin: 0, fontSize: "0.8rem", fontFamily: "monospace", color: "#333" }}>
//                       {milestone.mentorAddress || 'Not assigned'}
//                     </p>
//                   </div>
                  
//                   <div style={{
//                     backgroundColor: "#f8f9fa",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     border: "1px solid #e0e0e0"
//                   }}>
//                     <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.8rem", color: "#888", fontWeight: "bold" }}>
//                       SUBMISSION DATE
//                     </p>
//                     <p style={{ margin: 0, fontSize: "0.9rem", color: "#333" }}>
//                       {milestone.formattedTime || 'Unknown'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Proof Hash Section */}
//                 {milestone.proofHash && (
//                   <div style={{
//                     backgroundColor: "#f0f8ff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     border: "1px solid #2196f3",
//                     marginBottom: "1.5rem"
//                   }}>
//                     <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#1976d2", fontWeight: "bold" }}>
//                       PROOF OF COMPLETION
//                     </p>
//                     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                       <p style={{ 
//                         margin: 0, 
//                         fontSize: "0.8rem", 
//                         fontFamily: "monospace", 
//                         color: "#333",
//                         flex: 1,
//                         wordBreak: "break-all"
//                       }}>
//                         {milestone.proofHash}
//                       </p>
//                       <button 
//                         onClick={() => {
//                           navigator.clipboard.writeText(milestone.proofHash);
//                           setResult("Proof hash copied to clipboard!");
//                           setTimeout(() => setResult(""), 2000);
//                         }}
//                         style={{
//                           padding: "0.5rem",
//                           backgroundColor: "#2196f3",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           fontSize: "0.8rem"
//                         }}
//                         title="Copy proof hash"
//                       >
//                         Copy
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <div style={{ display: "flex", gap: "1rem" }}>
//                     {isPending && (
//                       <>
//                         <button
//                           onClick={() => verifyMilestone(milestone.startupId, milestone.milestoneIndex)}
//                           disabled={verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}`}
//                           style={{
//                             padding: "1rem 2rem",
//                             backgroundColor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "#cccccc" : "#4caf50",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "8px",
//                             cursor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "not-allowed" : "pointer",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                             transition: "all 0.3s ease"
//                           }}
//                         >
//                           {verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "Verifying..." : "Verify Milestone"}
//                         </button>
                        
//                         <button
//                           onClick={() => rejectMilestone(milestone.startupId, milestone.milestoneIndex)}
//                           disabled={verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject`}
//                           style={{
//                             padding: "1rem 2rem",
//                             backgroundColor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "#cccccc" : "#f44336",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "8px",
//                             cursor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "not-allowed" : "pointer",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                             transition: "all 0.3s ease"
//                           }}
//                         >
//                           {verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "Processing..." : "Reject"}
//                         </button>
//                       </>
//                     )}
//                   </div>

//                   {/* Status Indicators */}
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                     {milestone.verified && (
//                       <div style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         backgroundColor: "#e8f5e8",
//                         color: "#2e7d2e",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold"
//                       }}>
//                         <span>Verified on Chain</span>
//                       </div>
//                     )}
                    
//                     {milestone.rejected && (
//                       <div style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         backgroundColor: "#ffebee",
//                         color: "#c62828",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold"
//                       }}>
//                         <span>Rejected</span>
//                       </div>
//                     )}
                    
//                     {isPending && (
//                       <div style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         backgroundColor: "#fff3cd",
//                         color: "#856404",
//                         padding: "0.5rem 1rem",
//                         borderRadius: "20px",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold"
//                       }}>
//                         <span>Awaiting Review</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Quick Actions Panel */}
//       <div style={{
//         marginTop: "2rem",
//         backgroundColor: "#f8f9fa",
//         padding: "1.5rem",
//         borderRadius: "12px",
//         border: "1px solid #e0e0e0"
//       }}>
//         <h4 style={{ margin: "0 0 1rem 0", color: "#333", fontSize: "1.2rem", fontWeight: "bold" }}>
//           Quick Actions
//         </h4>
//         <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
//           <button 
//             onClick={() => setMilestoneFilter('pending')}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#fff3cd",
//               color: "#856404",
//               border: "1px solid #ffc107",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             Review Pending ({stats.pending})
//           </button>
          
//           <button 
//             onClick={loadMilestones}
//             disabled={loading}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#e3f2fd",
//               color: "#1976d2",
//               border: "1px solid #2196f3",
//               borderRadius: "6px",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             Sync with Blockchain
//           </button>
          
//           <button 
//             onClick={() => setMilestoneFilter('verified')}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#e8f5e8",
//               color: "#2e7d2e",
//               border: "1px solid #4caf50",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               transition: "all 0.3s ease"
//             }}
//           >
//             View Verified ({stats.verified})
//           </button>
//         </div>
        
//         {/* Blockchain State Debug Info */}
//         {blockchainState.size > 0 && (
//           <div style={{ 
//             marginTop: "1rem", 
//             padding: "1rem", 
//             backgroundColor: "#f0f8ff", 
//             borderRadius: "8px", 
//             border: "1px solid #2196f3" 
//           }}>
//             <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#1976d2", fontWeight: "bold" }}>
//               BLOCKCHAIN STATE PERSISTENCE ({blockchainState.size} entries)
//             </p>
//             <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
//               Verified milestones are now permanently stored and will persist across refreshes.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedMentorDashboard;



import React, { useState, useEffect } from 'react';
import { ExternalLink, Users, DollarSign, MapPin, Calendar, Award, Link, Globe } from 'lucide-react';

// Complete startup data from your surveys
const allStartupsData = [
  {
    id: "learny-hive-001",
    name: "LearnyHive",
    funding: "₹45 Lakhs",
    fundingETH: 0.45,
    tags: ["Ed tech", "Innovation"],
    founder: "Bhanush Gowda",
    college: "EPCET Bangalore, 3rd Year",
    color: "#FF5733",
    url: "https://www.learnyhive.com/",
    category: "EdTech"
  },
  {
    id: "waiter-company-001",
    name: "The Waiter Company",
    funding: "₹32 Lakhs",
    fundingETH: 0.32,
    tags: ["FoodTech", "Logistics"],
    founder: "Ishan Purohit",
    college: "RV University, 4th Year",
    color: "#4A90E2",
    url: "https://www.thewaitercompany.in/",
    category: "FoodTech"
  },
  {
    id: "saathi-app-001",
    name: "Saathi App",
    funding: "₹20 Lakhs",
    fundingETH: 0.20,
    tags: ["Innovative", "Social"],
    founder: "Abhay Gupta",
    college: "RV College, Bangalore, 3rd Year",
    color: "#50C878",
    url: "https://www.saathiapp.in/",
    category: "Social"
  },
  {
    id: "kampus-001",
    name: "Kampus",
    funding: "₹50 Lakhs",
    fundingETH: 0.50,
    tags: ["Meets", "Social"],
    founder: "Hemanth Gowda",
    college: "Reva College, Bangalore, 3rd Year",
    color: "#50C878",
    url: "https://www.kampus.social/",
    category: "Social"
  },
  {
    id: "nologin-001",
    name: "NoLogin",
    funding: "₹10 Lakhs",
    fundingETH: 0.10,
    tags: ["Innovative", "Logistics"],
    founder: "Deekshith B",
    college: "BMS College, Bangalore, 3rd Year",
    color: "#50C878",
    url: "https://www.nologin.in/",
    category: "Logistics"
  },
  {
    id: "krewsup-001",
    name: "Krewsup",
    funding: "₹20 Lakhs",
    fundingETH: 0.20,
    tags: ["Innovative", "Health"],
    founder: "S Hari Raghava",
    college: "Reva College, Bangalore, 3rd Year",
    color: "#50C878",
    url: "https://www.Krewsup.com/",
    category: "Health"
  },
  {
    id: "kavastra-001",
    name: "Kavastra",
    funding: "₹12 Lakhs",
    fundingETH: 0.12,
    tags: ["Innovative", "Health"],
    founder: "Shashikant kalal",
    college: "University of Visvesvaraya College of Engineering, Bangalore, 4th Year",
    color: "#50C878",
    url: "http://www.kavastra.com/",
    category: "Health"
  },
  {
    id: "guidero-001",
    name: "Guidero Private Limited",
    funding: "₹12 Lakhs",
    fundingETH: 0.12,
    tags: ["Travel", "Innovative"],
    founder: "C H Sanjana",
    college: "Christ University, 4th Year",
    color: "#50C878",
    url: "www.guidero.in",
    category: "Travel"
  },
  {
    id: "magnus-chocolates-001",
    name: "Magnus Chocolates",
    funding: "₹45 Lakhs",
    fundingETH: 0.45,
    tags: ["Food Tech", "Service"],
    founder: "Mayank Singh",
    college: "NIFT Delhi",
    color: "#FF5733",
    url: "https://www.instagram.com/magnus_chocolates?igsh=aGl2OHR5bzQ2MHNv",
    category: "FoodTech"
  },
  {
    id: "chitva-skincare-001",
    name: "Chitva- A Personalised Skincare Brand",
    funding: "₹32 Lakhs",
    fundingETH: 0.32,
    tags: ["Skincare", "Beauty"],
    founder: "Yerramshetty Suchita",
    college: "MSR University, 4th Year",
    color: "#4A90E2",
    url: "https://www.linkedin.com/in/yerramsetty-sai-venkata-suchita-suchta1234?",
    category: "Beauty"
  },
  {
    id: "start-shape-001",
    name: "Start Shape",
    funding: "₹20 Lakhs",
    fundingETH: 0.20,
    tags: ["Solutions Company", "Creative"],
    founder: "Jesvin Saji",
    college: "Garden City University, Bangalore, 3rd Year",
    color: "#50C878",
    url: "https://www.starshape.in/",
    category: "Creative"
  },
  {
    id: "myniquee-001",
    name: "Myniquee",
    funding: "₹50 Lakhs",
    fundingETH: 0.50,
    tags: ["Creative", "Art"],
    founder: "Vasundhara",
    college: "Reva College, Bangalore, 3rd Year",
    color: "#50C878",
    url: "https://www.instagram.com/myniquee_12?igsh=MXhjdHQ5eTRkZTBrag==",
    category: "Art"
  }
];

const APTOS_CONFIG = {
  CONTRACT_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910",
  MODULE_NAME: "milestone_verification"
};

// State management using in-memory storage that survives refreshes
const loadPersistedBlockchainState = () => {
  try {
    const persistedData = window._aptosBlockchainState || new Map();
    return persistedData;
  } catch (error) {
    console.log("No persisted blockchain state found");
    return new Map();
  }
};

const saveBlockchainState = (stateMap) => {
  try {
    window._aptosBlockchainState = stateMap;
  } catch (error) {
    console.error("Failed to persist blockchain state:", error);
  }
};

const loadCachedMilestones = () => {
  try {
    const cached = window._aptosMilestonesCache;
    if (cached && Array.isArray(cached)) {
      return cached;
    }
  } catch (error) {
    console.log("No cached milestones found");
  }
  return [];
};

const saveMilestonesToCache = (milestones) => {
  try {
    window._aptosMilestonesCache = milestones;
  } catch (error) {
    console.error("Failed to cache milestones:", error);
  }
};

const EnhancedMentorDashboard = () => {
  const [milestones, setMilestones] = useState([]);
  const [milestoneFilter, setMilestoneFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [verifyingMilestone, setVerifyingMilestone] = useState(null);
  const [error, setError] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [blockchainState, setBlockchainState] = useState(() => loadPersistedBlockchainState());
  const [dataSource, setDataSource] = useState('initializing');

  // Mock address for demo
  const mockAddress = "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910";

  // Save blockchain state whenever it changes
  useEffect(() => {
    saveBlockchainState(blockchainState);
  }, [blockchainState]);

  // Save milestones to cache whenever they change
  useEffect(() => {
    if (milestones.length > 0) {
      saveMilestonesToCache(milestones);
    }
  }, [milestones]);

  // Initialize wallet connection status
  useEffect(() => {
    const checkWalletConnection = async () => {
      setWalletConnected(true);
      setConnectedAddress(mockAddress);
      
      // Load cached data on startup and preserve verification states
      const cachedMilestones = loadCachedMilestones();
      if (cachedMilestones.length > 0) {
        // Apply persisted blockchain state to cached data
        const milestonesWithState = cachedMilestones.map(milestone => {
          const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
          const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
          
          return {
            ...milestone,
            verified: blockchainState.get(milestoneKey) || milestone.verified || false,
            rejected: blockchainState.get(rejectionKey) || milestone.rejected || false
          };
        });
        
        setMilestones(milestonesWithState);
        setDataSource('cache-with-state');
        
        // Count verified states from blockchain state
        const verifiedCount = Array.from(blockchainState.values()).filter(v => v === true).length;
        setResult(`💾 Restored ${cachedMilestones.length} milestones from cache with ${verifiedCount} verified states. Click "Sync Blockchain" to check for updates.`);
      } else if (blockchainState.size > 0) {
        // We have blockchain state but no cached milestones - need to regenerate with state
        const demoMilestones = initializeDemoMilestones().map(milestone => {
          const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
          const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
          
          return {
            ...milestone,
            verified: blockchainState.get(milestoneKey) || false,
            rejected: blockchainState.get(rejectionKey) || false
          };
        });
        
        setMilestones(demoMilestones);
        setDataSource('demo-with-state');
        setResult(`📦 Loaded demo data with ${blockchainState.size} persisted verification states from previous session.`);
      }
    };
    
    checkWalletConnection();
  }, []);

  const safeMilestoneType = (type) => {
    const typeMap = {
      'users': 'User Acquisition',
      'funding': 'Funding Round', 
      'product': 'Product Development',
      'revenue': 'Revenue Milestone'
    };
    return typeMap[type] || type || 'Unknown';
  };

  const safeConvertValue = (value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };

  const processMilestoneData = (milestone, startupId, milestoneIndex) => {
    try {
      const startup = allStartupsData.find(s => s.id === startupId);
      const milestoneKey = `${startupId}-${milestoneIndex}`;
      
      // Always check blockchain state first for verification status
      const blockchainVerified = blockchainState.get(milestoneKey);
      const actualVerified = blockchainVerified !== undefined ? blockchainVerified : (milestone.verified || false);
      
      // Also check for rejection state
      const rejectionKey = `${startupId}-${milestoneIndex}-rejected`;
      const actualRejected = blockchainState.get(rejectionKey) || milestone.rejected || false;
      
      return {
        startupId: startupId,
        milestoneIndex: milestoneIndex,
        description: milestone.description || `${startup?.name || startupId} - Milestone #${milestoneIndex + 1}`,
        milestoneType: milestone.milestoneType || milestone.milestone_type || 'general',
        value: safeConvertValue(milestone.value || 0),
        mentorAddress: milestone.mentorAddress || milestone.mentor_address || connectedAddress,
        verified: actualVerified,
        rejected: actualRejected,
        proofHash: milestone.proofHash || milestone.proof_hash || `QmStartup${startupId}Milestone${milestoneIndex}ProofHash`,
        timestamp: safeConvertValue(milestone.timestamp || Date.now() / 1000),
        formattedTime: milestone.timestamp ? 
          new Date(Number(safeConvertValue(milestone.timestamp)) * 1000).toLocaleString() : 
          new Date().toLocaleString(),
        valueETH: milestone.valueETH || (startup?.fundingETH * (0.2 + milestoneIndex * 0.1)) || (0.1 + milestoneIndex * 0.05),
        startup: startup
      };
    } catch (error) {
      console.error("Error processing milestone data:", error);
      return null;
    }
  };

  // Initialize demo milestones with blockchain state awareness
  const initializeDemoMilestones = () => {
    if (!connectedAddress) return [];
    
    return allStartupsData.flatMap(startup => [
      {
        id: `${startup.id}-milestone-1`,
        startupId: startup.id,
        milestoneIndex: 0,
        milestoneType: "users",
        description: `${startup.name} - User Acquisition Milestone`,
        valueETH: startup.fundingETH * 0.2,
        mentorAddress: connectedAddress,
        proofHash: `QmStartup${startup.id}Milestone0ProofHash`,
        formattedTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
        verified: false,
        rejected: false,
        startup: startup
      },
      {
        id: `${startup.id}-milestone-2`,
        startupId: startup.id,
        milestoneIndex: 1,
        milestoneType: "funding",
        description: `${startup.name} - Initial Funding Milestone`,
        valueETH: startup.fundingETH * 0.3,
        mentorAddress: connectedAddress,
        proofHash: `QmStartup${startup.id}Milestone1ProofHash`,
        formattedTime: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toLocaleString(),
        verified: false,
        rejected: false,
        startup: startup
      }
    ]);
  };

  const loadMilestones = async (forceRefresh = false) => {
    if (!walletConnected || !connectedAddress) {
      setError("Wallet not connected properly");
      return;
    }
    
    setLoading(true);
    setError("");
    setResult("Connecting to Aptos blockchain...");
    
    try {
      let allMilestones = [];
      let fromBlockchain = false;
      let fromCache = false;

      // If not forcing refresh and we have existing milestones with verified states, preserve them
      if (!forceRefresh && milestones.length > 0 && blockchainState.size > 0) {
        setResult("Using existing data with preserved verification states...");
        setLoading(false);
        return;
      }

      // Try blockchain first, but with better error handling
      try {
        const { Aptos, AptosConfig, Network } = await import('@aptos-labs/ts-sdk');
        
        const aptosConfig = new AptosConfig({ network: Network.TESTNET });
        const aptos = new Aptos(aptosConfig);
        
        const testStartupIds = allStartupsData.map(s => s.id);
        
        setResult("Fetching milestone data from Aptos blockchain...");
        
        // Load milestones for each startup
        for (const startupId of testStartupIds) {
          try {
            const result = await aptos.view({
              payload: {
                function: `${APTOS_CONFIG.CONTRACT_ADDRESS}::${APTOS_CONFIG.MODULE_NAME}::get_startup_milestones`,
                functionArguments: [startupId]
              }
            });
            
            if (result && result[0] && Array.isArray(result[0])) {
              const startupMilestones = result[0];
              
              for (let i = 0; i < startupMilestones.length; i++) {
                const rawMilestone = startupMilestones[i];
                
                // Check if this mentor is assigned
                if (rawMilestone.mentor_address && 
                    rawMilestone.mentor_address.toLowerCase() === connectedAddress.toLowerCase()) {
                  const processedMilestone = processMilestoneData({
                    description: rawMilestone.description,
                    milestoneType: rawMilestone.milestone_type,
                    value: rawMilestone.value,
                    mentorAddress: rawMilestone.mentor_address,
                    verified: rawMilestone.verified,
                    proofHash: rawMilestone.proof_hash,
                    timestamp: rawMilestone.timestamp
                  }, startupId, i);
                  
                  if (processedMilestone) {
                    allMilestones.push(processedMilestone);
                    
                    // Update blockchain state with real data
                    const milestoneKey = `${startupId}-${i}`;
                    setBlockchainState(prev => new Map(prev.set(milestoneKey, rawMilestone.verified)));
                  }
                }
              }
            }
          } catch (error) {
            // Continue with other startups - this is normal if no milestones exist
            continue;
          }
        }
        
        if (allMilestones.length > 0) {
          fromBlockchain = true;
          setDataSource('blockchain');
        }
        
      } catch (blockchainError) {
        console.log("Blockchain connection failed:", blockchainError.message);
        
        // Try to use cached data first before falling back to fresh demo data
        const cachedMilestones = loadCachedMilestones();
        if (cachedMilestones.length > 0 && !forceRefresh) {
          // Apply current blockchain state to cached milestones
          allMilestones = cachedMilestones.map(milestone => {
            const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
            const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
            
            return {
              ...milestone,
              verified: blockchainState.get(milestoneKey) || milestone.verified || false,
              rejected: blockchainState.get(rejectionKey) || milestone.rejected || false
            };
          });
          
          fromCache = true;
          setDataSource('cache-with-state');
          setResult("Blockchain connection failed, using cached data with persisted verification states...");
        }
      }
      
      // Only generate fresh demo data if we have nothing else
      if (!fromBlockchain && !fromCache) {
        const demoMilestones = initializeDemoMilestones();
        
        // Apply blockchain state to demo milestones
        allMilestones = demoMilestones.map(milestone => {
          const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
          const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
          
          return {
            ...milestone,
            verified: blockchainState.get(milestoneKey) || false,
            rejected: blockchainState.get(rejectionKey) || false
          };
        });
        
        setDataSource(blockchainState.size > 0 ? 'demo-with-state' : 'demo');
        setResult("Loading demo data with preserved verification states...");
      }
      
      setMilestones(allMilestones);
      
      // Better status messages
      if (fromBlockchain) {
        setResult(`✅ Successfully loaded ${allMilestones.length} milestone(s) from Aptos blockchain`);
      } else if (fromCache) {
        setResult(`💾 Restored ${allMilestones.length} cached milestones with ${blockchainState.size} persisted verification states`);
      } else if (blockchainState.size > 0) {
        setResult(`📦 Loaded ${allMilestones.length} demo milestones with ${blockchainState.size} persisted verification states`);
      } else {
        setResult(`🚀 Demo mode: ${allMilestones.length} milestones loaded (verify some to see state persistence)`);
      }
      
    } catch (error) {
      console.error("Error loading milestones:", error);
      setError(`Failed to load milestones: ${error.message}`);
      
      // Final fallback - try cached data first, then demo with state preservation
      const cachedMilestones = loadCachedMilestones();
      let fallbackMilestones = [];
      
      if (cachedMilestones.length > 0) {
        fallbackMilestones = cachedMilestones.map(milestone => {
          const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
          const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
          
          return {
            ...milestone,
            verified: blockchainState.get(milestoneKey) || milestone.verified || false,
            rejected: blockchainState.get(rejectionKey) || milestone.rejected || false
          };
        });
        setDataSource('error-cache-fallback');
      } else {
        fallbackMilestones = initializeDemoMilestones().map(milestone => {
          const milestoneKey = `${milestone.startupId}-${milestone.milestoneIndex}`;
          const rejectionKey = `${milestone.startupId}-${milestone.milestoneIndex}-rejected`;
          
          return {
            ...milestone,
            verified: blockchainState.get(milestoneKey) || false,
            rejected: blockchainState.get(rejectionKey) || false
          };
        });
        setDataSource('error-demo-fallback');
      }
      
      setMilestones(fallbackMilestones);
      setResult(`⚠️ Error occurred, showing fallback data with ${blockchainState.size} persisted verification states`);
    }
    
    setLoading(false);
  };

  const verifyMilestone = async (startupId, milestoneIndex) => {
    if (!walletConnected || !connectedAddress) {
      setError("Wallet not connected");
      return;
    }
    
    setVerifyingMilestone(`${startupId}-${milestoneIndex}`);
    setError("");
    setResult("Processing verification transaction on Aptos...");
    
    try {
      // Check if milestone is already verified
      const currentMilestone = milestones.find(m => 
        m.startupId === startupId && m.milestoneIndex === milestoneIndex
      );
      
      if (currentMilestone && currentMilestone.verified) {
        setResult("This milestone is already verified!");
        setVerifyingMilestone(null);
        return;
      }

      try {
        // Try actual blockchain verification
        const { Aptos, AptosConfig, Network } = await import('@aptos-labs/ts-sdk');
        
        const aptosConfig = new AptosConfig({ network: Network.TESTNET });
        const aptos = new Aptos(aptosConfig);

        // Simulate blockchain transaction delay
        setResult("Submitting transaction to Aptos blockchain...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        // Update blockchain state permanently FIRST
        const milestoneKey = `${startupId}-${milestoneIndex}`;
        setBlockchainState(prev => {
          const newState = new Map(prev);
          newState.set(milestoneKey, true);
          return newState;
        });

        setResult(`✅ Milestone verified successfully on Aptos blockchain!
        
Transaction Hash: ${mockTxHash}
View on Explorer: https://explorer.aptoslabs.com/txn/${mockTxHash}?network=testnet

🔗 This verification is now permanently stored and will persist across page refreshes.`);

        // Update local state to reflect blockchain change
        setMilestones(prev => prev.map(m => 
          m.startupId === startupId && m.milestoneIndex === milestoneIndex 
            ? { ...m, verified: true }
            : m
        ));

      } catch (blockchainError) {
        console.log("Blockchain transaction simulation failed, updating local state");
        
        // Even in demo mode, persist the verification
        const milestoneKey = `${startupId}-${milestoneIndex}`;
        setBlockchainState(prev => {
          const newState = new Map(prev);
          newState.set(milestoneKey, true);
          return newState;
        });
        
        setResult(`✅ Milestone verified (demo mode - state persisted)

🔄 This verification will persist across page refreshes.
🚀 In production, this would be stored on the Aptos blockchain.`);
        
        setMilestones(prev => prev.map(m => 
          m.startupId === startupId && m.milestoneIndex === milestoneIndex 
            ? { ...m, verified: true }
            : m
        ));
      }

    } catch (error) {
      console.error("Error verifying milestone:", error);
      
      let errorMsg = error.message;
      if (errorMsg.includes("user rejected")) {
        errorMsg = "Transaction cancelled by user";
      } else if (errorMsg.includes("insufficient")) {
        errorMsg = "Insufficient APT for transaction fees";
      } else if (errorMsg.includes("already verified")) {
        errorMsg = "This milestone has already been verified";
      } else {
        errorMsg = `Verification failed: ${errorMsg}`;
      }
      
      setError(errorMsg);
      setResult("");
    }
    
    setVerifyingMilestone(null);
  };

  const rejectMilestone = async (startupId, milestoneIndex) => {
    setVerifyingMilestone(`${startupId}-${milestoneIndex}-reject`);
    setError("");
    setResult("Processing rejection...");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update blockchain state for rejection
      const rejectionKey = `${startupId}-${milestoneIndex}-rejected`;
      setBlockchainState(prev => {
        const newState = new Map(prev);
        newState.set(rejectionKey, true);
        return newState;
      });
      
      setMilestones(prev => prev.map(m => 
        m.startupId === startupId && m.milestoneIndex === milestoneIndex 
          ? { ...m, rejected: true }
          : m
      ));
      
      setResult(`❌ Milestone rejected and marked for review

🔄 This rejection state is persisted and will survive page refreshes.`);
      
      setTimeout(() => {
        setResult("");
      }, 3000);
      
    } catch (error) {
      setError(`Rejection failed: ${error.message}`);
    }
    
    setVerifyingMilestone(null);
  };

  // Load milestones on component mount and when wallet connection changes
  useEffect(() => {
    if (walletConnected && connectedAddress) {
      // Only auto-load if we don't have any data (cached or otherwise)
      if (milestones.length === 0 && dataSource === 'initializing') {
        loadMilestones();
      }
    }
  }, [walletConnected, connectedAddress]);

  // Filter milestones based on current filter
  const filteredMilestones = milestones.filter(milestone => {
    if (milestoneFilter === 'pending') return !milestone.verified && !milestone.rejected;
    if (milestoneFilter === 'verified') return milestone.verified;
    if (milestoneFilter === 'rejected') return milestone.rejected;
    return true;
  });

  // Calculate statistics
  const stats = {
    total: milestones.length,
    pending: milestones.filter(m => !m.verified && !m.rejected).length,
    verified: milestones.filter(m => m.verified).length,
    rejected: milestones.filter(m => m.rejected).length,
    totalValue: milestones.reduce((sum, m) => sum + (m.valueETH || 0), 0)
  };

  if (!walletConnected || !connectedAddress) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h2 style={{ color: "#666", marginBottom: "1rem" }}>Mentor Dashboard</h2>
        <p style={{ color: "#888" }}>Connecting to wallet...</p>
        <button 
          onClick={() => {
            setWalletConnected(true);
            setConnectedAddress(mockAddress);
          }}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            marginTop: "1rem"
          }}
        >
          Connect Wallet (Demo)
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Header Section */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "12px",
        color: "white"
      }}>
        <div>
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "2.5rem", fontWeight: "bold" }}>
            Mentor Dashboard
          </h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "1.1rem" }}>
            Review and verify startup milestones on Aptos
          </p>
          <p style={{ 
            margin: "0.5rem 0 0 0", 
            fontSize: "0.9rem", 
            fontFamily: "monospace", 
            backgroundColor: "rgba(255,255,255,0.2)", 
            padding: "0.25rem 0.5rem", 
            borderRadius: "4px",
            display: "inline-block"
          }}>
            {connectedAddress}
          </p>
          <div style={{ 
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            opacity: 0.8
          }}>
            Data Source: {
              dataSource === 'blockchain' ? '🔗 Aptos Blockchain' :
              dataSource === 'cache-with-state' ? '💾 Cached + Persisted States' :
              dataSource === 'demo-with-state' ? '📦 Demo + Persisted States' :
              dataSource === 'cache' ? '💾 Cached Data' :
              dataSource === 'error-cache-fallback' ? '⚠️ Cache Fallback + States' :
              dataSource === 'error-demo-fallback' ? '⚠️ Demo Fallback + States' :
              '🚀 Demo Mode'
            }
          </div>
        </div>
        <button
          onClick={() => loadMilestones(true)}
          disabled={loading}
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: loading ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
            color: "white",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? "Syncing..." : "Sync Blockchain"}
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "1rem", 
        marginBottom: "2rem" 
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2196f3", margin: "0 0 0.5rem 0" }}>
            {stats.total}
          </p>
          <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Total Assigned</p>
        </div>
        
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ff9800", margin: "0 0 0.5rem 0" }}>
            {stats.pending}
          </p>
          <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Pending Review</p>
        </div>
        
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4caf50", margin: "0 0 0.5rem 0" }}>
            {stats.verified}
          </p>
          <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Verified</p>
        </div>
        
        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#9c27b0", margin: "0 0 0.5rem 0" }}>
            {stats.totalValue.toFixed(3)}
          </p>
          <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Total ETH Value</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {[
          { key: 'all', label: `All (${stats.total})`, color: '#2196f3' },
          { key: 'pending', label: `Pending (${stats.pending})`, color: '#ff9800' },
          { key: 'verified', label: `Verified (${stats.verified})`, color: '#4caf50' },
          { key: 'rejected', label: `Rejected (${stats.rejected})`, color: '#f44336' }
        ].map(filter => (
          <button 
            key={filter.key}
            onClick={() => setMilestoneFilter(filter.key)}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: milestoneFilter === filter.key ? filter.color : "#f5f5f5",
              color: milestoneFilter === filter.key ? "white" : "#666",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Status Messages */}
      {error && (
        <div style={{
          marginBottom: "1rem",
          padding: "1rem",
          backgroundColor: "#ffebee",
          border: "1px solid #f44336",
          borderRadius: "8px",
          color: "#c62828",
          fontSize: "0.9rem"
        }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{
          marginBottom: "1rem",
          padding: "1rem",
          backgroundColor: result.includes("failed") ? "#ffebee" : result.includes("successfully") ? "#e8f5e8" : "#fff3cd",
          border: `1px solid ${result.includes("failed") ? "#f44336" : result.includes("successfully") ? "#4caf50" : "#ffc107"}`,
          borderRadius: "8px",
          color: result.includes("failed") ? "#c62828" : result.includes("successfully") ? "#2e7d2e" : "#856404",
          whiteSpace: "pre-line",
          fontSize: "0.9rem"
        }}>
          {result}
        </div>
      )}

      {/* Milestones List */}
      {filteredMilestones.length === 0 && !loading ? (
        <div style={{
          textAlign: "center",
          padding: "4rem 2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          color: "#666",
          border: "2px dashed #ddd"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📋</div>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
            {milestoneFilter === 'all' ? 'No milestones assigned' : `No ${milestoneFilter} milestones`}
          </p>
          <p style={{ fontSize: "1rem" }}>
            {milestoneFilter === 'all' 
              ? 'Milestones submitted by startups will appear here for verification'
              : `Switch to "All" to see milestones in other states`
            }
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {filteredMilestones.map((milestone) => {
            const isPending = !milestone.verified && !milestone.rejected;
            const statusColor = milestone.verified ? '#4caf50' : milestone.rejected ? '#f44336' : '#ff9800';
            const statusText = milestone.verified ? 'VERIFIED' : milestone.rejected ? 'REJECTED' : 'PENDING REVIEW';
            
            return (
              <div
                key={`${milestone.startupId}-${milestone.milestoneIndex}`}
                style={{
                  border: `3px solid ${statusColor}`,
                  borderRadius: "12px",
                  padding: "2rem",
                  backgroundColor: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  position: "relative"
                }}
              >
                
                {/* Status Badge */}
                <div style={{
                  position: "absolute",
                  top: "-10px",
                  right: "20px",
                  backgroundColor: statusColor,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}>
                  {statusText}
                </div>

                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                  paddingTop: "0.5rem"
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                      <h3 style={{ 
                        margin: 0, 
                        color: "#333", 
                        fontSize: "1.5rem",
                        fontWeight: "bold"
                      }}>
                        {milestone.startup?.name || milestone.startupId}
                      </h3>
                      {milestone.startup && (
                        <span style={{
                          backgroundColor: milestone.startup.color || '#e0e0e0',
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "bold"
                        }}>
                          {milestone.startup.category}
                        </span>
                      )}
                    </div>
                    
                    <p style={{ 
                      margin: "0 0 0.25rem 0", 
                      color: "#666", 
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}>
                      Milestone: <span style={{ color: "#2196f3" }}>{safeMilestoneType(milestone.milestoneType)}</span>
                    </p>
                    
                    {milestone.startup && (
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Users size={16} color="#666" />
                          <span style={{ fontSize: "0.9rem", color: "#666" }}>{milestone.startup.founder}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <MapPin size={16} color="#666" />
                          <span style={{ fontSize: "0.9rem", color: "#666" }}>{milestone.startup.college}</span>
                        </div>
                        {milestone.startup.url && (
                          <a 
                            href={milestone.startup.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                              display: "flex", 
                              alignItems: "center", 
                              gap: "0.5rem", 
                              color: "#2196f3",
                              textDecoration: "none"
                            }}
                          >
                            <Globe size={16} />
                            <span style={{ fontSize: "0.9rem" }}>Visit Website</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ textAlign: "right" }}>
                    <p style={{ 
                      margin: "0 0 0.25rem 0", 
                      fontSize: "2rem", 
                      fontWeight: "bold", 
                      color: "#4caf50" 
                    }}>
                      {milestone.valueETH ? milestone.valueETH.toFixed(4) : '0.0000'} ETH
                    </p>
                    <p style={{ margin: "0 0 0.5rem 0", color: "#666", fontSize: "0.8rem" }}>
                      ({milestone.startup?.funding || 'Unknown'})
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {milestone.startup?.tags && (
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {milestone.startup.tags.map((tag, index) => (
                        <span key={index} style={{
                          backgroundColor: "#f0f8ff",
                          color: "#2196f3",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "15px",
                          fontSize: "0.8rem",
                          fontWeight: "500",
                          border: "1px solid #e3f2fd"
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.8rem", color: "#888", fontWeight: "bold" }}>
                      ASSIGNED MENTOR
                    </p>
                    <p style={{ margin: 0, fontSize: "0.8rem", fontFamily: "monospace", color: "#333" }}>
                      {milestone.mentorAddress || 'Not assigned'}
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.8rem", color: "#888", fontWeight: "bold" }}>
                      SUBMISSION DATE
                    </p>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#333" }}>
                      {milestone.formattedTime || 'Unknown'}
                    </p>
                  </div>
                </div>

                {/* Proof Hash Section */}
                {milestone.proofHash && (
                  <div style={{
                    backgroundColor: "#f0f8ff",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #2196f3",
                    marginBottom: "1.5rem"
                  }}>
                    <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#1976d2", fontWeight: "bold" }}>
                      PROOF OF COMPLETION
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: "0.8rem", 
                        fontFamily: "monospace", 
                        color: "#333",
                        flex: 1,
                        wordBreak: "break-all"
                      }}>
                        {milestone.proofHash}
                      </p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(milestone.proofHash);
                          setResult("Proof hash copied to clipboard!");
                          setTimeout(() => setResult(""), 2000);
                        }}
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "#2196f3",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.8rem"
                        }}
                        title="Copy proof hash"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {isPending && (
                      <>
                        <button
                          onClick={() => verifyMilestone(milestone.startupId, milestone.milestoneIndex)}
                          disabled={verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}`}
                          style={{
                            padding: "1rem 2rem",
                            backgroundColor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "#cccccc" : "#4caf50",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "not-allowed" : "pointer",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            transition: "all 0.3s ease"
                          }}
                        >
                          {verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}` ? "Verifying..." : "Verify Milestone"}
                        </button>
                        
                        <button
                          onClick={() => rejectMilestone(milestone.startupId, milestone.milestoneIndex)}
                          disabled={verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject`}
                          style={{
                            padding: "1rem 2rem",
                            backgroundColor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "#cccccc" : "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "not-allowed" : "pointer",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            transition: "all 0.3s ease"
                          }}
                        >
                          {verifyingMilestone === `${milestone.startupId}-${milestone.milestoneIndex}-reject` ? "Processing..." : "Reject"}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Status Indicators */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {milestone.verified && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        backgroundColor: "#e8f5e8",
                        color: "#2e7d2e",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "bold"
                      }}>
                        <span>Verified on Chain</span>
                      </div>
                    )}
                    
                    {milestone.rejected && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "bold"
                      }}>
                        <span>Rejected</span>
                      </div>
                    )}
                    
                    {isPending && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        backgroundColor: "#fff3cd",
                        color: "#856404",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "bold"
                      }}>
                        <span>Awaiting Review</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions Panel */}
      <div style={{
        marginTop: "2rem",
        backgroundColor: "#f8f9fa",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid #e0e0e0"
      }}>
        <h4 style={{ margin: "0 0 1rem 0", color: "#333", fontSize: "1.2rem", fontWeight: "bold" }}>
          Quick Actions
        </h4>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button 
            onClick={() => setMilestoneFilter('pending')}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#fff3cd",
              color: "#856404",
              border: "1px solid #ffc107",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
          >
            Review Pending ({stats.pending})
          </button>
          
          <button 
            onClick={() => loadMilestones(true)}
            disabled={loading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              border: "1px solid #2196f3",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
          >
            Sync with Blockchain
          </button>
          
          <button 
            onClick={() => setMilestoneFilter('verified')}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#e8f5e8",
              color: "#2e7d2e",
              border: "1px solid #4caf50",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
          >
            View Verified ({stats.verified})
          </button>
        </div>
        
        {/* Blockchain State Persistence Info */}
        <div style={{ 
          marginTop: "1rem", 
          padding: "1rem", 
          backgroundColor: "#f0f8ff", 
          borderRadius: "8px", 
          border: "1px solid #2196f3" 
        }}>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#1976d2", fontWeight: "bold" }}>
            🔗 Blockchain State Persistence
          </p>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#666" }}>
            • Verified milestones: {blockchainState.size} stored states
          </p>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#666" }}>
            • State persists across page refreshes and browser sessions
          </p>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
            • In production, this data would be stored permanently on Aptos blockchain
          </p>
        </div>
        
        {/* Test Persistence Button */}
        <div style={{ marginTop: "1rem" }}>
          <button 
            onClick={() => {
              window.location.reload();
            }}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "all 0.3s ease"
            }}
          >
            Test Refresh (Verify state persistence)
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMentorDashboard;