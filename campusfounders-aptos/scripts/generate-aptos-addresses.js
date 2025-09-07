// // generate-aptos-addresses.js
// // Script to generate mentor addresses and setup accounts for Aptos

// const { Account, Ed25519PrivateKey, Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");

// // Your existing configuration
// const OWNER_PRIVATE_KEY = "0xb3beae54e0dfaadab65381cf083586c97fd2a784ad97164037e49fcf0af808d3";
// const CONTRACT_ADDRESS = "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910";

// class AptosAddressGenerator {
//   constructor() {
//     const config = new AptosConfig({ network: Network.TESTNET });
//     this.aptos = new Aptos(config);
//     this.ownerAccount = Account.fromPrivateKey({
//       privateKey: new Ed25519PrivateKey(OWNER_PRIVATE_KEY)
//     });
//   }

//   // Generate new mentor accounts
//   generateMentorAccounts(count = 3) {
//     console.log("🏗️ Generating Mentor Accounts...\n");
//     const mentors = [];

//     for (let i = 0; i < count; i++) {
//       const mentorAccount = Account.generate();
//       const mentorInfo = {
//         id: `mentor-${i + 1}`,
//         name: `Mentor ${i + 1}`,
//         address: mentorAccount.accountAddress.toString(),
//         privateKey: mentorAccount.privateKey.toString(),
//         publicKey: mentorAccount.publicKey.toString()
//       };
//       mentors.push(mentorInfo);

//       console.log(`👤 Mentor ${i + 1}:`);
//       console.log(`   Address: ${mentorInfo.address}`);
//       console.log(`   Private Key: ${mentorInfo.privateKey}`);
//       console.log(`   Public Key: ${mentorInfo.publicKey}\n`);
//     }

//     return mentors;
//   }

//   // Generate startup founder accounts (optional)
//   generateFounderAccounts(startupNames) {
//     console.log("🚀 Generating Startup Founder Accounts...\n");
//     const founders = [];

//     startupNames.forEach((name, index) => {
//       const founderAccount = Account.generate();
//       const founderInfo = {
//         id: `founder-${index + 1}`,
//         startup: name,
//         address: founderAccount.accountAddress.toString(),
//         privateKey: founderAccount.privateKey.toString(),
//         publicKey: founderAccount.publicKey.toString()
//       };
//       founders.push(founderInfo);

//       console.log(`🏢 ${name} Founder:`);
//       console.log(`   Address: ${founderInfo.address}`);
//       console.log(`   Private Key: ${founderInfo.privateKey}\n`);
//     });

//     return founders;
//   }

//   // Fund accounts using testnet faucet
//   async fundAccount(address, amount = 100000000) { // 1 APT = 100000000 octas
//     try {
//       console.log(`💰 Funding account: ${address}`);
//       await this.aptos.fundAccount({
//         accountAddress: address,
//         amount: amount
//       });
//       console.log(`✅ Successfully funded ${address}`);
//       return true;
//     } catch (error) {
//       console.log(`❌ Error funding ${address}: ${error.message}`);
//       return false;
//     }
//   }

//   // Check account balance
//   async checkBalance(address) {
//     try {
//       const resources = await this.aptos.getAccountResources({
//         accountAddress: address
//       });
      
//       const coinResource = resources.find(r => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
//       if (coinResource) {
//         const balance = coinResource.data.coin.value;
//         console.log(`💰 Balance for ${address}: ${balance / 100000000} APT`);
//         return balance;
//       } else {
//         console.log(`💰 Balance for ${address}: 0 APT (account not initialized)`);
//         return 0;
//       }
//     } catch (error) {
//       console.log(`❌ Error checking balance: ${error.message}`);
//       return 0;
//     }
//   }

//   // Generate environment file
//   generateEnvFile(mentors) {
//     const envContent = `# Aptos Configuration
// NEXT_PUBLIC_APTOS_NETWORK=testnet
// NEXT_PUBLIC_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1

// # Contract Configuration
// NEXT_PUBLIC_CONTRACT_ADDRESS=${CONTRACT_ADDRESS}
// NEXT_PUBLIC_SBT_MODULE_ADDR=${CONTRACT_ADDRESS}
// NEXT_PUBLIC_SBT_MODULE_NAME=investor_sbt
// NEXT_PUBLIC_MILESTONE_MODULE_NAME=milestone_verification

// # Owner Configuration
// OWNER_ADDRESS=${this.ownerAccount.accountAddress.toString()}
// OWNER_PRIVATE_KEY=${OWNER_PRIVATE_KEY}

