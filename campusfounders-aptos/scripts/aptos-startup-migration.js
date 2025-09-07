// // aptos-startup-migration.js
// // Migration script to add all startups to Aptos Move contract

// const { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } = require("@aptos-labs/ts-sdk");

// // Your startup data (same structure as before)
// const structuredStartups = [
//   {
//     id: "learny-hive-001",
//     name: "LearnyHive",
//     founder: "Bhanush Gowda",
//     college: "EPCET Bangalore, 3rd Year",
//     funding: "₹45 Lakhs",
//     fundingETH: 0.45, // We'll convert this to appropriate units for Aptos
//     tags: ["Ed tech", "Innovation"],
//     url: "https://www.learnyhive.com/",
//     category: "EdTech",
//     color: "#FF5733",
//     description: "Educational technology platform revolutionizing learning experiences",
//     sector: "Education"
//   },
//   // Add all your other startups here...
  
// ];

// // // Configuration
// // const CONFIG = {
// //   NETWORK: Network.TESTNET,
// //   CONTRACT_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910",
// //   OWNER_PRIVATE_KEY: "0xb3beae54e0dfaadab65381cf083586c97fd2a784ad97164037e49fcf0af808d3", // Your private key
// //   MENTOR_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910", // For now, using owner as mentor
// // };

// const CONFIG = {
//   NETWORK: Network.TESTNET,
//   CONTRACT_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910",
//   OWNER_PRIVATE_KEY: "0xb3beae54e0dfaadab65381cf083586c97fd2a784ad97164037e49fcf0af808d3",
//   MENTOR_ADDRESS: "0xb6724a56c3e07a555f6566062356eff01b0e6b1634e8b4b797186b789865dce5", // Use Mentor 1
//   MENTOR_PRIVATE_KEY: "0xaa804271dccf6ab151d3d3250a6c2cace4c6a07c5a2badd48cbc96caa1f16333", // Mentor 1's key
// };

// class AptosMigrationService {
//   constructor() {
//     const config = new AptosConfig({ network: CONFIG.NETWORK });
//     this.aptos = new Aptos(config);
//     this.ownerAccount = Account.fromPrivateKey({
//       privateKey: new Ed25519PrivateKey(CONFIG.OWNER_PRIVATE_KEY)
//     });
//   }

//   async addMentor(mentorAddress) {
//     try {
//       console.log(`👤 Adding mentor: ${mentorAddress}`);
      
//       const transaction = await this.aptos.transaction.build.simple({
//         sender: this.ownerAccount.accountAddress,
//         data: {
//           function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::add_mentor`,
//           functionArguments: [mentorAddress]
//         }
//       });

//       const response = await this.aptos.signAndSubmitTransaction({
//         signer: this.ownerAccount,
//         transaction
//       });

//       await this.aptos.waitForTransaction({ transactionHash: response.hash });
//       console.log(`✅ Mentor added successfully: ${response.hash}`);
//       return response;
//     } catch (error) {
//       console.log(`⚠️ Error adding mentor (might already exist): ${error.message}`);
//       return null;
//     }
//   }

//   async assignMentorToStartup(startupId, mentorAddress) {
//     try {
//       console.log(`🔗 Assigning mentor ${mentorAddress} to startup ${startupId}`);
      
//       const transaction = await this.aptos.transaction.build.simple({
//         sender: this.ownerAccount.accountAddress,
//         data: {
//           function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::assign_mentor`,
//           functionArguments: [startupId, mentorAddress]
//         }
//       });

//       const response = await this.aptos.signAndSubmitTransaction({
//         signer: this.ownerAccount,
//         transaction
//       });

//       await this.aptos.waitForTransaction({ transactionHash: response.hash });
//       console.log(`✅ Mentor assigned successfully: ${response.hash}`);
//       return response;
//     } catch (error) {
//       console.log(`❌ Error assigning mentor: ${error.message}`);
//       throw error;
//     }
//   }

//   async submitMilestone(startup) {
//     try {
//       console.log(`📝 Submitting milestone for ${startup.name}`);
      
//       // Convert funding to appropriate units (multiply by 100 to avoid decimals)
//       const fundingValue = Math.floor(startup.fundingETH * 100);
      
