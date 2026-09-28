import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  Tag, 
  User, 
  X, 
  CheckCircle2, 
  Share2, 
  BookOpen, 
  TrendingUp, 
  Cpu, 
  Target, 
  Workflow, 
  ChevronRight,
  Mail
} from "lucide-react";
import { Reveal, RevealText } from "../components/Reveal";
import founderImage from "../assets/founder.png";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs & Growth Insights | AutoDigiX · AI & Performance Marketing" },
      {
        name: "description",
        content:
          "Explore tactical insights on AI automation, Google Ads, Meta Ads, SEO dominance, conversion rate optimization, and modern revenue operations from AutoDigiX.",
      },
      {
        name: "keywords",
        content:
          "digital marketing blog, AI automation insights, SEO guide 2026, Google ads ROI, Meta ads scaling, RevOps frameworks, Praveen Gorla blog",
      },
      { property: "og:title", content: "Blogs & Growth Insights · AutoDigiX" },
      {
        property: "og:description",
        content: "Battle-tested frameworks, AI automation guides, and performance marketing strategies.",
      },
      { property: "og:url", content: "https://autodigix.in/blogs" },
      { property: "og:type", content: "blog" },
    ],
    links: [{ rel: "canonical", href: "https://autodigix.in/blogs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "AutoDigiX Growth & AI Automation Blog",
          description:
            "Tactical articles, case studies, and engineering frameworks on AI automation, digital marketing, and revenue scaling.",
          url: "https://autodigix.in/blogs",
          publisher: {
            "@type": "Organization",
            name: "AutoDigiX",
            url: "https://autodigix.in",
            logo: "https://autodigix.in/logo.png",
          },
        }),
      },
    ],
  }),
  component: BlogsPage,
});

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "AI & Automation" | "Performance Marketing" | "SEO & Search" | "RevOps & Workflows" | "Growth Strategy";
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featured?: boolean;
  tags: string[];
  stats?: string;
  content: {
    overview: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string[];
      highlight?: string;
    }[];
    actionChecklist: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-cac-reduction-2026",
    slug: "how-ai-automation-slashes-customer-acquisition-costs",
    title: "How AI Automation is Slashing Customer Acquisition Costs by 42% in 2026",
    excerpt: "Legacy lead capture loses up to 60% of high-intent prospects in first-contact latency. Here is how modern multi-agent AI pipelines qualify, route, and book demos in under 90 seconds.",
    category: "AI & Automation",
    date: "March 2026",
    readTime: "7 min read",
    featured: true,
    author: {
      name: "Praveen Gorla",
      role: "Founder & CEO, AutoDigiX",
    },
    tags: ["AI Agents", "CAC Reduction", "Automation", "Lead Qualification"],
    stats: "42% CAC Drop",
    content: {
      overview: "Customer acquisition costs across B2B and high-ticket B2C verticals have escalated dramatically. The secret to breaking the cost curve isn't spending more on ad inventory—it's eliminating human response friction through real-time AI automation agents.",
      keyTakeaways: [
        "Leads contacted within 5 minutes are 21x more likely to convert than those contacted after 30 minutes.",
        "Autonomous AI enrichment agents can parse company revenue, tech stack, and LinkedIn profiles before triggering custom outreach.",
        "Multi-modal agents qualify prospect intent over WhatsApp, Email, and SMS seamlessly without robotic canned answers.",
        "Integrating webhook triggers directly into CRM pipelines cuts SDR overhead by up to 65%."
      ],
      sections: [
        {
          heading: "The Speed-to-Lead Breakdown",
          body: [
            "In traditional sales development workflows, an inbound lead fills out a form, gets deposited into a CRM queue, waits for manual assignment, and receives a cold calendar link several hours (or days) later. By then, buying intent has degraded.",
            "With AutoDigiX AI automation frameworks, the moment an ad click or organic search form is submitted, a dedicated AI agent executes instant enrichment via Clearbit and Apollo APIs, grades the ICP match, and initiates a conversational greeting via WhatsApp or verified email within 45 seconds."
          ],
          highlight: "Speed to lead is no longer a sales luxury; it is the single largest determinant of paid campaign ROAS."
        },
        {
          heading: "Architecting the Zero-Latency Pipeline",
          body: [
            "A modern AI revenue architecture connects three core layers: Ingestion (Meta/Google Ad webhooks), Cognition (LLM agent reasoning with strict system boundaries), and Execution (instant calendar reservation and personalized onboarding).",
            "This architecture allows boutique and mid-market firms to deliver the responsiveness of a 50-person SDR bullpen with zero marginal payroll."
          ]
        },
        {
          heading: "Quantifiable ROI Metrics",
          body: [
            "Across our global client accounts in 7 countries, implementing autonomous qualification resulted in an immediate 3.4x lift in scheduled consultation shows and a 42% reduction in blended cost per acquisition."
          ]
        }
      ],
      actionChecklist: [
        "Audit existing lead response time across all web forms.",
        "Implement instant webhook routing directly to AI qualification agents.",
        "Integrate two-way calendar sync for immediate frictionless scheduling.",
        "Measure demo attendance rate before and after agent rollout."
      ]
    }
  },
  {
    id: "meta-google-ads-playbook-2026",
    slug: "2026-playbook-meta-google-ads-maximizing-roas",
    title: "The 2026 Paid Ads Playbook: Scaling Meta & Google ROAS With First-Party Data",
    excerpt: "With privacy sandbox updates and third-party cookie phase-outs, basic pixel tracking is broken. Here is our exact blueprint for server-side CAPI tracking and creative iteration.",
    category: "Performance Marketing",
    date: "February 2026",
    readTime: "8 min read",
    author: {
      name: "Praveen Gorla",
      role: "Performance Marketing Strategist",
    },
    tags: ["Google Ads", "Meta Ads", "Server-Side CAPI", "Performance Marketing"],
    stats: "3.8x Avg ROAS",
    content: {
      overview: "Standard browser-based tracking now misattributes up to 35% of ad conversions due to iOS privacy constraints and ad-blockers. Scaling ad spend profitably requires transitioning to robust server-side conversion APIs and high-velocity creative testing.",
      keyTakeaways: [
        "Server-Side Conversions API (CAPI) recovers lost conversion signals and stabilizes algorithmic bidding.",
        "Broad targeting paired with high-intent creative hooks outperforms micro-targeted audiences on Meta Advantage+.",
        "Google Performance Max campaigns require strict negative keyword sculpting and asset group segmentation.",
        "Creative iteration cycles must deliver 5-10 fresh hooks weekly to prevent ad fatigue."
      ],
      sections: [
        {
          heading: "Why Browser Pixels Fail in 2026",
          body: [
            "Relying solely on client-side pixel scripts leaves massive gaps in attribution. Safari ITP, Firefox Enhanced Tracking Protection, and Chrome Privacy Sandbox restrict cookies, blinding ad algorithms.",
            "By setting up server-to-server tracking via Google Tag Manager Server Container and Cloudflare Workers, we pass back hashed customer data directly to Meta and Google servers with a 98%+ event match quality score."
          ],
          highlight: "Algorithmic bidding engines are only as intelligent as the conversion data you feed them."
        },
        {
          heading: "Creative Strategy as the New Targeting",
          body: [
            "With Meta's machine learning algorithms handling demographic matching automatically, your creative asset is your primary filter. Problem-centric visual hooks, UGC case study breakdowns, and high-contrast typography consistently beat generic agency stock graphics."
          ]
        }
      ],
      actionChecklist: [
        "Deploy Server-Side CAPI with high Event Quality match score (>8.5/10).",
        "Implement offline conversion tracking for closed-won CRM deals.",
        "Establish a weekly creative sprint producing at least 6 angle variations."
      ]
    }
  },
  {
    id: "seo-sge-ai-overviews-2026",
    slug: "seo-in-the-age-of-ai-overviews-sge-dominance",
    title: "SEO in the Age of AI Overviews: Capturing Zero-Click Search Traffic",
    excerpt: "Google AI Overviews are answering search queries directly in the SERP. Learn how to optimize for information gain, brand citations, and topical authority to stay on top.",
    category: "SEO & Search",
    date: "February 2026",
    readTime: "6 min read",
    author: {
      name: "AutoDigiX Editorial",
      role: "SEO & Content Architecture",
    },
    tags: ["SEO", "AI Overviews", "SGE", "Topical Authority"],
    stats: "+180% Organic Reach",
    content: {
      overview: "Traditional keyword stuffing is completely dead. Google's Search Generative Experience (SGE) prioritizes original data, expert commentary, schema graphs, and verified entity trust.",
      keyTakeaways: [
        "AI Overviews cite websites that provide unique numerical data, proprietary case studies, and clear structured answers.",
        "Schema markup (JSON-LD) with comprehensive Organization, WebPage, and Author entities is mandatory.",
        "Optimizing for conversational long-tail queries captures high-intent buyers ready for solutions.",
        "Brand mentions across reputable industry publications build the entity graph that AI engines reference."
      ],
      sections: [
        {
          heading: "The Information Gain Principle",
          body: [
            "Google's AI evaluation models look for 'Information Gain'—content that contributes new insights beyond what existing search results already synthesize. Summarizing existing articles will get your pages ignored by AI Overviews.",
            "To win, every published piece must feature primary research, original client metrics, proprietary frameworks, or unique contrarian viewpoints."
          ],
          highlight: "If an AI model can summarize your entire article without losing nuance, your content has zero information gain."
        },
        {
          heading: "Technical Architecture & Entity Graph",
          body: [
            "Ensure structured data is error-free. Connecting your founders' author profiles, linked social profiles, and company registration in the Schema graph establishes the semantic authority needed to appear as an AI source snippet."
          ]
        }
      ],
      actionChecklist: [
        "Embed proprietary stats and original screenshots in every key guide.",
        "Implement nested Schema.org JSON-LD across all service & blog routes.",
        "Target conversational problem-solving query patterns."
      ]
    }
  },
  {
    id: "lead-enrichment-zero-touch-crm",
    slug: "zero-touch-crm-lead-enrichment-workflows",
    title: "Zero-Touch CRM Lead Enrichment: Building Intelligent B2B Pipelines",
    excerpt: "Stop having sales reps waste 15 hours a week manually researching prospect titles and company data. Here is the automated workflow that enriches leads automatically.",
    category: "RevOps & Workflows",
    date: "January 2026",
    readTime: "9 min read",
    author: {
      name: "Praveen Gorla",
      role: "RevOps & AI Systems Engineer",
    },
    tags: ["RevOps", "CRM Enrichment", "Zapier/Make", "HubSpot Automation"],
    stats: "15 hrs/wk Saved",
    content: {
      overview: "Manual data entry is the biggest drain on sales productivity. By coupling modern webhook listeners with enrichment APIs and LLM analysis, every new contact in your CRM is automatically updated with revenue estimates, tech stack, and a personalized conversation hook.",
      keyTakeaways: [
        "Eliminate 90% of manual data entry for account executives and sales reps.",
        "Score lead tier instantly (Tier 1 Enterprise vs Tier 3 Self-Serve) for prioritized outreach.",
        "Generate custom sales icebreakers tailored to the prospect's latest company announcement.",
        "Trigger automatic Slack/Telegram alerts to executive team on high-value inbound submissions."
      ],
      sections: [
        {
          heading: "Workflow Logic Breakdown",
          body: [
            "1. Lead enters via Webform or Ads Campaign.\n2. Webhook fires to Make.com / Custom Node.js serverless function.\n3. Domain enrichment lookup executes across Apollo, Hunter, and Clearbit.\n4. LLM analyzes the prospect's website and produces a 2-sentence value proposition hook.\n5. Enriched data writes back into HubSpot / Salesforce / Airtable within 4 seconds."
          ],
          highlight: "Sales reps equipped with pre-enriched insights have 3x higher discovery call booking rates."
        }
      ],
      actionChecklist: [
        "Audit CRM fields for missing company size, industry, and tech stack attributes.",
        "Set up webhook listeners for immediate data transformation.",
        "Create custom notification alerts for high-ticket enterprise accounts."
      ]
    }
  },
  {
    id: "local-seo-service-businesses",
    slug: "local-seo-google-maps-3pack-dominance",
    title: "Local SEO Dominance: How Local & Regional Businesses Capture #1 Google Maps Rankings",
    excerpt: "The step-by-step blueprint for conquering Google Business Profile (GBP) 3-pack rankings, review velocity, and geo-targeted landing page structures.",
    category: "SEO & Search",
    date: "January 2026",
    readTime: "5 min read",
    author: {
      name: "AutoDigiX Editorial",
      role: "Local Growth Specialists",
    },
    tags: ["Local SEO", "Google Maps", "GBP Optimization", "Lead Gen"],
    stats: "+320% Calls",
    content: {
      overview: "Local search queries with 'near me' and city modifiers represent the highest purchase intent on the internet. Dominating the Google 3-Pack requires a synchronized blend of GBP activity, localized schema, and authentic customer sentiment signals.",
      keyTakeaways: [
        "Google Business Profile completeness and primary category selection drive 40% of local rank weight.",
        "Consistent monthly photo uploads and review response frequency signal active business operations.",
        "Geo-targeted landing pages with localized FAQs capture adjacent regional suburbs.",
        "Name, Address, Phone (NAP) citation consistency across major aggregators prevents algorithmic confusion."
      ],
      sections: [
        {
          heading: "The Google 3-Pack Algorithm Factors",
          body: [
            "Google evaluates local rankings on three pillars: Proximity, Prominence, and Relevance. While proximity is determined by searcher coordinates, prominence and relevance can be engineered through targeted optimization."
          ]
        }
      ],
      actionChecklist: [
        "Verify primary and secondary Google Business Profile categories.",
        "Automate review generation workflows post-service completion.",
        "Publish weekly updates and high-resolution geotagged photos to GBP."
      ]
    }
  },
  {
    id: "cro-subtle-ux-tweaks",
    slug: "cro-subtle-ui-ux-tweaks-doubling-lead-conversion",
    title: "Conversion Rate Optimization: 7 Subtle UI/UX Tweaks That Doubled Client Conversion Rates",
    excerpt: "Small friction points kill ad conversion rates. We audited over 50 landing pages to uncover the highest-impact visual hierarchy and psychological trust triggers.",
    category: "Growth Strategy",
    date: "December 2025",
    readTime: "7 min read",
    author: {
      name: "Praveen Gorla",
      role: "Growth & CRO Specialist",
    },
    tags: ["CRO", "UI/UX", "Landing Pages", "Conversion Optimization"],
    stats: "2.1x Conv Lift",
    content: {
      overview: "Doubling your conversion rate cuts your customer acquisition cost in half without needing to spend an extra dollar on traffic. We analyzed over 500,000 visitor sessions to isolate the high-impact design elements that move the needle.",
      keyTakeaways: [
        "Reducing form fields from 8 to 4 increases completed submissions by up to 120%.",
        "Sticky mobile CTA buttons eliminate scroll-fatigue drop-offs.",
        "Displaying verified third-party review badges and client logos directly next to the primary button boosts trust.",
        "Micro-animations on hover and page load convey high craftsmanship and brand authority."
      ],
      sections: [
        {
          heading: "The Frictionless Form Principle",
          body: [
            "Every extra input field acts as a barrier. For high-ticket inquiries, collect only Name, Email, Phone, and Project Type on Step 1, then progressively profile for deeper budget parameters on Step 2."
          ],
          highlight: "Never ask for information before establishing immediate perceived value."
        }
      ],
      actionChecklist: [
        "Remove unnecessary form fields.",
        "Add client outcome metrics above the fold.",
        "Implement floating sticky consultation CTA on mobile viewports."
      ]
    }
  }
];