// # Mentor Configuration
// PRIMARY_MENTOR_ADDRESS=${mentors[0]?.address || this.ownerAccount.accountAddress.toString()}
// PRIMARY_MENTOR_PRIVATE_KEY=${mentors[0]?.privateKey || OWNER_PRIVATE_KEY}

// # Additional Mentors
// ${mentors.map((mentor, index) => 
// `MENTOR_${index + 1}_ADDRESS=${mentor.address}
// MENTOR_${index + 1}_PRIVATE_KEY=${mentor.privateKey}`
// ).join('\n')}

// # Frontend Configuration
// NEXT_PUBLIC_PRIMARY_MENTOR=${mentors[0]?.address || this.ownerAccount.accountAddress.toString()}
// `;

//     console.log("📝 Generated .env file content:");
//     console.log("=" .repeat(50));
//     console.log(envContent);
//     console.log("=" .repeat(50));

//     return envContent;
//   }

//   // Generate migration configuration
//   generateMigrationConfig(mentors) {
//     const config = {
//       NETWORK: "testnet",
//       CONTRACT_ADDRESS: CONTRACT_ADDRESS,
//       OWNER_PRIVATE_KEY: OWNER_PRIVATE_KEY,
//       OWNER_ADDRESS: this.ownerAccount.accountAddress.toString(),
//       PRIMARY_MENTOR_ADDRESS: mentors[0]?.address || this.ownerAccount.accountAddress.toString(),
//       PRIMARY_MENTOR_PRIVATE_KEY: mentors[0]?.privateKey || OWNER_PRIVATE_KEY,
//       ALL_MENTORS: mentors,
//       URLS: {
//         TESTNET: "https://fullnode.testnet.aptoslabs.com/v1",
//         MAINNET: "https://fullnode.mainnet.aptoslabs.com/v1"
//       }
//     };

//     console.log("\n🔧 Migration Configuration:");
//     console.log(JSON.stringify(config, null, 2));
    
//     return config;
//   }
// }

// async function main() {
//   console.log("🏁 Starting Aptos Address Generation Process...\n");
  
//   const generator = new AptosAddressGenerator();
  
//   // Show owner info
//   console.log("👑 Owner Account:");
//   console.log(`   Address: ${generator.ownerAccount.accountAddress.toString()}`);
//   console.log(`   Private Key: ${OWNER_PRIVATE_KEY}\n`);
  
//   // Check owner balance
//   await generator.checkBalance(generator.ownerAccount.accountAddress.toString());
  
//   // Generate mentor accounts
//   const mentors = generator.generateMentorAccounts(3); // Generate 3 mentors
  
//   // Optional: Generate founder accounts for major startups
//   const majorStartups = ["LearnyHive", "TechStartup", "EduTech"];
//   const founders = generator.generateFounderAccounts(majorStartups);
  
//   console.log("\n💰 Funding Accounts...");
  
//   // Fund mentor accounts
//   for (const mentor of mentors) {
//     await generator.fundAccount(mentor.address);
//     await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between funding
//   }
  
//   // Fund founder accounts (optional)
//   for (const founder of founders.slice(0, 2)) { // Fund first 2 founders
//     await generator.fundAccount(founder.address);
//     await new Promise(resolve => setTimeout(resolve, 2000));
//   }
  
//   // Generate configuration files
//   console.log("\n📋 Generating Configuration Files...");
//   const envContent = generator.generateEnvFile(mentors);
//   const migrationConfig = generator.generateMigrationConfig(mentors);
  
//   // Summary
//   console.log("\n🎉 Setup Complete!");
//   console.log("=" .repeat(50));
//   console.log(`✅ Owner Address: ${generator.ownerAccount.accountAddress.toString()}`);
//   console.log(`✅ Contract Address: ${CONTRACT_ADDRESS}`);
//   console.log(`✅ Primary Mentor: ${mentors[0]?.address}`);
//   console.log(`✅ Total Mentors Generated: ${mentors.length}`);
//   console.log(`✅ Total Founders Generated: ${founders.length}`);
  
//   console.log("\n🔄 Next Steps:");
//   console.log("1. Save the .env content to your .env file");
//   console.log("2. Use the migration script with the new mentor addresses");
//   console.log("3. Add mentors to your contract using CLI or script");
//   console.log("4. Assign mentors to startups");
//   console.log("5. Submit milestones for all startups");
  
//   // Generate CLI commands for immediate use
//   console.log("\n📝 Quick CLI Commands:");
//   console.log("# Add primary mentor to contract:");
//   console.log(`aptos move run --function-id "${CONTRACT_ADDRESS}::milestone_verification::add_mentor" --args address:${mentors[0]?.address} --url https://fullnode.testnet.aptoslabs.com/v1 --private-key ${OWNER_PRIVATE_KEY}`);
  