//       const transaction = await this.aptos.transaction.build.simple({
//         sender: this.ownerAccount.accountAddress,
//         data: {
//           function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::submit_milestone`,
//           functionArguments: [
//             startup.id,
//             "funding", // milestone type
//             fundingValue, // value as integer
//             `${startup.name} founded by ${startup.founder} from ${startup.college}. ${startup.description}`,
//             `ipfs://startup-${startup.id}` // placeholder IPFS hash
//           ]
//         }
//       });

//       const response = await this.aptos.signAndSubmitTransaction({
//         signer: this.ownerAccount,
//         transaction
//       });

//       await this.aptos.waitForTransaction({ transactionHash: response.hash });
//       console.log(`✅ Milestone submitted successfully: ${response.hash}`);
//       return response;
//     } catch (error) {
//       console.log(`❌ Error submitting milestone: ${error.message}`);
//       throw error;
//     }
//   }

//   async getStartupMilestones(startupId) {
//     try {
//       const result = await this.aptos.view({
//         payload: {
//           function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::get_startup_milestones`,
//           functionArguments: [startupId]
//         }
//       });
//       return result;
//     } catch (error) {
//       console.log(`Error getting milestones: ${error.message}`);
//       return [];
//     }
//   }

//   async delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
// }

// async function main() {
//   console.log("🚀 Starting Aptos startup migration...");
//   console.log(`📄 Contract Address: ${CONFIG.CONTRACT_ADDRESS}`);
//   console.log(`🌐 Network: ${CONFIG.NETWORK}`);
//   console.log(`👤 Owner Address: ${Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey(CONFIG.OWNER_PRIVATE_KEY) }).accountAddress}`);
  
//   const migrationService = new AptosMigrationService();
  
//   let successCount = 0;
//   let errorCount = 0;
  
//   console.log(`\n📋 Processing ${structuredStartups.length} startups...`);
  
//   // Step 1: Add mentor (owner as mentor)
//   await migrationService.addMentor(CONFIG.MENTOR_ADDRESS);
  
//   // Step 2: Process each startup
//   for (let i = 0; i < structuredStartups.length; i++) {
//     const startup = structuredStartups[i];
//     console.log(`\n📊 ${i + 1}/${structuredStartups.length}. Processing: ${startup.name}`);
//     console.log(`   🆔 ID: ${startup.id}`);
//     console.log(`   👤 Founder: ${startup.founder}`);
//     console.log(`   💰 Funding: ${startup.funding} (${startup.fundingETH} ETH equivalent)`);
    
//     try {
//       // Assign mentor to startup
//       await migrationService.assignMentorToStartup(startup.id, CONFIG.MENTOR_ADDRESS);
      
//       // Submit initial milestone
//       await migrationService.submitMilestone(startup);
      
//       successCount++;
//       console.log(`   ✅ Successfully processed ${startup.name}`);
      
//       // Add delay to avoid overwhelming the network
//       await migrationService.delay(1000);
      
//     } catch (error) {
//       console.log(`   ❌ Error processing ${startup.name}:`, error.message);
//       errorCount++;
//       continue;
//     }
//   }
  
//   console.log("\n🎉 Migration Summary:");
//   console.log(`✅ Successful migrations: ${successCount}`);
//   console.log(`❌ Failed migrations: ${errorCount}`);
//   console.log(`📊 Total startups processed: ${structuredStartups.length}`);
  
//   // Verification - Check a few startups
//   console.log("\n🔍 Verification - Checking milestone data...");
//   for (let i = 0; i < Math.min(3, structuredStartups.length); i++) {
//     const startup = structuredStartups[i];
//     const milestones = await migrationService.getStartupMilestones(startup.id);
//     console.log(`📋 ${startup.name} has ${milestones.length} milestone(s)`);
//   }
  
//   // Generate summary for frontend
//   const summaryData = {
//     network: CONFIG.NETWORK,
//     contractAddress: CONFIG.CONTRACT_ADDRESS,
//     totalStartups: structuredStartups.length,
//     successfulMigrations: successCount,
//     errors: errorCount,
//     totalFunding: structuredStartups.reduce((sum, s) => sum + parseFloat(s.funding.replace(/[₹,\s]/g, '').replace('Lakhs', '')), 0),
//     categories: [...new Set(structuredStartups.map(s => s.category))],
//     lastMigrated: new Date().toISOString()
//   };
  
//   console.log("\n📊 Migration Summary Data:");
//   console.log(JSON.stringify(summaryData, null, 2));
// }