const categories = [
  "All",
  "AI & Automation",
  "Performance Marketing",
  "SEO & Search",
  "RevOps & Workflows",
  "Growth Strategy",
] as const;

function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <div className="bg-[var(--beige)] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-36 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden border-b border-[var(--ink)]/5">
        <motion.div
          style={{ y: yBg }}
          aria-hidden
          className="absolute -top-10 right-0 font-display text-[22vw] text-[var(--ink)]/[0.03] leading-[0.8] select-none pointer-events-none"
        >
          insights
        </motion.div>
        <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--ink-soft)]/70 mb-4">
            <Link to="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-[var(--ink)] font-semibold">Blogs & Insights</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--ink)]/5 border border-[var(--ink)]/10 text-xs text-[var(--ink)] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Field Notes, Frameworks & Engineering Insights</span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.08] text-[var(--ink)] font-light max-w-5xl">
            <RevealText text="Growth, AI &" />
            <br />
            <span className="">
              <RevealText text="Performance Intelligence." />
            </span>
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base md:text-xl text-[var(--ink-soft)] leading-relaxed font-light">
              Tactical playbooks, automation architectures, and conversion frameworks from our team. No fluff, no generic listicles—only battle-tested methodologies.
            </p>
          </Reveal>

          {/* Search Bar & Category Filters */}
          <div className="mt-10 md:mt-14 space-y-5">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-[var(--ink-soft)]/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles on AI, Google Ads, SEO, RevOps, CAC..."
                className="w-full pl-12 pr-10 py-3.5 rounded-full bg-[var(--beige-light)] border border-[var(--ink)]/15 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)]/50 focus:outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-[var(--ink)]/10 shadow-soft transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]/50 hover:text-[var(--ink)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--ink)] text-[var(--beige-light)] shadow-sm scale-105"
                        : "bg-[var(--beige-light)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--ink)]/10 hover:border-[var(--ink)]/30"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Spotlight (Only shown if 'All' and no search) */}
      {selectedCategory === "All" && !searchQuery && featuredPost && (
        <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]/70 mb-4 font-semibold">
            ◆ Featured Spotlight
          </div>
          <div
            onClick={() => setActivePost(featuredPost)}
            className="group cursor-pointer relative bg-[var(--beige-light)] rounded-3xl p-8 md:p-12 border border-[var(--ink)]/10 shadow-soft hover:shadow-gold transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--ink)] text-[var(--beige-light)]">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-[var(--ink-soft)]/70 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {featuredPost.readTime}
                  </span>
                  <span className="text-xs text-[var(--ink-soft)]/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" /> {featuredPost.date}
                  </span>
                  {featuredPost.stats && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                      {featuredPost.stats}
                    </span>
                  )}
                </div>

                <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-[var(--ink)] font-light leading-tight group-hover:text-gold transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed max-w-3xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--ink)]/10 overflow-hidden flex items-center justify-center border border-[var(--ink)]/10">
                    <img src={founderImage} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--ink)]">{featuredPost.author.name}</div>
                    <div className="text-xs text-[var(--ink-soft)]/70">{featuredPost.author.role}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-end lg:items-end">
                <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-sm font-medium group-hover:bg-gold transition-colors shadow-soft">
                  <span>Read Full Article</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid Section */}
      <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--ink)]/10">
          <div className="text-sm font-medium text-[var(--ink)]">
            Showing <span className="font-bold text-gold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedCategory !== "All" && <span> in <strong className="text-[var(--ink)]">{selectedCategory}</strong></span>}
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] underline"
            >
              Clear search
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-[var(--beige-light)] p-12 rounded-3xl text-center border border-[var(--ink)]/10 max-w-xl mx-auto my-12">
            <BookOpen className="w-12 h-12 mx-auto text-[var(--ink-soft)]/40 mb-4" />
            <h3 className="font-display text-2xl text-[var(--ink)] font-light mb-2">No matching articles found</h3>
            <p className="text-sm text-[var(--ink-soft)] mb-6">
              Try searching for different keywords such as AI, SEO, Ads, or select another category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setActivePost(post)}
                className="group cursor-pointer bg-[var(--beige-light)] rounded-3xl p-7 border border-[var(--ink)]/10 shadow-soft hover:shadow-gold hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--beige)] text-[var(--ink)] border border-[var(--ink)]/10">
                      {post.category}
                    </span>
                    <span className="text-xs text-[var(--ink-soft)]/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] font-light leading-snug mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[var(--ink-soft)]/80 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-[var(--ink-soft)]/70 bg-[var(--beige)]/80 px-2.5 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[var(--ink)]/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[var(--ink-soft)]/80">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{post.date}</span>
                    </div>
                    <span className="font-medium text-[var(--ink)] flex items-center gap-1 group-hover:text-gold transition-colors">
                      Read <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Growth Newsletter / VIP Briefing Section */}
      <section className="py-16 md:py-24 px-6 bg-[var(--ink)] text-[var(--beige-light)] relative overflow-hidden my-12">
        <div className="absolute inset-0 noise-bg opacity-[0.04] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--beige-light)]/10 text-xs text-[var(--beige-light)]/90 mb-6">
            <Mail className="w-3.5 h-3.5 text-gold-soft" />
            <span>The AutoDigiX Growth Briefing</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
            Get High-ROI Growth Tactics in Your Inbox
          </h2>
          <p className="mt-4 text-sm md:text-base text-[var(--beige-light)]/75 max-w-xl mx-auto leading-relaxed">
            Bi-weekly frameworks on paid advertising, AI automations, and search dominance curated directly by Praveen Gorla and our senior revenue engineers.
          </p>

          <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your work email address"
              className="w-full px-5 py-3.5 rounded-full bg-[var(--beige-light)]/10 border border-[var(--beige-light)]/20 text-sm text-[var(--beige-light)] placeholder:text-[var(--beige-light)]/40 focus:outline-none focus:border-gold-soft transition"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--beige-light)] text-[var(--ink)] text-sm font-semibold hover:bg-gold-soft hover:text-[var(--ink)] transition-colors whitespace-nowrap shadow-soft"
            >
              {subscribed ? "Subscribed! ✓" : "Subscribe"}
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-emerald-400 mt-3"
            >
              Thank you for subscribing to our private growth dispatch!
            </motion.p>
          )}
        </div>
      </section>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--beige-light)] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-[var(--ink)]/10 flex flex-col overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-[var(--ink)]/10 flex items-start justify-between gap-4 bg-[var(--beige)]/50">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--ink)] text-[var(--beige-light)]">
                      {activePost.category}
                    </span>
                    <span className="text-xs text-[var(--ink-soft)]/70 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" /> {activePost.readTime}
                    </span>
                    <span className="text-xs text-[var(--ink-soft)]/70 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" /> {activePost.date}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl text-[var(--ink)] font-light leading-tight">
                    {activePost.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActivePost(null)}
                  className="p-2 rounded-full bg-[var(--ink)]/5 hover:bg-[var(--ink)]/10 text-[var(--ink)] transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Article Scrollable Content */}
              <div className="p-6 md:p-10 overflow-y-auto space-y-8 text-[var(--ink-soft)] text-sm md:text-base leading-relaxed">
                
                {/* Author Info Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-[var(--ink)]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[var(--ink)]/10 overflow-hidden border border-[var(--ink)]/10">
                      <img src={founderImage} alt={activePost.author.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--ink)] text-sm md:text-base">{activePost.author.name}</div>
                      <div className="text-xs text-[var(--ink-soft)]/70">{activePost.author.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {activePost.tags.map((tag, idx) => (
                      <span key={idx} className="hidden sm:inline-block text-[11px] px-2.5 py-1 bg-[var(--beige)] rounded-lg text-[var(--ink-soft)] border border-[var(--ink)]/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overview Card */}
                <div className="p-5 md:p-6 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/5 text-base md:text-lg text-[var(--ink)] font-light leading-relaxed">
                  {activePost.content.overview}
                </div>

                {/* Key Takeaways */}
                <div className="bg-[var(--ink)]/5 p-6 rounded-2xl border border-[var(--ink)]/10 space-y-3">
                  <h3 className="font-display text-lg text-[var(--ink)] font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" /> Key Strategic Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {activePost.content.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* In-depth Sections */}
                {activePost.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] font-medium">
                      {sec.heading}
                    </h3>
                    {sec.body.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {sec.highlight && (
                      <div className="border-l-4 border-gold pl-4 py-2 my-4 italic text-sm md:text-base text-[var(--ink)] bg-[var(--beige)]/60 rounded-r-xl">
                        &ldquo;{sec.highlight}&rdquo;
                      </div>
                    )}
                  </div>
                ))}

                {/* Action Checklist */}
                {activePost.content.actionChecklist && activePost.content.actionChecklist.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[var(--beige)] border border-[var(--ink)]/10 space-y-3">
                    <h3 className="font-display text-lg text-[var(--ink)] font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4 text-gold" /> Implementation Checklist
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {activePost.content.actionChecklist.map((task, idx) => (
                        <div key={idx} className="p-3 bg-[var(--beige-light)] rounded-xl border border-[var(--ink)]/5 text-xs flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-gold/20 text-gold text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Callout */}
                <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[var(--ink)] to-[#133777] text-[var(--beige-light)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
                  <div>
                    <h4 className="font-display text-xl md:text-2xl font-light text-[var(--beige-light)]">
                      Ready to implement this system?
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--beige-light)]/80 mt-1 max-w-md">
                      Let AutoDigiX design, automate, and scale your growth infrastructure.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    onClick={() => setActivePost(null)}
                    className="px-6 py-3 rounded-full bg-[var(--beige-light)] text-[var(--ink)] text-xs font-semibold hover:bg-gold-soft hover:text-[var(--ink)] transition-colors whitespace-nowrap shadow-soft"
                  >
                    Book Consultation
                  </Link>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 md:px-8 border-t border-[var(--ink)]/10 bg-[var(--beige)] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: activePost.title,
                        text: activePost.excerpt,
                        url: window.location.href,
                      }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Article link copied to clipboard!");
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share Article
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2 rounded-full bg-[var(--ink)] text-[var(--beige-light)] text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
