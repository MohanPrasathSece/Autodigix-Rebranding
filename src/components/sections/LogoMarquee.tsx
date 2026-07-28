import dti from "../../assets/brands/2020_DTI-Logo-Horizontal_Color.webp";
import logo2 from "../../assets/brands/3e98de_653350b3982442c9b925893b6588bd5f~mv2.avif";
import circular from "../../assets/brands/66a00a04a484465ad92e1616_Circular-TR-p-500.png";
import holloway from "../../assets/brands/67c65963fdb193ed862cef9c_Holloway-Solutions-logo.png";
import aztech from "../../assets/brands/Aztech-Main-Logo-1.png.webp";
import crs from "../../assets/brands/CRSEmail-1-1-removebg-preview.png";
import itsecure from "../../assets/brands/IT-Secure-Logo_Name-scaled.png";
import nerdranges from "../../assets/brands/Nerd-Ranges-Logo.avif";
import highway99 from "../../assets/brands/highway-99-logo-white.svg";
import industrypro from "../../assets/brands/industrypro-reverse-logo.svg";
import ll from "../../assets/brands/ll-removebg-preview.png";
import logowhite from "../../assets/brands/logo-white-removebg-preview.png";
import logomin from "../../assets/brands/logo_min.png";
import se from "../../assets/brands/se_logo.webp";
import markgraf from "../../assets/brands/tag_Markgraf-logo-horz_white-v2-scaled.png";

const brands = [
  { name: "DTI", logo: dti },
  { name: "Logo2", logo: logo2 },
  { name: "Circular", logo: circular },
  { name: "Holloway", logo: holloway },
  { name: "Aztech", logo: aztech },
  { name: "CRS", logo: crs },
  { name: "IT Secure", logo: itsecure },
  { name: "Nerd Ranges", logo: nerdranges },
  { name: "Highway 99", logo: highway99 },
  { name: "Industry Pro", logo: industrypro },
  { name: "LL", logo: ll },
  { name: "Logo White", logo: logowhite },
  { name: "Logo Min", logo: logomin },
  { name: "SE", logo: se },
  { name: "Markgraf", logo: markgraf },
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
