import { Problem } from "../types/problem";

const starterCodeAWSInfrastructure = `# Create Terraform configuration for AWS web application infrastructure
# Requirements:
# 1. Create a VPC with CIDR 10.0.0.0/16
# 2. Create public and private subnets in different AZs
# 3. Create Internet Gateway and attach to VPC
# 4. Create route table for public subnet
# 5. Create security group allowing HTTP (80) and HTTPS (443) traffic
# 6. Create an EC2 instance (t3.micro) in public subnet
# 7. Create an Application Load Balancer
# 8. Add proper tags: Environment=dev, Project=webapp
# 9. Output the load balancer DNS name
# 10. Use variables for region and instance type

# Write your Terraform configuration here:
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string  
  default     = "t3.micro"
}

# Your Terraform resources here
`;

const handlerAWSInfrastructure = (terraformContent: string) => {
    try {
        const content = terraformContent.toLowerCase();
        
        const requirements = [
            { test: () => content.includes('resource "aws_vpc"') && content.includes('10.0.0.0/16'), message: "Must create VPC with CIDR 10.0.0.0/16" },
            { test: () => content.includes('resource "aws_subnet"'), message: "Must create subnets" },
            { test: () => content.includes('resource "aws_internet_gateway"'), message: "Must create Internet Gateway" },
            { test: () => content.includes('resource "aws_route_table"'), message: "Must create route table" },
            { test: () => content.includes('resource "aws_security_group"'), message: "Must create security group" },
            { test: () => content.includes('80') && content.includes('443'), message: "Must allow HTTP (80) and HTTPS (443) traffic" },
            { test: () => content.includes('resource "aws_instance"') && content.includes('t3.micro'), message: "Must create EC2 instance (t3.micro)" },
            { test: () => content.includes('resource "aws_lb"'), message: "Must create Application Load Balancer" },
            { test: () => content.includes('environment') && content.includes('dev'), message: "Must include Environment=dev tag" },
            { test: () => content.includes('project') && content.includes('webapp'), message: "Must include Project=webapp tag" },
            { test: () => content.includes('output') && content.includes('dns_name'), message: "Must output load balancer DNS name" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        return true;
    } catch (error: any) {
        console.log("AWS Infrastructure handler error");
        throw new Error(error.message || error);
    }
};

export const awsInfrastructure: Problem = {
    id: "aws-infrastructure",
    title: "Infrastructure: AWS with Terraform",
    problemStatement: `<p class='mt-3'>
        Create a complete AWS infrastructure setup using Terraform for a scalable web application.
    </p>
    <p class='mt-3'>
        Your infrastructure should include:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Network Layer</strong> - VPC, subnets, and internet connectivity</li>
        <li>• <strong>Compute</strong> - EC2 instances with proper security groups</li>
        <li>• <strong>Load Balancing</strong> - Application Load Balancer for high availability</li>
        <li>• <strong>Best Practices</strong> - Proper tagging and variable usage</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "Web application requiring AWS infrastructure",
            outputText: "Complete Terraform configuration with VPC, EC2, and ALB",
            explanation: "Infrastructure includes networking, compute, and load balancing components"
        }
    ],
    constraints: `<li class='mt-2'>
        Use <code>VPC CIDR: 10.0.0.0/16</code> with public and private subnets
    </li>
    <li class='mt-2'>
        Create <code>t3.micro</code> EC2 instance in public subnet
    </li>
    <li class='mt-2'>
        Allow <code>HTTP (80)</code> and <code>HTTPS (443)</code> traffic
    </li>
    <li class='mt-2'>
        Include Application Load Balancer with DNS output
    </li>
    <li class='mt-2'>
        Add tags: <code>Environment=dev, Project=webapp</code>
    </li>`,
    handlerFunction: handlerAWSInfrastructure,
    starterCode: starterCodeAWSInfrastructure,
    order: 15,
    starterFunctionName: "# Terraform",
};