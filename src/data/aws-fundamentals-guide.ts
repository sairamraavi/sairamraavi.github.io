import type { Post } from "./blog";

export const awsFundamentalsPost: Post = {
  slug: "aws-fundamentals",
  title: "AWS Fundamentals: A Practical Foundation for Cloud Beginners",
  category: "AWS",
  description:
    "A structured guide to AWS global infrastructure, core services, security, and the decisions that help a first cloud project start safely.",
  publishedAt: "2026-09-18",
  tags: ["AWS", "Cloud", "Infrastructure", "Learning"],
  sections: [
    {
      heading: "Start with the cloud operating model",
      paragraphs: [
        "Amazon Web Services (AWS) is a cloud platform that provides computing, storage, databases, networking, identity and many managed services on demand. Instead of buying servers, installing hardware and planning years of capacity upfront, a team can create resources through the AWS Management Console, command line tools, APIs or infrastructure code.",
        "The important idea is not simply that a server lives somewhere else. Cloud computing lets a team treat infrastructure as a configurable service: create what is needed, measure it, scale it when demand changes, and remove it when the work is finished. That shortens the path from an idea to a running system, but it also makes ownership of security, cost and reliability more explicit.",
      ],
      bullets: [
        "Scalability: add or remove capacity as workload demand changes.",
        "Cost control: pay for the resources and time you use, then shut down unused resources.",
        "Agility: provision common building blocks in minutes rather than waiting for hardware procurement.",
        "Security capability: use identity, encryption, logging and network controls as part of the design.",
      ],
    },
    {
      heading: "A useful mental model: account, region, service, resource",
      paragraphs: [
        "An AWS account is the primary billing and security boundary. Inside an account, you choose a Region, create resources through AWS services, and give people or workloads permission to use only what they need. For example, an application may run on EC2 in one Region, store uploads in S3, use RDS for relational data and use IAM roles to access those services without embedded credentials.",
        "Start every design question with the workload: what must it do, who needs it, where are its users, what data does it hold, and what happens if it is unavailable? Services are tools for those requirements, not a checklist to collect.",
      ],
      code: "AWS account\n  └── Region (for example, ap-south-1)\n       ├── VPC: the private network boundary\n       │    └── Availability Zones and subnets\n       ├── EC2 / Lambda: compute\n       ├── S3 / EBS: storage\n       ├── RDS / DynamoDB: data\n       └── IAM: identities and permissions",
    },
    {
      heading: "Regions, Availability Zones and the global edge",
      paragraphs: [
        "A Region is a geographic area where AWS operates multiple data centers. An Availability Zone (AZ) is one or more physically separate data-center facilities within that Region, with independent power, cooling and networking. AZs are connected with high-bandwidth, low-latency networking, but they are deliberately separated so one facility problem does not have to take down the entire application.",
        "For a learning project, one AZ is enough to understand the service. For a production service that must tolerate an AZ failure, distribute compute and database capacity across at least two AZs. That is the practical difference between an application that runs and an application designed for availability.",
        "Edge locations place content and network services closer to users. Amazon CloudFront uses this global edge network to cache and deliver content; it is useful when visitors are geographically distributed or when static content needs fast delivery.",
      ],
      bullets: [
        "Choose a Region based on user proximity, required services and features, data residency or compliance needs, pricing, and disaster-recovery strategy.",
        "Do not choose a Region only because it is familiar. Confirm the services you need are available there before committing to the design.",
        "Use multi-AZ architecture for availability. Use a second Region only when the recovery objective and operational cost justify it.",
      ],
    },
    {
      heading: "Design with the Well-Architected Framework",
      paragraphs: [
        "The AWS Well-Architected Framework is a set of design questions that prevents cloud architecture from becoming a collection of defaults. It currently has six pillars. Using it early is useful because the same decisions that make a demo quick can create production risk later: an overly broad IAM policy, a database with no backup plan, an unmeasured bill, or a service with no recovery path.",
      ],
      table: {
        headers: ["Pillar", "Beginner question to ask"],
        rows: [
          [
            "Operational Excellence",
            "Can I deploy, observe and improve this workload consistently?",
          ],
          [
            "Security",
            "Who can access it, and how is sensitive data protected?",
          ],
          [
            "Reliability",
            "What happens when an instance, AZ or dependency fails?",
          ],
          [
            "Performance Efficiency",
            "Is this service and size appropriate for the workload?",
          ],
          [
            "Cost Optimization",
            "Can I see, control and remove unnecessary spend?",
          ],
          [
            "Sustainability",
            "Can I meet the need with less idle capacity and waste?",
          ],
        ],
      },
    },
    {
      heading: "Compute: EC2 gives you a virtual server",
      paragraphs: [
        "Amazon EC2 provides virtual machines, called instances. Choose EC2 when you need control over the operating system, runtime, installed packages, networking or long-running process. A small web application, a self-hosted build runner or a legacy service can all be valid EC2 workloads.",
        "An instance type describes CPU, memory, networking and local-storage characteristics. An Amazon Machine Image (AMI) is the starting operating-system image. A security group acts as a stateful virtual firewall around the instance: it should allow only the required inbound traffic. An Elastic IP is a stable public IPv4 address, but many production systems instead place a load balancer in front of private instances.",
      ],
      code: "# Inspect the identity and Region before creating resources\naws sts get-caller-identity\naws configure get region\n\n# List a few current Amazon Linux AMIs in a chosen Region\naws ec2 describe-images \\\n  --owners amazon \\\n  --filters 'Name=name,Values=al2023-ami-*-x86_64' 'Name=state,Values=available' \\\n  --query 'Images | sort_by(@, &CreationDate)[-5:].{Name:Name,ImageId:ImageId,Created:CreationDate}' \\\n  --output table\n\n# A security group should open only explicit, necessary ports\naws ec2 describe-security-groups --group-ids <security-group-id>\n\n# Do not leave SSH open to 0.0.0.0/0. Prefer a fixed admin CIDR, SSM, or a bastion.",
    },
    {
      heading: "Compute: Lambda runs code in response to events",
      paragraphs: [
        "AWS Lambda is serverless compute. You provide a function and its configuration; AWS runs it when an event arrives, such as an API request, an S3 upload, a queue message or a schedule. You do not manage a server fleet for the function, and billing is based on execution rather than an always-running instance.",
        "Lambda is a good fit for short, independent, event-driven work: image processing after upload, a scheduled report, API backends, notifications or automation. It is less suitable when a workload needs a long-lived connection, specialized host control, very predictable always-warm capacity, or execution beyond Lambda limits. The key design practice is to make retries safe: many event sources can deliver an event more than once.",
      ],
      code: '# Lambda handler example (Python)\ndef handler(event, context):\n    name = event.get("name", "world")\n    return {\n        "statusCode": 200,\n        "headers": {"content-type": "application/json"},\n        "body": f\'{{"message": "Hello, {name}"}}\',\n    }\n\n# Configure environment values in Lambda settings or a managed configuration service.\n# Never put database passwords or API keys in source code or logs.',
    },
    {
      heading: "Storage: S3 stores objects, not disks",
      paragraphs: [
        "Amazon S3 is object storage. A bucket is a named container; an object is a file plus its key, metadata and optional version. Use S3 for images, documents, static website assets, backups, logs and data-lake inputs. It is not a mounted POSIX filesystem and should not be treated as a database for frequent record updates.",
        "Versioning lets a bucket retain earlier object versions, which is valuable for recovery from accidental overwrite or deletion. Lifecycle rules can transition old objects to lower-cost storage classes or expire them. These are operational features, not just storage options: define how long data must exist and who can access it before deciding a lifecycle policy.",
      ],
      code: 'export BUCKET_NAME=<globally-unique-bucket-name>\nexport AWS_REGION=<aws-region>\n\naws s3api create-bucket --bucket "$BUCKET_NAME" --region "$AWS_REGION" \\\n  --create-bucket-configuration LocationConstraint="$AWS_REGION"\naws s3api put-bucket-versioning --bucket "$BUCKET_NAME" \\\n  --versioning-configuration Status=Enabled\naws s3 cp ./architecture.png "s3://$BUCKET_NAME/uploads/architecture.png"\naws s3api list-object-versions --bucket "$BUCKET_NAME" --prefix uploads/\n\n# Keep Block Public Access on unless public delivery is an intentional design.\naws s3api get-public-access-block --bucket "$BUCKET_NAME"',
    },
    {
      heading: "Storage: EBS is durable block storage for EC2",
      paragraphs: [
        "Amazon EBS provides block volumes that attach to EC2 instances. It is the right default for an instance operating-system disk, application files that need a filesystem, or a database running on EC2. Unlike S3, EBS is attached storage at the instance level and exists within a single Availability Zone.",
        "Snapshots are point-in-time backups stored by AWS and can be used to create new volumes. Take backups before risky changes, test recovery rather than assuming a backup works, and remember that an EBS volume is not a multi-AZ availability design by itself.",
      ],
      code: "# Find attached EBS volumes and create a snapshot before a risky change\naws ec2 describe-volumes --filters Name=attachment.instance-id,Values=<instance-id>\naws ec2 create-snapshot --volume-id <volume-id> --description \"pre-release backup\"\naws ec2 describe-snapshots --owner-ids self --query 'Snapshots[*].[SnapshotId,VolumeId,State,StartTime]' --output table",
    },
    {
      heading: "Databases: choose a relational or NoSQL model deliberately",
      paragraphs: [
        "Amazon RDS is a managed relational database service. It supports engines such as PostgreSQL, MySQL, MariaDB, SQL Server and Oracle. RDS reduces operational work around backups, patching, monitoring and failover options while preserving SQL, transactions, joins and relational constraints. Use it when your data has relationships and your application benefits from a familiar relational model.",
        "Amazon DynamoDB is a managed NoSQL key-value and document database. It is designed around access patterns: a partition key identifies where data is stored, and an optional sort key supports ordered related items. Choose DynamoDB when predictable low-latency access at scale and a key-driven data model fit the problem. Do not copy a relational schema into DynamoDB without first defining the reads and writes the application needs.",
      ],
      table: {
        headers: ["Service", "Primary purpose", "Good first use case"],
        rows: [
          [
            "RDS",
            "Managed relational database",
            "Application users, orders and reporting data",
          ],
          [
            "DynamoDB",
            "Managed key-value/document database",
            "Session state, metadata, event or lookup data",
          ],
        ],
      },
      code: '# RDS: inspect instances; do not expose a production database publicly by default\naws rds describe-db-instances --query \'DBInstances[*].[DBInstanceIdentifier,Engine,DBInstanceStatus]\' --output table\n\n# DynamoDB: a small example table with a partition key and sort key\naws dynamodb create-table --table-name LearningNotes \\\n  --attribute-definitions AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \\\n  --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \\\n  --billing-mode PAY_PER_REQUEST\naws dynamodb put-item --table-name LearningNotes \\\n  --item \'{"PK": {"S": "USER#sairam"}, "SK": {"S": "NOTE#001"}, "title": {"S": "Learn IAM roles"}}\'',
    },
    {
      heading: "Networking: a VPC is your isolated network space",
      paragraphs: [
        "A Virtual Private Cloud (VPC) is a logically isolated network in AWS. A VPC contains subnets, route tables and network controls. A subnet lives in one Availability Zone and is normally classified by its route: a public subnet has a route to an internet gateway, while a private subnet does not accept direct internet traffic. The terms describe routing, not a security guarantee by themselves.",
        "Route tables decide where traffic goes. Security groups are stateful firewalls attached to resources; return traffic is automatically allowed for an established connection. Network ACLs are stateless rules at the subnet boundary; they are useful as a broad guardrail but require explicit inbound and outbound rules. In most application designs, use security groups as the primary workload firewall and keep NACLs simple unless there is a clear requirement.",
      ],
      code: "Internet\n   │\nInternet Gateway\n   │\nPublic subnet: load balancer / NAT gateway\n   │\nPrivate subnet: application instances\n   │\nPrivate data subnet: RDS\n\n# Inspect routes before changing them\naws ec2 describe-route-tables --filters Name=vpc-id,Values=<vpc-id>\naws ec2 describe-subnets --filters Name=vpc-id,Values=<vpc-id>\naws ec2 describe-network-acls --filters Name=vpc-id,Values=<vpc-id>",
    },
    {
      heading: "Route 53: make names point to the right endpoints",
      paragraphs: [
        "Amazon Route 53 is AWS's DNS service. DNS translates a name such as `app.example.com` into an endpoint. Route 53 can host DNS zones, register domains in supported cases, perform health checks and route traffic using policies. A hosted zone contains the records for a domain.",
        "For a simple website, an alias record can direct the root domain to an AWS load balancer or supported AWS endpoint. For a subdomain, a CNAME can point to another hostname. DNS changes propagate according to TTL values, so plan changes carefully and validate the final record with `dig` or `nslookup`.",
      ],
      code: "# Inspect hosted zones and record sets\naws route53 list-hosted-zones-by-name --dns-name example.com\naws route53 list-resource-record-sets --hosted-zone-id <hosted-zone-id>\n\n# Verify an answer from a resolver after a DNS change\ndig app.example.com\ndig +short app.example.com",
    },
    {
      heading: "IAM: secure access is an architecture concern",
      paragraphs: [
        "AWS Identity and Access Management (IAM) controls who or what can take an action in an AWS account. Users represent individual identities where necessary, groups organize user permissions, roles provide temporary credentials to people or workloads, and policies define allowed or denied actions on resources. In modern application architecture, roles are usually more important than long-lived access keys.",
        "Give a person multi-factor authentication and only the access their job requires. Give an EC2 instance, Lambda function or CI pipeline an IAM role with a narrowly scoped policy. This removes the need to put permanent AWS keys into source code, configuration files or deployment systems. The shared responsibility model matters here: AWS secures the cloud infrastructure; you remain responsible for your identities, data, configurations and workloads in the cloud.",
      ],
      code: '# Identify the credentials currently in use\naws sts get-caller-identity\n\n# Inspect permissions before attaching them\naws iam list-attached-role-policies --role-name <role-name>\naws iam get-role-policy --role-name <role-name> --policy-name <inline-policy-name>\n\n# Example least-privilege policy shape: restrict action and resource\n{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Action": ["s3:GetObject"],\n    "Resource": "arn:aws:s3:::<bucket-name>/uploads/*"\n  }]\n}\n\n# Never use root-user access keys for daily work. Enable MFA on the root user and use it only for account-level tasks.',
    },
    {
      heading: "Your first safe AWS learning path",
      paragraphs: [
        "The AWS Management Console is the easiest place to discover services and inspect configuration. The AWS Free Tier can make early labs affordable, but it is not a guarantee that every experiment is free. Offers, usage limits and eligibility change, and resources such as public IPv4 addresses, storage, snapshots, data transfer or an instance left running can still incur cost.",
        "Set a budget and billing alert before creating resources. Tag every lab resource with an owner and purpose, then delete it when the exercise is complete. This is a habit worth building early: a clean account is safer, cheaper and much easier to understand.",
      ],
      code: "# Install and configure the AWS CLI, then confirm access\naws --version\naws configure\naws sts get-caller-identity\n\n# Helpful discovery commands for a learning account\naws ec2 describe-instances --query 'Reservations[].Instances[].{Id:InstanceId,State:State.Name,Type:InstanceType}' --output table\naws s3api list-buckets --query 'Buckets[].Name' --output table\naws lambda list-functions --query 'Functions[].FunctionName' --output table\n\n# Before ending a lab, review and remove only the resources you created.\n# Confirm resource IDs and dependencies before any deletion command.",
    },
    {
      heading: "Build a small project, then deepen one decision at a time",
      paragraphs: [
        "A strong first project is a static portfolio or small API: host assets in S3, deliver them through CloudFront, use Route 53 for DNS, and record the decisions you made. A second project can add an API on Lambda, a DynamoDB table and least-privilege IAM. Only then move to an EC2 or container deployment, where VPC design, security groups, logs, backups and patching become real operating work.",
        "AWS has a large service catalog, but the fundamentals stay stable: choose a Region deliberately, isolate networks, grant least privilege, store data according to its access pattern, observe what runs, protect recovery paths and watch cost. Learn by making one architecture decision at a time, documenting the trade-off, and cleaning up the resources afterwards.",
      ],
      bullets: [
        "Read the AWS documentation for each service before granting permissions or exposing a network endpoint.",
        "Use AWS Skill Builder and certification learning paths to structure study after hands-on practice.",
        "Practice the Well-Architected questions on every project, even a small lab.",
        "Treat a successful deployment as the start: verify health, access controls, backups, logs and cost visibility.",
      ],
    },
  ],
};
