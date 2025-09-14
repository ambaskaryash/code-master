import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMergeIntervals = `function merge(intervals) {
    // Write your code here
};`;

// checks if the user has the correct code
const handlerMergeIntervals = (fn: any) => {
    try {
        const tests = [
            [[1,3],[2,6],[8,10],[15,18]],
            [[1,4],[4,5]],
            [[1,4],[0,4]],
            [[1,4],[2,3]]
        ];
        
        const answers = [
            [[1,6],[8,10],[15,18]],
            [[1,5]],
            [[0,4]],
            [[1,4]]
        ];
        
        // loop all tests to check if the user's code is correct
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.deepStrictEqual(result.sort(), answers[i].sort());
        }
        return true;
    } catch (error: any) {
        console.log("Merge Intervals handler function error");
        throw new Error(error);
    }
};

export const mergeIntervals: Problem = {
    id: "merge-intervals",
    title: "56. Merge Intervals",
    problemStatement: `<p class='mt-3'>
        Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input</em>.
    </p>`,
    examples: [
        {
            id: 1,
            inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            outputText: "[[1,6],[8,10],[15,18]]",
            explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
        },
        {
            id: 2,
            inputText: "intervals = [[1,4],[4,5]]",
            outputText: "[[1,5]]",
            explanation: "Intervals [1,4] and [4,5] are considered overlapping."
        }
    ],
    constraints: `<li class='mt-2'>
        <code>1 ≤ intervals.length ≤ 10<sup>4</sup></code>
    </li>
    <li class='mt-2'>
        <code>intervals[i].length == 2</code>
    </li>
    <li class='mt-2'>
        <code>0 ≤ start<sub>i</sub> ≤ end<sub>i</sub> ≤ 10<sup>4</sup></code>
    </li>`,
    handlerFunction: handlerMergeIntervals,
    starterCode: starterCodeMergeIntervals,
    order: 7,
    starterFunctionName: "function merge(",
};