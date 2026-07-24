"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { ContactIcons } from "@/components/site";
import { profile } from "@/data/profile";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, _subject: "New portfolio enquiry", _template: "table", _captcha: "true" }) });
      if (!response.ok) throw new Error("Unable to send");
      form.reset();
      setMessage("Thanks — your message is on its way. I’ll reply directly to the email address you provided.");
      setStatus("success");
    } catch {
      setMessage("Something went wrong. Please email me directly instead.");
      setStatus("error");
    }
  }
  return <section id="contact" className="contact-section"><div className="contact-intro"><p className="eyebrow">10 / Contact</p><h2>Let’s make the next release easier.</h2><p>For senior full-stack and DevOps-focused opportunities, I’d be glad to connect.</p><div className="contact-details"><span><MapPin size={17} /> Hyderabad, India</span><a href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email}</a></div><ContactIcons /></div><div className="contact-card"><div className="contact-card-heading"><p className="eyebrow">Start a conversation</p><p>Share a little context and I’ll get back to you by email.</p></div><form onSubmit={submit} noValidate><div className="form-row"><label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label><label>Email<input required name="email" type="email" autoComplete="email" placeholder="you@company.com" /></label></div><label>Subject<input required name="subject" placeholder="What would you like to discuss?" /></label><label>Message<textarea required name="message" rows={6} placeholder="A little about the role, project or idea…" /></label><input className="honeypot" tabIndex={-1} autoComplete="off" name="_honey" aria-hidden="true" /><button className="button primary" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight size={17} /></button>{status !== "idle" && <p className={`form-status ${status}`} role="status">{status === "success" && <CheckCircle2 size={17} />}{message}</p>}<small>By submitting, your message is sent securely to Sairam’s inbox. Please do not share sensitive information.</small></form></div></section>;
}
