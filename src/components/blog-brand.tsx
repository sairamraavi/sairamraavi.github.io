import Image from "next/image";
import Link from "next/link";

export function BlogBrand() {
  return (
    <Link className="brand" href="/" aria-label="Sairam Raavi home">
      <Image
        src="/brand/sr-logo.svg"
        alt=""
        width={42}
        height={36}
        priority
      />
      <span className="brand-name">Sairam Raavi</span>
    </Link>
  );
}