// // CLI Commands Helper
// function generateCLICommands() {
//   console.log("\n📝 Alternative: CLI Commands for Manual Setup");
//   console.log("If you prefer to use CLI commands instead:\n");
  
//   structuredStartups.forEach((startup, index) => {
//     console.log(`# ${index + 1}. ${startup.name}`);
//     console.log(`aptos move run --function-id "${CONFIG.CONTRACT_ADDRESS}::milestone_verification::assign_mentor" --args string:"${startup.id}" address:${CONFIG.MENTOR_ADDRESS} --url https://fullnode.testnet.aptoslabs.com/v1 --private-key ${CONFIG.OWNER_PRIVATE_KEY}`);
    
//     const fundingValue = Math.floor(startup.fundingETH * 100);
//     console.log(`aptos move run --function-id "${CONFIG.CONTRACT_ADDRESS}::milestone_verification::submit_milestone" --args string:"${startup.id}" string:"funding" u64:${fundingValue} string:"${startup.name} founded by ${startup.founder}" string:"ipfs://startup-${startup.id}" --url https://fullnode.testnet.aptoslabs.com/v1 --private-key ${CONFIG.OWNER_PRIVATE_KEY}\n`);
//   });
// }

// // Export for use as module
// module.exports = { 
//   structuredStartups, 
//   AptosMigrationService, 
//   CONFIG,
//   generateCLICommands 
// };

// // Handle script execution
// if (require.main === module) {
//   // Check if user wants CLI commands instead
//   const args = process.argv.slice(2);
//   if (args.includes('--cli')) {
//     generateCLICommands();
//     process.exit(0);
//   }
  
//   main()
//     .then(() => {
//       console.log("\n🎯 Migration completed successfully!");
//       console.log("\n💡 Next steps:");
//       console.log("1. Verify milestones in Aptos Explorer");
//       console.log("2. Test milestone verification functions");
//       console.log("3. Update your frontend to use Aptos SDK");
//       process.exit(0);
//     })
//     .catch((error) => {
//       console.error("\n💥 Migration failed:", error);
//       process.exit(1);
//     });
// }


const { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } = require("@aptos-labs/ts-sdk");

