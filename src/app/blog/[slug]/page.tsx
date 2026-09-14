import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogBrand } from "@/components/blog-brand";
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
    <main className="article-page">
      <header className="blog-nav">
        <BlogBrand />
        <nav aria-label="Blog navigation">
          <Link href="/">Portfolio</Link>
          <Link href="/blog/">All writing</Link>
        </nav>
      </header>
      <article className="article-shell">
        <header className="article-hero">
          <p className="eyebrow">
            {post.category} <span aria-hidden="true">/</span>{" "}
            {post.draft ? "Draft" : "Published"}
          </p>
          <h1>{post.title}</h1>
          <p className="lede">{post.description}</p>
          <div className="article-meta">
            <span>{post.publishedAt}</span>
            <span>{post.tags.join(" · ")}</span>
          </div>
        </header>
        <div className="article-body">
          {post.draft ? (
            <section>
              <h2>Draft in progress</h2>
              <p>
                This article is being prepared from hands-on project notes. It
                will be published with implementation details, architectural
                context and lessons learned once it is ready for review.
              </p>
            </section>
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
                {section.table && (
                  <div className="article-table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell, index) => (
                              <td key={`${cell}-${index}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.code && (
                  <pre>
                    <code>{section.code}</code>
                  </pre>
                )}
              </section>
            ))
          )}
          <Link className="article-back" href="/blog/">
            ← Back to all articles
          </Link>
        </div>
      </article>
    </main>
  );
}
