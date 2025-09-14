import { Problem } from "../types/problem";

const starterCodeDockerOptimization = `# Create an optimized Dockerfile for a Node.js application
# Requirements:
# 1. Use Node.js 18 Alpine base image
# 2. Set working directory to /app
# 3. Copy package.json and package-lock.json first (for better caching)
# 4. Install dependencies
# 5. Copy the rest of the application code
# 6. Expose port 3000
# 7. Use non-root user for security
# 8. Start the application with "npm start"

# Write your Dockerfile here:
`;

// DevOps problems use text-based validation instead of function execution
const handlerDockerOptimization = (dockerfileContent: string) => {
    try {
        const lines = dockerfileContent.trim().split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
        
        const requirements = [
            { test: (lines: string[]) => lines.some(line => line.includes('FROM node:18-alpine')), message: "Must use Node.js 18 Alpine base image" },
            { test: (lines: string[]) => lines.some(line => line.includes('WORKDIR /app')), message: "Must set working directory to /app" },
            { test: (lines: string[]) => lines.some(line => line.includes('COPY package*.json')), message: "Must copy package.json files first for caching" },
            { test: (lines: string[]) => lines.some(line => line.includes('RUN npm install') || line.includes('RUN npm ci')), message: "Must install dependencies" },
            { test: (lines: string[]) => lines.some(line => line.includes('COPY . .')), message: "Must copy application code" },
            { test: (lines: string[]) => lines.some(line => line.includes('EXPOSE 3000')), message: "Must expose port 3000" },
            { test: (lines: string[]) => lines.some(line => line.includes('USER node') || line.includes('USER 1000')), message: "Must use non-root user" },
            { test: (lines: string[]) => lines.some(line => line.includes('CMD') && line.includes('npm start')), message: "Must start with npm start command" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test(lines)) {
                throw new Error(requirement.message);
            }
        }
        
        return true;
    } catch (error: any) {
        console.log("Docker Optimization handler error");
        throw new Error(error.message || error);
    }
};

export const dockerOptimization: Problem = {
    id: "docker-optimization",
    title: "Docker: Optimize Node.js Dockerfile",
    problemStatement: `<p class='mt-3'>
        Create an optimized Dockerfile for a Node.js application following best practices.
    </p>
    <p class='mt-3'>
        Your Dockerfile should be optimized for:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Layer caching</strong> - Copy package files before application code</li>
        <li>• <strong>Security</strong> - Use non-root user</li>
        <li>• <strong>Size</strong> - Use Alpine base image</li>
        <li>• <strong>Performance</strong> - Minimize layers and operations</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "Node.js application with package.json",
            outputText: "Optimized Dockerfile with proper layering and security",
            explanation: "Use multi-stage builds, layer caching, and security best practices"
        }
    ],
    constraints: `<li class='mt-2'>
        Use <code>FROM node:18-alpine</code> as base image
    </li>
    <li class='mt-2'>
        Copy <code>package*.json</code> before other files for better caching
    </li>
    <li class='mt-2'>
        Run as non-root user (<code>USER node</code>)
    </li>
    <li class='mt-2'>
        Expose port 3000 and start with <code>npm start</code>
    </li>`,
    handlerFunction: handlerDockerOptimization,
    starterCode: starterCodeDockerOptimization,
    order: 12,
    starterFunctionName: "# Dockerfile",
};