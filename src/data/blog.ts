export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
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
    title: "Building a Jenkins CI/CD Pipeline for Flask on AWS",
    category: "CI/CD",
    description:
      "Notes from a hands-on Jenkins, Flask and EC2 automation project.",
    publishedAt: "2026-07-22",
    tags: ["Jenkins", "AWS", "Flask"],
    draft: true,
  },
  {
    slug: "mern-eks",
    title: "Deploying a Containerized MERN Application to Amazon EKS",
    category: "Kubernetes",
    description:
      "A draft walkthrough of ECR, EKS, Helm, ingress and observability decisions.",
    publishedAt: "2026-07-22",
    tags: ["Kubernetes", "AWS", "Docker"],
    draft: true,
  },
];
