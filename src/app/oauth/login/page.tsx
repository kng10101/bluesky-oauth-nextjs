"use client";

import { signInWithBluesky } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

// This is the login page
export default function Page() {
  const router = useRouter();

  // This is a controlled input
  const [handle, setHandle] = useState("");

  // Remove the @ symbol from the handle
  useEffect(() => {
    setHandle(handle.replace("@", ""));
  }, [handle]);

  // Handle the form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!handle) {
      return;
    }

    // Sign in with Bluesky
    const url: string = await signInWithBluesky(handle);

    // Redirect to the Bluesky login page
    router.push(url);
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="handle"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Bluesky Handle
          </label>
          <div className="mt-2">
            <input
              id="handle"
              name="handle"
              type="text"
              placeholder="handle.bsky.social"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={handle}
              onChange={(event) => setHandle(event.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Sign in with Bluesky
        </button>
      </form>
    </main>
  );
}
