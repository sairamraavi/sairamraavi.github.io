import { githubActionsPost } from "./github-actions-guide";

export type ArticleTable = { headers: string[]; rows: string[][] };
export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  table?: ArticleTable;
};
export type Post = {
  slug: string;
  title: string;
  category: string;
  description: string;
  publishedAt: string;
  tags: string[];
  draft?: boolean;
  sections?: ArticleSection[];
};

export const posts: Post[] = [
  {
    slug: "aws-lambda-practical-guide",
    title: "AWS Lambda: a practical guide to event-driven workloads",
    category: "AWS",
    description:
      "A practical framework for choosing triggers, designing handlers, narrowing permissions and operating Lambda functions reliably.",
    publishedAt: "2026-08-29",
    tags: ["AWS Lambda", "Serverless", "DevOps"],
    sections: [
      {
        heading: "Start with the event, not the function",
        paragraphs: [
          "Lambda is most useful when work begins because something happened: an HTTP request arrived, an object landed in storage, a message appeared on a queue, or a scheduled task became due. That event-first view makes the boundary of the function clearer.",
          "Before writing code, define the trigger, the expected event shape, the response or side effect, and what should happen when a downstream system is slow or unavailable. This prevents a Lambda function from becoming a small, unobservable monolith.",
        ],
      },
      {
        heading: "A simple decision framework",
        bullets: [
          "Use Lambda for short-lived, independently deployable event handlers and automation.",
          "Use a queue between producers and consumers when traffic can spike or a downstream dependency needs protection.",
          "Keep synchronous request paths small; move long-running work to asynchronous processing.",
          "Choose a container or long-running service when you need persistent connections, predictable warm capacity, or work that outgrows a function boundary.",
        ],
      },
      {
        heading: "Keep the handler thin",
        paragraphs: [
          "The handler should translate the incoming event into an application call, validate only what it owns, and return a clear result. Business rules belong in small modules that can be tested without the Lambda runtime.",
        ],
        code: '// handler.ts\nimport { processOrder } from "./orders";\n\nexport const handler = async (event: { orderId?: string }) => {\n  if (!event.orderId) return { statusCode: 400, body: "orderId is required" };\n\n  await processOrder(event.orderId);\n  return { statusCode: 202, body: "accepted" };\n};',
      },
      {
        heading: "Design for retries and duplicates",
        paragraphs: [
          "Many event sources retry delivery. A function can therefore receive the same event more than once, and a successful-looking invocation can still leave an incomplete downstream side effect. Idempotency matters for notifications, provisioning, payments, and record updates.",
          "A useful pattern is to store a stable event identifier before performing the irreversible action. If the identifier already exists, return safely rather than doing the work twice.",
        ],
      },
      {
        heading: "Give the function only the access it needs",
        paragraphs: [
          "Permissions are part of the application design. Start with a narrowly scoped execution role: one bucket prefix, one queue, one table or one secret—not broad account-level access. Separate environments so development access cannot affect production resources.",
          "Configuration belongs in environment settings or a configuration service. Secrets belong in a secrets manager, never source control or logs.",
        ],
      },
      {
        heading: "Make operating signals deliberate",
        bullets: [
          "Log structured context: request or event ID, operation name, outcome, and safe timing data.",
          "Publish useful metrics: successes, failures, retry count, queue age, and business-level completion where appropriate.",
          "Set alarms on sustained failures and backlog growth, not every transient exception.",
          "Trace calls across API, Lambda, queue, and downstream services when debugging a production path.",
        ],
      },
      {
        heading: "A deployment checklist",
        paragraphs: [
          "A reliable serverless deployment is more than uploading a zip file. The release should package dependencies consistently, run unit tests, validate infrastructure changes, and deploy with explicit environment configuration. For important workflows, route a small portion of traffic first and watch errors, duration, and business signals before widening the release.",
          "The goal is not to use Lambda everywhere. The goal is to give a small event-driven responsibility the right operational boundary: clear input, least privilege, retries that are safe, and enough visibility to improve it over time.",
        ],
      },
    ],
  },
  {
    slug: "full-stack-to-devops-roadmap",
    title: "From Full-Stack Development to DevOps: My Learning Roadmap",
    category: "Career",
    description:
      "How I am extending a full-stack engineering foundation into cloud delivery, automation and platform reliability through hands-on work.",
    publishedAt: "2026-09-03",
    tags: ["DevOps", "Career", "Cloud", "Learning"],
    sections: [
      {
        heading: "Why this is an extension, not a reset",
        paragraphs: [
          "My foundation is full-stack application engineering: turning product requirements into responsive interfaces, integrating APIs, working across Drupal, PHP, Angular and .NET systems, and helping troubleshoot releases in production. That work taught me that a feature is only useful when it can be delivered, observed and supported reliably.",
          "DevOps is the next layer of that responsibility for me. It connects the code I build to the way it is packaged, tested, deployed, monitored and improved. The goal is not to move away from application engineering; it is to become more effective across the full path from an idea to a dependable production service.",
        ],
      },
      {
        heading: "The skills I am building on",
        paragraphs: [
          "The transition is easier when it starts from real engineering habits. API integration, debugging from logs, version control, reusable components and release support all carry directly into delivery work. The new challenge is to make the supporting systems explicit and repeatable.",
        ],
        bullets: [
          "Designing applications with clear configuration, health checks and useful logs.",
          "Packaging services so they run consistently across development and deployment environments.",
          "Replacing manual release steps with reviewed, repeatable pipelines.",
          "Treating infrastructure choices as code and documenting the reasoning behind them.",
        ],
      },
      {
        heading: "Phase 1: strengthen the operating fundamentals",
        paragraphs: [
          "The first phase is intentionally foundational: Linux, networking, Git workflows and containers. These are not separate DevOps topics; they are the practical language behind how modern applications run. I use hands-on labs to understand process logs, ports, environment variables, DNS, reverse proxies and the difference between a local machine working and a service being deployable.",
          "Docker is particularly useful here. Containerizing Flask and Node.js applications has made application dependencies, build stages and runtime configuration visible. It also exposes where an application still depends on assumptions that will not hold outside a developer laptop.",
        ],
      },
      {
        heading: "Phase 2: make delivery repeatable",
        paragraphs: [
          "A deployment should be a dependable process, not a sequence remembered by one person. My CI/CD practice uses GitHub, Jenkins and GitHub Actions to move from source changes through checks and builds toward a deployable artifact. I focus on a small, understandable pipeline before adding complexity.",
        ],
        code: "source change\n  → install dependencies\n  → run tests\n  → build artifact or image\n  → publish to a registry\n  → deploy with environment configuration\n  → run a health check\n  → observe the result",
      },
      {
        heading: "Phase 3: learn cloud infrastructure through projects",
        paragraphs: [
          "AWS gives the learning path a real operating environment. My project work has included EC2, ECR, S3, IAM, CloudWatch, EventBridge, Lambda and EKS. Rather than treating services as a checklist, I use them to answer a concrete question: what is the smallest secure and observable way to support this workload?",
          "For example, a container delivery path can connect a GitHub change to a Jenkins build, an image registry and a Kubernetes deployment. That workflow brings together permissions, image tagging, environment configuration, rollout behaviour and monitoring—concerns that are hard to learn from a diagram alone.",
        ],
      },
      {
        heading: "Phase 4: orchestration and infrastructure as code",
        paragraphs: [
          "Kubernetes, Helm and Terraform are the next focus because they turn operating decisions into versioned, reviewable definitions. I am learning the trade-offs rather than assuming every application needs a large platform: deployments need sensible resource limits, services need a clear network boundary, and infrastructure needs a lifecycle that can be understood and changed safely.",
          "The outcome I am working toward is not simply knowing the tools. It is being able to choose a proportionate approach: a managed service when it reduces operational work, a container when a workload needs it, and automation whenever a repeatable task otherwise becomes a manual risk.",
        ],
      },
      {
        heading: "How I measure progress",
        bullets: [
          "Can I explain an application’s path from source code to a running service?",
          "Can a teammate reproduce the build and deployment without relying on local knowledge?",
          "Are configuration, permissions and secrets separated from application code?",
          "When something fails, do logs, metrics and health checks provide a useful starting point?",
          "Can I document the trade-offs and identify the next reliability improvement?",
        ],
      },
      {
        heading: "What comes next",
        paragraphs: [
          "The next stage is deeper practice in observability, security-aware delivery, Kubernetes operations and platform engineering. I will continue turning each learning project into a short write-up: the architecture, what worked, what broke and what I would change next time.",
          "This roadmap is deliberately iterative. Each project adds one more dependable piece to the delivery system while keeping the application and the user outcome at the centre. That is the kind of engineering work I want to keep growing into.",
        ],
      },
    ],
  },
  {
    slug: "jenkins-flask-aws",
    title: "Building a Production-Ready Jenkins CI/CD Pipeline for Flask on AWS",
    category: "CI/CD",
    description:
      "A concrete Jenkins, Docker, ECR and Nginx deployment path for a Flask service on AWS EC2, including rollback and operational checks.",
    publishedAt: "2026-09-03",
    tags: ["Jenkins", "AWS", "Flask", "Docker", "ECR", "Nginx"],
    sections: [
      {
        heading: "Architecture and operating assumptions",
        paragraphs: [
          "This guide uses a dedicated Jenkins controller on EC2 and a separate production EC2 host. Jenkins runs tests, builds an immutable image, pushes it to Amazon ECR, and deploys the image by SSH. Nginx on the production host is the public entry point; containers bind only to loopback ports.",
          "For a small controller, start Jenkins on a t3.medium with at least 50 GB of gp3 storage. The production instance should be sized from application CPU, memory and traffic measurements rather than copied from the controller. Do not expose Docker or Jenkins agent ports publicly.",
        ],
        code: "Developer push\n    │\n    ▼\nGitHub repository ── webhook ──► Jenkins on EC2 :8080\n                                      │\n                                      ▼\n                               pytest + flake8 + black\n                                      │\n                                      ▼\n                               Docker build + image tags\n                                      │\n                                      ▼\n                               Amazon ECR private repository\n                                      │\n                                      ▼\n                         Production EC2 pulls immutable image\n                                      │\n                                      ▼\n                  Flask containers on 127.0.0.1:5000 / :5001\n                                      │\n                                      ▼\n                         Nginx reverse proxy :80 / :443",
      },
      {
        heading: "AWS baseline: network and IAM",
        paragraphs: [
          "Use separate security groups for Jenkins and the application. Restrict SSH to a bastion or your fixed administrative CIDR. Restrict Jenkins port 8080 to a VPN, a fixed administrator CIDR, or place Jenkins behind an authenticated reverse proxy. The production security group should accept only 80 and 443 from the internet; port 8080 is not a production application port.",
          "Attach an instance profile with AmazonEC2ContainerRegistryPowerUser to the Jenkins host for this reference setup. In a stricter environment, replace it with a repository-scoped policy that grants only the ECR actions used by the pipeline. Attach ECR read permissions to the production host separately; never copy AWS access keys into Jenkins credentials when an instance profile is available.",
        ],
        code: "export AWS_REGION=ap-south-1\nexport VPC_ID=vpc-0123456789abcdef0\nexport SUBNET_ID=subnet-0123456789abcdef0\nexport ADMIN_CIDR=203.0.113.10/32\nexport AMI_ID=ami-0123456789abcdef0\nexport KEY_NAME=platform-admin\n\nJENKINS_SG_ID=$(aws ec2 create-security-group --group-name jenkins-ci-sg --description 'Jenkins controller' --vpc-id \"$VPC_ID\" --region \"$AWS_REGION\" --query GroupId --output text)\nAPP_SG_ID=$(aws ec2 create-security-group --group-name flask-prod-sg --description 'Flask production host' --vpc-id \"$VPC_ID\" --region \"$AWS_REGION\" --query GroupId --output text)\n\naws ec2 authorize-security-group-ingress --group-id \"$JENKINS_SG_ID\" --ip-permissions \"[\\\"{\\\"IpProtocol\\\":\\\"tcp\\\",\\\"FromPort\\\":22,\\\"ToPort\\\":22,\\\"IpRanges\\\":[{\\\"CidrIp\\\":\\\"$ADMIN_CIDR\\\"}]}, {\\\"IpProtocol\\\":\\\"tcp\\\",\\\"FromPort\\\":8080,\\\"ToPort\\\":8080,\\\"IpRanges\\\":[{\\\"CidrIp\\\":\\\"$ADMIN_CIDR\\\"}]}]\" --region \"$AWS_REGION\"\naws ec2 authorize-security-group-ingress --group-id \"$APP_SG_ID\" --ip-permissions \"[\\\"{\\\"IpProtocol\\\":\\\"tcp\\\",\\\"FromPort\\\":22,\\\"ToPort\\\":22,\\\"IpRanges\\\":[{\\\"CidrIp\\\":\\\"$ADMIN_CIDR\\\"}]}, {\\\"IpProtocol\\\":\\\"tcp\\\",\\\"FromPort\\\":80,\\\"ToPort\\\":80,\\\"IpRanges\\\":[{\\\"CidrIp\\\":\\\"0.0.0.0/0\\\"}]}, {\\\"IpProtocol\\\":\\\"tcp\\\",\\\"FromPort\\\":443,\\\"ToPort\\\":443,\\\"IpRanges\\\":[{\\\"CidrIp\\\":\\\"0.0.0.0/0\\\"}]}]\" --region \"$AWS_REGION\"\n\naws iam create-role --role-name JenkinsEcrRole --assume-role-policy-document file://trust-ec2.json\naws iam attach-role-policy --role-name JenkinsEcrRole --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser\naws iam create-instance-profile --instance-profile-name JenkinsEcrProfile\naws iam add-role-to-instance-profile --instance-profile-name JenkinsEcrProfile --role-name JenkinsEcrRole\n\naws ec2 run-instances --image-id \"$AMI_ID\" --instance-type t3.medium --key-name \"$KEY_NAME\" --subnet-id \"$SUBNET_ID\" --security-group-ids \"$JENKINS_SG_ID\" --iam-instance-profile Name=JenkinsEcrProfile --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=50,VolumeType=gp3,DeleteOnTermination=true}' --region \"$AWS_REGION\"",
      },
      {
        heading: "Repository layout",
        paragraphs: ["Keep application, test, deployment and proxy concerns visible in the repository. The deployment script below is deliberately committed and reviewed; only secrets and host-specific values remain outside the repository."],
        code: "flask-ci-cd/\n├── app/\n│   ├── __init__.py\n│   └── routes.py\n├── tests/\n│   └── test_routes.py\n├── deploy/\n│   └── deploy.sh\n├── nginx/\n│   └── default.conf\n├── app.py\n├── requirements.txt\n├── Dockerfile\n├── .dockerignore\n├── Jenkinsfile\n└── docker-compose.prod.yml",
      },
      {
        heading: "Provision Jenkins, Docker and the AWS CLI",
        paragraphs: [
          "Run this on an Ubuntu 22.04 or 24.04 Jenkins controller. It installs Java 17 as requested; confirm the Java baseline supported by the Jenkins LTS version you select, because current Jenkins releases may prefer a newer Java runtime. After changing Docker group membership, restart Jenkins so the service receives the new group list.",
          "Membership of the docker group is effectively privileged access to the Docker daemon. Use a dedicated controller, restrict who can configure jobs, and prefer ephemeral agents for untrusted repositories.",
        ],
        code: "#!/usr/bin/env bash\nset -euo pipefail\n\nsudo apt-get update\nsudo apt-get install -y ca-certificates curl gnupg lsb-release fontconfig openjdk-17-jre nginx\njava -version\n\nsudo install -m 0755 -d /etc/apt/keyrings\ncurl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg\nsudo chmod a+r /etc/apt/keyrings/docker.gpg\necho \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null\nsudo apt-get update\nsudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin\nsudo systemctl enable --now docker\n\ncurl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key | sudo tee /etc/apt/keyrings/jenkins-keyring.asc > /dev/null\necho \"deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/\" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null\nsudo apt-get update\nsudo apt-get install -y jenkins\nsudo usermod -aG docker jenkins\nsudo systemctl restart jenkins\n\ncurl -sS https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o /tmp/awscliv2.zip\nunzip -q /tmp/awscliv2.zip -d /tmp\nsudo /tmp/aws/install --update\naws --version\nsudo cat /var/lib/jenkins/secrets/initialAdminPassword",
      },
      {
        heading: "Jenkins and GitHub configuration",
        paragraphs: [
          "Install Pipeline, Git, GitHub, GitHub Integration, Docker Pipeline, Credentials Binding, AWS Steps, SSH Agent, JUnit and Workspace Cleanup. Create a Multibranch Pipeline or Pipeline from SCM job, and configure a GitHub App or fine-grained repository credential with the minimum repository permissions required.",
          "In GitHub, create a webhook at Settings → Webhooks with payload URL `https://jenkins.example.com/github-webhook/`, content type `application/json`, a long random secret, and the Push event. Configure the same value as a Jenkins secret text credential named `github-webhook-secret` if your webhook validation setup uses it. Do not expose an unauthenticated controller directly to the internet merely to receive webhooks; use a reverse proxy, allowlist, VPN or a GitHub App-based trigger path.",
        ],
        code: "# On the Jenkins host, install the required plugins non-interactively before first use:\nsudo jenkins-plugin-cli --plugins 'workflow-aggregator git github github-branch-source docker-workflow credentials-binding pipeline-aws ssh-agent junit ws-cleanup'\nsudo systemctl restart jenkins\n\n# Create the ECR repository once. Image tags are immutable deployment inputs.\naws ecr create-repository --repository-name flask-production --image-scanning-configuration scanOnPush=true --image-tag-mutability IMMUTABLE --region \"$AWS_REGION\"",
      },
      {
        heading: "Flask application: app factory and health endpoints",
        paragraphs: ["The health endpoint must remain cheap, deterministic and unauthenticated at the network boundary. Keep readiness checks separate from heavyweight dependency checks if a failing external dependency should not restart an otherwise healthy process."],
        code: "# app/__init__.py\nfrom flask import Flask\n\ndef create_app(test_config=None):\n    app = Flask(__name__)\n    app.config.from_mapping(JSON_SORT_KEYS=False)\n    if test_config:\n        app.config.update(test_config)\n\n    from .routes import api\n    app.register_blueprint(api)\n    return app\n\n# app/routes.py\nfrom flask import Blueprint, jsonify\n\napi = Blueprint(\"api\", __name__)\n\n@api.get(\"/health\")\ndef health():\n    return jsonify(status=\"ok\"), 200\n\n@api.get(\"/api/v1/data\")\ndef data():\n    return jsonify(items=[{\"id\": 1, \"name\": \"production-ready\"}]), 200\n\n# app.py\nfrom app import create_app\napp = create_app()",
      },
      {
        heading: "Dependencies and tests",
        paragraphs: ["Pin application and test dependencies. In a production repository, generate and commit a hash-locked dependency file from a controlled build environment as part of dependency maintenance."],
        code: "# requirements.txt\nFlask==3.1.0\ngunicorn==23.0.0\npytest==8.3.5\nflake8==7.1.2\nblack==25.1.0\n\n# tests/test_routes.py\nfrom app import create_app\n\ndef client():\n    app = create_app({\"TESTING\": True})\n    return app.test_client()\n\ndef test_health_returns_ok():\n    response = client().get(\"/health\")\n    assert response.status_code == 200\n    assert response.get_json() == {\"status\": \"ok\"}\n\ndef test_data_returns_contract():\n    response = client().get(\"/api/v1/data\")\n    assert response.status_code == 200\n    assert response.get_json()[\"items\"][0][\"name\"] == \"production-ready\"",
      },
      {
        heading: "Production container image",
        paragraphs: ["The image runs as an unprivileged user and has a Docker health check. Do not put `.env` files, private keys, test output or the Git directory in the build context."],
        code: "# Dockerfile\nFROM python:3.12-slim AS runtime\nENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1\nWORKDIR /srv/app\nRUN addgroup --system app && adduser --system --ingroup app app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt\nCOPY app ./app\nCOPY app.py ./\nRUN chown -R app:app /srv/app\nUSER app\nEXPOSE 5000\nHEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 CMD python -c \"import urllib.request; urllib.request.urlopen('http://127.0.0.1:5000/health', timeout=2)\"\nCMD [\"gunicorn\", \"--workers=2\", \"--threads=4\", \"--bind=0.0.0.0:5000\", \"--access-logfile=-\", \"--error-logfile=-\", \"app:app\"]\n\n# .dockerignore\n.git\n.venv\n__pycache__/\n.pytest_cache/\n*.pyc\n.env\ntests/\nJenkinsfile",
      },
      {
        heading: "Deployment script: blue/green loopback switch",
        paragraphs: ["Stopping a container and starting its replacement on the same port creates a request gap. This script starts the new image on the inactive loopback port, verifies its health, updates an Nginx include atomically, reloads Nginx, and only then removes the old container. Retain the previous immutable image tag in the `previous` file for rollback."],
        code: "#!/usr/bin/env bash\n# deploy/deploy.sh\nset -euo pipefail\nIMAGE_URI=${1:?image URI required}\nAPP_DIR=/opt/flask-production\nACTIVE_FILE=$APP_DIR/active-port\nPREVIOUS_FILE=$APP_DIR/previous-image\nCURRENT_PORT=$(cat \"$ACTIVE_FILE\" 2>/dev/null || echo 5001)\nif [ \"$CURRENT_PORT\" = 5000 ]; then NEXT_PORT=5001; else NEXT_PORT=5000; fi\nNEW_NAME=flask-$NEXT_PORT\nOLD_NAME=flask-$CURRENT_PORT\n\nsudo mkdir -p \"$APP_DIR\" /etc/nginx/conf.d\necho \"$IMAGE_URI\" | sudo tee \"$PREVIOUS_FILE\".candidate > /dev/null\nsudo docker pull \"$IMAGE_URI\"\nsudo docker rm -f \"$NEW_NAME\" 2>/dev/null || true\nsudo docker run -d --name \"$NEW_NAME\" --restart unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,size=64m -p 127.0.0.1:$NEXT_PORT:5000 \"$IMAGE_URI\"\nfor attempt in $(seq 1 20); do\n  if curl --fail --silent --max-time 2 \"http://127.0.0.1:$NEXT_PORT/health\" >/dev/null; then break; fi\n  sleep 2\n  [ \"$attempt\" = 20 ] && { sudo docker logs \"$NEW_NAME\"; sudo docker rm -f \"$NEW_NAME\"; exit 1; }\ndone\nCURRENT_IMAGE=$(sudo docker inspect -f '{{.Config.Image}}' \"$OLD_NAME\" 2>/dev/null || true)\n[ -n \"$CURRENT_IMAGE\" ] && echo \"$CURRENT_IMAGE\" | sudo tee \"$PREVIOUS_FILE\" > /dev/null\nprintf 'server 127.0.0.1:%s;\\n' \"$NEXT_PORT\" | sudo tee /etc/nginx/conf.d/flask-upstream.conf.new > /dev/null\nsudo mv /etc/nginx/conf.d/flask-upstream.conf.new /etc/nginx/conf.d/flask-upstream.conf\nsudo nginx -t && sudo systemctl reload nginx\necho \"$NEXT_PORT\" | sudo tee \"$ACTIVE_FILE\" > /dev/null\nsudo docker rm -f \"$OLD_NAME\" 2>/dev/null || true\nsudo docker image prune -f",
      },
      {
        heading: "Declarative Jenkins pipeline",
        paragraphs: ["This pipeline expects the Jenkins controller to have its ECR instance profile and an SSH private-key credential named `flask-production-ssh`. It publishes both the Jenkins build number and the commit SHA, then deploys the SHA tag. The production host needs only ECR pull permission and the deployment script installed at `/opt/flask-production/deploy.sh`."],
        code: "pipeline {\n  agent any\n  options { timestamps(); disableConcurrentBuilds(); buildDiscarder(logRotator(numToKeepStr: '30')) }\n  environment {\n    AWS_REGION = 'ap-south-1'\n    ECR_REPOSITORY = 'flask-production'\n    AWS_ACCOUNT_ID = '123456789012'\n    ECR_REGISTRY = \"${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com\"\n    PRODUCTION_HOST = 'app.example.com'\n  }\n  stages {\n    stage('Checkout') { steps { checkout scm; script { env.GIT_SHA = sh(script: 'git rev-parse --short=12 HEAD', returnStdout: true).trim() } } }\n    stage('Lint & Test') { steps { sh '''python3 -m venv .venv\n. .venv/bin/activate\npip install --upgrade pip\npip install -r requirements.txt\nblack --check app tests app.py\nflake8 app tests app.py\npytest -q --junitxml=reports/junit.xml''' }; junit 'reports/junit.xml' } }\n    stage('ECR Login & Docker Build') { steps { sh '''aws ecr get-login-password --region \"$AWS_REGION\" | docker login --username AWS --password-stdin \"$ECR_REGISTRY\"\ndocker build --pull -t \"$ECR_REGISTRY/$ECR_REPOSITORY:$BUILD_NUMBER\" .\ndocker tag \"$ECR_REGISTRY/$ECR_REPOSITORY:$BUILD_NUMBER\" \"$ECR_REGISTRY/$ECR_REPOSITORY:$GIT_SHA\"''' } }\n    stage('Push to ECR') { steps { sh '''docker push \"$ECR_REGISTRY/$ECR_REPOSITORY:$BUILD_NUMBER\"\ndocker push \"$ECR_REGISTRY/$ECR_REPOSITORY:$GIT_SHA\"''' } }\n    stage('Deploy to Production EC2') { steps { sshagent(credentials: ['flask-production-ssh']) { sh '''ssh -o StrictHostKeyChecking=yes ubuntu@\"$PRODUCTION_HOST\" \"aws ecr get-login-password --region $AWS_REGION | sudo docker login --username AWS --password-stdin $ECR_REGISTRY && sudo /opt/flask-production/deploy.sh $ECR_REGISTRY/$ECR_REPOSITORY:$GIT_SHA\"''' } } }\n    stage('Health Check Verification') { steps { sh 'curl --fail --retry 6 --retry-delay 3 --connect-timeout 3 https://$PRODUCTION_HOST/health' } }\n  }\n  post {\n    failure { emailext subject: \"FAILED: ${JOB_NAME} #${BUILD_NUMBER}\", body: \"${BUILD_URL}\", to: 'platform-alerts@example.com' }\n    always { cleanWs(deleteDirs: true, notFailBuild: true) }\n  }\n}",
      },
      {
        heading: "Nginx reverse proxy and TLS",
        paragraphs: ["Install this configuration on the production host. Nginx accepts public traffic while Flask remains reachable only from localhost. Before issuing a certificate, ensure the DNS A record resolves to the host and port 80 is publicly reachable."],
        code: "# /etc/nginx/conf.d/flask-upstream.conf\nserver 127.0.0.1:5000;\n\n# /etc/nginx/sites-available/flask\nupstream flask_app { include /etc/nginx/conf.d/flask-upstream.conf; keepalive 16; }\nserver {\n  listen 80;\n  server_name app.example.com;\n  client_max_body_size 10m;\n  location / {\n    proxy_pass http://flask_app;\n    proxy_http_version 1.1;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    proxy_set_header X-Forwarded-Proto $scheme;\n    proxy_connect_timeout 5s;\n    proxy_read_timeout 30s;\n  }\n}\n\nsudo ln -sfn /etc/nginx/sites-available/flask /etc/nginx/sites-enabled/flask\nsudo rm -f /etc/nginx/sites-enabled/default\nsudo nginx -t && sudo systemctl reload nginx\nsudo apt-get update && sudo apt-get install -y certbot python3-certbot-nginx\nsudo certbot --nginx -d app.example.com --redirect --agree-tos -m ops@example.com --no-eff-email\nsudo systemctl status certbot.timer",
      },
      {
        heading: "Verification, rollback and troubleshooting",
        paragraphs: ["Validate the public route after every deployment and keep Jenkins console logs with the build record. A health endpoint returning 200 only proves process availability; add application-specific smoke checks for critical user workflows before treating a release as complete."],
        bullets: [
          "Verify the active route: `curl -fsS https://app.example.com/health` and `curl -fsS https://app.example.com/api/v1/data`.",
          "Inspect the running release: `sudo docker ps`, `sudo docker logs --tail 200 flask-5000`, and `sudo nginx -T`.",
          "If Jenkins reports Docker permission denied, run `sudo usermod -aG docker jenkins`, restart Jenkins, and verify with `sudo -u jenkins docker ps`. Do not make the Docker socket world-writable.",
          "If a GitHub webhook returns 403, verify the exact `/github-webhook/` path, proxy forwarding, GitHub delivery response, job trigger configuration and webhook secret validation.",
          "If ECR login fails later in a long-lived host session, re-run `aws ecr get-login-password`; ECR authorization tokens expire after 12 hours.",
        ],
        code: "# Roll back to the last known image after a failed release\nPREVIOUS=$(sudo cat /opt/flask-production/previous-image)\n[ -n \"$PREVIOUS\" ] || { echo 'No previous image recorded'; exit 1; }\nsudo /opt/flask-production/deploy.sh \"$PREVIOUS\"\ncurl --fail --silent https://app.example.com/health\n\n# Verify Jenkins and production state\nsystemctl status jenkins --no-pager\nsudo journalctl -u jenkins -n 100 --no-pager\nsudo docker ps --format 'table {{.Names}}\\t{{.Image}}\\t{{.Status}}'\nsudo docker logs --tail 200 flask-5000\nsudo docker logs --tail 200 flask-5001",
      },
    ],
  },
  {
    slug: "mern-eks",
    title: "Deploying a Containerized MERN Application to Amazon EKS",
    category: "Kubernetes",
    description:
      "A practical path for moving a containerized MERN service from source control to Amazon ECR, EKS, ingress and observable production operations.",
    publishedAt: "2026-09-06",
    tags: ["Kubernetes", "AWS", "EKS", "Docker", "MERN"],
    sections: [
      {
        heading: "The delivery path",
        paragraphs: [
          "A MERN application is more than a React build and an Express API. In a production deployment, the image supply chain, database boundary, network entry point, service identity, rollout behaviour and observability are all part of the application. EKS is useful when those concerns need a consistent operating model across services, but it introduces a platform that must be deliberately managed.",
          "This walkthrough uses separate frontend and API images, Amazon ECR as the private registry, EKS for orchestration, a Kubernetes ClusterIP service behind ingress, and managed MongoDB rather than running a stateful database as an early cluster exercise. It is a reference architecture, not a claim that every MERN workload requires Kubernetes.",
        ],
        code: "GitHub change\n   │\n   ▼\nCI: test → build immutable images → scan → push\n   │                                      │\n   ▼                                      ▼\nHelm values with image SHA              Amazon ECR\n   │                                      │\n   └──────────────► Amazon EKS ◄─────────┘\n                       │\n        ┌──────────────┼──────────────┐\n        ▼              ▼              ▼\n   Ingress/ALB   React frontend   Express API\n                                      │\n                                      ▼\n                           MongoDB Atlas / managed database",
      },
      {
        heading: "Repository boundaries",
        paragraphs: ["Keep deployment code beside the application, but keep runtime secrets outside the repository. This layout allows a code review to inspect an application change and the manifest that deploys it together."],
        code: "mern-eks/\n├── client/                 # React application\n│   ├── src/\n│   └── Dockerfile\n├── server/                 # Express API\n│   ├── src/\n│   ├── tests/\n│   └── Dockerfile\n├── helm/mern/\n│   ├── Chart.yaml\n│   ├── values.yaml\n│   └── templates/\n│       ├── api-deployment.yaml\n│       ├── api-service.yaml\n│       ├── frontend-deployment.yaml\n│       ├── frontend-service.yaml\n│       ├── ingress.yaml\n│       └── serviceaccount.yaml\n├── scripts/\n│   ├── build-and-push.sh\n│   └── verify.sh\n└── Jenkinsfile",
      },
      {
        heading: "Create the ECR repositories and EKS access context",
        paragraphs: ["Create a dedicated repository per deployable image. Give the CI identity ECR push permissions and the EKS deployment identity only the Kubernetes access it requires. Do not use a long-lived administrator key in CI; use an IAM role or workload identity with a short session."],
        code: "export AWS_REGION=ap-south-1\nexport CLUSTER_NAME=platform-eks\nexport AWS_ACCOUNT_ID=123456789012\nexport FRONTEND_REPO=mern-frontend\nexport API_REPO=mern-api\n\naws ecr create-repository --repository-name \"$FRONTEND_REPO\" --image-scanning-configuration scanOnPush=true --image-tag-mutability IMMUTABLE --region \"$AWS_REGION\"\naws ecr create-repository --repository-name \"$API_REPO\" --image-scanning-configuration scanOnPush=true --image-tag-mutability IMMUTABLE --region \"$AWS_REGION\"\n\naws eks update-kubeconfig --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"\nkubectl create namespace mern-production\nkubectl get nodes -o wide\nkubectl auth can-i create deployments -n mern-production",
      },
      {
        heading: "Build, tag and push immutable images",
        paragraphs: ["Use a commit SHA as the deployment input. A mutable `latest` tag makes it harder to identify the code actually running and makes rollback ambiguous. The script below creates both a human-readable build tag and a commit tag, then Helm deploys the commit tag."],
        code: "#!/usr/bin/env bash\n# scripts/build-and-push.sh\nset -euo pipefail\n: \"${AWS_REGION:=ap-south-1}\"\n: \"${AWS_ACCOUNT_ID:?set AWS_ACCOUNT_ID}\"\nGIT_SHA=$(git rev-parse --short=12 HEAD)\nREGISTRY=\"${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com\"\n\naws ecr get-login-password --region \"$AWS_REGION\" | docker login --username AWS --password-stdin \"$REGISTRY\"\nfor spec in \"frontend:client\" \"api:server\"; do\n  component=${spec%%:*}\n  directory=${spec##*:}\n  image=\"$REGISTRY/mern-$component:$GIT_SHA\"\n  docker build --pull --tag \"$image\" \"./$directory\"\n  docker push \"$image\"\ndone\nprintf '%s\\n' \"$GIT_SHA\"",
      },
      {
        heading: "Container hardening for the API",
        paragraphs: ["Use a multi-stage build, run Node as a non-root user, and make the process fail quickly on unhandled promise rejections. Add a health endpoint that verifies process availability without exposing configuration or secrets."],
        code: "# server/Dockerfile\nFROM node:22-alpine AS dependencies\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\n\nFROM node:22-alpine\nENV NODE_ENV=production\nWORKDIR /app\nCOPY --from=dependencies /app/node_modules ./node_modules\nCOPY --chown=node:node package*.json ./\nCOPY --chown=node:node src ./src\nUSER node\nEXPOSE 3000\nHEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 CMD node -e \"fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\"\nCMD [\"node\", \"--unhandled-rejections=strict\", \"src/index.js\"]\n\n// server/src/index.js\nimport express from 'express';\nconst app = express();\napp.use(express.json());\napp.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));\napp.get('/api/v1/status', (_req, res) => res.json({ service: 'api', status: 'ready' }));\napp.listen(process.env.PORT || 3000, '0.0.0.0');",
      },
      {
        heading: "Helm values: make runtime configuration explicit",
        paragraphs: ["Keep public, non-secret configuration in values files. Reference secrets by name rather than placing credentials in Helm values or command history. A separate values file per environment lets the chart remain predictable while deployment inputs differ."],
        code: "# helm/mern/values.yaml\nnamespace: mern-production\nimage:\n  registry: 123456789012.dkr.ecr.ap-south-1.amazonaws.com\n  tag: replace-at-deploy\nfrontend:\n  repository: mern-frontend\n  replicas: 2\n  containerPort: 80\napi:\n  repository: mern-api\n  replicas: 2\n  containerPort: 3000\n  serviceAccountName: mern-api\n  existingSecret: mern-api-runtime\n  resources:\n    requests: { cpu: 100m, memory: 128Mi }\n    limits: { cpu: 500m, memory: 512Mi }\ningress:\n  className: alb\n  host: app.example.com",
      },
      {
        heading: "Deployment, service and health probes",
        paragraphs: ["A rolling update needs more than replicas. Readiness prevents traffic reaching a container before the API is ready, while liveness lets Kubernetes restart a stuck process. Set realistic resource requests and limits from measurements, then use Horizontal Pod Autoscaler only after metrics-server and baseline capacity are in place."],
        code: "# helm/mern/templates/api-deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata: { name: mern-api, namespace: {{ .Values.namespace }} }\nspec:\n  replicas: {{ .Values.api.replicas }}\n  strategy: { type: RollingUpdate, rollingUpdate: { maxUnavailable: 0, maxSurge: 1 } }\n  selector: { matchLabels: { app: mern-api } }\n  template:\n    metadata: { labels: { app: mern-api } }\n    spec:\n      serviceAccountName: {{ .Values.api.serviceAccountName }}\n      securityContext: { runAsNonRoot: true }\n      containers:\n        - name: api\n          image: \"{{ .Values.image.registry }}/{{ .Values.api.repository }}:{{ .Values.image.tag }}\"\n          ports: [{ containerPort: 3000, name: http }]\n          envFrom: [{ secretRef: { name: {{ .Values.api.existingSecret }} } }]\n          resources: {{- toYaml .Values.api.resources | nindent 12 }}\n          readinessProbe: { httpGet: { path: /health, port: http }, initialDelaySeconds: 5, periodSeconds: 10 }\n          livenessProbe: { httpGet: { path: /health, port: http }, initialDelaySeconds: 20, periodSeconds: 20 }\n          securityContext: { allowPrivilegeEscalation: false, readOnlyRootFilesystem: true, capabilities: { drop: [\"ALL\"] } }\n---\napiVersion: v1\nkind: Service\nmetadata: { name: mern-api, namespace: {{ .Values.namespace }} }\nspec:\n  type: ClusterIP\n  selector: { app: mern-api }\n  ports: [{ name: http, port: 80, targetPort: http }]",
      },
      {
        heading: "Ingress and AWS identity for workloads",
        paragraphs: ["Expose services through an ingress controller rather than giving every service a public load balancer. The AWS Load Balancer Controller requires its own properly scoped IAM role. For application-level AWS access such as S3 uploads, map a specific Kubernetes service account to a specific IAM role using IRSA (or EKS Pod Identity); do not rely on the node role or bake keys into an image."],
        code: "# helm/mern/templates/ingress.yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: mern\n  namespace: {{ .Values.namespace }}\n  annotations:\n    alb.ingress.kubernetes.io/scheme: internet-facing\n    alb.ingress.kubernetes.io/target-type: ip\n    alb.ingress.kubernetes.io/listen-ports: '[{\"HTTP\":80},{\"HTTPS\":443}]'\n    alb.ingress.kubernetes.io/ssl-redirect: '443'\nspec:\n  ingressClassName: {{ .Values.ingress.className }}\n  rules:\n    - host: {{ .Values.ingress.host }}\n      http:\n        paths:\n          - path: /api\n            pathType: Prefix\n            backend: { service: { name: mern-api, port: { number: 80 } } }\n          - path: /\n            pathType: Prefix\n            backend: { service: { name: mern-frontend, port: { number: 80 } } }\n\n# Create an API service account with a pre-created least-privilege IAM policy\neksctl create iamserviceaccount --cluster \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --namespace mern-production --name mern-api --attach-policy-arn arn:aws:iam::123456789012:policy/MernApiS3Uploads --approve --override-existing-serviceaccounts",
      },
      {
        heading: "Deploy and verify the release",
        paragraphs: ["Use `--atomic` and `--wait` so Helm reverts the release automatically if Kubernetes cannot make the new version ready before the timeout. This protects the deployment operation, but it does not replace API smoke tests or monitoring after traffic begins flowing."],
        code: "export IMAGE_TAG=$(git rev-parse --short=12 HEAD)\nhelm upgrade --install mern ./helm/mern --namespace mern-production --create-namespace --set image.tag=\"$IMAGE_TAG\" --atomic --wait --timeout 10m\n\nkubectl rollout status deployment/mern-api -n mern-production --timeout=5m\nkubectl get pods,svc,ingress -n mern-production\nkubectl describe ingress mern -n mern-production\nALB_DNS=$(kubectl get ingress mern -n mern-production -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')\ncurl --fail --silent \"https://$ALB_DNS/api/v1/status\"\n\n# Review the previous revision and roll back deliberately if needed\nhelm history mern -n mern-production\nhelm rollback mern 1 -n mern-production --wait --timeout 10m",
      },
      {
        heading: "Operational checklist and common failure modes",
        bullets: [
          "Confirm every running Pod uses the intended immutable image: `kubectl get pods -n mern-production -o jsonpath='{..image}'`.",
          "If an image cannot be pulled, verify the image tag exists in ECR, node or pod ECR permissions, and that private subnets can reach ECR through NAT or VPC endpoints.",
          "If Pods are Pending, inspect `kubectl describe pod`; common causes are a request larger than available node capacity, a missing PVC, a taint, or an unsatisfied affinity rule.",
          "If ingress has no address, inspect the AWS Load Balancer Controller logs and its IAM policy, subnets and ingress annotations.",
          "Do not log MongoDB connection strings, JWT secrets or AWS credentials. Store runtime secrets in a secrets manager and synchronize or inject them through a controlled mechanism.",
          "Monitor API latency, error rate, restart count, HPA behaviour, node pressure and ALB target health. An EKS deployment is healthy only when both Kubernetes and the user-facing path are healthy.",
        ],
      },
    ],
  },
  githubActionsPost,
];
