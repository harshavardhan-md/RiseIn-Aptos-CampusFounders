module campus_founders::milestone_verification {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event::{Self, EventHandle};
    use aptos_framework::account;
    use aptos_std::table::{Self, Table};
    use aptos_std::simple_map::{Self, SimpleMap};

    // Error codes
    const E_NOT_OWNER: u64 = 1;
    const E_NOT_MENTOR: u64 = 2;
    const E_NO_MENTOR_ASSIGNED: u64 = 3;
    const E_MILESTONE_NOT_EXISTS: u64 = 4;
    const E_NOT_ASSIGNED_MENTOR: u64 = 5;
    const E_ALREADY_VERIFIED: u64 = 6;
    const E_CONTRACT_ALREADY_INITIALIZED: u64 = 7;

    // Milestone struct
    struct Milestone has store, copy, drop {
        startup_id: String,
        milestone_type: String,
        value: u64,
        description: String,
        mentor_address: address,
        proof_hash: String,
        timestamp: u64,
        verified: bool,
    }

    // Events
    struct MilestoneSubmittedEvent has drop, store {
        startup_id: String,
        milestone_index: u64,
    }

    struct MilestoneVerifiedEvent has drop, store {
        startup_id: String,
        milestone_index: u64,
        mentor: address,
    }

    struct MentorAddedEvent has drop, store {
        mentor_address: address,
    }

    // Main contract state
    struct MilestoneContract has key {
        owner: address,
        startup_milestones: Table<String, vector<Milestone>>,
        mentors: SimpleMap<address, bool>,
        startup_to_mentor: SimpleMap<String, address>,
        
        // Event handles
        milestone_submitted_events: EventHandle<MilestoneSubmittedEvent>,
        milestone_verified_events: EventHandle<MilestoneVerifiedEvent>,
        mentor_added_events: EventHandle<MentorAddedEvent>,
    }

    // Initialize contract
    public entry fun initialize(account: &signer) {
        let account_addr = signer::address_of(account);
        
        // Ensure contract is not already initialized
        assert!(!exists<MilestoneContract>(account_addr), E_CONTRACT_ALREADY_INITIALIZED);
        
        let contract = MilestoneContract {
            owner: account_addr,
            startup_milestones: table::new(),
            mentors: simple_map::create(),
            startup_to_mentor: simple_map::create(),
            milestone_submitted_events: account::new_event_handle<MilestoneSubmittedEvent>(account),
            milestone_verified_events: account::new_event_handle<MilestoneVerifiedEvent>(account),
            mentor_added_events: account::new_event_handle<MentorAddedEvent>(account),
        };

        // Add owner as first mentor
        simple_map::add(&mut contract.mentors, account_addr, true);

        move_to(account, contract);
    }

    // Add mentor
    public entry fun add_mentor(account: &signer, mentor_address: address) acquires MilestoneContract {
        let account_addr = signer::address_of(account);
        let contract = borrow_global_mut<MilestoneContract>(account_addr);
        
        assert!(account_addr == contract.owner, E_NOT_OWNER);
        
        simple_map::upsert(&mut contract.mentors, mentor_address, true);
        
        event::emit_event(&mut contract.mentor_added_events, MentorAddedEvent {
            mentor_address,
        });
    }

    // Assign mentor to startup
    public entry fun assign_mentor(
        account: &signer, 
        startup_id: String, 
        mentor_address: address
    ) acquires MilestoneContract {
        let account_addr = signer::address_of(account);
        let contract = borrow_global_mut<MilestoneContract>(account_addr);
        
        assert!(account_addr == contract.owner, E_NOT_OWNER);
        assert!(simple_map::contains_key(&contract.mentors, &mentor_address), E_NOT_MENTOR);
        
        simple_map::upsert(&mut contract.startup_to_mentor, startup_id, mentor_address);
    }

    // Submit milestone - KEEP OLD SIGNATURE for backward compatibility
    public entry fun submit_milestone(
        account: &signer,
        startup_id: String,
        milestone_type: String,
        value: u64,
        description: String,
        proof_hash: String
    ) acquires MilestoneContract {
        let account_addr = signer::address_of(account);
        let contract = borrow_global_mut<MilestoneContract>(account_addr);
        
        assert!(simple_map::contains_key(&contract.startup_to_mentor, &startup_id), E_NO_MENTOR_ASSIGNED);
        
        let mentor_address = *simple_map::borrow(&contract.startup_to_mentor, &startup_id);
        
        let new_milestone = Milestone {
            startup_id,
            milestone_type,
            value,
            description,
            mentor_address,
            proof_hash,
            timestamp: timestamp::now_seconds(),
            verified: false,
        };

        // Get or create milestone vector for this startup
        if (!table::contains(&contract.startup_milestones, startup_id)) {
            table::add(&mut contract.startup_milestones, startup_id, vector::empty<Milestone>());
        };
        
        let milestones = table::borrow_mut(&mut contract.startup_milestones, startup_id);
        vector::push_back(milestones, new_milestone);
        let milestone_index = vector::length(milestones) - 1;
        
        event::emit_event(&mut contract.milestone_submitted_events, MilestoneSubmittedEvent {
            startup_id,
            milestone_index,
        });
    }

    // Verify milestone - KEEP OLD SIGNATURE for backward compatibility
    public entry fun verify_milestone(
        account: &signer,
        startup_id: String,
        milestone_index: u64
    ) acquires MilestoneContract {
        let mentor_addr = signer::address_of(account);
        let contract = borrow_global_mut<MilestoneContract>(mentor_addr);
        
        assert!(table::contains(&contract.startup_milestones, startup_id), E_MILESTONE_NOT_EXISTS);
        
        let milestones = table::borrow_mut(&mut contract.startup_milestones, startup_id);
        assert!(milestone_index < vector::length(milestones), E_MILESTONE_NOT_EXISTS);
        
        let milestone = vector::borrow_mut(milestones, milestone_index);
        assert!(mentor_addr == milestone.mentor_address, E_NOT_ASSIGNED_MENTOR);
        assert!(!milestone.verified, E_ALREADY_VERIFIED);
        
        milestone.verified = true;
        
        event::emit_event(&mut contract.milestone_verified_events, MilestoneVerifiedEvent {
            startup_id,
            milestone_index,
            mentor: mentor_addr,
        });
    }

    // Get all milestones for a startup - KEEP OLD SIGNATURE
    #[view]
    public fun get_startup_milestones(startup_id: String): vector<Milestone> acquires MilestoneContract {
        let contract = borrow_global<MilestoneContract>(@campus_founders);
        
        if (table::contains(&contract.startup_milestones, startup_id)) {
            *table::borrow(&contract.startup_milestones, startup_id)
        } else {
            vector::empty<Milestone>()
        }
    }

    // Get verified milestones count - KEEP OLD SIGNATURE
    #[view]
    public fun get_verified_milestones_count(startup_id: String): u64 acquires MilestoneContract {
        let contract = borrow_global<MilestoneContract>(@campus_founders);
        
        if (!table::contains(&contract.startup_milestones, startup_id)) {
            return 0
        };
        
        let milestones = table::borrow(&contract.startup_milestones, startup_id);
        let count = 0;
        let i = 0;
        let len = vector::length(milestones);
        
        while (i < len) {
            let milestone = vector::borrow(milestones, i);
            if (milestone.verified) {
                count = count + 1;
            };
            i = i + 1;
        };
        
        count
    }

    // Check if mentor exists
    #[view]
    public fun is_mentor(mentor_address: address): bool acquires MilestoneContract {
        let contract = borrow_global<MilestoneContract>(@campus_founders);
        simple_map::contains_key(&contract.mentors, &mentor_address)
    }

    // Get startup's assigned mentor
    #[view]
    public fun get_startup_mentor(startup_id: String): address acquires MilestoneContract {
        let contract = borrow_global<MilestoneContract>(@campus_founders);
        *simple_map::borrow(&contract.startup_to_mentor, &startup_id)
    }

    // Get contract owner
    #[view]
    public fun get_owner(): address acquires MilestoneContract {
        let contract = borrow_global<MilestoneContract>(@campus_founders);
        contract.owner
    }
}