import img1 from "../brands/altum.png";
import img2 from "../brands/winsta.png";
import img3 from "../brands/nirvana.png";
import img4 from "../brands/solter - crypto.png";
import img5 from "../brands/murtik.png";
import img6 from "../brands/city pet mart.png";
import img7 from "../brands/bhumi.png";
import imgCrypto1 from "../brands/asset office crypto.png";
import imgCrypto2 from "../brands/vertex iq crypto.png";

const brands = [
  { name: "Altum Systems", logo: img1 },
  { name: "Winsta", logo: img2 },
  { name: "Nirvana Pain Clinic", logo: img3 },
  { name: "Solter", logo: img4 },
  { name: "Murtik", logo: img5 },
  { name: "City Pet Mart USA", logo: img6 },
  { name: "Bhumi Safety Nets", logo: img7 },
  { name: "Asset Office", logo: imgCrypto1 },
  { name: "Vertex IQ", logo: imgCrypto2 },
];

export function LogoMarquee() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const loop = isMobile ? [...brands, ...brands] : [...brands, ...brands, ...brands];
  return (
    <section className="py-16 border-y border-[var(--ink)]/10 overflow-hidden bg-[var(--beige-light)]/50">
      <div className="container mx-auto px-4">
        <div className="text-center text-[10px] uppercase tracking-[0.4em] text-[var(--ink-soft)] mb-10 font-medium">
          ◆ Trusted by clients across the world
        </div>
      </div>

      <div className="relative">
        {/* Faded edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--beige-light)] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--beige-light)] to-transparent z-10" />

        <div className="flex gap-20 marquee w-max items-center py-4">
          {loop.map((brand, i) => (
            <div
              key={i}
              className="group flex items-center justify-center opacity-80 md:hover:opacity-100 transition-all duration-500"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-10 w-auto object-contain max-w-[160px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
