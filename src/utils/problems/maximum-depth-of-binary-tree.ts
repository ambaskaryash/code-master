import assert from "assert";
import { Problem } from "../types/problem";

// TreeNode class for binary tree problems
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

const starterCodeMaxDepth = `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function maxDepth(root) {
    // Write your code here
};`;

// Helper function to create binary tree from array
function createBinaryTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
        const node = queue.shift()!;
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]!);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]!);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// checks if the user has the correct code
const handlerMaxDepth = (fn: any) => {
    try {
        const tests = [
            [3,9,20,null,null,15,7],
            [1,null,2],
            [],
            [0],
            [1,2,3,4,5]
        ];
        
        const answers = [3, 2, 0, 1, 3];
        
        for (let i = 0; i < tests.length; i++) {
            const root = createBinaryTree(tests[i]);
            const result = fn(root);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Maximum Depth of Binary Tree handler function error");
        throw new Error(error);
    }
};

export const maxDepthBinaryTree: Problem = {
    id: "maximum-depth-of-binary-tree",
    title: "104. Maximum Depth of Binary Tree",
    problemStatement: `<p class='mt-3'>
        Given the <code>root</code> of a binary tree, return <em>its maximum depth</em>.
    </p>
    <p class='mt-3'>
        A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.
    </p>`,
    examples: [
        {
            id: 1,
            inputText: "root = [3,9,20,null,null,15,7]",
            outputText: "3",
            explanation: "The maximum depth is 3."
        },
        {
            id: 2,
            inputText: "root = [1,null,2]",
            outputText: "2",
            explanation: "The maximum depth is 2."
        }
    ],
    constraints: `<li class='mt-2'>
        The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.
    </li>
    <li class='mt-2'>
        <code>-100 ≤ Node.val ≤ 100</code>
    </li>`,
    handlerFunction: handlerMaxDepth,
    starterCode: starterCodeMaxDepth,
    order: 8,
    starterFunctionName: "function maxDepth(",
};