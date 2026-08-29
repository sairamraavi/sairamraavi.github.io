import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return notFound();
  return (
    <main className="blog-page article">
      <Link className="brand" href="/">
        SR<span>.</span>
      </Link>
      <p className="eyebrow">
        {post.category} · {post.draft ? "Draft" : "Published"}
      </p>
      <h1>{post.title}</h1>
      <p className="lede">{post.description}</p>
      <div className="article-meta">
        <span>{post.publishedAt}</span>
        <span>{post.tags.join(" · ")}</span>
      </div>
      <hr />
      {post.draft ? (
        <>
          <h2>Draft in progress</h2>
          <p>
            This article is being prepared from hands-on project notes. It will
            be published with implementation details, architectural context and
            lessons learned once it is ready for review.
          </p>
        </>
      ) : (
        post.sections?.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.code && (
              <pre>
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))
      )}
      <Link className="text-link" href="/blog/">
        ← Back to all articles
      </Link>
    </main>
  );
}
