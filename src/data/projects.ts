export type Project = {
  title: string;
  label: string;
  description: string;
  href: string;
  tags: string[];
  details?: string[];
};

export const projects: Project[] = [
  {
    title: "Cloud-Native DevOps Platform on AWS",
    label: "Latest repository · Platform engineering",
    description:
      "A production-style platform for provisioning, delivering, securing and observing applications on AWS.",
    href: "https://github.com/sairamraavi/CloudNativeDevopsPlatformAWS",
    tags: ["DevOps", "Cloud", "CI/CD", "Kubernetes", "Infrastructure as Code"],
    details: [
      "Terraform and Ansible automate infrastructure and configuration; Jenkins and Docker support repeatable application delivery.",
      "Amazon EKS, Prometheus and Grafana extend the project into orchestration, monitoring and operational visibility.",
    ],
  },
  {
    title: "AWS Serverless Architecture",
    label: "Latest repository · Event-driven automation",
    description:
      "An event-driven AWS automation project for EC2, S3 and EBS operations using Lambda, EventBridge and CloudWatch.",
    href: "https://github.com/sairamraavi/Aws-Serverless-Architecture",
    tags: ["Cloud", "DevOps", "Automation"],
    details: [
      "Python and Boto3 handlers respond to scheduled and event-driven operations with scoped IAM access.",
      "CloudWatch monitoring and EventBridge scheduling make the automation observable and repeatable.",
    ],
  },
  {
    title: "TravelMemory: Terraform, Ansible and AWS",
    label: "Latest repository · Infrastructure as Code",
    description:
      "A production-style AWS deployment path for a MERN application, from provisioned infrastructure to configured application runtime.",
    href: "https://github.com/sairamraavi/travelmemory-terraform-ansible-aws",
    tags: ["Full Stack", "Cloud", "Infrastructure as Code", "Automation"],
    details: [
      "Terraform defines the AWS infrastructure while Ansible configures hosts and deploys the application.",
      "The project connects application delivery to reproducible provisioning and operational configuration.",
    ],
  },
  {
    title: "Kubernetes Microservices Task",
    label: "Latest repository · Kubernetes practice",
    description:
      "Four Node.js microservices deployed to Kubernetes with health probes, service discovery, resource controls and optional NGINX ingress.",
    href: "https://github.com/sairamraavi/k8s-microservices-task",
    tags: ["DevOps", "Kubernetes", "Cloud"],
  },
  {
    title: "Orchestrated Streaming Application",
    label: "Featured EKS delivery project",
    description:
      "A containerized MERN streaming application with CI/CD, Amazon EKS orchestration, Helm and Jenkins.",
    href: "https://github.com/sairamraavi/Orchestrated-Streaming-App",
    tags: ["Full Stack", "DevOps", "Cloud", "Kubernetes", "CI/CD"],
  },
  {
    title: "Ansible Learning Repository",
    label: "Configuration-management practice",
    description:
      "Practical DevOps playbooks and automation examples for configuration management and repeatable server operations.",
    href: "https://github.com/sairamraavi/learn-ansible",
    tags: ["DevOps", "Automation", "Infrastructure as Code"],
  },
];
