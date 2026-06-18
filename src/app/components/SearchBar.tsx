"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  compact?: boolean;
  defaultQuery?: string;
  defaultMin?: string;
  defaultMax?: string;
};

export function SearchBar({
  compact = false,
  defaultQuery = "",
  defaultMin = "",
  defaultMax = "",
}: SearchBarProps) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const key of ["q", "min", "max"]) {
      const value = String(form.get(key) || "").trim();
      if (value) params.set(key, value);
    }

    window.location.href = `/woningaanbod?${params.toString()}`;
  }

  const fieldBase =
    "h-[78px] rounded-md bg-white text-black shadow-sm outline-none transition focus:ring-2 focus:ring-black/20";

  return (
    <form
      onSubmit={onSubmit}
      className={[
        "grid w-full gap-2",
        compact
          ? "grid-cols-1 md:grid-cols-[1fr_120px_120px_225px]"
          : "grid-cols-1 md:grid-cols-[1fr_120px_120px_225px]",
      ].join(" ")}
    >
      <input
        className={`${fieldBase} px-4 text-[20px] placeholder:text-black`}
        name="q"
        defaultValue={defaultQuery}
        placeholder="Plaats, stadsdeel, wijk of buurt"
      />

      <label className={`relative block ${fieldBase}`}>
        <span className="absolute left-3 top-1 text-[16px] leading-none text-neutral-500">
          Van
        </span>

        <select
          className="h-full w-full appearance-none rounded-md bg-transparent px-3 pt-5 text-[22px] outline-none"
          name="min"
          defaultValue={defaultMin}
        >
          <option value="">€ 0</option>
          <option value="250000">€ 250k</option>
          <option value="350000">€ 350k</option>
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl">
          ⌄
        </span>
      </label>

      <label className={`relative block ${fieldBase}`}>
        <span className="absolute left-3 top-1 text-[16px] leading-none text-neutral-500">
          Tot
        </span>

        <select
          className="h-full w-full appearance-none rounded-md bg-transparent px-3 pt-5 text-[22px] outline-none"
          name="max"
          defaultValue={defaultMax}
        >
          <option value="">€ -</option>
          <option value="450000">€ 450k</option>
          <option value="650000">€ 650k</option>
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl">
          ⌄
        </span>
      </label>

      <button
        className="flex h-[78px] items-center justify-center gap-3 rounded-md bg-[#ffc533] px-8 text-[26px] font-medium text-black shadow-sm transition hover:bg-[#f2b920]"
        type="submit"
      >
        <Search className="h-6 w-6" />
        Zoek
      </button>
    </form>
  );
}