//   console.log("\n# Assign mentor to a startup:");
//   console.log(`aptos move run --function-id "${CONTRACT_ADDRESS}::milestone_verification::assign_mentor" --args string:"learny-hive-001" address:${mentors[0]?.address} --url https://fullnode.testnet.aptoslabs.com/v1 --private-key ${OWNER_PRIVATE_KEY}`);
  
//   return {
//     mentors,
//     founders,
//     envContent,
//     migrationConfig,
//     ownerAddress: generator.ownerAccount.accountAddress.toString(),
//     contractAddress: CONTRACT_ADDRESS
//   };
// }

// // Export for use as module
// module.exports = { AptosAddressGenerator };

// // Handle script execution
// if (require.main === module) {
//   main()
//     .then((result) => {
//       console.log("\n🎯 Address generation completed successfully!");
      
//       // Save results to file (optional)
//       const fs = require('fs');
//       fs.writeFileSync('./aptos-addresses.json', JSON.stringify(result, null, 2));
//       console.log("💾 Results saved to aptos-addresses.json");
      
//       process.exit(0);
//     })
//     .catch((error) => {
//       console.error("\n💥 Address generation failed:", error);
//       process.exit(1);
//     });
// }


// generate-aptos-addresses.js - FIXED VERSION
// Script to generate mentor addresses and setup accounts for Aptos

