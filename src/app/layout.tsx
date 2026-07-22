import type { Metadata } from "next";
import "./globals.css";
import "./blog.css";
import "./ui.css";
export const metadata: Metadata = { metadataBase: new URL("https://sairamraavi.github.io"), title: "Sairam Raavi | Senior Full-Stack Engineer", description: "Portfolio of Sairam Raavi, a Senior Software Engineer in Hyderabad with 7+ years of experience in Drupal, PHP, Angular, JavaScript, .NET, AWS, Docker, Jenkins and Kubernetes.", alternates:{canonical:"/"}, openGraph:{type:"website",url:"/",title:"Sairam Raavi | Senior Full-Stack Engineer",images:["/images/og/sairam-portfolio-og.png"]}, twitter:{card:"summary_large_image"} };
const themeScript = `try { const t = localStorage.getItem('theme'); document.documentElement.dataset.theme = t || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch {}`;
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}} /></head><body>{children}</body></html>; }
