"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";

const links = [
  ["Profile", "#about"],
  ["Work", "#projects"],
  ["Experience", "#experience"],
  ["Writing", "/blog/"],
  ["Contact", "#contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("#about");
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }),
      { rootMargin: "-42% 0px -52% 0px" },
    );
    links
      .filter(([, href]) => href.startsWith("#"))
      .forEach(([, href]) => {
        const section = document.querySelector(href);
        if (section) observer.observe(section);
      });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && open && menuRef.current) {
        const items = menuRef.current.querySelectorAll<HTMLAnchorElement>("a");
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  const toggle = () => {
    const isDark = !dark;
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  };

  const navLinks = (mobile = false) =>
    links.map(([name, href]) => (
      <a
        aria-current={href === active ? "page" : undefined}
        className={href === active ? "active" : ""}
        href={href}
        key={name}
        onClick={() => mobile && setOpen(false)}
      >
        {name}
      </a>
    ));

  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="Sairam Raavi home">
        <Image
          src="/brand/sr-logo.svg"
          alt=""
          width={42}
          height={36}
          priority
        />
        <span className="brand-name">Sairam Raavi</span>
      </a>
      <nav className="desktop" aria-label="Primary navigation">
        {navLinks()}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-button"
          aria-label="Toggle color theme"
          onClick={toggle}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a
          className="resume small"
          href="/resume/sairam-raavi-resume.pdf"
          download
        >
          Resume
        </a>
        <button
          className="menu icon-button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navLinks(true)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ContactIcons() {
  return (
    <div className="contact-icons">
      <a aria-label="GitHub" href={profile.github}>
        <Github size={19} />
      </a>
      <a aria-label="LinkedIn" href={profile.linkedin}>
        <Linkedin size={19} />
      </a>
      <a aria-label="Send an email" href={`mailto:${profile.email}`}>
        <Mail size={19} />
      </a>
    </div>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