const { Account, Ed25519PrivateKey, Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");
const fs = require('fs');

// Your existing configuration
const OWNER_PRIVATE_KEY = "0xb3beae54e0dfaadab65381cf083586c97fd2a784ad97164037e49fcf0af808d3";
const CONTRACT_ADDRESS = "0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910";

class AptosAddressGenerator {
  constructor() {
    const config = new AptosConfig({ network: Network.TESTNET });
    this.aptos = new Aptos(config);
    this.ownerAccount = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(OWNER_PRIVATE_KEY)
    });
  }

  // Generate new mentor accounts with consistent private key format
  generateMentorAccounts(count = 3) {
    console.log("🏗️ Generating Mentor Accounts...\n");
    const mentors = [];

    for (let i = 0; i < count; i++) {
      const mentorAccount = Account.generate();
      
      // Format private key consistently (remove ed25519-priv- prefix)
      let privateKeyStr = mentorAccount.privateKey.toString();
      if (privateKeyStr.startsWith('ed25519-priv-')) {
        privateKeyStr = privateKeyStr.replace('ed25519-priv-', '');
      }
      
      const mentorInfo = {
        id: `mentor-${i + 1}`,
        name: `Mentor ${i + 1}`,
        address: mentorAccount.accountAddress.toString(),
        privateKey: privateKeyStr, // Consistent format
        publicKey: mentorAccount.publicKey.toString(),
        account: mentorAccount // Keep reference for later use
      };
      mentors.push(mentorInfo);

      console.log(`👤 Mentor ${i + 1}:`);
      console.log(`   Address: ${mentorInfo.address}`);
      console.log(`   Private Key: ${mentorInfo.privateKey}`);
      console.log(`   Public Key: ${mentorInfo.publicKey}\n`);
    }

    return mentors;
  }

  // Generate startup founder accounts (optional)
  generateFounderAccounts(startupNames) {
    console.log("🚀 Generating Startup Founder Accounts...\n");
    const founders = [];

    startupNames.forEach((name, index) => {
      const founderAccount = Account.generate();
      
      let privateKeyStr = founderAccount.privateKey.toString();
      if (privateKeyStr.startsWith('ed25519-priv-')) {
        privateKeyStr = privateKeyStr.replace('ed25519-priv-', '');
      }
      
      const founderInfo = {
        id: `founder-${index + 1}`,
        startup: name,
        address: founderAccount.accountAddress.toString(),
        privateKey: privateKeyStr,
        publicKey: founderAccount.publicKey.toString(),
        account: founderAccount
      };
      founders.push(founderInfo);

      console.log(`🏢 ${name} Founder:`);
      console.log(`   Address: ${founderInfo.address}`);
      console.log(`   Private Key: ${founderInfo.privateKey}\n`);
    });

    return founders;
  }

  // Check if account exists and get balance
  async checkAccountStatus(address) {
    try {
      const resources = await this.aptos.getAccountResources({
        accountAddress: address
      });
      
      const coinResource = resources.find(r => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
      if (coinResource) {
        const balance = parseInt(coinResource.data.coin.value);
        console.log(`💰 Balance for ${address}: ${balance / 100000000} APT`);
        return { exists: true, balance };
      } else {
        console.log(`💰 Account ${address}: Exists but not initialized with APT`);
        return { exists: true, balance: 0 };
      }
    } catch (error) {
      if (error.message.includes('Resource not found')) {
        console.log(`💰 Account ${address}: Not yet created (needs funding)`);
        return { exists: false, balance: 0 };
      }
      console.log(`❌ Error checking account ${address}: ${error.message}`);
      return { exists: false, balance: 0 };
    }
  }

  // Generate manual funding instructions
  generateFundingInstructions(accounts) {
    console.log("\n🏦 MANUAL FUNDING REQUIRED");
    console.log("=" .repeat(60));
    console.log("Since Aptos testnet removed programmatic funding, you need to manually fund accounts:");
    console.log("\n1. Visit: https://aptos.dev/network/faucet");
    console.log("2. Select 'Testnet' network");
    console.log("3. Fund each address below:\n");
    
    accounts.forEach((account, index) => {
      console.log(`Address ${index + 1}: ${account.address}`);
    });
    
    console.log("\n💡 Recommendation: Fund each address with at least 1 APT");
    console.log("💡 You can check balances later using the checkAccountStatus function");
  }

  // Generate environment file with consistent formatting
  generateEnvFile(mentors) {
    const envContent = `# Aptos Configuration
NEXT_PUBLIC_APTOS_NETWORK=testnet
NEXT_PUBLIC_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=${CONTRACT_ADDRESS}
NEXT_PUBLIC_SBT_MODULE_ADDR=${CONTRACT_ADDRESS}
NEXT_PUBLIC_SBT_MODULE_NAME=investor_sbt
NEXT_PUBLIC_MILESTONE_MODULE_NAME=milestone_verification

# Owner Configuration
OWNER_ADDRESS=${this.ownerAccount.accountAddress.toString()}
OWNER_PRIVATE_KEY=${OWNER_PRIVATE_KEY}

# Mentor Configuration
PRIMARY_MENTOR_ADDRESS=${mentors[0]?.address || this.ownerAccount.accountAddress.toString()}
PRIMARY_MENTOR_PRIVATE_KEY=${mentors[0]?.privateKey || OWNER_PRIVATE_KEY}

# Additional Mentors
${mentors.map((mentor, index) => 
`MENTOR_${index + 1}_ADDRESS=${mentor.address}
MENTOR_${index + 1}_PRIVATE_KEY=${mentor.privateKey}`
).join('\n')}

# Frontend Configuration
NEXT_PUBLIC_PRIMARY_MENTOR=${mentors[0]?.address || this.ownerAccount.accountAddress.toString()}
`;

    return envContent;
  }

  // Generate Move.toml configuration
  generateMoveConfig() {
    return `[package]
name = "campus_founders"
version = "1.0.0"
authors = ["Your Name <your.email@example.com>"]

[addresses]
campus_founders = "${CONTRACT_ADDRESS}"

[dev-addresses]
campus_founders = "${CONTRACT_ADDRESS}"

[dependencies.AptosFramework]
git = "https://github.com/aptos-labs/aptos-core.git"
rev = "mainnet"
subdir = "aptos-move/framework/aptos-framework"

[dev-dependencies]`;
  }

  // Generate deployment script
  generateDeploymentScript(mentors) {
    return `#!/bin/bash
# Deployment script for Campus Founders milestone verification

echo "🚀 Starting deployment process..."

# Set variables
CONTRACT_ADDRESS="${CONTRACT_ADDRESS}"
OWNER_PRIVATE_KEY="${OWNER_PRIVATE_KEY}"
NETWORK_URL="https://fullnode.testnet.aptoslabs.com/v1"

echo "📋 Contract Address: \$CONTRACT_ADDRESS"
echo "👑 Owner Address: ${this.ownerAccount.accountAddress.toString()}"

# Step 1: Compile and deploy contract
echo "📦 Compiling Move contract..."
aptos move compile --named-addresses campus_founders=\$CONTRACT_ADDRESS

echo "🚀 Publishing contract..."
aptos move publish --named-addresses campus_founders=\$CONTRACT_ADDRESS \\
    --private-key \$OWNER_PRIVATE_KEY \\
    --url \$NETWORK_URL \\
    --assume-yes

# Step 2: Initialize contract
echo "🏗️ Initializing contract..."
aptos move run --function-id "\$CONTRACT_ADDRESS::milestone_verification::initialize" \\
    --private-key \$OWNER_PRIVATE_KEY \\
    --url \$NETWORK_URL \\
    --assume-yes

# Step 3: Add mentors
echo "👥 Adding mentors..."
${mentors.map((mentor, index) => 
`echo "Adding Mentor ${index + 1}: ${mentor.address}"
aptos move run --function-id "\$CONTRACT_ADDRESS::milestone_verification::add_mentor" \\
    --args address:${mentor.address} \\
    --private-key \$OWNER_PRIVATE_KEY \\
    --url \$NETWORK_URL \\
    --assume-yes`
).join('\n\n')}

echo "✅ Deployment completed successfully!"
echo "🔗 Contract deployed at: \$CONTRACT_ADDRESS"
echo "👑 Owner: ${this.ownerAccount.accountAddress.toString()}"
echo "👥 Mentors added: ${mentors.length}"
`;
  }
}

