"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pahtName = usePathname();

  const currentCatId = searchParams.get("categoryId");
  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pahtName,
        query: {
          categoryId: currentCatId,
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [currentCatId, debounceValue, pahtName, router]);
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[350px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};
