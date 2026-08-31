import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { QuickAnswer } from "./QuickAnswer";
import { AdSlot } from "./AdSlot";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textOf(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

const components = {
  QuickAnswer,
  AdSlot,
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={slugify(textOf(children))}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 id={slugify(textOf(children))}>{children}</h3>
  ),
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) => {
    if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  img: ({ src = "", alt = "", title }: { src?: string; alt?: string; title?: string }) => (
    <figure className="my-8">
      {/* Brand SVG illustration — eslint-disable-next-line @next/next/no-img-element */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl border border-sand bg-white"
      />
      {title && (
        <figcaption className="mt-2 text-center text-sm text-ink/50">{title}</figcaption>
      )}
    </figure>
  ),
};

export function MdxRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
