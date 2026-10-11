import type { Post } from "./blog";

export const agenticAiAwsPost: Post = {
  slug: "enterprise-agentic-ai-aws",
  title:
    "Architecting Enterprise Agentic AI Systems on AWS: Patterns, Tools, and Production Best Practices",
  category: "AWS Architecture",
  description:
    "A practical blueprint for building bounded, observable and secure multi-step AI systems on Amazon Bedrock, from memory and retrieval to tool execution and operational controls.",
  publishedAt: "2026-10-11",
  tags: [
    "AWS",
    "Amazon Bedrock",
    "Agentic AI",
    "Architecture",
    "MCP",
    "Cloud Operations",
  ],
  sections: [
    {
      heading: "From prompts and RAG to bounded agency",
      paragraphs: [
        "A single prompt transforms input into output. Retrieval-augmented generation (RAG) adds evidence by retrieving relevant information before the model responds. An agentic system goes further: it can plan a sequence, retrieve context, choose from approved tools, inspect the result and decide whether another bounded step is required. That capability is useful for work such as incident triage, service operations and policy-aware internal assistants, but it introduces a distributed-systems problem rather than just a model-invocation problem.",
        "Enterprise architecture should therefore treat an agent as an untrusted decision-making component inside a controlled execution system. The model may propose a plan; deterministic services enforce identity, data boundaries, tool authorization, idempotency, budgets and audit records. The goal is not unconstrained autonomy. It is a reliable, observable workflow that uses a model where probabilistic reasoning is valuable and conventional software where correctness must be guaranteed.",
      ],
      bullets: [
        "Bound every run with a maximum number of steps, token budget, deadline and allowed tool set.",
        "Separate reasoning from side effects: a model proposes an action, while a policy-enforcing service validates and executes it.",
        "Persist enough state to resume, investigate and reconcile a workflow without retaining sensitive prompts indefinitely.",
        "Design a human approval path for irreversible, high-value or high-risk actions.",
      ],
    },
    {
      heading: "Reference architecture: separate the reasoning, data and action planes",
      paragraphs: [
        "A useful production boundary has four planes. The application plane authenticates the user and owns the public API. The reasoning plane runs the agent loop with Amazon Bedrock models. The data plane provides isolated state, memory and grounded retrieval. The action plane exposes a small, policy-controlled collection of business capabilities. This separation lets each plane scale and receive permissions independently.",
        "Keep the agent entry point stateless. A request can arrive through an application API or Amazon API Gateway, carry an actor and tenant identity, then load scoped state from durable storage. That design permits retries and horizontal scaling without relying on process memory or a specific warm runtime.",
      ],
      code: "User or application\n  |  OIDC / JWT identity\nAPI Gateway or application API\n  |\nAgent entry point: Bedrock Agent or custom AgentCore Runtime\n  |-- policy, model routing and bounded orchestration\n  |-- memory and state: DynamoDB + S3 / AgentCore Memory\n  |-- retrieval: Bedrock Knowledge Bases -> OpenSearch vector index\n  |-- approved tools: AgentCore Gateway / MCP / API Gateway / Lambda\n  |-- telemetry: CloudWatch, OpenTelemetry traces, CloudTrail audit trail\n  |\nResponse with citations, action status and workflow ID",
    },
    {
      heading: "Choose the right Bedrock control plane",
      paragraphs: [
        "Amazon Bedrock provides access to foundation models and the surrounding managed capabilities. The architectural decision is how much of the orchestration you want AWS to manage versus how much behavior your own runtime needs to control. Do not choose an agent framework merely because the workload contains a chat box; start with the workflow, its side effects and its operating model.",
      ],
      table: {
        headers: ["Requirement", "Preferred pattern", "Why"],
        rows: [
          [
            "Managed task sequence with defined action groups",
            "Amazon Bedrock Agents",
            "Useful when managed orchestration, instructions, knowledge bases and action groups fit the workflow.",
          ],
          [
            "Custom, multi-agent or framework-specific runtime",
            "Amazon Bedrock AgentCore Runtime",
            "A composable managed runtime for deploying custom agents with adjacent capabilities such as gateway, memory, identity and observability.",
          ],
          [
            "Long-running deterministic business process",
            "AWS Step Functions with Lambda, ECS or worker services",
            "Provides explicit retries, compensation, approvals and state transitions; invoke a model only at the reasoning steps.",
          ],
          [
            "Short, simple enrichment or classification",
            "Lambda or service API invoking Bedrock directly",
            "Avoids introducing an agent loop when a single bounded model call is sufficient.",
          ],
        ],
      },
    },
    {
      heading: "Make the runtime stateless and the workflow contract explicit",
      paragraphs: [
        "A stateless runtime does not mean stateless behavior. It means the runtime can be replaced at any time because the authoritative workflow record lives outside the process. Pass a stable workflow ID and idempotency key through every model invocation and tool call. Store immutable events rather than only overwriting a final answer; this makes partial failure and later investigation tractable.",
        "Lambda is effective for a short, bounded orchestration step. For long-lived connections, streaming coordination or specialized libraries, use a containerized service or AgentCore Runtime. In every case, impose a deadline at the ingress, propagate it downstream and return a clear incomplete state instead of allowing unbounded retries.",
      ],
      code: "type AgentRequest = {\n  workflowId: string;\n  tenantId: string;\n  actorId: string;\n  sessionId: string;\n  idempotencyKey: string;\n  input: string;\n  limits: { maxSteps: number; maxTokens: number; deadlineEpochMs: number };\n};\n\n// Deterministic outer loop: load -> retrieve -> reason -> authorize -> act -> verify -> persist\n// Stop when the answer is grounded, an approved action succeeds, or a policy limit is reached.",
    },
    {
      heading: "State and memory: decide what is durable before choosing a store",
      paragraphs: [
        "Conversation history, durable preferences, business records and retrieval documents are different data classes. Combining them in one store creates unnecessary privacy risk and makes retention hard to reason about. AgentCore Memory can manage short-term conversational events and long-term memory strategies when it fits the runtime. Many enterprise systems also persist external state directly so ownership, retention and cross-service access are explicit.",
        "DynamoDB is well suited to small, frequently accessed workflow records, idempotency keys and session indexes. Use Amazon S3 for large artifacts such as uploaded documents, tool payloads and redacted trace bundles; persist the S3 URI and integrity metadata in DynamoDB. Encrypt both with KMS, scope access by tenant and apply lifecycle rules. Raw prompts and tool results should not become an uncontrolled permanent archive.",
      ],
      table: {
        headers: ["Data type", "Typical store", "Retention and control"],
        rows: [
          [
            "Short-term turn and workflow state",
            "DynamoDB or AgentCore short-term memory",
            "Session-scoped TTL, idempotency key, actor and tenant isolation.",
          ],
          [
            "Long-term preferences or summarized facts",
            "AgentCore long-term memory or DynamoDB",
            "Explicit consent, namespace boundaries, review and deletion path.",
          ],
          [
            "Large artifacts and redacted evidence",
            "Amazon S3",
            "KMS encryption, object prefixes per tenant, lifecycle policy and access logging.",
          ],
          [
            "Authoritative business data",
            "System of record",
            "Never treat model memory as the source of truth for transactions or permissions.",
          ],
        ],
      },
      code: "// DynamoDB item shape for a resumable workflow event\n{\n  PK: \"TENANT#t-42\",\n  SK: \"WORKFLOW#wf-8a9#EVENT#0007\",\n  actorId: \"user-123\",\n  eventType: \"TOOL_SUCCEEDED\",\n  payloadS3Uri: \"s3://agent-audit-redacted/t-42/wf-8a9/0007.json\",\n  expiresAt: 1791670400, // DynamoDB TTL epoch seconds\n  idempotencyKey: \"req-...\"\n}",
    },
    {
      heading: "Tool execution: the agent proposes, deterministic code authorizes",
      paragraphs: [
        "Treat each tool as a narrowly defined product API, not as a generic shell into enterprise systems. Amazon Bedrock Agents can use action groups backed by Lambda with an OpenAPI schema. A custom agent can call AWS Lambda directly through an adapter, or invoke private and public services through API Gateway. In every route, the tool endpoint must validate the caller and re-check authorization against the requested resource; it must not trust a model-generated identifier or text explanation.",
        "Tool schemas should use constrained parameters, clear descriptions and stable error codes. Read-only and mutating actions should have different permissions. Mutations require idempotency keys, input validation, an audit event and—where risk justifies it—an approval token generated outside the model loop.",
      ],
      code: "openapi: 3.0.3\ninfo: { title: Case service, version: \"1.0\" }\npaths:\n  /cases/{caseId}/summary:\n    get:\n      operationId: getCaseSummary\n      parameters:\n        - name: caseId\n          in: path\n          required: true\n          schema: { type: string, pattern: \"^[A-Z0-9-]{6,40}$\" }\n      responses:\n        \"200\": { description: Redacted case summary }\n        \"403\": { description: Caller is not permitted for this case }\n\n// Lambda adapter: derive tenant and actor from verified identity, not model input.\n// Validate case ownership, enforce field-level redaction, then emit an audit record.",
    },
    {
      heading: "Use MCP and gateways to simplify discovery, not to bypass trust boundaries",
      paragraphs: [
        "The Model Context Protocol (MCP) standardizes how an agent discovers and invokes tools. Amazon Bedrock AgentCore Gateway can expose a governed tool plane and connect to targets such as Lambda functions, API Gateway APIs, OpenAPI services and MCP servers. This is valuable when several agents need the same approved capabilities, but it does not remove the need for downstream authorization.",
        "Authenticate the inbound agent-to-gateway request with IAM SigV4 or OAuth/JWT as appropriate, then give the gateway and each target only the permissions it needs. Bind any OAuth state to the initiating user and workflow, protect redirect flows and expire them quickly. A tool target must independently validate tenant, subject and requested resource before acting.",
      ],
      bullets: [
        "Expose purpose-built operations such as getInvoiceStatus or createChangeRequest—not a broad database query tool.",
        "Use private API Gateway endpoints, VPC endpoints and resource policies for internal tools where network isolation is required.",
        "Pass correlation IDs and idempotency keys, but never let a client or model select an IAM role or tenant boundary.",
        "Version tool schemas and retain compatibility tests; a seemingly harmless schema change can alter agent behavior.",
      ],
    },
    {
      heading: "Ground answers with a Knowledge Base, not conversational memory",
      paragraphs: [
        "A Bedrock Knowledge Base is an evidence pipeline: source documents are ingested, chunked, embedded and indexed so the agent can retrieve context at question time. Amazon OpenSearch Serverless is a common vector-store option for this pattern. The retrieval result should include document identity, version and access metadata so the application can show citations and enforce document-level boundaries.",
        "Knowledge retrieval is not a substitute for authorization and is not long-term user memory. Store authoritative policies and curated technical documents in the knowledge corpus; store explicit, consented user preferences separately. Require metadata filters for tenant, audience, classification and document status before results reach the model. This avoids a shared index becoming an accidental cross-tenant search surface.",
      ],
      code: "// Retrieval policy constructed by trusted application code\nconst retrievalContext = {\n  knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,\n  numberOfResults: 8,\n  filter: {\n    andAll: [\n      { equals: { key: \"tenantId\", value: verifiedIdentity.tenantId } },\n      { equals: { key: \"classification\", value: \"internal\" } },\n      { equals: { key: \"status\", value: \"published\" } }\n    ]\n  }\n};\n\n// Return source IDs and snippets to the client; do not claim a source supports text it did not retrieve.",
    },
    {
      heading: "Cost optimization: route work to the smallest capable model",
      paragraphs: [
        "Agent cost compounds because a workflow can invoke models, retrieval and tools several times. A cost-conscious architecture classifies the task first, then uses the least expensive model that meets the quality target. For example, a fast model such as Claude Haiku can handle routing, extraction, summarization or tool-result normalization, while a more capable model such as Claude Sonnet can be reserved for complex synthesis, ambiguous planning or human-facing reasoning. Model availability, IDs and prices vary by Region and account, so make model choice configuration rather than code constants.",
        "Track the full workflow rather than only the final model call. Record input and output tokens, model identifier, retrieval result count, tool duration, retry count and outcome against a workflow, tenant and feature tag. Enforce ceilings before work begins and when a loop attempts another iteration.",
      ],
      table: {
        headers: ["Workload step", "Routing approach", "Cost guardrail"],
        rows: [
          ["Intent classification and extraction", "Fast, lower-cost model", "Small prompt, strict output schema and cacheable result."],
          ["Grounded answer synthesis", "Quality-selected model", "Limit retrieved context and cap output tokens."],
          ["Complex plan or ambiguous exception", "Higher-capability model", "Approval or escalation threshold; no automatic high-cost retry loop."],
          ["Repeated deterministic work", "Conventional code", "Do not use a model where a rules engine or API call is sufficient."],
        ],
      },
      code: "function selectModel(task: { complexity: \"low\" | \"high\"; risk: \"low\" | \"high\" }) {\n  if (task.risk === \"high\") return process.env.REASONING_MODEL;\n  return task.complexity === \"low\"\n    ? process.env.FAST_MODEL  // for example, a Haiku-class model\n    : process.env.REASONING_MODEL; // for example, a Sonnet-class model\n}\n\n// Reject or escalate once maxSteps, maxTokens, elapsed time or per-tenant budget is exceeded.",
    },
    {
      heading: "Observability: debug a trace, not a chat transcript",
      paragraphs: [
        "Production agent troubleshooting must follow a request across retrieval, model reasoning, tool calls and policy decisions. AgentCore can emit OpenTelemetry-compatible telemetry and integrates with Amazon CloudWatch for trace and operational visibility. Bedrock model invocation logging is a separate, deliberate control: it is disabled by default and may contain sensitive request or response data, so decide what content can be retained before enabling it.",
        "Return a workflow ID to the calling application. It gives operators a stable handle for support without requiring a user to share a full prompt. Log structured, redacted events and emit trace spans around the agent step, retrieval, policy gate and each tool invocation.",
      ],
      bullets: [
        "Start with the root workflow span and check deadline, step count, selected model and policy outcome.",
        "Inspect retrieval document IDs, metadata filters and scores before blaming a model for an unsupported answer.",
        "Inspect sanitized tool request and response metadata, including authorization decision and latency; never depend on unredacted payloads in routine logs.",
        "Compare token use, errors and elapsed time per step; route repeated failures to a dead-letter or investigation path instead of re-running indefinitely.",
        "Reproduce an issue in a lower environment using redacted fixtures and the same policy configuration, not a copied production transcript.",
      ],
      code: "fields @timestamp, workflowId, step, modelId, inputTokens, outputTokens, toolName, latencyMs, outcome\n| filter workflowId = \"wf-8a9\"\n| sort @timestamp asc\n| limit 200\n\n// CloudWatch Logs Insights: keep fields structured so an operator can reconstruct the path quickly.",
    },
    {
      heading: "Security and governance: use guardrails as one control, not the control",
      paragraphs: [
        "An enterprise agent needs multiple independent controls. Amazon Bedrock Guardrails can help apply content and topic policies, but a guardrail does not grant permission to read a record or execute a change. IAM roles, API authorization, encryption, data classification, network boundaries and human approval remain mandatory. Apply least privilege per component so a compromise in one plane does not automatically grant broad access to the others.",
        "Separate roles for the agent runtime, retriever, tool adapter and deployment pipeline. Use STS-backed temporary credentials, KMS keys scoped to the required data, AWS Secrets Manager for secrets and CloudTrail for management-plane audit. Keep production tool roles out of development environments and use an explicit break-glass process rather than embedding exceptional permissions in the normal path.",
      ],
      table: {
        headers: ["Component", "Permission boundary", "Key control"],
        rows: [
          ["Ingress API", "Verify user and tenant identity", "JWT/OIDC validation, throttling and request-size limits."],
          ["Agent runtime", "Invoke approved models and read scoped state", "Dedicated IAM role; no direct broad business-data access."],
          ["Tool adapter", "Perform a single business capability", "Resource-level IAM, input validation, authorization and idempotency."],
          ["Knowledge pipeline", "Read approved documents and query index", "KMS, metadata filters, source curation and lifecycle management."],
          ["Operations", "Observe and deploy", "Redacted logs, CloudTrail, separation of duties and protected environments."],
        ],
      },
    },
    {
      heading: "A production readiness checklist",
      bullets: [
        "Define success, failure, timeout, retry and compensation behavior for every tool before it is available to an agent.",
        "Run evaluation suites for groundedness, policy compliance, tool selection and adversarial prompt injection; version prompts, schemas and evaluation data.",
        "Require tenant-aware retrieval filters and authorization at both the gateway and business-system boundary.",
        "Set per-workflow, per-user and per-tenant ceilings for tokens, spend, concurrency and tool calls; alert on abnormal trends.",
        "Make mutations idempotent, auditable and reversible where possible. Put irreversible actions behind a human approval step.",
        "Test model, retrieval, tool and dependency failure independently. A helpful fallback is an honest partial response or a queued human handoff—not a fabricated answer.",
        "Confirm model access, service quotas, Regional availability and data-residency requirements before committing to a production Region.",
      ],
    },
    {
      heading: "End-to-end architectural blueprint",
      paragraphs: [
        "The durable pattern is simple: authenticate first, retrieve only authorized evidence, reason within explicit limits, authorize every side effect with deterministic software, then persist a redacted audit trail and verify the outcome. This gives teams the benefit of multi-step AI behavior while retaining the safety properties expected of an enterprise service.",
      ],
      code: "1. User calls the application API; identity is verified and a workflow ID is issued.\n2. Stateless agent runtime loads tenant-scoped session state from DynamoDB and artifacts from S3.\n3. Trusted code retrieves filtered evidence through Bedrock Knowledge Bases and the vector store.\n4. The model receives the task, permitted tools, evidence and hard execution limits.\n5. Proposed tool calls pass through Gateway/MCP or API Gateway to a policy-enforcing Lambda or service.\n6. The target service re-authorizes the caller, executes idempotently and emits an audit event.\n7. The runtime verifies the result, persists redacted state and returns an answer with citations and workflow status.\n8. CloudWatch traces, metrics and alarms expose quality, cost, latency and failures across the complete path.",
    },
  ],
};
