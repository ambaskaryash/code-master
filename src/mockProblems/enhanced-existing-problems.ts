// Enhanced existing problems with comprehensive LeetCode-style data
export interface EnhancedProblem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  order: number;
  videoId?: string;
  tags: string[];
  isImplemented: boolean;
  
  // Enhanced LeetCode-style fields
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints?: string[];
  companies: string[];
  frequency: number; // 1-5 scale
  acceptanceRate: number;
  
  // Code templates for multiple languages/technologies
  starterCode: {
    javascript?: string;
    python?: string;
    java?: string;
    cpp?: string;
    // Technical file types
    dockerfile?: string;
    dockercompose?: string;
    nginx?: string;
    healthcheck?: string;
    prometheus?: string;
    alertrules?: string;
    alertmanager?: string;
    sql?: string;
    analytics?: string;
    schema?: string;
    sampledata?: string;
    migration_up?: string;
    migration_down?: string;
    complex_migration_up?: string;
    complex_migration_down?: string;
    migration_script?: string;
  };
  
  // Test cases (hidden from users)
  testCases: {
    input: any[];
    expectedOutput: any;
  }[];
}

export const enhancedExistingProblems: EnhancedProblem[] = [
  // Valid Parentheses
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 5,
    videoId: "xty7fr-k0TU",
    tags: ["String", "Stack"],
    isImplemented: true,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      },
      {
        input: 's = "([)]"',
        output: "false"
      },
      {
        input: 's = "{[]}"',
        output: "true"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "An interesting property about a valid parenthesis expression is that a sub-expression of a valid expression should also be a valid expression.",
      "We can use a stack. Whenever we see an opening bracket, we push it to the stack, and whenever we see a closing bracket, we pop from the stack."
    ],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    frequency: 5,
    acceptanceRate: 40.5,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`
    },
    testCases: [
      { input: ["()"], expectedOutput: true },
      { input: ["()[]{}"], expectedOutput: true },
      { input: ["(]"], expectedOutput: false },
      { input: ["([)]"], expectedOutput: false },
      { input: ["{[]}"], expectedOutput: true }
    ]
  },
  
  // Search a 2D Matrix
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    order: 6,
    videoId: "ZfFl4torNg4",
    tags: ["Array", "Binary Search", "Matrix"],
    isImplemented: true,
    description: `Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.`,
    examples: [
      {
        input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5",
        output: "true"
      },
      {
        input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 14",
        output: "true"
      },
      {
        input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20",
        output: "false"
      }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 300",
      "-10^9 <= matrix[i][j] <= 10^9",
      "All the integers in each row are sorted in ascending order.",
      "All the integers in each column are sorted in ascending order.",
      "-10^9 <= target <= 10^9"
    ],
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    frequency: 4,
    acceptanceRate: 38.9,
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    
};`,
      python: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        `,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        
    }
};`
    },
    testCases: [
      { input: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5], expectedOutput: true },
      { input: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 14], expectedOutput: true },
      { input: [[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20], expectedOutput: false }
    ]
  },

  // Container With Most Water
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 7,
    videoId: "UuiTKBwPgAo",
    tags: ["Array", "Two Pointers", "Greedy"],
    isImplemented: true,
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
      },
      {
        input: "height = [1,1]",
        output: "1"
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    hints: [
      "If you simulate the problem, it will be O(n^2) which is not efficient.",
      "Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line.",
      "How can you calculate the amount of water at each step?"
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"],
    frequency: 5,
    acceptanceRate: 54.9,
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    
};`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`
    },
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expectedOutput: 49 },
      { input: [[1,1]], expectedOutput: 1 },
      { input: [[1,2,1]], expectedOutput: 2 }
    ]
  },

  // Merge Intervals
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    order: 8,
    videoId: "44H3cEC2fFM",
    tags: ["Array", "Sorting"],
    isImplemented: true,
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlaps, merge them into [1,6]."
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    hints: [
      "Sort the intervals by their start time.",
      "Then, we can merge intervals in one traversal. How? If the current interval does not overlap with the previous, append it to the result."
    ],
    companies: ["Microsoft", "Amazon", "Google", "Facebook", "Bloomberg"],
    frequency: 5,
    acceptanceRate: 44.4,
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    
};`,
      python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        `,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        
    }
};`
    },
    testCases: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expectedOutput: [[1,6],[8,10],[15,18]] },
      { input: [[[1,4],[4,5]]], expectedOutput: [[1,5]] },
      { input: [[[1,4],[0,4]]], expectedOutput: [[0,4]] }
    ]
  },

  // Maximum Depth of Binary Tree
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 9,
    videoId: "4qYTqOiRMoM",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    isImplemented: true,
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3"
      },
      {
        input: "root = [1,null,2]",
        output: "2"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    hints: [
      "Think about this problem recursively. The maximum depth is 1 + the maximum depth of the left and right subtrees."
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"],
    frequency: 4,
    acceptanceRate: 73.8,
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        `,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    }
};`
    },
    testCases: [
      { input: [[3,9,20,null,null,15,7]], expectedOutput: 3 },
      { input: [[1,null,2]], expectedOutput: 2 },
      { input: [[]], expectedOutput: 0 }
    ]
  },

  // Best Time to Buy and Sell Stock (already enhanced in main file)
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 10,
    videoId: "1pkOgXD63yU",
    tags: ["Array", "Dynamic Programming"],
    isImplemented: true,
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "Bloomberg"],
    frequency: 5,
    acceptanceRate: 54.2,
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`
    },
    testCases: [
      { input: [[7,1,5,3,6,4]], expectedOutput: 5 },
      { input: [[7,6,4,3,1]], expectedOutput: 0 },
      { input: [[1,2,3,4,5]], expectedOutput: 4 }
    ]
  },
  
  // Monitoring Setup - DevOps Problem
  {
    id: "monitoring-setup",
    title: "Monitoring: Prometheus & Alerting",
    difficulty: "Medium",
    category: "DevOps",
    order: 12,
    videoId: "h4Sl21AKiDg",
    tags: ["DevOps", "Monitoring", "Prometheus", "Alerting", "YAML"],
    isImplemented: true,
    description: `Set up a comprehensive monitoring solution using Prometheus and Alertmanager.

**Note: This problem requires Docker and basic understanding of monitoring concepts.**

You need to create a monitoring stack that includes:
1. Prometheus server configuration
2. Application metrics collection
3. Alert rules for critical conditions
4. Alertmanager for notification routing
5. Grafana for visualization (optional)

The solution should monitor system metrics, application health, and send alerts when thresholds are exceeded.

**Setup Instructions:**
1. Create prometheus.yml configuration
2. Define alert rules in alert_rules.yml
3. Configure alertmanager.yml for notifications
4. Use docker-compose to deploy the stack
5. Verify metrics collection and alerting

**Validation:**
- Prometheus should scrape metrics from targets
- Alert rules should trigger when conditions are met
- Alertmanager should route notifications properly
- Grafana dashboards should display metrics (if included)`,
    examples: [
      {
        input: "Application with high CPU usage (>80%)",
        output: "Alert triggered and sent to designated channels",
        explanation: "When CPU usage exceeds 80% for 5 minutes, an alert should be triggered."
      },
      {
        input: "Service down for more than 1 minute",
        output: "Critical alert sent immediately",
        explanation: "Service availability is critical and should trigger immediate alerts."
      }
    ],
    constraints: [
      "Must use Prometheus for metrics collection",
      "Must configure at least 3 alert rules",
      "Must include both system and application metrics",
      "Alert routing must support multiple channels"
    ],
    hints: [
      "Use node_exporter for system metrics",
      "Configure scrape_configs for multiple targets",
      "Set up alert rules with appropriate thresholds",
      "Use labels for alert routing"
    ],
    companies: ["Netflix", "Uber", "Airbnb", "Google"],
    frequency: 4,
    acceptanceRate: 65.0,
    starterCode: {
      prometheus: `# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'application'
    static_configs:
      - targets: ['app:3000']
    metrics_path: /metrics
    scrape_interval: 30s`,
      alertrules: `# alert_rules.yml
groups:
  - name: system_alerts
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"
          description: "CPU usage is above 80% for more than 5 minutes on {{ $labels.instance }}"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "{{ $labels.job }} on {{ $labels.instance }} has been down for more than 1 minute"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemFree_bytes) / node_memory_MemTotal_bytes * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is above 90% on {{ $labels.instance }}"

      - alert: DiskSpaceLow
        expr: (node_filesystem_size_bytes{fstype!="tmpfs"} - node_filesystem_free_bytes{fstype!="tmpfs"}) / node_filesystem_size_bytes{fstype!="tmpfs"} * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk space is running low"
          description: "Disk usage is above 85% on {{ $labels.instance }} mount point {{ $labels.mountpoint }}"`,
      alertmanager: `# alertmanager.yml
global:
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alerts@yourcompany.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
    - match:
        severity: critical
      receiver: 'critical-alerts'
    - match:
        severity: warning
      receiver: 'warning-alerts'

receivers:
  - name: 'web.hook'
    webhook_configs:
      - url: 'http://127.0.0.1:5001/'

  - name: 'critical-alerts'
    slack_configs:
      - api_url: 'YOUR_SLACK_WEBHOOK_URL'
        channel: '#critical-alerts'
        title: 'Critical Alert'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
    email_configs:
      - to: 'admin@yourcompany.com'
        subject: 'CRITICAL: {{ .GroupLabels.alertname }}'
        body: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

  - name: 'warning-alerts'
    slack_configs:
      - api_url: 'YOUR_SLACK_WEBHOOK_URL'
        channel: '#monitoring'
        title: 'Warning Alert'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'`,
      dockercompose: `# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./alert_rules.yml:/etc/prometheus/alert_rules.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager_data:/alertmanager

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  prometheus_data:
  alertmanager_data:
  grafana_data:`
    },
    testCases: [
      { input: ["cpu_usage", 85], expectedOutput: "alert_triggered" },
      { input: ["service_down", 120], expectedOutput: "critical_alert" },
      { input: ["memory_usage", 70], expectedOutput: "no_alert" }
    ]
  },

  // SQL Complex Queries
  {
    id: "sql-complex-queries",
    title: "SQL: Complex Queries & Analytics",
    difficulty: "Medium",
    category: "Database",
    order: 13,
    videoId: "p3qvj9hO_Bo",
    tags: ["Database", "SQL", "Analytics", "Joins", "Window Functions"],
    isImplemented: true,
    description: `Write complex SQL queries to analyze business data and generate insights.

**Note: This problem requires a MySQL/PostgreSQL database. You can use online SQL editors or local database setup.**

You are given multiple related tables and need to write queries that:
1. Use advanced joins and subqueries
2. Implement window functions for analytics
3. Calculate running totals and rankings
4. Generate business reports with aggregations
5. Handle complex data transformations

The queries should be optimized for performance and handle large datasets efficiently.

**Setup Instructions:**
1. Use the provided schema to create tables
2. Insert sample data for testing
3. Write and test your SQL queries
4. Validate results match expected outputs
5. Optimize queries for performance

**Validation:**
- Queries should execute without errors
- Results should match expected business logic
- Performance should be acceptable for large datasets
- Proper indexing should be considered`,
    examples: [
      {
        input: "Find top 5 customers by total order value in the last quarter",
        output: "SELECT customer_name, SUM(order_value) as total FROM orders...",
        explanation: "Use JOIN, WHERE, GROUP BY, and ORDER BY with LIMIT."
      },
      {
        input: "Calculate running total of sales by month",
        output: "SELECT month, SUM(sales) OVER (ORDER BY month) as running_total...",
        explanation: "Use window function with OVER clause for running calculations."
      }
    ],
    constraints: [
      "Must use proper JOIN syntax",
      "Queries must be optimized with appropriate indexes",
      "Handle NULL values appropriately",
      "Use window functions where applicable"
    ],
    companies: ["Microsoft", "Oracle", "IBM", "Snowflake"],
    frequency: 4,
    acceptanceRate: 58.0,
    starterCode: {
      sql: `-- Customer Analysis Query
-- Find top 5 customers by total order value in the last quarter
SELECT 
    c.customer_name,
    SUM(o.order_value) as total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spent DESC
LIMIT 5;`,
      analytics: `-- Advanced Analytics Query
-- Calculate running total of sales by month with year-over-year comparison
WITH monthly_sales AS (
    SELECT 
        DATE_FORMAT(order_date, '%Y-%m') as month,
        SUM(order_value) as monthly_total
    FROM orders 
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT 
    month,
    monthly_total,
    SUM(monthly_total) OVER (
        ORDER BY month 
        ROWS UNBOUNDED PRECEDING
    ) as running_total,
    LAG(monthly_total, 12) OVER (
        ORDER BY month
    ) as same_month_last_year,
    CASE 
        WHEN LAG(monthly_total, 12) OVER (ORDER BY month) IS NOT NULL 
        THEN ROUND(
            ((monthly_total - LAG(monthly_total, 12) OVER (ORDER BY month)) / 
             LAG(monthly_total, 12) OVER (ORDER BY month)) * 100, 2
        )
        ELSE NULL 
    END as yoy_growth_percent
FROM monthly_sales
ORDER BY month;`,
      schema: `-- Database Schema for the problem
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    registration_date DATE,
    customer_segment ENUM('Premium', 'Standard', 'Basic') DEFAULT 'Standard',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    order_value DECIMAL(10,2) NOT NULL,
    order_status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);`,
      sampledata: `-- Sample Data for Testing
INSERT INTO customers (customer_name, email, registration_date, customer_segment) VALUES
('John Doe', 'john@example.com', '2023-01-15', 'Premium'),
('Jane Smith', 'jane@example.com', '2023-02-20', 'Standard'),
('Bob Johnson', 'bob@example.com', '2023-03-10', 'Basic'),
('Alice Brown', 'alice@example.com', '2023-01-25', 'Premium'),
('Charlie Wilson', 'charlie@example.com', '2023-04-05', 'Standard');

INSERT INTO products (product_name, category, price) VALUES
('Laptop Pro', 'Electronics', 1299.99),
('Wireless Mouse', 'Electronics', 29.99),
('Office Chair', 'Furniture', 199.99),
('Coffee Mug', 'Kitchen', 12.99),
('Notebook', 'Stationery', 5.99);

INSERT INTO orders (customer_id, order_date, order_value, order_status) VALUES
(1, '2023-10-15', 1329.98, 'Completed'),
(2, '2023-10-20', 45.98, 'Completed'),
(1, '2023-11-05', 199.99, 'Completed'),
(3, '2023-11-10', 18.98, 'Completed'),
(4, '2023-11-15', 1299.99, 'Completed');`
    },
    testCases: [
      { input: ["customers", "orders", "top_5"], expectedOutput: "customer_report" },
      { input: ["sales", "monthly", "running_total"], expectedOutput: "monthly_analysis" },
      { input: ["products", "categories", "revenue"], expectedOutput: "product_performance" }
    ]
  },

  // Docker Multi-Service
  {
    id: "docker-multi-service",
    title: "Docker: Multi-Service Application Stack",
    difficulty: "Medium",
    category: "Container",
    order: 14,
    videoId: "DM65_JyGxCo",
    tags: ["Docker", "Container", "Docker Compose", "Orchestration", "Networking"],
    isImplemented: true,
    description: `Design and implement a multi-service application stack using Docker and Docker Compose.

**Note: This problem requires Docker and Docker Engine to be installed on your system.**

Your task is to containerize a web application that includes:
1. Frontend service (React/Vue/Angular)
2. Backend API service (Node.js/Python/Java)
3. Database service (PostgreSQL/MySQL)
4. Cache service (Redis)
5. Reverse proxy (Nginx)

Services must communicate securely and be properly orchestrated with health checks, volumes, and networking.

**Setup Instructions:**
1. Create the docker-compose.yml file
2. Create Dockerfile for each service
3. Configure networking between services
4. Run: \`docker-compose up -d\`
5. Test service connectivity

**Validation:**
- All services should start successfully
- Health checks should pass
- Services should communicate properly
- Application should be accessible via nginx proxy`,
    examples: [
      {
        input: "Web app with database and cache",
        output: "docker-compose.yml with all services configured",
        explanation: "Each service should be properly configured with health checks and networking."
      },
      {
        input: "Production-ready deployment",
        output: "Multi-stage builds with optimized images",
        explanation: "Use multi-stage builds to reduce image size and improve security."
      }
    ],
    constraints: [
      "Must use Docker Compose for orchestration",
      "Services must communicate via custom networks",
      "Include health checks for all services",
      "Use environment variables for configuration",
      "Implement proper volume management"
    ],
    companies: ["Docker", "Amazon", "Google", "Microsoft"],
    frequency: 4,
    acceptanceRate: 62.0,
    starterCode: {
      dockerfile: `# Dockerfile for Node.js application
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]`,
      dockercompose: `version: '3.8'

services:
  # Frontend service
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://backend:5000
    networks:
      - app-network

  # Backend service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    depends_on:
      - database
      - redis
    environment:
      - DATABASE_URL=postgresql://user:password@database:5432/appdb
      - REDIS_URL=redis://redis:6379
    networks:
      - app-network

  # Database service
  database:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=appdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network

  # Cache service
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network

  # Reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge`,
      nginx: `events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }
    
    upstream backend {
        server backend:5000;
    }
    
    server {
        listen 80;
        
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        
        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}`,
      healthcheck: `#!/bin/bash
# Health check script for services

check_service() {
    local service_name=$1
    local url=$2
    
    echo "Checking $service_name..."
    
    if curl -f -s $url > /dev/null; then
        echo "✅ $service_name is healthy"
        return 0
    else
        echo "❌ $service_name is not responding"
        return 1
    fi
}

# Check all services
check_service "Frontend" "http://localhost:3000/health"
check_service "Backend" "http://localhost:5000/health"
check_service "Database" "http://localhost:5432"
check_service "Redis" "http://localhost:6379"

echo "Health check completed!"`
    },
    testCases: [
      { input: ["frontend", "backend", "database"], expectedOutput: "services_running" },
      { input: ["health_check", "all_services"], expectedOutput: "all_healthy" },
      { input: ["scaling", "backend", 3], expectedOutput: "scaled_successfully" }
    ]
  },

  // Database Migration Scripts
  {
    id: "database-migration-scripts",
    title: "Database: Safe Migration Scripts",
    difficulty: "Hard",
    category: "Database",
    order: 15,
    videoId: "qzPPmI8xl4E",
    tags: ["Database", "Migration", "SQL", "Schema", "Data Migration"],
    isImplemented: true,
    description: `Create safe and reversible database migration scripts for a production system.

You need to design migration scripts that:
1. Add new tables and columns safely
2. Migrate existing data without data loss
3. Handle rollback scenarios
4. Maintain referential integrity
5. Minimize downtime during deployment

The migrations must be atomic, reversible, and handle edge cases like data type changes and constraint modifications.`,
    examples: [
      {
        input: "Add new column 'email' to users table with data migration",
        output: "Migration script with rollback capability",
        explanation: "Safely add column, migrate data, and provide rollback script."
      },
      {
        input: "Split 'name' column into 'first_name' and 'last_name'",
        output: "Multi-step migration with data transformation",
        explanation: "Complex data transformation requiring careful handling."
      }
    ],
    constraints: [
      "Migrations must be atomic (all or nothing)",
      "Must provide rollback scripts",
      "Handle large datasets efficiently",
      "Maintain referential integrity",
      "Include proper error handling"
    ],
    companies: ["Stripe", "Shopify", "Atlassian", "GitHub"],
    frequency: 3,
    acceptanceRate: 45.0,
    starterCode: {
      migration_up: `-- Migration: Add email column to users table
-- File: 001_add_email_to_users.up.sql

-- Step 1: Add the email column (nullable initially)
ALTER TABLE users 
ADD COLUMN email VARCHAR(255) NULL;

-- Step 2: Add unique index on email
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Step 3: Populate email column with default values for existing users
UPDATE users 
SET email = CONCAT(LOWER(REPLACE(name, ' ', '.')), '@company.com')
WHERE email IS NULL;

-- Step 4: Make email column NOT NULL
ALTER TABLE users 
MODIFY COLUMN email VARCHAR(255) NOT NULL;`,
      migration_down: `-- Rollback: Remove email column from users table  
-- File: 001_add_email_to_users.down.sql

-- Step 1: Drop the unique index
DROP INDEX idx_users_email ON users;

-- Step 2: Drop the email column
ALTER TABLE users 
DROP COLUMN email;`,
      complex_migration_up: `-- Complex Migration: Split name column into first_name and last_name
-- File: 002_split_user_name.up.sql

-- Step 1: Add new columns
ALTER TABLE users 
ADD COLUMN first_name VARCHAR(100) NULL,
ADD COLUMN last_name VARCHAR(100) NULL;

-- Step 2: Migrate existing data
UPDATE users 
SET 
    first_name = CASE 
        WHEN LOCATE(' ', name) > 0 
        THEN SUBSTRING(name, 1, LOCATE(' ', name) - 1)
        ELSE name
    END,
    last_name = CASE 
        WHEN LOCATE(' ', name) > 0 
        THEN SUBSTRING(name, LOCATE(' ', name) + 1)
        ELSE ''
    END
WHERE first_name IS NULL;

-- Step 3: Make first_name required
ALTER TABLE users 
MODIFY COLUMN first_name VARCHAR(100) NOT NULL;

-- Step 4: Add indexes
CREATE INDEX idx_users_first_name ON users(first_name);
CREATE INDEX idx_users_last_name ON users(last_name);

-- Step 5: Keep the original name column for now (safety)
-- ALTER TABLE users DROP COLUMN name; -- Uncomment after validation`,
      complex_migration_down: `-- Rollback: Restore name column from first_name and last_name
-- File: 002_split_user_name.down.sql

-- Step 1: Ensure name column exists (if it was dropped)
-- ALTER TABLE users ADD COLUMN name VARCHAR(200); -- Uncomment if name was dropped

-- Step 2: Restore name column data
UPDATE users 
SET name = CONCAT(first_name, 
    CASE 
        WHEN last_name IS NOT NULL AND last_name != '' 
        THEN CONCAT(' ', last_name)
        ELSE ''
    END
)
WHERE (name IS NULL OR name = '');

-- Step 3: Drop indexes
DROP INDEX idx_users_first_name ON users;
DROP INDEX idx_users_last_name ON users;

-- Step 4: Drop the split columns
ALTER TABLE users 
DROP COLUMN first_name,
DROP COLUMN last_name;`,
      migration_script: `#!/bin/bash
# Database Migration Script
# Usage: ./migrate.sh [up|down] [migration_number]

set -e  # Exit on error

DB_HOST="\${DB_HOST:-localhost}"
DB_NAME="\${DB_NAME:-app_db}"
DB_USER="\${DB_USER:-root}"
DB_PASS="\${DB_PASS:-password}"

MYSQL_CMD="mysql -h\$DB_HOST -u\$DB_USER -p\$DB_PASS \$DB_NAME"

# Create migrations table if it doesn't exist
create_migrations_table() {
    echo "Creating migrations table..."
    \$MYSQL_CMD << EOF
CREATE TABLE IF NOT EXISTS schema_migrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF
}

# Check if migration has been applied
is_migration_applied() {
    local migration_name=\$1
    result=\$(\$MYSQL_CMD -e "SELECT COUNT(*) FROM schema_migrations WHERE migration_name='\$migration_name';" | tail -n1)
    [ "\$result" -gt 0 ]
}

# Apply migration
apply_migration() {
    local migration_file=\$1
    local migration_name=\$(basename \$migration_file .up.sql)
    
    echo "Applying migration: \$migration_name"
    
    # Start transaction
    \$MYSQL_CMD << EOF
START TRANSACTION;
\$(cat \$migration_file)
INSERT INTO schema_migrations (migration_name) VALUES ('\$migration_name');
COMMIT;
EOF
    
    echo "Migration applied successfully: \$migration_name"
}

# Rollback migration  
rollback_migration() {
    local migration_file=\$1
    local migration_name=\$(basename \$migration_file .down.sql)
    
    echo "Rolling back migration: \$migration_name"
    
    # Start transaction
    \$MYSQL_CMD << EOF
START TRANSACTION;
\$(cat \$migration_file)
DELETE FROM schema_migrations WHERE migration_name='\$migration_name';
COMMIT;
EOF
    
    echo "Migration rolled back successfully: \$migration_name"
}

# Main execution
command=\${1:-up}
migration_num=\${2:-all}

create_migrations_table

case \$command in
    "up")
        if [ "\$migration_num" = "all" ]; then
            for file in migrations/*.up.sql; do
                migration_name=\$(basename \$file .up.sql)
                if ! is_migration_applied "\$migration_name"; then
                    apply_migration "\$file"
                fi
            done
        else
            apply_migration "migrations/\${migration_num}.up.sql"
        fi
        ;;
    "down")
        rollback_migration "migrations/\${migration_num}.down.sql"
        ;;
    *)
        echo "Usage: \$0 [up|down] [migration_number]"
        exit 1
        ;;
esac`
    },
    testCases: [
      { input: ["add_column", "users", "email"], expectedOutput: "migration_success" },
      { input: ["rollback", "last_migration"], expectedOutput: "rollback_success" },
      { input: ["data_migration", "split_name"], expectedOutput: "data_transformed" }
    ]
  },
  
  // Subsets
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    order: 11,
    videoId: "REOH22Xwdkk",
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    isImplemented: true,
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.`,
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        input: "nums = [0]",
        output: "[[],[0]]"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique."
    ],
    hints: [
      "A really intuitive way is to think of the binary representation and generate all numbers from 0... 2^n.",
      "We can use backtracking to solve this problem."
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    frequency: 4,
    acceptanceRate: 70.9,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    
};`,
      python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        
    }
};`
    },
    testCases: [
      { input: [[1,2,3]], expectedOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] },
      { input: [[0]], expectedOutput: [[],[0]] },
      { input: [[1,2]], expectedOutput: [[],[1],[2],[1,2]] }
    ]
  }
];