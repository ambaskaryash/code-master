import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeSubsets = `function subsets(nums) {
    // Write your code here
};`;

// checks if the user has the correct code
const handlerSubsets = (fn: any) => {
    try {
        const tests = [
            [1,2,3],
            [0],
            [1,2]
        ];
        
        const answers = [
            [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]],
            [[],[0]],
            [[],[1],[2],[1,2]]
        ];
        
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            const sortedResult = result.map((subset: number[]) => subset.sort()).sort();
            const sortedAnswer = answers[i].map((subset: number[]) => subset.sort()).sort();
            assert.deepStrictEqual(sortedResult, sortedAnswer);
        }
        return true;
    } catch (error: any) {
        console.log("Subsets handler function error");
        throw new Error(error);
    }
};

export const subsets: Problem = {
    id: "subsets",
    title: "78. Subsets",
    problemStatement: `<p class='mt-3'>
        Given an integer array <code>nums</code> of <strong>unique</strong> elements, return <em>all possible subsets (the power set)</em>.
    </p>
    <p class='mt-3'>
        The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.
    </p>`,
    examples: [
        {
            id: 1,
            inputText: "nums = [1,2,3]",
            outputText: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
            explanation: "All possible subsets of [1,2,3]."
        },
        {
            id: 2,
            inputText: "nums = [0]",
            outputText: "[[],[0]]",
            explanation: "All possible subsets of [0]."
        }
    ],
    constraints: `<li class='mt-2'>
        <code>1 ≤ nums.length ≤ 10</code>
    </li>
    <li class='mt-2'>
        <code>-10 ≤ nums[i] ≤ 10</code>
    </li>
    <li class='mt-2'>
        All the numbers of <code>nums</code> are <strong>unique</strong>.
    </li>`,
    handlerFunction: handlerSubsets,
    starterCode: starterCodeSubsets,
    order: 10,
    starterFunctionName: "function subsets(",
};