import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-xl font-bold lg:text-5xl">
            A trusted provide of delivery services
          </h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
            We deliver your product safe in a reasonable time
          </h2>
        </div>
        <Link
          href="/"
          target=""
          className={`w-[10rem] ${cn(buttonVariants({ size: "lg" }))}`}
        >
          Getting Started
        </Link>
      </div>
        <div className="flex flex-1 justify-center lg:justify-end">
          <Image
            src={"/images/hero-illu.png"}
            width={500}
            height={500}
            alt="Header image"
          />
        </div>
    </section>
  )
}