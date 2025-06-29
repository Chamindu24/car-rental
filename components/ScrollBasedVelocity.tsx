import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import * as SimpleIcons from "simple-icons/icons";

function BrandIcon({ icon }: { icon: SimpleIcons.SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={36}
      height={36}
      fill={`#${icon.hex}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function ScrollBasedVelocityDemo() {
  const brands = [
    { name: "Honda", icon: SimpleIcons.siHonda },
    { name: "Toyota", icon: SimpleIcons.siToyota },
    { name: "BMW", icon: SimpleIcons.siBmw },
    { name: "Audi", icon: SimpleIcons.siAudi },
  ];

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <VelocityScroll className="text-black bg-neutral-100">
        {brands.map((brand, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6">
            <BrandIcon icon={brand.icon} />
            <span className="text-lg md:text-2xl font-semibold">{brand.name}</span>
          </span>
        ))}
      </VelocityScroll>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}