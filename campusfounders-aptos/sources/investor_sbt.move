module campus_founders::investor_sbt {
    use std::signer;
    use std::string::{Self, String};
    use std::option::{Self, Option};
    use aptos_framework::event;
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};

    // Error codes
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;
    const E_NOT_INITIALIZED: u64 = 3;
    const E_INVALID_ADDRESS: u64 = 4;
    const E_ALREADY_HAS_TOKEN: u64 = 5;
    const E_TOKEN_NOT_EXISTS: u64 = 6;
    const E_TOKEN_REVOKED: u64 = 7;
    const E_TOKEN_EXPIRED: u64 = 8;
    const E_NOT_TOKEN_OWNER: u64 = 9;
    const E_TRANSFER_NOT_ALLOWED: u64 = 10;

    // Events
    #[event]
    struct MintedEvent has drop, store {
        to: address,
        token_id: u64,
        credential_hash: vector<u8>,
    }

    #[event]
    struct RevokedEvent has drop, store {
        token_id: u64,
    }

    #[event]
    struct RenewedEvent has drop, store {
        token_id: u64,
        new_expiry: u64,
    }

    // Credential struct
    struct Credential has store, drop, copy {
        credential_hash: vector<u8>,
        issued_at: u64,
        expires_at: u64,
        revoked: bool,
        uri: String,
        owner: address,
    }

    // Main SBT resource
    struct InvestorSBT has key {
        name: String,
        symbol: String,
        admin: address,
        issuer: address,
        next_id: u64,
        credentials: Table<u64, Credential>,
        token_of: Table<address, u64>,
    }

    // Initialize the SBT contract
    public entry fun initialize(
        admin: &signer,
        issuer_address: address,
        name: vector<u8>,
        symbol: vector<u8>
    ) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<InvestorSBT>(admin_addr), E_ALREADY_INITIALIZED);

        move_to(admin, InvestorSBT {
            name: string::utf8(name),
            symbol: string::utf8(symbol),
            admin: admin_addr,
            issuer: issuer_address,
            next_id: 1,
            credentials: table::new(),
            token_of: table::new(),
        });
    }

    // Mint new SBT
    public entry fun mint(
        issuer: &signer,
        to: address,
        credential_hash: vector<u8>,
        expires_at: u64,
        uri: vector<u8>
    ) acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global_mut<InvestorSBT>(contract_addr);
        
        // Check authorization
        assert!(signer::address_of(issuer) == sbt.issuer, E_NOT_AUTHORIZED);
        
        // Check if address is valid and doesn't already have a token
        assert!(to != @0x0, E_INVALID_ADDRESS);
        assert!(!table::contains(&sbt.token_of, to), E_ALREADY_HAS_TOKEN);

        let token_id = sbt.next_id;
        sbt.next_id = sbt.next_id + 1;

        let credential = Credential {
            credential_hash,
            issued_at: timestamp::now_seconds(),
            expires_at,
            revoked: false,
            uri: string::utf8(uri),
            owner: to,
        };

        table::add(&mut sbt.credentials, token_id, credential);
        table::add(&mut sbt.token_of, to, token_id);

        event::emit(MintedEvent {
            to,
            token_id,
            credential_hash,
        });
    }

    // Revoke SBT
    public entry fun revoke(issuer: &signer, token_id: u64) acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global_mut<InvestorSBT>(contract_addr);
        
        // Check authorization
        assert!(signer::address_of(issuer) == sbt.issuer, E_NOT_AUTHORIZED);
        
        // Check if token exists
        assert!(table::contains(&sbt.credentials, token_id), E_TOKEN_NOT_EXISTS);
        
        let credential = table::borrow_mut(&mut sbt.credentials, token_id);
        credential.revoked = true;

        event::emit(RevokedEvent {
            token_id,
        });
    }

    // Renew SBT
    public entry fun renew(issuer: &signer, token_id: u64, new_expiry: u64) acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global_mut<InvestorSBT>(contract_addr);
        
        // Check authorization
        assert!(signer::address_of(issuer) == sbt.issuer, E_NOT_AUTHORIZED);
        
        // Check if token exists
        assert!(table::contains(&sbt.credentials, token_id), E_TOKEN_NOT_EXISTS);
        
        let credential = table::borrow_mut(&mut sbt.credentials, token_id);
        credential.expires_at = new_expiry;
        credential.revoked = false;

        event::emit(RenewedEvent {
            token_id,
            new_expiry,
        });
    }

    // View functions
    #[view]
    public fun is_valid(token_id: u64): bool acquires InvestorSBT {
        let contract_addr = get_contract_address();
        if (!exists<InvestorSBT>(contract_addr)) return false;
        
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        if (!table::contains(&sbt.credentials, token_id)) return false;
        
        let credential = table::borrow(&sbt.credentials, token_id);
        if (credential.revoked) return false;
        if (credential.expires_at != 0 && timestamp::now_seconds() > credential.expires_at) return false;
        
        true
    }

    #[view]
    public fun get_investor_token(investor: address): u64 acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        
        if (table::contains(&sbt.token_of, investor)) {
            *table::borrow(&sbt.token_of, investor)
        } else {
            0
        }
    }

    #[view]
    public fun is_verified_investor(investor: address): bool acquires InvestorSBT {
        let token_id = get_investor_token(investor);
        if (token_id == 0) return false;
        is_valid(token_id)
    }

    #[view]
    public fun token_exists(token_id: u64): bool acquires InvestorSBT {
        let contract_addr = get_contract_address();
        if (!exists<InvestorSBT>(contract_addr)) return false;
        
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        table::contains(&sbt.credentials, token_id)
    }

    #[view]
    public fun get_credential(token_id: u64): Option<Credential> acquires InvestorSBT {
        let contract_addr = get_contract_address();
        if (!exists<InvestorSBT>(contract_addr)) return option::none();
        
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        if (!table::contains(&sbt.credentials, token_id)) return option::none();
        
        let credential = table::borrow(&sbt.credentials, token_id);
        option::some(*credential)
    }

    #[view]
    public fun token_uri(token_id: u64): String acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        
        assert!(table::contains(&sbt.credentials, token_id), E_TOKEN_NOT_EXISTS);
        table::borrow(&sbt.credentials, token_id).uri
    }

    #[view]
    public fun get_contract_info(): (String, String, address, address) acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        (sbt.name, sbt.symbol, sbt.admin, sbt.issuer)
    }

    #[view]
    public fun owner_of(token_id: u64): address acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global<InvestorSBT>(contract_addr);
        
        assert!(table::contains(&sbt.credentials, token_id), E_TOKEN_NOT_EXISTS);
        table::borrow(&sbt.credentials, token_id).owner
    }

    // Admin functions
    public entry fun update_issuer(admin: &signer, new_issuer: address) acquires InvestorSBT {
        let contract_addr = get_contract_address();
        let sbt = borrow_global_mut<InvestorSBT>(contract_addr);
        
        assert!(signer::address_of(admin) == sbt.admin, E_NOT_AUTHORIZED);
        sbt.issuer = new_issuer;
    }

    // Helper function to get contract address (you'll need to set this to your deployed address)
    fun get_contract_address(): address {
        @campus_founders
    }

    // SBT enforcement: prevent transfers (these would be called by any transfer mechanism)
    public fun assert_no_transfer() {
        // This function can be called by transfer mechanisms to prevent transfers
        assert!(false, E_TRANSFER_NOT_ALLOWED);
    }
}