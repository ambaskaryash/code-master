import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeContainerWithMostWater = `function maxArea(height) {
    // Write your code here
};`;

// checks if the user has the correct code
const handlerContainerWithMostWater = (fn: any) => {
    try {
        const tests = [
            [1,8,6,2,5,4,8,3,7],
            [1,1],
            [1,2,4,3],
            [2,3,4,5,18,17,6]
        ];
        
        const answers = [49, 1, 4, 17];
        
        // loop all tests to check if the user's code is correct
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Container With Most Water handler function error");
        throw new Error(error);
    }
};

export const containerWithMostWater: Problem = {
    id: "container-with-most-water",
    title: "11. Container With Most Water",
    problemStatement: `<p class='mt-3'>
        You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.
    </p>
    <p class='mt-3'>
        Find two lines that together with the x-axis form a container, such that the container contains the most water.
    </p>
    <p class='mt-3'>
        Return <em>the maximum amount of water a container can store</em>.
    </p>
    <p class='mt-3'>
        <strong>Notice</strong> that you may not slant the container.
    </p>`,
    examples: [
        {
            id: 1,
            inputText: "height = [1,8,6,2,5,4,8,3,7]",
            outputText: "49",
            explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
        },
        {
            id: 2,
            inputText: "height = [1,1]",
            outputText: "1",
            explanation: "The container can contain at most 1 unit of water."
        }
    ],
    constraints: `<li class='mt-2'>
        <code>n == height.length</code>
    </li>
    <li class='mt-2'>
        <code>2 ≤ n ≤ 10<sup>5</sup></code>
    </li>
    <li class='mt-2'>
        <code>0 ≤ height[i] ≤ 10<sup>4</sup></code>
    </li>`,
    handlerFunction: handlerContainerWithMostWater,
    starterCode: starterCodeContainerWithMostWater,
    order: 6,
    starterFunctionName: "function maxArea(",
};