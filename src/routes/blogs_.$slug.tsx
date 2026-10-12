import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Clock, 
  Calendar, 
  ChevronRight, 
  ArrowLeft, 
  ArrowUpRight, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  HelpCircle, 
  BookOpen, 
  Tag, 
  Twitter, 
  Linkedin, 
  Copy, 
  Check,
  TrendingUp,
  Flame,
  Bookmark
} from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "../data/blogsData";
import founderImage from "../assets/founder.png";

export const Route = createFileRoute("/blogs_/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return {
        meta: [{ title: "Blog Article Not Found | AutoDigiX" }],
      };
    }
    const post = loaderData.post;
    const postUrl = `https://autodigix.in/blogs/${post.slug}`;
    const imageUrl = `https://autodigix.in${post.bannerImage}`;

    return {
      meta: [
        { title: post.seoTitle },
        { name: "description", content: post.metaDescription },
        { name: "keywords", content: post.tags.join(", ") + ", AutoDigiX blog" },
        { property: "og:title", content: post.seoTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:url", content: postUrl },
        { property: "og:image", content: imageUrl },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.isoDate },
        { property: "article:section", content: post.category },
        { property: "article:tag", content: post.tags.join(",") },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.seoTitle },
        { name: "twitter:description", content: post.metaDescription },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: postUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            author: {
              "@type": "Organization",
              name: post.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: "AutoDigiX",
              url: "https://www.autodigix.com/",
              logo: "https://autodigix.in/logo.png",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": postUrl,
            },
            image: imageUrl,
            datePublished: post.isoDate,
            dateModified: post.isoDate,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://autodigix.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://autodigix.in/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: postUrl,
              },
            ],
          }),
        },
        ...(post.content.faqs && post.content.faqs.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.content.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>("");

  // Reading progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Related & Recent Articles
  const relatedPosts = useMemo(() => {
    return BLOG_POSTS.filter(
      (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    ).slice(0, 3);
  }, [post]);

  const recentPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${post.title} via @AutoDigiX`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="bg-[var(--beige)] min-h-screen">
      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-gold-soft to-emerald-500 z-50 origin-left"
      />

      {/* Main Container */}
      <article className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--ink-soft)]/70 mb-6">
          <Link to="/" className="hover:text-[var(--ink)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/blogs" className="hover:text-[var(--ink)] transition-colors">
            Blogs & Insights
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[var(--ink)] font-semibold truncate max-w-[240px] sm:max-w-md">
            {post.category}
          </span>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--ink)] text-[var(--beige-light)]">
              {post.category}
            </span>
            <span className="text-xs text-[var(--ink-soft)]/75 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" /> {post.readTime}
            </span>
            <span className="text-xs text-[var(--ink-soft)]/75 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" /> {post.date}
            </span>
            {post.stats && (
              <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                {post.stats}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--ink)] font-light leading-[1.12] tracking-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed font-light">
            {post.excerpt}
          </p>

          {/* Author info & Quick share */}
          <div className="pt-4 pb-2 border-y border-[var(--ink)]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[var(--ink)]/10 overflow-hidden border border-[var(--ink)]/10 flex-shrink-0">
                <img
                  src={post.author.avatar || founderImage}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--ink)]">{post.author.name}</div>
                <div className="text-xs text-[var(--ink-soft)]/70">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareTwitter}
                className="p-2 rounded-full bg-[var(--beige-light)] border border-[var(--ink)]/10 text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--ink)]/30 transition-all shadow-sm"
                title="Share on X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareLinkedIn}
                className="p-2 rounded-full bg-[var(--beige-light)] border border-[var(--ink)]/10 text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--ink)]/30 transition-all shadow-sm"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--beige-light)] border border-[var(--ink)]/10 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--ink)]/30 transition-all shadow-sm"
                title="Copy article link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="my-8 md:my-12 rounded-3xl overflow-hidden border border-[var(--ink)]/10 shadow-soft bg-black/5 aspect-[16/9] max-h-[580px] w-full">
          <img
            src={post.bannerImage}
            alt={post.bannerAlt || post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Two-Column Content Layout (Content + Sticky Sidebar) */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview / Introduction */}
            <div className="p-6 md:p-8 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft space-y-4 text-base md:text-lg text-[var(--ink)] font-light leading-relaxed">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Executive Summary</span>
              </div>
              {post.content.overview.map((para, pIdx) => (
                <p key={pIdx}>
                  {pIdx === 0 ? (
                    <>
                      Search is evolving rapidly in 2026. AI-powered search, voice search, and changing customer behaviour are transforming how people discover businesses online. However, Search Engine Optimization (SEO) remains an important part of{" "}
                      <Link to="/services" className="text-gold font-semibold underline hover:text-[var(--ink)]">
                        digital marketing
                      </Link>
                      .
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>

            {/* Strategic Key Takeaways */}
            <div className="p-6 md:p-8 rounded-3xl bg-[var(--ink)]/5 border border-[var(--ink)]/10 space-y-4">
              <h2 className="font-display text-xl md:text-2xl text-[var(--ink)] font-medium flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" /> Key Strategic Takeaways
              </h2>
              <ul className="space-y-3">
                {post.content.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3 text-sm md:text-base text-[var(--ink)]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-depth Sections */}
            {post.content.sections.map((section, sIdx) => (
              <div key={sIdx} id={`section-${sIdx}`} className="space-y-4 pt-2">
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light leading-snug">
                  {section.heading}
                </h2>

                {section.heading === "The Importance of Local SEO" ? (
                  <>
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                      Local SEO helps businesses become more visible when customers search for products or services in a specific location.
                    </p>
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                      For businesses targeting Hyderabad, local SEO can help attract relevant enquiries and improve local visibility. Important activities include:
                    </p>
                    {section.bullets && (
                      <ul className="space-y-2.5 my-3 pl-2">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-sm md:text-base text-[var(--ink-soft)]">
                            <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed pt-2">
                      For example, a{" "}
                      <Link to="/services" className="text-gold font-medium underline hover:text-[var(--ink)]">
                        digital marketing agency
                      </Link>{" "}
                      serving Hyderabad can create a service page explaining its{" "}
                      <Link to="/services" search={{ service: "seo-optimization" } as any} className="text-gold font-medium underline hover:text-[var(--ink)]">
                        SEO services
                      </Link>{" "}
                      and how they help local businesses. Location keywords should be used naturally rather than repeated excessively.
                    </p>
                  </>
                ) : section.heading === "Content Marketing and Search Intent" ? (
                  <>
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                      Effective SEO content answers the questions users actually have. For example, someone searching for “
                      <Link to="/services" search={{ service: "seo-optimization" } as any} className="text-gold font-medium underline hover:text-[var(--ink)]">
                        SEO services in Hyderabad
                      </Link>
                      ” may be comparing agencies, while someone searching for “what is SEO” may want basic information.
                    </p>
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                      Businesses can address these different needs through educational blogs,{" "}
                      <Link to="/services" className="text-gold font-medium underline hover:text-[var(--ink)]">
                        service pages
                      </Link>
                      , FAQs, and useful guides. Through high-impact{" "}
                      <Link to="/services" className="text-gold font-medium underline hover:text-[var(--ink)]">
                        content marketing
                      </Link>
                      , internal links between related blogs and service pages also help visitors discover relevant information and explore a business's offerings.
                    </p>
                  </>
                ) : section.heading === "Final Thoughts: Is SEO Still Worth It in 2026?" ? (
                  <>
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                      SEO is not disappearing; it is evolving. Businesses that combine helpful content, technical optimization, local SEO, and a positive website experience can strengthen their organic visibility over time.
                    </p>
                    <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                      SEO also works alongside social media marketing, paid advertising, and lead generation to support broader business goals.
                    </p>

                    {/* Step 3 Internal Links Box */}
                    <div className="my-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--ink)] to-[#152e59] text-[var(--beige-light)] space-y-3 shadow-md">
                      <h3 className="font-display text-xl md:text-2xl text-[var(--beige-light)] font-medium">
                        Scale Your Search Dominance with AutoDigiX
                      </h3>
                      <p className="text-sm md:text-base text-[var(--beige-light)]/85 leading-relaxed">
                        At AutoDigiX, we help businesses strengthen their online presence through{" "}
                        <Link to="/services" search={{ service: "seo-optimization" } as any} className="text-gold-soft font-semibold underline hover:text-white">
                          SEO services
                        </Link>
                        ,{" "}
                        <Link to="/services" className="text-gold-soft font-semibold underline hover:text-white">
                          digital marketing
                        </Link>
                        , social media marketing, and lead-generation strategies.
                      </p>
                      <div className="pt-3">
                        <p className="text-sm md:text-base text-[var(--beige-light)]/90">
                          Want to improve your business's online visibility? Visit{" "}
                          <a
                            href="https://www.autodigix.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold-soft font-bold underline hover:text-white inline-flex items-center gap-1.5"
                          >
                            AutoDigiX <ArrowUpRight className="w-4 h-4 inline" />
                          </a>{" "}
                          to explore our digital marketing solutions.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-2.5 my-3 pl-2">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-sm md:text-base text-[var(--ink-soft)]">
                            <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                {section.highlight && (
                  <div className="border-l-4 border-gold pl-5 py-3 my-5 italic text-sm md:text-base text-[var(--ink)] bg-[var(--beige-light)] rounded-r-2xl shadow-soft">
                    &ldquo;{section.highlight}&rdquo;
                  </div>
                )}
              </div>
            ))}

            {/* Strategic Checklist */}
            {post.content.actionChecklist && post.content.actionChecklist.length > 0 && (
              <div className="p-6 md:p-8 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft space-y-4">
                <h2 className="font-display text-xl md:text-2xl text-[var(--ink)] font-medium flex items-center gap-2">
                  <Target className="w-5 h-5 text-gold" /> Strategic Implementation Checklist
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {post.content.actionChecklist.map((task, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[var(--beige)] rounded-2xl border border-[var(--ink)]/5 text-xs sm:text-sm flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-[var(--ink)]">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions (FAQs) */}
            {post.content.faqs && post.content.faqs.length > 0 && (
              <div className="pt-8 border-t border-[var(--ink)]/10 space-y-5">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-6 h-6 text-gold" />
                  <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                    Frequently Asked Questions (FAQs)
                  </h2>
                </div>
                <div className="space-y-4">
                  {post.content.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-6 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft space-y-2"
                    >
                      <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--ink)]">
                        {fIdx + 1}. {faq.question}
                      </h3>
                      <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            <div className="p-6 md:p-8 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[var(--ink)]/10 overflow-hidden border border-[var(--ink)]/10 flex-shrink-0">
                <img
                  src={post.author.avatar || founderImage}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs uppercase tracking-widest text-gold font-semibold">About the Author</div>
                <h4 className="font-display text-xl text-[var(--ink)] font-medium">{post.author.name}</h4>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-xl">
                  {post.author.bio ||
                    "Growth and revenue engineering strategist at AutoDigiX, specializing in technical SEO, performance advertising, and revenue operations frameworks."}
                </p>
              </div>
            </div>

            {/* Social Share Footer */}
            <div className="pt-6 border-t border-[var(--ink)]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium">
                Share this intelligence
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareTwitter}
                  className="px-4 py-2 rounded-full bg-[var(--beige-light)] border border-[var(--ink)]/10 text-xs text-[var(--ink)] hover:border-gold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Twitter className="w-3.5 h-3.5 text-gold" /> X / Twitter
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="px-4 py-2 rounded-full bg-[var(--beige-light)] border border-[var(--ink)]/10 text-xs text-[var(--ink)] hover:border-gold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5 text-gold" /> LinkedIn
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-xs font-medium hover:bg-gold transition-colors flex items-center gap-2 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            {/* Table of Contents */}
            <div className="p-6 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft space-y-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold" />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-2 text-xs sm:text-sm">
                {post.content.sections.map((sec, sIdx) => (
                  <a
                    key={sIdx}
                    href={`#section-${sIdx}`}
                    className="block text-[var(--ink-soft)] hover:text-gold transition-colors py-1 border-b border-[var(--ink)]/5 last:border-b-0"
                  >
                    {sIdx + 1}. {sec.heading}
                  </a>
                ))}
                {post.content.faqs && post.content.faqs.length > 0 && (
                  <a
                    href="#faqs"
                    className="block text-[var(--ink-soft)] hover:text-gold transition-colors py-1"
                  >
                    {post.content.sections.length + 1}. Frequently Asked Questions
                  </a>
                )}
              </nav>
            </div>

            {/* Recent Articles (if available) or Key Topic Tags */}
            {recentPosts.length > 0 ? (
              <div className="p-6 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Recent Articles</span>
                </div>
                <div className="space-y-4">
                  {recentPosts.map((rPost) => (
                    <Link
                      key={rPost.id}
                      to="/blogs/$slug"
                      params={{ slug: rPost.slug }}
                      className="group block space-y-1.5 pb-3 border-b border-[var(--ink)]/5 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                        {rPost.category}
                      </span>
                      <h4 className="font-display text-sm text-[var(--ink)] font-normal group-hover:text-gold transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                      <span className="text-[11px] text-[var(--ink-soft)]/60 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold" /> {rPost.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-[var(--beige-light)] border border-[var(--ink)]/10 shadow-soft space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" />
                  <span>Core Topic Coverage</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--beige)] text-[var(--ink)] border border-[var(--ink)]/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* High-Converting Consultation Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--ink)] to-[#133777] text-[var(--beige-light)] space-y-4 shadow-soft">
              <div className="w-10 h-10 rounded-2xl bg-[var(--beige-light)]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold-soft" />
              </div>
              <h3 className="font-display text-xl text-[var(--beige-light)] font-light">
                Ready to dominate search in 2026?
              </h3>
              <p className="text-xs text-[var(--beige-light)]/75 leading-relaxed">
                Let AutoDigiX design, automate, and scale your organic pipeline with data-driven frameworks.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 rounded-full bg-[var(--beige-light)] text-[var(--ink)] text-xs font-semibold hover:bg-gold-soft hover:text-[var(--ink)] transition-colors flex items-center justify-center gap-2 shadow-soft"
              >
                <span>Book Free Discovery Call</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Similar / Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[var(--ink)]/10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-1">
                  ◆ Curated Reading
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] font-light">
                  Similar & Related Articles
                </h2>
              </div>
              <Link
                to="/blogs"
                className="text-xs font-semibold text-[var(--ink)] hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <span>View all insights</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.id}
                  to="/blogs/$slug"
                  params={{ slug: relPost.slug }}
                  className="group bg-[var(--beige-light)] rounded-3xl p-6 border border-[var(--ink)]/10 shadow-soft hover:shadow-gold hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--beige)] text-[var(--ink)] border border-[var(--ink)]/10">
                        {relPost.category}
                      </span>
                      <span className="text-xs text-[var(--ink-soft)]/60 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold" /> {relPost.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl text-[var(--ink)] font-light leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {relPost.title}
                    </h3>

                    <p className="text-xs text-[var(--ink-soft)]/80 leading-relaxed line-clamp-2">
                      {relPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--ink)]/5 mt-5 flex items-center justify-between text-xs">
                    <span className="text-[var(--ink-soft)]/70">{relPost.date}</span>
                    <span className="font-medium text-[var(--ink)] group-hover:text-gold transition-colors flex items-center gap-1">
                      Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
