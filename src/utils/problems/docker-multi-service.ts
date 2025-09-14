import { Problem } from "../types/problem";

const starterCodeDockerMultiService = `# Create a multi-service Docker application for a web application stack
# 
# Requirements:
# 1. Create a docker-compose.yml that orchestrates multiple services
# 2. Services needed:
#    - Frontend (React/Next.js app on port 3000)
#    - Backend API (Node.js/Express on port 5000) 
#    - Database (PostgreSQL on port 5432)
#    - Redis cache (Redis on port 6379)
#    - Nginx reverse proxy (port 80 -> routes to services)
# 3. Services should be able to communicate with each other
# 4. Include proper environment variables and secrets management
# 5. Add health checks for critical services
# 6. Configure proper restart policies
# 7. Set up persistent volumes for database data
# 8. Configure networks for service isolation
# 9. Add resource limits (memory/CPU)
# 10. Include development vs production configurations

# docker-compose.yml
version: '3.8'

services:
  # Define your services here
  
# Write your Docker Compose configuration below:

# Networks configuration

# Volumes configuration

# Additional files you might need:

# Dockerfile for frontend (if needed)
# FROM node:18-alpine
# Your Dockerfile commands here

# Dockerfile for backend (if needed)  
# FROM node:18-alpine
# Your Dockerfile commands here

# nginx.conf for reverse proxy
# server {
#   # Your Nginx configuration here
# }

# .env file for environment variables
# Add your environment variables here
`;

const handlerDockerMultiService = (dockerCode: string) => {
    try {
        const code = dockerCode.toLowerCase();
        
        // Check for required Docker Compose elements
        const requirements = [
            { test: () => code.includes('version:'), message: "Must specify docker-compose version" },
            { test: () => code.includes('services:'), message: "Must define services section" },
            { test: () => code.includes('frontend') || code.includes('react') || code.includes('nextjs'), message: "Must include frontend service" },
            { test: () => code.includes('backend') || code.includes('api') || code.includes('express'), message: "Must include backend API service" },
            { test: () => code.includes('postgres') || code.includes('database'), message: "Must include PostgreSQL database service" },
            { test: () => code.includes('redis'), message: "Must include Redis cache service" },
            { test: () => code.includes('nginx') || code.includes('proxy'), message: "Must include Nginx reverse proxy" },
            { test: () => code.includes('ports:'), message: "Must expose ports for services" },
            { test: () => code.includes('environment:') || code.includes('env_file:'), message: "Must configure environment variables" },
            { test: () => code.includes('networks:'), message: "Must configure networks for service communication" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        // Check for advanced Docker concepts
        const advancedRequirements = [
            { test: () => code.includes('healthcheck:'), message: "Must include health checks for critical services" },
            { test: () => code.includes('restart:'), message: "Must configure restart policies" },
            { test: () => code.includes('volumes:'), message: "Must configure persistent volumes" },
            { test: () => code.includes('depends_on:'), message: "Must specify service dependencies" },
            { test: () => code.includes('mem_limit') || code.includes('cpus'), message: "Must configure resource limits" },
            { test: () => code.includes('dockerfile') || code.includes('build:'), message: "Must include custom Dockerfile configuration" },
            { test: () => code.includes('secrets:') || code.includes('env_file'), message: "Must handle secrets/environment files properly" },
        ];
        
        let advancedScore = 0;
        for (const requirement of advancedRequirements) {
            if (requirement.test()) {
                advancedScore++;
            }
        }
        
        if (advancedScore < 5) {
            throw new Error("Must demonstrate more advanced Docker concepts (health checks, volumes, resource limits, etc.)");
        }
        
        // Check for proper networking
        if (!code.includes('3000') || !code.includes('5000') || !code.includes('5432') || !code.includes('6379')) {
            throw new Error("Must configure correct ports: Frontend(3000), Backend(5000), PostgreSQL(5432), Redis(6379)");
        }
        
        // Check for proper service orchestration
        if (!code.includes('image:') && !code.includes('build:')) {
            throw new Error("Services must specify either image or build configuration");
        }
        
        return true;
    } catch (error: any) {
        console.log("Docker Multi-Service handler error");
        throw new Error(error.message || error);
    }
};

export const dockerMultiService: Problem = {
    id: "docker-multi-service",
    title: "Docker: Multi-Service Application Stack",
    problemStatement: `<p class='mt-3'>
        Create a complete Docker Compose configuration for a multi-tier web application with proper service orchestration.
    </p>
    <p class='mt-3'>
        Your solution should demonstrate expertise in:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Service Orchestration</strong> - Multiple interconnected containers</li>
        <li>• <strong>Networking</strong> - Inter-service communication and isolation</li>
        <li>• <strong>Data Persistence</strong> - Volume management for databases</li>
        <li>• <strong>Load Balancing</strong> - Nginx reverse proxy configuration</li>
        <li>• <strong>Environment Management</strong> - Secrets and configuration handling</li>
        <li>• <strong>Resource Management</strong> - CPU and memory limits</li>
        <li>• <strong>Health Monitoring</strong> - Service health checks and restart policies</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "Multi-tier web application requirements",
            outputText: "Complete docker-compose.yml with all required services",
            explanation: "Orchestrates frontend, backend, database, cache, and reverse proxy with proper networking and security"
        }
    ],
    constraints: `<li class='mt-2'>
        Must include <code>5 services</code>: Frontend, Backend, Database, Cache, Proxy
    </li>
    <li class='mt-2'>
        Configure <code>proper networking</code> and service communication
    </li>
    <li class='mt-2'>
        Implement <code>health checks</code> and restart policies
    </li>
    <li class='mt-2'>
        Set up <code>persistent volumes</code> for data storage
    </li>
    <li class='mt-2'>
        Include <code>resource limits</code> and environment configuration
    </li>
    <li class='mt-2'>
        Handle <code>secrets and security</code> best practices
    </li>`,
    handlerFunction: handlerDockerMultiService,
    starterCode: starterCodeDockerMultiService,
    order: 14,
    starterFunctionName: "# Docker Compose",
};