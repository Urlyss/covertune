"use client";
import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { getAllItemsFromEndpoint } from "@/lib/utils";
import CategoryList from "./CategoryList";
import { Skeleton } from "./ui/skeleton";
import { useLocale } from "next-intl";

const CategoriesPage = () => {
  const [accessToken, setAccessToken] = useLocalStorage(
    "covertune_access_token",
    undefined
  );
  const locale = useLocale();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (accessToken) {
      setCategories([])
      getAllItemsFromEndpoint(
        accessToken,
        "https://api.spotify.com/v1/browse/categories?locale="+locale,
        "categories"
      ).then((catgs) => {
        if (catgs && catgs.length) {
          setCategories(catgs);
        } else {
          setAccessToken(undefined);
        }
      });
    }
  }, [accessToken,locale]);

  return (
    <div className="mt-32">
      {categories.length == 0 ? (
        <div className="flex flex-wrap gap-20 justify-center">
          {Array(8)
            .fill(1)
            .map((sk,ind) => (
              <Skeleton className="w-60 h-60" key={ind}/>
            ))}
        </div>
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
};

export default CategoriesPage;
