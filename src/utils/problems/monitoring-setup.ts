import { Problem } from "../types/problem";

const starterCodeMonitoringSetup = `# Create a monitoring configuration for a web application
# Requirements:
# 1. Create Prometheus configuration to scrape metrics every 15s
# 2. Monitor application on localhost:3000/metrics
# 3. Monitor node-exporter on localhost:9100/metrics
# 4. Set up alerting rules for high CPU usage (>80% for 5 minutes)
# 5. Set up alerting for application downtime (>1 minute)
# 6. Configure Grafana dashboard with datasource pointing to Prometheus
# 7. Create alert notification to webhook http://alerts.company.com/webhook
# 8. Set retention period to 15 days
# 9. Enable federation for prometheus-ha:9090
# 10. Add labels: environment=production, team=devops

# Write your Prometheus configuration (prometheus.yml):
global:
  scrape_interval: 15s
  # Your global configuration here

# Your scrape configs and rules here
`;

const handlerMonitoringSetup = (configContent: string) => {
    try {
        const content = configContent.toLowerCase();
        
        const requirements = [
            { test: () => content.includes('scrape_interval: 15s'), message: "Must set scrape interval to 15s" },
            { test: () => content.includes('localhost:3000/metrics'), message: "Must monitor application at localhost:3000/metrics" },
            { test: () => content.includes('localhost:9100/metrics'), message: "Must monitor node-exporter at localhost:9100/metrics" },
            { test: () => content.includes('80') && content.includes('cpu'), message: "Must alert on CPU usage >80%" },
            { test: () => content.includes('5m') || content.includes('5 minutes'), message: "Must alert for 5 minutes duration" },
            { test: () => content.includes('1m') && content.includes('down'), message: "Must alert on 1 minute downtime" },
            { test: () => content.includes('http://alerts.company.com/webhook'), message: "Must configure webhook notification" },
            { test: () => content.includes('retention') && content.includes('15d'), message: "Must set retention to 15 days" },
            { test: () => content.includes('prometheus-ha:9090') && content.includes('federation'), message: "Must configure federation" },
            { test: () => content.includes('environment: production') && content.includes('team: devops'), message: "Must include required labels" }
        ];
        
        for (const requirement of requirements) {
            if (!requirement.test()) {
                throw new Error(requirement.message);
            }
        }
        
        return true;
    } catch (error: any) {
        console.log("Monitoring Setup handler error");
        throw new Error(error.message || error);
    }
};

export const monitoringSetup: Problem = {
    id: "monitoring-setup",
    title: "Monitoring: Prometheus & Alerting",
    problemStatement: `<p class='mt-3'>
        Create a comprehensive monitoring setup with Prometheus for a production web application including alerting and federation.
    </p>
    <p class='mt-3'>
        Your monitoring solution should include:
    </p>
    <ul class='mt-2 ml-4'>
        <li>• <strong>Metrics Collection</strong> - Application and system metrics</li>
        <li>• <strong>Alerting Rules</strong> - Proactive monitoring with thresholds</li>
        <li>• <strong>Notification</strong> - Webhook integration for alerts</li>
        <li>• <strong>High Availability</strong> - Federation for resilient monitoring</li>
    </ul>`,
    examples: [
        {
            id: 1,
            inputText: "Production web application needing monitoring",
            outputText: "Complete Prometheus configuration with alerts and federation",
            explanation: "Monitors app metrics, system resources, and sends alerts on issues"
        }
    ],
    constraints: `<li class='mt-2'>
        Scrape application at <code>localhost:3000/metrics</code> every 15s
    </li>
    <li class='mt-2'>
        Alert on <code>CPU >80%</code> for 5 minutes
    </li>
    <li class='mt-2'>
        Alert on application downtime >1 minute
    </li>
    <li class='mt-2'>
        Configure webhook: <code>http://alerts.company.com/webhook</code>
    </li>
    <li class='mt-2'>
        Set <code>15 day retention</code> and federation to <code>prometheus-ha:9090</code>
    </li>`,
    handlerFunction: handlerMonitoringSetup,
    starterCode: starterCodeMonitoringSetup,
    order: 12,
    starterFunctionName: "# Prometheus YAML",
};