// Your startup data (add your full array here)
const structuredStartups = [
  {
    id: "learny-hive-001",
    name: "LearnyHive",
    founder: "Bhanush Gowda",
    college: "EPCET Bangalore, 3rd Year",
    funding: "₹45 Lakhs",
    fundingETH: 0.45,
    tags: ["Ed tech", "Innovation"],
    url: "https://www.learnyhive.com/",
    category: "EdTech",
    color: "#FF5733",
    description: "Educational technology platform revolutionizing learning experiences",
    sector: "Education"
  },
  // Add all your other startups here...
  {
    id: "waiter-company-001",
    name: "The Waiter Company",
    founder: "Ishan Purohit",
    college: "RV University, 4th Year",
    funding: "₹32 Lakhs",
    fundingETH: 0.32,
    tags: ["FoodTech", "Logistics"],
    url: "https://www.thewaitercompany.in/",
    category: "FoodTech",
    color: "#4A90E2",
    description: "Food delivery and restaurant management solution",
    sector: "Food & Beverage"
  },
  {
    id: "saathi-app-001",
    name: "Saathi App",
    founder: "Abhay Gupta",
    college: "RV College, Bangalore, 3rd Year",
    funding: "₹20 Lakhs",
    fundingETH: 0.2,
    tags: ["Innovative", "Social"],
    url: "https://www.saathiapp.in/",
    category: "Social",
    color: "#50C878",
    description: "Social platform connecting students and communities",
    sector: "Social Networking"
  },
  {
    id: "kampus-001",
    name: "Kampus",
    founder: "Hemanth Gowda",
    college: "Reva College, Bangalore, 3rd Year",
    funding: "₹50 Lakhs",
    fundingETH: 0.5,
    tags: ["Meets", "Social"],
    url: "https://www.kampus.social/",
    category: "Social",
    color: "#50C878",
    description: "Campus social networking and meetup platform",
    sector: "Social Networking"
  },
  {
    id: "nologin-001",
    name: "NoLogin",
    founder: "Deekshith B",
    college: "BMS College, Bangalore, 3rd Year",
    funding: "₹10 Lakhs",
    fundingETH: 0.1,
    tags: ["Innovative", "Logistics"],
    url: "https://www.nologin.in/",
    category: "Logistics",
    color: "#50C878",
    description: "Innovative logistics and authentication solutions",
    sector: "Technology"
  },
  {
    id: "krewsup-001",
    name: "Krewsup",
    founder: "S Hari Raghava",
    college: "Reva College, Bangalore, 3rd Year",
    funding: "₹20 Lakhs",
    fundingETH: 0.2,
    tags: ["Innovative", "Health"],
    url: "https://www.Krewsup.com/",
    category: "Health",
    color: "#50C878",
    description: "Health and wellness platform for students",
    sector: "Healthcare"
  },
  {
    id: "kavastra-001",
    name: "Kavastra",
    founder: "Shashikant kalal",
    college: "University of Visvesvaraya College of Engineering, Bangalore, 4th Year",
    funding: "₹12 Lakhs",
    fundingETH: 0.12,
    tags: ["Innovative", "Health"],
    url: "http://www.kavastra.com/",
    category: "Health",
    color: "#50C878",
    description: "Healthcare innovation and medical technology solutions",
    sector: "Healthcare"
  },
  {
    id: "guidero-001",
    name: "Guidero Private Limited",
    founder: "C H Sanjana",
    college: "Christ University, 4th Year",
    funding: "₹12 Lakhs",
    fundingETH: 0.12,
    tags: ["Travel", "Innovative"],
    url: "www.guidero.in",
    category: "Travel",
    color: "#50C878",
    description: "Travel guidance and tourism platform",
    sector: "Travel & Tourism"
  },
  {
    id: "magnus-chocolates-001",
    name: "Magnus Chocolates",
    founder: "Mayank Singh",
    college: "NIFT Delhi",
    funding: "₹45 Lakhs",
    fundingETH: 0.45,
    tags: ["Food Tech", "Service"],
    url: "https://www.instagram.com/magnus_chocolates?igsh=aGl2OHR5bzQ2MHNv",
    category: "FoodTech",
    color: "#FF5733",
    description: "Premium chocolate manufacturing and distribution",
    sector: "Food & Beverage"
  },
  {
    id: "chitva-skincare-001",
    name: "Chitva- A Personalised Skincare Brand",
    founder: "Yerramshetty Suchita",
    college: "MSR University, 4th Year",
    funding: "₹32 Lakhs",
    fundingETH: 0.32,
    tags: ["Skincare", "Beauty"],
    url: "https://www.linkedin.com/in/yerramsetty-sai-venkata-suchita-suchta1234?",
    category: "Beauty",
    color: "#4A90E2",
    description: "Personalized skincare solutions and beauty products",
    sector: "Beauty & Personal Care"
  },
  {
    id: "start-shape-creative-001",
    name: "Start Shape",
    founder: "Jesvin Saji",
    college: "Garden City University, Bangalore, 3rd Year",
    funding: "₹20 Lakhs",
    fundingETH: 0.2,
    tags: ["Solutions Company", "Creative"],
    url: "https://www.starshape.in/",
    category: "Creative",
    color: "#50C878",
    description: "Creative solutions and design services company",
    sector: "Creative Services"
  },
  {
    id: "myniquee-art-001",
    name: "Myniquee",
    founder: "Vasundhara",
    college: "Reva College, Bangalore, 3rd Year",
    funding: "₹50 Lakhs",
    fundingETH: 0.5,
    tags: ["Creative", "Art"],
    url: "https://www.instagram.com/myniquee_12?igsh=MXhjdHQ5eTRkZTBrag==",
    category: "Art",
    color: "#50C878",
    description: "Unique art and creative design platform",
    sector: "Art & Design"
  }
];

const CONFIG = {
  NETWORK: Network.TESTNET,
  CONTRACT_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910",
  OWNER_PRIVATE_KEY: "0xb3beae54e0dfaadab65381cf083586c97fd2a784ad97164037e49fcf0af808d3",
  MENTOR_ADDRESS: "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910", // Using owner as mentor
};

