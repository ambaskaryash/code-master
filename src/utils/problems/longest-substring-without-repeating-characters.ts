import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeLongestSubstring = `function lengthOfLongestSubstring(s) {
    // Write your code here
};`;

const handlerLongestSubstring = (fn: any) => {
    try {
        const tests = [
            "abcabcbb",
            "bbbbb",
            "pwwkew",
            "",
            "dvdf"
        ];
        
        const answers = [3, 1, 3, 0, 3];
        
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Longest Substring Without Repeating Characters handler error");
        throw new Error(error);
    }
};

export const longestSubstringWithoutRepeatingCharacters: Problem = {
    id: "longest-substring-without-repeating-characters",
    title: "3. Longest Substring Without Repeating Characters",
    problemStatement: `<p class='mt-3'>
        Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.
    </p>`,
    examples: [
        {
            id: 1,
            inputText: 's = "abcabcbb"',
            outputText: "3",
            explanation: 'The answer is "abc", with the length of 3.'
        },
        {
            id: 2,
            inputText: 's = "bbbbb"',
            outputText: "1",
            explanation: 'The answer is "b", with the length of 1.'
        },
        {
            id: 3,
            inputText: 's = "pwwkew"',
            outputText: "3",
            explanation: 'The answer is "wke", with the length of 3.'
        }
    ],
    constraints: `<li class='mt-2'>
        <code>0 ≤ s.length ≤ 5 * 10<sup>4</sup></code>
    </li>
    <li class='mt-2'>
        <code>s</code> consists of English letters, digits, symbols and spaces.
    </li>`,
    handlerFunction: handlerLongestSubstring,
    starterCode: starterCodeLongestSubstring,
    order: 11,
    starterFunctionName: "function lengthOfLongestSubstring(",
};