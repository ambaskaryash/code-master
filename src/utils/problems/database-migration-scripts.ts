import { Problem } from "../types/problem";

const starterCodeDatabaseMigration = `-- Create safe database migration scripts for an e-commerce application upgrade
-- 
-- Current Schema (v1.0):
-- users: id, name, email, created_at
-- products: id, name, price, created_at
-- orders: id, user_id, total, created_at
-- 
-- Required Changes (v2.0):
-- 1. Add phone number to users table (optional field)
-- 2. Add category and inventory fields to products table
-- 3. Rename 'total' to 'total_amount' in orders table
-- 4. Add order_items table for detailed order tracking
-- 5. Add indexes for performance optimization
-- 6. Update existing data to maintain consistency
-- 7. Create rollback scripts for safe deployment
-- 8. Handle large table modifications safely (chunk processing)
-- 9. Add constraints and foreign keys
-- 10. Migrate existing orders to new order_items structure

-- MIGRATION SCRIPT (UP) - Apply Changes
-- File: migration_v2.0_up.sql

-- Step 1: Pre-migration validation
-- Check current schema and data integrity

-- Step 2: Create new tables
-- Write DDL for new tables (order_items, etc.)

-- Step 3: Alter existing tables
-- Add new columns, modify existing ones

-- Step 4: Data migration
-- Safely migrate existing data to new structure

-- Step 5: Add indexes and constraints
-- Optimize database performance

-- Step 6: Cleanup
-- Remove temporary columns/tables if needed

-- Write your UP migration script here:

-- ROLLBACK SCRIPT (DOWN) - Revert Changes  
-- File: migration_v2.0_down.sql

-- Step 1: Validation checks before rollback

-- Step 2: Reverse data migration

-- Step 3: Drop new structures  

-- Step 4: Restore original schema

-- Write your DOWN migration script here:

-- DEPLOYMENT CHECKLIST:
-- [ ] Backup database before migration
-- [ ] Test on staging environment
-- [ ] Check application compatibility
-- [ ] Monitor performance impact
-- [ ] Validate data integrity
-- [ ] Document changes
`;

const handlerDatabaseMigration = (migrationCode: string) => {
    try {
        const code = migrationCode.toLowerCase();
        
        // Check for required migration elements
        const requirements = [
            { test: () => code.includes('alter table'), message: "Must use ALTER TABLE statements to modify existing tables" },
            { test: () => code.includes('create table'), message: "Must create new tables (order_items)" },
            { test: () => code.includes('create index') || code.includes('add index'), message: "Must add database indexes for performance" },
            { test: () => code.includes('foreign key') || code.includes('references'), message: "Must add foreign key constraints" },
            { test: () => code.includes('add column'), message: "Must add new columns to existing tables" },
            { test: () => code.includes('rename') || code.includes('change column'), message: "Must rename columns (total -> total_amount)" },
            { test: () => code.includes('insert') || code.includes('update'), message: "Must include data migration statements" },
            { test: () => code.includes('drop'), message: "Must include DROP statements in rollback script" },
            { test: () => code.includes('backup') || code.includes('transaction'), message: "Must consider backup and transaction safety" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        // Check for safety practices
        const safetyRequirements = [
            { test: () => code.includes('if not exists') || code.includes('if exists'), message: "Must use IF EXISTS/IF NOT EXISTS for safety" },
            { test: () => code.includes('begin') || code.includes('start transaction'), message: "Must use transactions for atomic operations" },
            { test: () => code.includes('rollback') || code.includes('commit'), message: "Must handle transaction rollback scenarios" },
            { test: () => code.includes('check') || code.includes('validate'), message: "Must include data validation steps" },
            { test: () => code.includes('chunk') || code.includes('batch') || code.includes('limit'), message: "Must handle large data migrations in chunks" },
        ];
        
        let safetyScore = 0;
        for (const requirement of safetyRequirements) {
            if (requirement.test()) {
                safetyScore++;
            }
        }
        
        if (safetyScore < 3) {
            throw new Error("Must demonstrate more migration safety practices (transactions, chunking, validation)");
        }
        
        // Check for both UP and DOWN scripts
        const hasUpScript = code.includes('up') || code.includes('migration');
        const hasDownScript = code.includes('down') || code.includes('rollback');
        
        if (!hasUpScript || !hasDownScript) {
            throw new Error("Must provide both UP (migration) and DOWN (rollback) scripts");
        }
        
        // Check for specific schema changes
        const schemaChanges = [
            { test: () => code.includes('phone'), message: "Must add phone column to users table" },
            { test: () => code.includes('category') && code.includes('inventory'), message: "Must add category and inventory to products" },
            { test: () => code.includes('total_amount'), message: "Must rename total to total_amount in orders" },
            { test: () => code.includes('order_items'), message: "Must create order_items table" }
        ];
        
        for (const change of schemaChanges) {
            if (!change.test()) {
                throw new Error(change.message);
            }
        }
        
        return true;
    } catch (error: any) {
        console.log("Database Migration Scripts handler error");
        throw new Error(error.message || error);
    }
};

export const databaseMigrationScripts: Problem = {
    id: "database-migration-scripts",
    title: "Database: Safe Migration Scripts",
    problemStatement: `<p class='mt-3'>
        Create comprehensive database migration scripts to safely upgrade an e-commerce application schema from v1.0 to v2.0.
    </p>
    <p class='mt-3'>
        Your migration solution must demonstrate:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Schema Evolution</strong> - Safe table and column modifications</li>
        <li>• <strong>Data Migration</strong> - Preserving existing data during schema changes</li>
        <li>• <strong>Rollback Safety</strong> - Complete reversibility of all changes</li>
        <li>• <strong>Performance Optimization</strong> - Proper indexing and chunked operations</li>
        <li>• <strong>Zero-Downtime</strong> - Minimal service disruption strategies</li>
        <li>• <strong>Data Integrity</strong> - Constraints, foreign keys, and validation</li>
        <li>• <strong>Production Safety</strong> - Backup strategies and error handling</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "E-commerce schema v1.0 with users, products, and orders tables",
            outputText: "Complete UP and DOWN migration scripts for v2.0 upgrade",
            explanation: "Safely adds new fields, creates tables, migrates data, and provides full rollback capability"
        }
    ],
    constraints: `<li class='mt-2'>
        Must provide both <code>UP and DOWN</code> migration scripts
    </li>
    <li class='mt-2'>
        Handle <code>large data sets</code> with chunked processing
    </li>
    <li class='mt-2'>
        Include <code>data validation</code> and integrity checks
    </li>
    <li class='mt-2'>
        Use <code>transactions</code> for atomic operations
    </li>
    <li class='mt-2'>
        Add proper <code>indexes and constraints</code> for performance
    </li>
    <li class='mt-2'>
        Consider <code>zero-downtime</code> deployment strategies
    </li>`,
    handlerFunction: handlerDatabaseMigration,
    starterCode: starterCodeDatabaseMigration,
    order: 15,
    starterFunctionName: "-- Migration Scripts",
};