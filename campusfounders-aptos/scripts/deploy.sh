#!/bin/bash
# Deployment script for Campus Founders milestone verification

echo "🚀 Starting deployment process..."

# Set variables
CONTRACT_ADDRESS="0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910"
OWNER_PRIVATE_KEY="0xb3beae54e0dfaadab65381cf083586c97fd2a784ad97164037e49fcf0af808d3"
NETWORK_URL="https://fullnode.testnet.aptoslabs.com/v1"

echo "📋 Contract Address: $CONTRACT_ADDRESS"
echo "👑 Owner Address: 0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910"

# Step 1: Compile and deploy contract
echo "📦 Compiling Move contract..."
aptos move compile --named-addresses campus_founders=$CONTRACT_ADDRESS

echo "🚀 Publishing contract..."
aptos move publish --named-addresses campus_founders=$CONTRACT_ADDRESS \
    --private-key $OWNER_PRIVATE_KEY \
    --url $NETWORK_URL \
    --assume-yes

# Step 2: Initialize contract
echo "🏗️ Initializing contract..."
aptos move run --function-id "$CONTRACT_ADDRESS::milestone_verification::initialize" \
    --private-key $OWNER_PRIVATE_KEY \
    --url $NETWORK_URL \
    --assume-yes

# Step 3: Add mentors
echo "👥 Adding mentors..."
echo "Adding Mentor 1: 0xb6724a56c3e07a555f6566062356eff01b0e6b1634e8b4b797186b789865dce5"
aptos move run --function-id "$CONTRACT_ADDRESS::milestone_verification::add_mentor" \
    --args address:0xb6724a56c3e07a555f6566062356eff01b0e6b1634e8b4b797186b789865dce5 \
    --private-key $OWNER_PRIVATE_KEY \
    --url $NETWORK_URL \
    --assume-yes

echo "Adding Mentor 2: 0xd46ab1e89619bfbef7433cdb505bcaf1b24abebeb05085ef732402fecbd59928"
aptos move run --function-id "$CONTRACT_ADDRESS::milestone_verification::add_mentor" \
    --args address:0xd46ab1e89619bfbef7433cdb505bcaf1b24abebeb05085ef732402fecbd59928 \
    --private-key $OWNER_PRIVATE_KEY \
    --url $NETWORK_URL \
    --assume-yes

echo "Adding Mentor 3: 0xbcfc465dc19143af9662bac026c36ab373b32e118f92c9d19cf4ae79dd88e146"
aptos move run --function-id "$CONTRACT_ADDRESS::milestone_verification::add_mentor" \
    --args address:0xbcfc465dc19143af9662bac026c36ab373b32e118f92c9d19cf4ae79dd88e146 \
    --private-key $OWNER_PRIVATE_KEY \
    --url $NETWORK_URL \
    --assume-yes

echo "✅ Deployment completed successfully!"
echo "🔗 Contract deployed at: $CONTRACT_ADDRESS"
echo "👑 Owner: 0x0982e470b961dbb4ac28142a0fc7ebcac1430d2941882aefd7b628902ec5e910"
echo "👥 Mentors added: 3"
