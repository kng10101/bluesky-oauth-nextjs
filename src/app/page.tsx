import Link from "next/link";
import BlueskyLogo from "@/components/bluesky-logo";

export default function Home() {
  return (
    <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
      <h1 className="font-black text-5xl uppercase">Bluesky OAuth Next.JS</h1>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          className="flex h-10 items-center justify-center gap-2 rounded-full border border-transparent border-solid bg-foreground px-4 text-background text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
          href={`/oauth/login`}
          rel="noopener noreferrer"
        >
          <BlueskyLogo className="size-6 fill-background dark:invert" />
          Login with Bluesky
        </Link>
        <a
          className="flex h-10 items-center justify-center rounded-full border border-black/[.08] border-solid px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          href={`/private`}
          rel="noopener noreferrer"
        >
          Private Page
        </a>
      </div>
    </main>
  );
}
