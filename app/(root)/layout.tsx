import Image from "next/image";
import LeftSidebar from "../../components/LeftSidebar";
import RightSideBar from "@/components/RightSideBar";
import MobileNav from "@/components/MobileNav";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="flex-1 flex min-h-screen flex-col  px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image src={"/icons/logo.svg"} alt="Logo" width={30} height={30} />
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
              <Toaster />
              {children}
            </div>
          </div>
        </section>
        <RightSideBar />
      </main>
    </div>
  );
}