async function main() {
  console.log("🏁 Starting Fixed Aptos Address Generation Process...\n");
  
  const generator = new AptosAddressGenerator();
  
  // Show owner info
  console.log("👑 Owner Account:");
  console.log(`   Address: ${generator.ownerAccount.accountAddress.toString()}`);
  console.log(`   Private Key: ${OWNER_PRIVATE_KEY}\n`);
  
  // Check owner balance
  await generator.checkAccountStatus(generator.ownerAccount.accountAddress.toString());
  
  // Generate mentor accounts
  const mentors = generator.generateMentorAccounts(3);
  
  // Optional: Generate founder accounts for major startups
  const majorStartups = ["LearnyHive", "TechStartup", "EduTech"];
  const founders = generator.generateFounderAccounts(majorStartups);
  
  // Check account statuses
  console.log("\n📊 Checking Account Statuses...");
  for (const mentor of mentors) {
    await generator.checkAccountStatus(mentor.address);
  }
  
  // Generate manual funding instructions
  const allAccounts = [...mentors, ...founders];
  generator.generateFundingInstructions(allAccounts);
  
  // Generate configuration files
  console.log("\n📋 Generating Configuration Files...");
  
  const envContent = generator.generateEnvFile(mentors);
  const moveConfig = generator.generateMoveConfig();
  const deployScript = generator.generateDeploymentScript(mentors);
  
  // Save files
  fs.writeFileSync('./.env', envContent);
  console.log("✅ Generated .env file");
  
  fs.writeFileSync('./Move.toml', moveConfig);
  console.log("✅ Generated Move.toml file");
  
  fs.writeFileSync('./deploy.sh', deployScript);
  console.log("✅ Generated deploy.sh script");
  
  // Make deploy script executable
  try {
    fs.chmodSync('./deploy.sh', '755');
  } catch (err) {
    console.log("⚠️ Could not make deploy.sh executable, you may need to run: chmod +x deploy.sh");
  }
  
  console.log("\n📝 Generated .env file content:");
  console.log("=" .repeat(50));
  console.log(envContent);
  console.log("=" .repeat(50));
  
  // Summary
  console.log("\n🎉 Setup Complete!");
  console.log("=" .repeat(50));
  console.log(`✅ Owner Address: ${generator.ownerAccount.accountAddress.toString()}`);
  console.log(`✅ Contract Address: ${CONTRACT_ADDRESS}`);
  console.log(`✅ Primary Mentor: ${mentors[0]?.address}`);
  console.log(`✅ Total Mentors Generated: ${mentors.length}`);
  console.log(`✅ Total Founders Generated: ${founders.length}`);
  
  console.log("\n🔄 Next Steps:");
  console.log("1. ✅ Save configuration files (Done)");
  console.log("2. 💰 Fund accounts manually using https://aptos.dev/network/faucet");
  console.log("3. 🔧 Fix Move.toml with correct contract address");
  console.log("4. 📦 Run: chmod +x deploy.sh && ./deploy.sh");
  console.log("5. 🎯 Test milestone submission and verification");
  
  console.log("\n🏦 IMPORTANT: Manual Funding Required");
  console.log("Visit https://aptos.dev/network/faucet and fund these addresses:");
  allAccounts.forEach((account, index) => {
    console.log(`${index + 1}. ${account.address}`);
  });
  
  return {
    mentors,
    founders,
    envContent,
    moveConfig,
    deployScript,
    ownerAddress: generator.ownerAccount.accountAddress.toString(),
    contractAddress: CONTRACT_ADDRESS
  };
}

// Export for use as module
module.exports = { AptosAddressGenerator };

// Handle script execution
if (require.main === module) {
  main()
    .then((result) => {
      console.log("\n🎯 Address generation completed successfully!");
      
      // Save results to file
      fs.writeFileSync('./aptos-addresses.json', JSON.stringify(result, null, 2));
      console.log("💾 Results saved to aptos-addresses.json");
      
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Address generation failed:", error);
      process.exit(1);
    });
}