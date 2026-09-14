import Link from "next/link";
import { BlogBrand } from "@/components/blog-brand";
import { posts } from "@/data/blog";

export default function Blog() {
  return (
    <main className="blog-page">
      <header className="blog-nav">
        <BlogBrand />
        <nav aria-label="Blog navigation">
          <Link href="/">Portfolio</Link>
          <Link href="/blog/">All writing</Link>
        </nav>
      </header>
      <section className="blog-intro">
        <p className="eyebrow">Writing / Engineering</p>
        <h1>Engineering systems that ship.</h1>
        <p className="lede">
          Hands-on guides for building, deploying, and operating reliable
          software—from application code and CI/CD to cloud infrastructure and
          production operations.
        </p>
      </section>
      <div className="blog-list">
        {posts.map((post) => (
          <article key={post.slug} className={post.draft ? "" : "published-post"}>
            <p className="eyebrow">
              {post.category} · {post.draft ? "Draft" : "Published"}
            </p>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link className="text-link" href={`/blog/${post.slug}/`}>
              {post.draft ? "View draft preview" : "Read article"}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
