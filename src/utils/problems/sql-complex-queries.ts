import { Problem } from "../types/problem";

const starterCodeSQLQueries = `-- Given the following database schema for an e-commerce platform:
-- 
-- Table: users
-- +----------+-----------+
-- | Column   | Type      |
-- +----------+-----------+
-- | id       | INTEGER   |
-- | name     | VARCHAR   |
-- | email    | VARCHAR   |
-- | city     | VARCHAR   |
-- | country  | VARCHAR   |
-- | created  | DATE      |
-- +----------+-----------+
-- 
-- Table: orders
-- +-------------+-----------+
-- | Column      | Type      |
-- +-------------+-----------+
-- | id          | INTEGER   |
-- | user_id     | INTEGER   |
-- | total       | DECIMAL   |
-- | status      | VARCHAR   |
-- | order_date  | DATE      |
-- +-------------+-----------+
-- 
-- Table: products
-- +----------+-----------+
-- | Column   | Type      |
-- +----------+-----------+
-- | id       | INTEGER   |
-- | name     | VARCHAR   |
-- | price    | DECIMAL   |
-- | category | VARCHAR   |
-- +----------+-----------+
-- 
-- Table: order_items
-- +------------+-----------+
-- | Column     | Type      |
-- +------------+-----------+
-- | order_id   | INTEGER   |
-- | product_id | INTEGER   |
-- | quantity   | INTEGER   |
-- | unit_price | DECIMAL   |
-- +------------+-----------+

-- Write SQL queries to solve the following problems:

-- Query 1: Find the top 3 customers by total purchase amount in 2023
-- Include: customer name, email, total amount spent, number of orders
SELECT 
    -- Your solution here

-- Query 2: Calculate the monthly revenue trend for each product category
-- Include: month, category, revenue, percent change from previous month
SELECT 
    -- Your solution here

-- Query 3: Find users who have made orders but never bought from 'Electronics' category
-- Include: user name, email, total orders, total spent
SELECT 
    -- Your solution here

-- Query 4: Identify products with declining sales (quantity sold decreased in last 3 months)
-- Include: product name, category, current month qty, previous month qty, decline percentage
SELECT 
    -- Your solution here

-- Query 5: Create a customer segmentation query
-- Segment customers as: VIP (>$5000), Regular ($1000-$5000), New (<$1000)
-- Include: segment, customer count, average order value, total revenue
SELECT 
    -- Your solution here
`;

const handlerSQLQueries = (sqlCode: string) => {
    try {
        const code = sqlCode.toLowerCase();
        
        // Check for required SQL elements
        const requirements = [
            { test: () => code.includes('join'), message: "Must use JOIN operations" },
            { test: () => code.includes('group by'), message: "Must use GROUP BY for aggregations" },
            { test: () => code.includes('order by'), message: "Must use ORDER BY for sorting results" },
            { test: () => code.includes('sum(') || code.includes('count(') || code.includes('avg('), message: "Must use aggregate functions (SUM, COUNT, AVG)" },
            { test: () => code.includes('where'), message: "Must use WHERE clauses for filtering" },
            { test: () => code.includes('limit') || code.includes('top'), message: "Must limit results for top N queries" },
            { test: () => code.includes('case') || code.includes('when'), message: "Must use CASE statements for conditional logic" },
            { test: () => code.includes('extract(') || code.includes('date_format') || code.includes('strftime'), message: "Must use date functions for time-based analysis" },
            { test: () => code.includes('having'), message: "Must use HAVING clause for aggregate filtering" },
            { test: () => code.includes('window') || code.includes('over(') || code.includes('lag(') || code.includes('lead('), message: "Must use window functions for trend analysis" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        // Check for specific query solutions
        const queries = code.split('select').filter(q => q.trim().length > 10);
        if (queries.length < 5) {
            throw new Error("Must provide solutions for all 5 SQL queries");
        }
        
        // Check for advanced SQL concepts
        const advancedConcepts = [
            { test: () => code.includes('cte') || code.includes('with '), message: "Should use CTEs (Common Table Expressions) for complex queries" },
            { test: () => code.includes('partition by'), message: "Should use window functions with PARTITION BY" },
            { test: () => code.includes('left join') || code.includes('inner join'), message: "Should specify JOIN types explicitly" }
        ];
        
        let advancedScore = 0;
        for (const concept of advancedConcepts) {
            if (concept.test()) {
                advancedScore++;
            }
        }
        
        if (advancedScore < 2) {
            throw new Error("Should demonstrate more advanced SQL concepts (CTEs, Window functions, explicit JOINs)");
        }
        
        return true;
    } catch (error: any) {
        console.log("SQL Complex Queries handler error");
        throw new Error(error.message || error);
    }
};

export const sqlComplexQueries: Problem = {
    id: "sql-complex-queries",
    title: "SQL: Complex Queries & Analytics",
    problemStatement: `<p class='mt-3'>
        Write advanced SQL queries to analyze an e-commerce database with complex business requirements.
    </p>
    <p class='mt-3'>
        You need to demonstrate proficiency with:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Advanced Joins</strong> - Multiple table relationships</li>
        <li>• <strong>Window Functions</strong> - Ranking, lag/lead, analytics</li>
        <li>• <strong>Aggregations</strong> - Complex grouping and calculations</li>
        <li>• <strong>Date Analysis</strong> - Time-based trends and comparisons</li>
        <li>• <strong>Conditional Logic</strong> - Customer segmentation and categorization</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "E-commerce database with users, orders, products, and order_items tables",
            outputText: "5 comprehensive SQL queries solving business analytics problems",
            explanation: "Queries cover customer analysis, revenue trends, product performance, and segmentation"
        }
    ],
    constraints: `<li class='mt-2'>
        All queries must be <code>syntactically correct</code> and executable
    </li>
    <li class='mt-2'>
        Must use <code>JOINs, GROUP BY, window functions</code>
    </li>
    <li class='mt-2'>
        Include <code>proper date handling</code> and time-based analysis
    </li>
    <li class='mt-2'>
        Demonstrate <code>advanced SQL concepts</code> like CTEs and subqueries
    </li>
    <li class='mt-2'>
        Handle <code>edge cases</code> and null values appropriately
    </li>`,
    handlerFunction: handlerSQLQueries,
    starterCode: starterCodeSQLQueries,
    order: 13,
    starterFunctionName: "-- SQL Queries",
};