class AptosMigrationService {
  constructor() {
    const config = new AptosConfig({ network: CONFIG.NETWORK });
    this.aptos = new Aptos(config);
    this.ownerAccount = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(CONFIG.OWNER_PRIVATE_KEY)
    });
  }

  async addMentor(mentorAddress) {
    try {
      console.log(`👤 Adding mentor: ${mentorAddress}`);
      
      const transaction = await this.aptos.transaction.build.simple({
        sender: this.ownerAccount.accountAddress,
        data: {
          function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::add_mentor`,
          functionArguments: [mentorAddress]
        }
      });

      const response = await this.aptos.signAndSubmitTransaction({
        signer: this.ownerAccount,
        transaction
      });

      await this.aptos.waitForTransaction({ transactionHash: response.hash });
      console.log(`✅ Mentor added successfully: ${response.hash}`);
      return response;
    } catch (error) {
      console.log(`⚠️ Error adding mentor (might already exist): ${error.message}`);
      return null;
    }
  }

  async assignMentorToStartup(startupId, mentorAddress) {
    try {
      console.log(`🔗 Assigning mentor ${mentorAddress} to startup ${startupId}`);
      
      const transaction = await this.aptos.transaction.build.simple({
        sender: this.ownerAccount.accountAddress,
        data: {
          function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::assign_mentor`,
          functionArguments: [startupId, mentorAddress]
        }
      });

      const response = await this.aptos.signAndSubmitTransaction({
        signer: this.ownerAccount,
        transaction
      });

      await this.aptos.waitForTransaction({ transactionHash: response.hash });
      console.log(`✅ Mentor assigned successfully: ${response.hash}`);
      return response;
    } catch (error) {
      console.log(`❌ Error assigning mentor: ${error.message}`);
      throw error;
    }
  }

  async submitMilestone(startup) {
    try {
      console.log(`📝 Submitting milestone for ${startup.name}`);
      
      const fundingValue = Math.floor(startup.fundingETH * 100);
      
      const transaction = await this.aptos.transaction.build.simple({
        sender: this.ownerAccount.accountAddress,
        data: {
          function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::submit_milestone`,
          functionArguments: [
            startup.id,
            "funding",
            fundingValue,
            `${startup.name} founded by ${startup.founder} from ${startup.college}. ${startup.description}`,
            `ipfs://startup-${startup.id}`
          ]
        }
      });

      const response = await this.aptos.signAndSubmitTransaction({
        signer: this.ownerAccount,
        transaction
      });

      await this.aptos.waitForTransaction({ transactionHash: response.hash });
      console.log(`✅ Milestone submitted successfully: ${response.hash}`);
      return response;
    } catch (error) {
      console.log(`❌ Error submitting milestone: ${error.message}`);
      throw error;
    }
  }

  async getStartupMilestones(startupId) {
    try {
      const result = await this.aptos.view({
        payload: {
          function: `${CONFIG.CONTRACT_ADDRESS}::milestone_verification::get_startup_milestones`,
          functionArguments: [startupId]
        }
      });
      return result;
    } catch (error) {
      console.log(`Error getting milestones: ${error.message}`);
      return [];
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function main() {
  console.log("🚀 Starting Aptos startup migration...");
  console.log(`📄 Contract Address: ${CONFIG.CONTRACT_ADDRESS}`);
  
  const migrationService = new AptosMigrationService();
  
  let successCount = 0;
  let errorCount = 0;
  
  // Step 1: Add mentor (owner as mentor)
  await migrationService.addMentor(CONFIG.MENTOR_ADDRESS);
  
  // Step 2: Process each startup
  for (let i = 0; i < structuredStartups.length; i++) {
    const startup = structuredStartups[i];
    console.log(`\n📊 ${i + 1}/${structuredStartups.length}. Processing: ${startup.name}`);
    
    try {
      await migrationService.assignMentorToStartup(startup.id, CONFIG.MENTOR_ADDRESS);
      await migrationService.submitMilestone(startup);
      successCount++;
      console.log(`   ✅ Successfully processed ${startup.name}`);
      await migrationService.delay(1000);
    } catch (error) {
      console.log(`   ❌ Error processing ${startup.name}:`, error.message);
      errorCount++;
      continue;
    }
  }
  
  console.log("\n🎉 Migration Summary:");
  console.log(`✅ Successful migrations: ${successCount}`);
  console.log(`❌ Failed migrations: ${errorCount}`);
}

if (require.main === module) {
  main()
    .then(() => {
      console.log("\n🎯 Migration completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Migration failed:", error);
      process.exit(1);
    });
}

module.exports = { structuredStartups, AptosMigrationService, CONFIG };