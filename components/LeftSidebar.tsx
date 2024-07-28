"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link href={"/"} className="flex items-center gap-5 pb-10 max-lg:justify-center cursor-pointer">
          <Image src={"/icons/logo.svg"} alt="Logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">Postcaster</h1>
        </Link>

        {sidebarLinks.map(({ imgURL, route, label }) => {
          const isActive = pathName === route || pathName.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={route}
              className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
                "bg-nav-focus border-r-4 border-orange-1": isActive,
              })}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p className="">{label}</p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default LeftSidebar;
