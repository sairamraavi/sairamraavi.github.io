import Link from "next/link";
import { posts } from "@/data/blog";

export default function Blog() {
  return <main className="blog-page"><header className="blog-nav"><Link className="brand" href="/">SR<span>.</span></Link><nav aria-label="Blog navigation"><Link href="/">Portfolio</Link><Link href="/blog/">All writing</Link></nav></header><section className="blog-intro"><p className="eyebrow">Writing / Engineering notes</p><h1>Field notes for building and operating software.</h1><p className="lede">Practical systems notes, implementation choices and lessons from the move between full-stack delivery and cloud engineering.</p></section><div className="blog-list">{posts.map((post) => <article key={post.slug} className={post.draft ? "" : "published-post"}><p className="eyebrow">{post.category} · {post.draft ? "Draft" : "Published"}</p><h2>{post.title}</h2><p>{post.description}</p><div className="tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="text-link" href={`/blog/${post.slug}/`}>{post.draft ? "View draft preview" : "Read article"}</Link></article>)}</div></main>;
}
