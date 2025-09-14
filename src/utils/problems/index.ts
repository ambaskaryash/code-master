import { Problem } from "../types/problem";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";
import { containerWithMostWater } from "./container-with-most-water";
import { mergeIntervals } from "./merge-intervals";
import { maxDepthBinaryTree } from "./maximum-depth-of-binary-tree";
import { bestTimeToBuyAndSellStock } from "./best-time-to-buy-and-sell-stock";
import { subsets } from "./subsets";
import { longestSubstringWithoutRepeatingCharacters } from "./longest-substring-without-repeating-characters";
import { monitoringSetup } from "./monitoring-setup";
import { sqlComplexQueries } from "./sql-complex-queries";
import { dockerMultiService } from "./docker-multi-service";
import { databaseMigrationScripts } from "./database-migration-scripts";

interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"two-sum": twoSum,
	"reverse-linked-list": reverseLinkedList,
	"jump-game": jumpGame,
	"search-a-2d-matrix": search2DMatrix,
	"valid-parentheses": validParentheses,
	"container-with-most-water": containerWithMostWater,
	"merge-intervals": mergeIntervals,
	"maximum-depth-of-binary-tree": maxDepthBinaryTree,
	"best-time-to-buy-and-sell-stock": bestTimeToBuyAndSellStock,
	"subsets": subsets,
	"longest-substring-without-repeating-characters": longestSubstringWithoutRepeatingCharacters,
	"monitoring-setup": monitoringSetup,
	"sql-complex-queries": sqlComplexQueries,
	"docker-multi-service": dockerMultiService,
	"database-migration-scripts": databaseMigrationScripts,
};
