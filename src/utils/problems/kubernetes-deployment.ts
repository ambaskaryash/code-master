import { Problem } from "../types/problem";

const starterCodeKubernetesDeployment = `# Create a Kubernetes deployment YAML for a web application
# Requirements:
# 1. Deployment named "web-app" with 3 replicas
# 2. Use image "nginx:1.21"
# 3. Container port 80
# 4. Resource limits: CPU 100m, Memory 128Mi
# 5. Resource requests: CPU 50m, Memory 64Mi
# 6. Add labels: app=web-app, version=v1
# 7. Include a Service to expose the deployment on port 80
# 8. Use ClusterIP service type

# Write your Kubernetes YAML here:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  # Your deployment configuration here
`;

const handlerKubernetesDeployment = (yamlContent: string) => {
    try {
        const content = yamlContent.toLowerCase();
        
        const requirements = [
            { test: () => content.includes('replicas: 3'), message: "Must have 3 replicas" },
            { test: () => content.includes('nginx:1.21'), message: "Must use nginx:1.21 image" },
            { test: () => content.includes('containerport: 80'), message: "Must expose container port 80" },
            { test: () => content.includes('cpu: 100m'), message: "Must set CPU limit to 100m" },
            { test: () => content.includes('memory: 128mi'), message: "Must set memory limit to 128Mi" },
            { test: () => content.includes('cpu: 50m'), message: "Must set CPU request to 50m" },
            { test: () => content.includes('memory: 64mi'), message: "Must set memory request to 64Mi" },
            { test: () => content.includes('app: web-app'), message: "Must have app=web-app label" },
            { test: () => content.includes('version: v1'), message: "Must have version=v1 label" },
            { test: () => content.includes('kind: service'), message: "Must include a Service" },
            { test: () => content.includes('type: clusterip') || (!content.includes('type:') && content.includes('kind: service')), message: "Service must be ClusterIP type" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        return true;
    } catch (error: any) {
        console.log("Kubernetes Deployment handler error");
        throw new Error(error.message || error);
    }
};

export const kubernetesDeployment: Problem = {
    id: "kubernetes-deployment",
    title: "Kubernetes: Web App Deployment",
    problemStatement: `<p class='mt-3'>
        Create a complete Kubernetes deployment configuration for a web application with proper resource management and service exposure.
    </p>
    <p class='mt-3'>
        Your configuration should include:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Deployment</strong> with multiple replicas for high availability</li>
        <li>• <strong>Resource limits</strong> to prevent resource exhaustion</li>
        <li>• <strong>Labels and selectors</strong> for proper organization</li>
        <li>• <strong>Service</strong> to expose the application internally</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "Web application deployment requirements",
            outputText: "Complete Kubernetes YAML with Deployment and Service",
            explanation: "Include both Deployment and Service resources with proper configuration"
        }
    ],
    constraints: `<li class='mt-2'>
        Use <code>replicas: 3</code> for high availability
    </li>
    <li class='mt-2'>
        Set resource limits: <code>CPU 100m, Memory 128Mi</code>
    </li>
    <li class='mt-2'>
        Set resource requests: <code>CPU 50m, Memory 64Mi</code>
    </li>
    <li class='mt-2'>
        Include proper labels: <code>app=web-app, version=v1</code>
    </li>
    <li class='mt-2'>
        Create a ClusterIP service to expose port 80
    </li>`,
    handlerFunction: handlerKubernetesDeployment,
    starterCode: starterCodeKubernetesDeployment,
    order: 13,
    starterFunctionName: "# Kubernetes YAML",
};