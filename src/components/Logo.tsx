import { Home } from "lucide-react";
import logo from "../../public/images/LogoJW.svg";
import Image from "next/image";

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Jouw Woning home">
      {/* <Home className="h-9 w-9" strokeWidth={1.8} />
      <span className="leading-none">
        <span className="block text-[15px]">Jouw</span>
        <span className="block text-[15px]">Woning</span>
      </span> */}
      <Image src={logo} alt="Jouw Woning logo" className="h-11 w-auto" />
    </a>
  );
}
