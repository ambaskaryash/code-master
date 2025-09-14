import { Problem } from "../types/problem";

const starterCodeGitHubActionsCICD = `# Create a GitHub Actions workflow for CI/CD
# Requirements:
# 1. Trigger on push to main branch and pull requests
# 2. Use Ubuntu latest runner
# 3. Setup Node.js version 18
# 4. Cache node_modules for faster builds
# 5. Install dependencies with npm ci
# 6. Run tests with npm test
# 7. Build the application with npm run build
# 8. Deploy to staging on push to main (just echo "Deploying to staging")
# 9. Name the workflow "CI/CD Pipeline"
# 10. Name the job "build-and-test"

# Write your GitHub Actions YAML here:
name: CI/CD Pipeline

on:
  # Your trigger configuration here

jobs:
  # Your job configuration here
`;

const handlerGitHubActionsCICD = (yamlContent: string) => {
    try {
        const content = yamlContent.toLowerCase();
        
        const requirements = [
            { test: () => content.includes('push:') && content.includes('main'), message: "Must trigger on push to main branch" },
            { test: () => content.includes('pull_request'), message: "Must trigger on pull requests" },
            { test: () => content.includes('ubuntu-latest'), message: "Must use ubuntu-latest runner" },
            { test: () => content.includes('node-version: 18') || content.includes("node-version: '18'"), message: "Must setup Node.js version 18" },
            { test: () => content.includes('cache:') && content.includes('npm'), message: "Must cache node_modules" },
            { test: () => content.includes('npm ci'), message: "Must install dependencies with npm ci" },
            { test: () => content.includes('npm test'), message: "Must run tests with npm test" },
            { test: () => content.includes('npm run build'), message: "Must build with npm run build" },
            { test: () => content.includes('echo "deploying to staging"') || content.includes("echo 'deploying to staging'"), message: "Must include staging deployment step" },
            { test: () => content.includes('build-and-test'), message: "Job must be named 'build-and-test'" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        return true;
    } catch (error: any) {
        console.log("GitHub Actions CI/CD handler error");
        throw new Error(error.message || error);
    }
};

export const githubActionsCICD: Problem = {
    id: "github-actions-cicd",
    title: "CI/CD: GitHub Actions Pipeline",
    problemStatement: `<p class='mt-3'>
        Create a complete GitHub Actions workflow that implements a modern CI/CD pipeline for a Node.js application.
    </p>
    <p class='mt-3'>
        Your pipeline should implement:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Continuous Integration</strong> - Automated testing on every change</li>
        <li>• <strong>Caching</strong> - Speed up builds with dependency caching</li>
        <li>• <strong>Multi-trigger</strong> - Handle both pushes and pull requests</li>
        <li>• <strong>Deployment</strong> - Automated deployment to staging</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "Node.js application with package.json, tests, and build script",
            outputText: "Complete GitHub Actions workflow with CI/CD pipeline",
            explanation: "Workflow runs tests, builds app, and deploys on successful builds"
        }
    ],
    constraints: `<li class='mt-2'>
        Trigger on <code>push to main</code> and <code>pull_request</code>
    </li>
    <li class='mt-2'>
        Use <code>ubuntu-latest</code> runner with <code>Node.js 18</code>
    </li>
    <li class='mt-2'>
        Cache dependencies and run <code>npm ci</code> for installation
    </li>
    <li class='mt-2'>
        Include steps for: test, build, and deployment
    </li>
    <li class='mt-2'>
        Deploy to staging only on main branch pushes
    </li>`,
    handlerFunction: handlerGitHubActionsCICD,
    starterCode: starterCodeGitHubActionsCICD,
    order: 14,
    starterFunctionName: "# GitHub Actions YAML",
};