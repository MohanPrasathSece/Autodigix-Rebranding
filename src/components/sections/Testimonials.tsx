import { Reveal } from "../Reveal";

const items = [
  {
    q: "AutoDigiX rebuilt our outbound infrastructure and delivered qualified meetings within weeks. The process was clear, structured and focused on results.",
    a: "VP Sales",
    r: "AI Company",
  },
  {
    q: "The outreach felt personalized, professional and highly targeted. We saw immediate improvements in conversations and pipeline quality.",
    a: "Founder",
    r: "Consulting Firm",
  },
  {
    q: "The AI workflows and automation systems saved our team hours every week while improving lead handling and reporting.",
    a: "Head of Growth",
    r: "",
  },
];

function Card({ t }: { t: (typeof items)[number] }) {
  return (
    <figure className="bg-[var(--beige-light)] rounded-xl md:rounded-3xl p-5 md:p-8 border border-[var(--ink)]/10 shadow-soft flex flex-col justify-between overflow-hidden min-h-[320px] md:aspect-square">
      <div>
        <div className="font-display text-3xl md:text-5xl text-[var(--ink-soft)] leading-none ">
          "
        </div>
        <blockquote className="mt-2 md:mt-3 text-sm md:text-lg text-[var(--ink)] leading-relaxed">
          {t.q}
        </blockquote>
      </div>
      <figcaption className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-[var(--ink)]/10">
        <div className="font-display text-base md:text-lg text-[var(--ink)]">{t.a}</div>
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)] mt-1">
          {t.r}
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // distribute items across 3 columns
  const c1 = [items[0], items[3], items[6]];
  const c2 = [items[1], items[4], items[7]];
  const c3 = [items[2], items[5], items[8]];
  const cols = [
    { items: [...c1, ...c1], speed: "col-up-slow" },
    { items: [...c2, ...c2], speed: "col-up-fast" },
    { items: [...c3, ...c3], speed: "col-up-mid" },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[var(--beige)]">
      <div className="max-w-7xl mx-auto mb-20">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
            ◆ Voices
          </div>
          <h2 className="font-display text-5xl md:text-8xl text-[var(--ink)] max-w-4xl leading-[0.95] font-light">
            Trusted by operators and <span className="">growing businesses.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex gap-6 marquee w-max items-stretch py-4 hover:[animation-play-state:paused]"
          style={{ animationDuration: "60s" }}
        >
          {[...items, ...items].map((t, j) => (
            <div key={`test-${j}`} className="w-[85vw] md:w-[400px] shrink-0">
              <Card t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
