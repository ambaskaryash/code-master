import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeBestTimeToBuyAndSellStock = `function maxProfit(prices) {
    // Write your code here
};`;

// checks if the user has the correct code
const handlerBestTimeToBuyAndSellStock = (fn: any) => {
    try {
        const tests = [
            [7,1,5,3,6,4],
            [7,6,4,3,1],
            [1,2,3,4,5],
            [2,4,1]
        ];
        
        const answers = [5, 0, 4, 2];
        
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Best Time to Buy and Sell Stock handler function error");
        throw new Error(error);
    }
};

export const bestTimeToBuyAndSellStock: Problem = {
    id: "best-time-to-buy-and-sell-stock",
    title: "121. Best Time to Buy and Sell Stock",
    problemStatement: `<p class='mt-3'>
        You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.
    </p>
    <p class='mt-3'>
        You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.
    </p>
    <p class='mt-3'>
        Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.
    </p>`,
    examples: [
        {
            id: 1,
            inputText: "prices = [7,1,5,3,6,4]",
            outputText: "5",
            explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
        },
        {
            id: 2,
            inputText: "prices = [7,6,4,3,1]",
            outputText: "0",
            explanation: "In this case, no transactions are done and the max profit = 0."
        }
    ],
    constraints: `<li class='mt-2'>
        <code>1 ≤ prices.length ≤ 10<sup>5</sup></code>
    </li>
    <li class='mt-2'>
        <code>0 ≤ prices[i] ≤ 10<sup>4</sup></code>
    </li>`,
    handlerFunction: handlerBestTimeToBuyAndSellStock,
    starterCode: starterCodeBestTimeToBuyAndSellStock,
    order: 9,
    starterFunctionName: "function maxProfit(",
};