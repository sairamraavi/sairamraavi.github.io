import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/blog";
export function generateStaticParams(){return posts.map(({slug})=>({slug}))}
export default async function Post({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=posts.find(p=>p.slug===slug);if(!post)return notFound();return <main className="blog-page article"><Link className="brand" href="/">SR<span>.</span></Link><p className="eyebrow">{post.category} · Draft</p><h1>{post.title}</h1><p className="lede">{post.description}</p><hr/><h2>Draft in progress</h2><p>This article is being prepared from hands-on project notes. It will be published with implementation details, architectural context and lessons learned once it is ready for review.</p><Link className="text-link" href="/blog/">← Back to all articles</Link></main>}
