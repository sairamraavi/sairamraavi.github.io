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
      "A practical progression from enterprise applications toward cloud and platform engineering.",
    publishedAt: "2026-07-22",
    tags: ["DevOps", "Career"],
    draft: true,
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
